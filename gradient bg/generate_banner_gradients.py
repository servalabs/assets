"""Generate five restrained 36 x 72 inch banner backgrounds at 300 DPI."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageOps


OUTPUT_DIR = Path(__file__).parent
BASE = (243, 242, 233)  # #f3f2e9
PREVIEW_SIZE = (1080, 2160)
PRINT_SIZE = (10800, 21600)
OPTIONS = (
    ("01-linen", (236, 235, 224), (245, 244, 237), "vertical"),
    ("02-sage", (234, 239, 229), (246, 242, 231), "diagonal"),
    ("03-mist", (232, 238, 238), (246, 244, 237), "diagonal-reverse"),
    ("04-sand", (241, 233, 219), (246, 244, 236), "vertical"),
    ("05-stone", (237, 233, 232), (244, 244, 237), "diagonal"),
)


def gradient_mask(size: tuple[int, int], direction: str) -> Image.Image:
    mask = Image.linear_gradient("L").resize(size)
    if direction == "diagonal":
        mask = mask.rotate(-33, resample=Image.Resampling.BICUBIC, expand=False)
    elif direction == "diagonal-reverse":
        mask = ImageOps.mirror(mask.rotate(-33, resample=Image.Resampling.BICUBIC, expand=False))
    return mask.point(lambda value: round(value * 0.42))


def create_option(low_tone: tuple[int, int, int], high_tone: tuple[int, int, int], direction: str) -> Image.Image:
    canvas = Image.new("RGB", PREVIEW_SIZE, BASE)
    transition = Image.new("RGB", PREVIEW_SIZE, low_tone)
    canvas.paste(transition, mask=gradient_mask(PREVIEW_SIZE, direction))

    glow = Image.new("RGBA", PREVIEW_SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow)
    width, height = PREVIEW_SIZE
    draw.ellipse((-width // 2, -height // 8, width * 3 // 2, height * 5 // 8), fill=(*high_tone, 34))
    glow = glow.filter(ImageFilter.GaussianBlur(180))
    return Image.alpha_composite(canvas.convert("RGBA"), glow).convert("RGB")


def save_banner(name: str, low_tone: tuple[int, int, int], high_tone: tuple[int, int, int], direction: str) -> Image.Image:
    preview = create_option(low_tone, high_tone, direction)
    final = preview.resize(PRINT_SIZE, Image.Resampling.LANCZOS)
    destination = OUTPUT_DIR / f"banner-gradient-{name}-36x72in-300dpi.jpg"
    final.save(destination, "JPEG", quality=96, subsampling=0, dpi=(300, 300), optimize=True)
    final.close()
    return preview


def main() -> None:
    previews = [save_banner(*option) for option in OPTIONS]
    sheet = Image.new("RGB", (5 * 300, 600), BASE)
    for index, preview in enumerate(previews):
        sheet.paste(preview.resize((300, 600), Image.Resampling.LANCZOS), (index * 300, 0))
        preview.close()
    sheet.save(OUTPUT_DIR / "banner-gradient-options-preview.png", optimize=True)


if __name__ == "__main__":
    main()
