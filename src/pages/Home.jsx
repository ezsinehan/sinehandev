import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Typewriter from "typewriter-effect";
import "./Home.css";

const ANNOTATIONS = [
  {
    key: "about",
    targetId: "nav-about",
    label: "sneak peak of me",
    rotation: -3,
    anchorX: "center",
    sourceAnchor: "right",
  },
  {
    key: "projects",
    targetId: "nav-projects",
    label: "things i've worked on",
    rotation: 1,
    anchorX: "center",
  },
  {
    key: "blog",
    targetId: "nav-blog",
    label: "thoughts and notes - ive always wanted a blog",
    rotation: 3,
    anchorX: "right",
  },
  {
    key: "socials",
    targetId: "social-bar",
    label: "my socials!",
    rotation: -2,
    anchorX: "center",
  },
  {
    key: "title",
    targetId: "home-title",
    label:
      "the typewriter is a homage to my portfolio v1, i don't even like it anymore and hopefully you never see it ",
    emojiLink: { emoji: "😉", href: "https://legacy.sinehan.dev" },
    rotation: 2,
    anchorXOffset: 180,
    approachFrom: "southeast",
    small: true,
  },
];

function arrowhead(tx, ty, cpx, cpy) {
  const angle = Math.atan2(ty - cpy, tx - cpx);
  const size = 10;
  const a1x = tx - size * Math.cos(angle - 0.5);
  const a1y = ty - size * Math.sin(angle - 0.5);
  const a2x = tx - size * Math.cos(angle + 0.5);
  const a2y = ty - size * Math.sin(angle + 0.5);
  return `M ${a1x} ${a1y} L ${tx} ${ty} L ${a2x} ${a2y}`;
}

export default function Home() {
  const labelRefs = useRef({});
  const [arrows, setArrows] = useState([]);

  const measure = () => {
    const next = [];
    for (const {
      key,
      targetId,
      anchorX,
      anchorXFraction,
      anchorXOffset,
      approachFrom,
      flipArrow,
      sourceAnchor,
    } of ANNOTATIONS) {
      const labelEl = labelRefs.current[key];
      const targetEl = document.getElementById(targetId);
      if (!labelEl || !targetEl) continue;

      const lr = labelEl.getBoundingClientRect();
      const tr = targetEl.getBoundingClientRect();

      // start from edge of label closest to target
      const lx =
        sourceAnchor === "right"
          ? lr.right + 12
          : sourceAnchor === "left"
            ? lr.left - 12
            : lr.left + lr.width / 2;
      const ly =
        sourceAnchor === "right" || sourceAnchor === "left"
          ? lr.top + lr.height / 2
          : tr.top > lr.top
            ? lr.bottom
            : lr.top;

      // end near target but with padding
      const tx =
        anchorXOffset != null
          ? tr.left + tr.width / 2 + anchorXOffset
          : anchorXFraction != null
            ? tr.left + tr.width * anchorXFraction
            : anchorX === "right"
              ? tr.right + 28
              : tr.left + tr.width / 2;
      const ty =
        anchorX === "right" || anchorX === "left"
          ? tr.top + tr.height / 2 + 2
          : tr.top > lr.top
            ? tr.top - 10
            : tr.bottom + 10;

      // control point: midpoint bowed perpendicular to the line
      let cpx, cpy;
      if (approachFrom === "southeast") {
        const dist = Math.sqrt((tx - lx) ** 2 + (ty - ly) ** 2);
        cpx = tx + dist * 0.25;
        cpy = ty + dist * 0.25;
      } else if (approachFrom === "below") {
        cpx = tx;
        cpy = ty + Math.abs(ly - ty) * 0.6;
      } else {
        const mx = (lx + tx) / 2;
        const my = (ly + ty) / 2;
        const dx = tx - lx;
        const dy = ty - ly;
        const len = Math.sqrt(dx * dx + dy * dy);
        const bow = len * 0.3;
        cpx = mx + (-dy / len) * bow;
        cpy = my + (dx / len) * bow;
      }

      next.push({ key, lx, ly, tx, ty, cpx, cpy, flipArrow });
    }
    setArrows(next);
  };

  useEffect(() => {
    const timer = setTimeout(measure, 250);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="home">
      <motion.div
        id="home-title"
        className="home__title-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="home__title">
          <Typewriter
            options={{
              strings: [
                "hi, i'm sinehan",
                "good day! i'm known as sinehan",
                "greetings, i'm sinehan",
                "howdy, sinehan here",
                "salutations, i'm sinehan",
                "hiya, i'm sinehan",
                "yo, sinehan here",
                "if you didn't know i'm sinehan",
              ],
              delay: 60,
              deleteSpeed: 30,
              pauseFor: 1800,
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
      </motion.div>

      <svg className="home-arrows-svg">
        {arrows.map(({ key, lx, ly, tx, ty, cpx, cpy, flipArrow }, i) => (
          <motion.g
            key={key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.55 + i * 0.12 }}
          >
            <path
              d={`M ${lx} ${ly} Q ${cpx} ${cpy} ${tx} ${ty}`}
              fill="none"
              stroke="#b8ad9e"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d={
                flipArrow
                  ? arrowhead(lx, ly, cpx, cpy)
                  : arrowhead(tx, ty, cpx, cpy)
              }
              fill="none"
              stroke="#b8ad9e"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>
        ))}
      </svg>

      {ANNOTATIONS.map(({ key, label, rotation, small, emojiLink }, i) => (
        <motion.span
          key={key}
          ref={(el) => (labelRefs.current[key] = el)}
          className={`home-label home-label--${key}${small ? " home-label--small" : ""}`}
          style={{ transform: `rotate(${rotation}deg)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 + i * 0.12 }}
        >
          {label}
          {emojiLink && (
            <a
              href={emojiLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="home-label__emoji-link"
            >
              {emojiLink.emoji}
            </a>
          )}
        </motion.span>
      ))}
    </div>
  );
}
