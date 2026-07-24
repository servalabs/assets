"""Generate laptop-framed composites of product screenshots.

Wraps a raw UI screenshot in a minimal dark laptop frame (front view:
thin bezel + camera dot + base deck with thumb scoop + soft shadow) on a
transparent background, for use as flythrough plane textures on
servalabs.com. Regenerate rather than hand-edit.

Usage:  python gen-laptop-mockup.py
Inputs/outputs are hardcoded below.
"""

from PIL import Image, ImageDraw, ImageFilter

JOBS = [
    ("wincommander/wc-dashboard.png", "wincommander/wc-dashboard-laptop.png"),
    ("theron/theron-entity-graph.png", "theron/theron-entity-graph-laptop.png"),
]

# Frame geometry (px, relative to a 1920-wide screenshot; scaled otherwise)
BEZEL = 30            # bezel thickness around the screen
BEZEL_BOTTOM = 44     # slightly thicker chin
BEZEL_RADIUS = 34     # outer corner radius of the display shell
SCREEN_RADIUS = 10    # inner corner radius of the screen cutout
BASE_HEIGHT = 52      # deck bar height
BASE_EXTRA = 0.09     # deck extends this fraction of shell width per side
NOTCH_W, NOTCH_H = 280, 16
MARGIN = 90           # canvas padding for the shadow

SHELL = (24, 27, 31, 255)
SHELL_EDGE = (58, 63, 70, 255)
SCREEN_BORDER = (10, 11, 13, 255)
BASE_TOP = (44, 48, 54, 255)
BASE_BOTTOM = (26, 29, 33, 255)
NOTCH_COLOR = (18, 20, 23, 255)
CAMERA = (52, 58, 66, 255)


def build(src_path: str, out_path: str) -> None:
    shot = Image.open(src_path).convert("RGB")
    sw, sh = shot.size
    k = sw / 1920.0  # scale frame metrics with screenshot width

    bez, bezb = round(BEZEL * k), round(BEZEL_BOTTOM * k)
    shell_w = sw + 2 * bez
    shell_h = sh + bez + bezb
    base_h = round(BASE_HEIGHT * k)
    base_w = round(shell_w * (1 + 2 * BASE_EXTRA))
    margin = round(MARGIN * k)

    W = base_w + 2 * margin
    H = shell_h + base_h + 2 * margin
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))

    shell_x = (W - shell_w) // 2
    shell_y = margin
    base_y = shell_y + shell_h

    # soft ground shadow under the deck
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.ellipse(
        [W // 2 - base_w // 2, base_y + base_h - round(10 * k),
         W // 2 + base_w // 2, base_y + base_h + round(46 * k)],
        fill=(0, 0, 0, 110),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(round(22 * k)))
    img.alpha_composite(shadow)

    d = ImageDraw.Draw(img)

    # display shell
    d.rounded_rectangle(
        [shell_x, shell_y, shell_x + shell_w, shell_y + shell_h],
        radius=round(BEZEL_RADIUS * k), fill=SHELL, outline=SHELL_EDGE, width=max(2, round(2 * k)),
    )
    # camera dot
    cx, cy, cr = W // 2, shell_y + bez // 2, max(3, round(5 * k))
    d.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], fill=CAMERA)

    # screen with rounded corners
    mask = Image.new("L", (sw, sh), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, sw, sh], radius=round(SCREEN_RADIUS * k), fill=255)
    img.paste(shot, (shell_x + bez, shell_y + bez), mask)
    d.rounded_rectangle(
        [shell_x + bez, shell_y + bez, shell_x + bez + sw, shell_y + bez + sh],
        radius=round(SCREEN_RADIUS * k), outline=SCREEN_BORDER, width=max(2, round(2 * k)),
    )

    # base deck with vertical gradient
    base_x = (W - base_w) // 2
    grad = Image.new("RGBA", (base_w, base_h))
    gd = ImageDraw.Draw(grad)
    for y in range(base_h):
        t = y / max(1, base_h - 1)
        gd.line(
            [(0, y), (base_w, y)],
            fill=tuple(round(BASE_TOP[i] + (BASE_BOTTOM[i] - BASE_TOP[i]) * t) for i in range(4)),
        )
    base_mask = Image.new("L", (base_w, base_h), 0)
    ImageDraw.Draw(base_mask).rounded_rectangle([0, 0, base_w, base_h], radius=base_h // 2, fill=255)
    img.paste(grad, (base_x, base_y), base_mask)

    # thumb scoop
    nw, nh = round(NOTCH_W * k), round(NOTCH_H * k)
    d.rounded_rectangle([W // 2 - nw // 2, base_y, W // 2 + nw // 2, base_y + nh], radius=nh // 2, fill=NOTCH_COLOR)

    img.save(out_path)
    print(f"{out_path}: {img.size[0]}x{img.size[1]}")


if __name__ == "__main__":
    import os
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    for src, out in JOBS:
        build(src, out)
