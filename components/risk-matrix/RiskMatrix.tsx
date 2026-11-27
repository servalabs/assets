import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AlertTriangle, Globe, Activity, ExternalLink, XCircle, ChevronLeft, ChevronRight, ChevronsDown, Banknote } from "lucide-react";
import { SCANDALS, TECH_ORDER, AGENCY_ORDER } from "./scandals";
import { logos, editorial } from "./assets";
import FingerprintMirror from "./FingerprintMirror";
import { MoneyText } from "./MoneyText";
import { hasMoney } from "./money";
import type { RiskMatrixProps } from "./types";
import "./risk-matrix.css";

const RADIUS = 174;
const SIDEBAR_PREVIEW_LIMIT = 180;
/** Wheel distance past the panel's end before it moves to the next entity —
 *  one deliberate flick, not the tail of the scroll that reached the end. */
const CHAIN_WHEEL_THRESHOLD = 160;
/** Pause after a move so trackpad inertia doesn't skip several entities. */
const CHAIN_COOLDOWN_MS = 750;
/** Wheel silence that marks the start of a new gesture. */
const CHAIN_GESTURE_GAP_MS = 180;
/** Wheel chaining only in the side-by-side layout with a fine pointer. */
const CHAIN_WIDE_QUERY = "(min-width: 1024px) and (pointer: fine)";

/**
 * Keeps the timeline skimmable without changing the underlying, cited record.
 * The full wording remains one click away for readers who need the context.
 */
function sidebarPreview(description: string) {
  if (description.length <= SIDEBAR_PREVIEW_LIMIT) return description;

  const sentenceEnd = description.slice(0, SIDEBAR_PREVIEW_LIMIT + 1).search(/[.!?](?:\s|$)/);
  if (sentenceEnd >= 0) return description.slice(0, sentenceEnd + 1);

  const lastSpace = description.lastIndexOf(" ", SIDEBAR_PREVIEW_LIMIT);
  return `${description.slice(0, lastSpace > 0 ? lastSpace : SIDEBAR_PREVIEW_LIMIT)}…`;
}

/** Distribute orbit nodes across the top ~2/3, leaving a gap at the bottom so
 *  they never collide with the central cluster or the YOU node. Radius + arc
 *  are sized so the current node count (14) stays ~57px center-to-center — the
 *  same comfortable spacing the layout had at 11 nodes. */
function getPos(index: number, total: number) {
  if (total <= 1) return { x: 0, y: 0 };
  const gapAngle = 115 * (Math.PI / 180);
  const startAngle = Math.PI / 2 + gapAngle / 2;
  const availableAngle = 2 * Math.PI - gapAngle;
  const angle = startAngle + (index / (total - 1)) * availableAngle;
  return { x: Math.cos(angle) * RADIUS, y: Math.sin(angle) * RADIUS };
}

export default function RiskMatrix({
  className,
  style,
  eyebrow = "Sovereignty Risk Matrix",
  title,
  subtitle,
  youPanel,
  fingerprint,
  youLabel = "YOU",
  youFlagUrl,
  scrollChain,
  featuredAudience,
  featuredAudienceLabel = "Relevant to you",
  sortEvents,
  techOrder,
  highlightMoney = false,
}: RiskMatrixProps) {
  const chain = useMemo(() => (scrollChain ?? []).filter((key) => SCANDALS[key]), [scrollChain]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(() => chain[0] ?? null);
  const [showFingerprint, setShowFingerprint] = useState(false);
  const [isEmbargo, setIsEmbargo] = useState(false);
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(() => new Set());
  const reduce = useReducedMotion();
  // State (not a ref): with AnimatePresence mode="wait" the next entity's list
  // mounts only after the previous one finishes exiting, so the wheel
  // listener must re-attach when the element itself changes.
  const [timelineEl, setTimelineEl] = useState<HTMLDivElement | null>(null);

  const selectedData = selectedCompany ? SCANDALS[selectedCompany] : null;
  const chainIndex = selectedCompany ? chain.indexOf(selectedCompany) : -1;
  const chainOn = chain.length > 1;
  const prevKey = chainOn && chainIndex > 0 ? chain[chainIndex - 1] : null;
  const nextKey = chainOn ? (chainIndex < 0 ? chain[0] : chain[chainIndex + 1] ?? null) : null;

  const orbit = useMemo(
    () => (techOrder ?? TECH_ORDER).filter((key) => SCANDALS[key] && SCANDALS[key].category === "tech"),
    [techOrder],
  );

  // Host sort if given; else featured-audience events first (stable), original order otherwise.
  const orderedEvents = useMemo(() => {
    if (!selectedData) return [];
    if (sortEvents) return sortEvents([...selectedData.events]);
    if (!featuredAudience) return selectedData.events;
    const hit = (e: (typeof selectedData.events)[number]) => e.audiences?.includes(featuredAudience) ?? false;
    return [...selectedData.events.filter(hit), ...selectedData.events.filter((e) => !hit(e))];
  }, [selectedData, featuredAudience, sortEvents]);

  const goTo = useCallback((key: string | null) => {
    if (!key) return;
    setShowFingerprint(false);
    setSelectedCompany(key);
    setExpandedEvents(new Set());
  }, []);

  // Scroll chaining (forward only, side-by-side desktop layout only): when a
  // NEW downward wheel gesture starts while the history list is already at
  // its end, it moves to the next entity. The flick that merely reaches the
  // end never chains (so the page isn't trapped by momentum), scrolling up
  // never chains (Previous button instead), and narrow / touch layouts use
  // the buttons. At the chain's end, or for any other wheel, the page
  // scrolls on as usual.
  const wheelState = useRef({ acc: 0, lockUntil: 0, lastWheel: 0, armed: false });
  useEffect(() => {
    const el = timelineEl;
    if (!chainOn || !el || typeof window === "undefined") return;
    const wide = window.matchMedia?.(CHAIN_WIDE_QUERY);
    wheelState.current.acc = 0;
    wheelState.current.armed = false;
    const onWheel = (e: WheelEvent) => {
      const state = wheelState.current;
      const now = performance.now();
      const newGesture = now - state.lastWheel > CHAIN_GESTURE_GAP_MS;
      state.lastWheel = now;
      if (wide && !wide.matches) return;
      if (e.deltaY <= 0 || Math.abs(e.deltaY) < Math.abs(e.deltaX)) {
        state.acc = 0;
        state.armed = false;
        return;
      }
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
      if (newGesture) state.armed = atBottom;
      if (!atBottom || !state.armed || !nextKey) {
        state.acc = 0;
        return;
      }
      e.preventDefault();
      if (now < state.lockUntil) return;
      state.acc += e.deltaY;
      if (state.acc >= CHAIN_WHEEL_THRESHOLD) {
        state.acc = 0;
        state.armed = false;
        state.lockUntil = now + CHAIN_COOLDOWN_MS;
        goTo(nextKey);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [chainOn, nextKey, goTo, timelineEl]);

  // While one entity's list exits and the next mounts, the wheel lands on the
  // bare panel; hold the page still for that cooldown so the hand-off
  // doesn't jolt the page.
  const [panelEl, setPanelEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!chainOn || !panelEl) return;
    const guard = (e: WheelEvent) => {
      if (performance.now() >= wheelState.current.lockUntil) return;
      e.preventDefault();
      // Lenis (the host site's smooth scroll) ignores defaultPrevented but
      // honours its own flag; a no-op where Lenis isn't present.
      (e as WheelEvent & { lenisStopPropagation?: boolean }).lenisStopPropagation = true;
    };
    panelEl.addEventListener("wheel", guard, { passive: false });
    return () => panelEl.removeEventListener("wheel", guard);
  }, [chainOn, panelEl]);

  const handleYouClick = () => {
    setSelectedCompany(null);
    setShowFingerprint(true);
  };
  const handleCompanyClick = (key: string) => {
    setShowFingerprint(false);
    setSelectedCompany(key);
    setExpandedEvents(new Set());
  };

  const toggleEventDescription = (eventKey: string) => {
    setExpandedEvents((current) => {
      const next = new Set(current);
      if (next.has(eventKey)) next.delete(eventKey);
      else next.add(eventKey);
      return next;
    });
  };

  const youPanelNode =
    youPanel !== undefined ? youPanel : <FingerprintMirror {...(fingerprint || {})} onClose={() => setShowFingerprint(false)} />;

  return (
    <div className={`rm-root${className ? " " + className : ""}`} style={style}>
      {(title || eyebrow || subtitle) && (
        <div className="rm-header">
          {eyebrow && <span className="rm-eyebrow">{eyebrow}</span>}
          {title && <h2 className="rm-title">{title}</h2>}
          {subtitle && <p className="rm-subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="rm-grid">
        {/* LEFT: THE MATRIX */}
        <div className={`rm-matrix${isEmbargo ? " is-embargo" : ""}`}>
          <div className="rm-matrix-bar">
            <span className="rm-bar-label">
              <span className="rm-live-dot" />
              Select a Vector
            </span>
            <button type="button" onClick={() => setIsEmbargo((v) => !v)} className={`rm-toggle${isEmbargo ? " is-on" : ""}`}>
              <Activity />
              {isEmbargo ? "Submit to US Demands" : "Simulate Sanction"}
            </button>
          </div>

          <div
            className="rm-stage"
            role="group"
            aria-label="Surveillance-network diagram: US intelligence agencies at the center, connected to major US technology companies. Select any node to view its documented incidents."
          >
            <span className="rm-sr-only" aria-live="polite">
              {isEmbargo
                ? "Sanction simulation on: US services shown as blocked and network links severed."
                : "Sanction simulation off."}
            </span>
            <div className="rm-grid-bg" />

            {/* central intel-agency cluster */}
            <div className="rm-agencies">
              {AGENCY_ORDER.map((key, i) => {
                const agency = SCANDALS[key];
                if (!agency) return null;
                const big = i === 1;
                return (
                  <motion.button
                    key={key}
                    type="button"
                    onClick={() => handleCompanyClick(key)}
                    whileHover={{ scale: 1.12, zIndex: 50 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rm-agency-btn ${big ? "lg" : "sm"}`}
                  >
                    <img src={logos[agency.logo]} alt={agency.name} loading="lazy" decoding="async" />
                  </motion.button>
                );
              })}
            </div>

            {/* orbiting tech giants */}
            <div className="rm-nodes">
              <div className="rm-nodes-inner">
                {orbit.map((key, index) => {
                  const pos = getPos(index, orbit.length);
                  const company = SCANDALS[key];
                  if (!company) return null;
                  const isSelected = selectedCompany === key;
                  return (
                    <Fragment key={key}>
                      <svg className="rm-line-svg">
                        <motion.line
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: isEmbargo ? 0.2 : 0.5 }}
                          x1={0}
                          y1={-20}
                          x2={pos.x}
                          y2={pos.y}
                          stroke={isEmbargo ? "var(--rm-muted)" : company.color}
                          strokeWidth={isSelected ? 2.5 : 1}
                          strokeDasharray={isEmbargo ? "5,5" : "none"}
                        />
                        {!isEmbargo && !reduce && (
                          <circle r="2" fill={company.color} opacity="0.6">
                            <animateMotion
                              dur={`${3 + index * 0.5}s`}
                              repeatCount="indefinite"
                              path={`M 0 -20 L ${pos.x} ${pos.y}`}
                              keyPoints="0;1"
                              keyTimes="0;1"
                            />
                          </circle>
                        )}
                      </svg>
                      <motion.button
                        type="button"
                        onClick={() => handleCompanyClick(key)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{ scale: isSelected ? 1.25 : 1 }}
                        className={`rm-node${isSelected ? " is-selected" : ""}`}
                        style={{
                          x: pos.x,
                          y: pos.y,
                          borderColor: isEmbargo ? "var(--rm-muted)" : company.color,
                          filter: isEmbargo ? "grayscale(100%)" : "none",
                        }}
                      >
                        <img src={logos[company.logo]} alt={company.name} loading="lazy" decoding="async" />
                        <span className="rm-node-label">{company.name}</span>
                      </motion.button>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* YOU node + sovereign-perimeter cable */}
          <div className="rm-you-wrap">
            <div className={`rm-cable${isEmbargo ? " is-embargo" : ""}`}>{!isEmbargo && <div className="rm-cable-pulse" />}</div>
            <motion.button
              type="button"
              onClick={handleYouClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`rm-you-btn${isEmbargo ? " is-embargo" : showFingerprint ? " is-active" : ""}`}
            >
              <span className="rm-you-inner">
                {youFlagUrl && <img src={youFlagUrl} alt="" />}
                {isEmbargo ? "SANCTIONED" : youLabel}
              </span>
            </motion.button>
          </div>
        </div>

        {/* RIGHT: INTELLIGENCE PANEL */}
        <div className={`rm-panel${chainOn ? " rm-panel--chain" : ""}`} ref={setPanelEl}>
          <AnimatePresence mode="wait">
            {showFingerprint ? (
              <motion.div
                key="fp"
                className="rm-detail"
                style={{ height: "100%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {youPanelNode}
              </motion.div>
            ) : selectedData ? (
              <motion.div
                key={selectedCompany}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="rm-detail"
              >
                <div className="rm-panel-head">
                  <div className="rm-panel-head-icons">
                    <img src={logos[selectedData.logo]} alt="" decoding="async" />
                    <button type="button" onClick={() => setSelectedCompany(null)} className="rm-close" aria-label="Close">
                      <XCircle />
                    </button>
                  </div>
                  <h3 className="rm-panel-name">{selectedData.name}</h3>
                  <p className="rm-panel-desc" style={{ color: "var(--rm-danger)" }}>
                    {selectedData.description}
                  </p>
                  <div className="rm-panel-badges">
                    <span className="rm-badge rm-badge--danger">
                      <AlertTriangle /> High Risk
                    </span>
                    <span className="rm-badge rm-badge--muted">HQ: USA (FISA 702)</span>
                  </div>
                </div>

                {/* data-lenis-prevent: this panel scrolls independently; without
                    it the host site's Lenis smooth-scroll hijacks the wheel and
                    scrolls the whole page instead of this list. Harmless when no
                    Lenis instance is present (e.g. the WinCommander desktop app). */}
                <div
                  ref={setTimelineEl}
                  className={`rm-timeline${chainOn ? " rm-timeline--chain" : ""}`}
                  data-lenis-prevent
                >
                  <h4 className="rm-timeline-title">Compliance &amp; Risk History</h4>
                  {orderedEvents.map((event, i) => {
                    const eventKey = `${selectedCompany ?? "entity"}-${i}`;
                    const featured = featuredAudience ? event.audiences?.includes(featuredAudience) : false;
                    const expanded = expandedEvents.has(eventKey);
                    const preview = sidebarPreview(event.desc);
                    const canExpand = preview !== event.desc;
                    const money = highlightMoney && hasMoney(event.title, event.desc);

                    return (
                    <div key={eventKey} className={`rm-event${featured ? " is-featured" : ""}`}>
                      <div className="rm-event-top">
                        <span className="rm-event-year">{event.year}</span>
                        {featured && <span className="rm-featured">{featuredAudienceLabel}</span>}
                        {money && (
                          <span className="rm-money-badge">
                            <Banknote aria-hidden="true" /> Money
                          </span>
                        )}
                        <span className={`rm-sev rm-sev--${event.severity.toLowerCase()}`}>{event.severity}</span>
                      </div>
                      <h5 className="rm-event-title">{highlightMoney ? <MoneyText text={event.title} /> : event.title}</h5>
                      <p className="rm-event-desc">
                        {highlightMoney ? <MoneyText text={expanded ? event.desc : preview} /> : expanded ? event.desc : preview}
                      </p>
                      {canExpand && (
                        <button
                          type="button"
                          className="rm-event-more"
                          onClick={() => toggleEventDescription(eventKey)}
                          aria-expanded={expanded}
                        >
                          {expanded ? "Show less" : "Read details"}
                        </button>
                      )}
                      {event.image && editorial[event.image] && (
                        <div className="rm-event-img">
                          <img src={editorial[event.image]} alt={event.title} draggable={false} loading="lazy" decoding="async" />
                        </div>
                      )}
                      {event.sources.length > 0 && (
                        <div className="rm-sources">
                          {event.sources.map((source, si) => (
                            <a key={si} href={source.url} target="_blank" rel="noopener noreferrer" className="rm-source">
                              {source.label} <ExternalLink />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                    );
                  })}
                  {chainOn && nextKey && (
                    <button type="button" className="rm-chain-next-hint" onClick={() => goTo(nextKey)}>
                      <ChevronsDown aria-hidden="true" />
                      Next: {SCANDALS[nextKey].name}
                    </button>
                  )}
                </div>

                {!chainOn && <PanelFoot />}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="rm-panel-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Globe />
                <h3>Select a Vector</h3>
                <p>
                  Click any company, agency, or <strong>{youLabel}</strong> to explore.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Outside the keyed detail block so it doesn't remount on every
              move: keyboard focus stays on Previous/Next between companies. */}
          {chainOn && selectedData && !showFingerprint && (
            <>
              <nav className="rm-chain" aria-label="Browse companies">
                <button
                  type="button"
                  className="rm-chain-btn"
                  onClick={() => goTo(prevKey)}
                  disabled={!prevKey}
                  aria-label={prevKey ? `Previous: ${SCANDALS[prevKey].name}` : "No previous company"}
                >
                  <ChevronLeft aria-hidden="true" />
                  {prevKey && <img src={logos[SCANDALS[prevKey].logo]} alt="" />}
                </button>
                <span className="rm-chain-count" aria-live="polite">
                  {chainIndex >= 0 ? `${chainIndex + 1} / ${chain.length}` : `— / ${chain.length}`}
                </span>
                <button
                  type="button"
                  className="rm-chain-btn"
                  onClick={() => goTo(nextKey)}
                  disabled={!nextKey}
                  aria-label={nextKey ? `Next: ${SCANDALS[nextKey].name}` : "No next company"}
                >
                  {nextKey && <img src={logos[SCANDALS[nextKey].logo]} alt="" />}
                  <ChevronRight aria-hidden="true" />
                </button>
              </nav>
              <PanelFoot />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PanelFoot() {
  return (
    <div className="rm-panel-foot">
      <p>⚠ Data is subject to US laws</p>
    </div>
  );
}
