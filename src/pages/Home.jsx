import { useEffect, useRef, useState } from "react";
import { motion as Motion } from "motion/react";
import Typewriter from "typewriter-effect";
import "./Home.css";

const ANNOTATIONS = [
  {
    key: "about",
    targetId: "nav-about",
    label: "sneak peak of me",
    rotation: -3,
    from: "right",   // arrow starts from right edge of label
    to: "bottom",    // arrow points into bottom of nav item
    bow: [200, 0],   // curve right
  },
  {
    key: "projects",
    targetId: "nav-projects",
    label: "things i've worked on",
    rotation: 1,
    from: "top",
    to: "bottom",
    bow: [30, 0],
  },
  {
    key: "chat",
    targetId: "nav-chat",
    label: "ask me anything",
    rotation: 3,
    from: "left",
    to: "bottom",
    bow: [40, 0],
  },
  {
    key: "blog",
    targetId: "nav-blog",
    label: "thoughts and notes - ive always wanted a blog",
    rotation: -2,
    from: "top",
    to: "bottom",
    bow: [-200, 30],
  },
  {
    key: "socials",
    targetId: "social-bar",
    label: "my socials!",
    rotation: -2,
    from: "bottom",
    to: "top",
    bow: [-30, 0],
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
    const PAD = 10; // gap between element edge and arrow endpoint
    const next = [];

    for (const { key, targetId, from, to, bow } of ANNOTATIONS) {
      const labelEl = labelRefs.current[key];
      const targetEl = document.getElementById(targetId);
      if (!labelEl || !targetEl) continue;

      const lr = labelEl.getBoundingClientRect();
      const tr = targetEl.getBoundingClientRect();

      // arrow start: edge of label
      let lx, ly;
      if (from === "right")       { lx = lr.right + PAD; ly = lr.top + lr.height / 2; }
      else if (from === "left")   { lx = lr.left - PAD;  ly = lr.top + lr.height / 2; }
      else if (from === "top")    { lx = lr.left + lr.width / 2; ly = lr.top - PAD; }
      else /* bottom */           { lx = lr.left + lr.width / 2; ly = lr.bottom + PAD; }

      // arrow end: edge of target
      let tx, ty;
      if (to === "bottom")        { tx = tr.left + tr.width / 2; ty = tr.bottom + PAD; }
      else if (to === "top")      { tx = tr.left + tr.width / 2; ty = tr.top - PAD; }
      else if (to === "right")    { tx = tr.right + PAD; ty = tr.top + tr.height / 2; }
      else /* left */             { tx = tr.left - PAD;  ty = tr.top + tr.height / 2; }

      // control point: midpoint + explicit bow offset
      const cpx = (lx + tx) / 2 + (bow?.[0] ?? 0);
      const cpy = (ly + ty) / 2 + (bow?.[1] ?? 0);

      next.push({ key, lx, ly, tx, ty, cpx, cpy });
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
      <Motion.div
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
      </Motion.div>

      <svg className="home-arrows-svg">
        {arrows.map(({ key, lx, ly, tx, ty, cpx, cpy }, i) => (
          <Motion.g
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
              d={arrowhead(tx, ty, cpx, cpy)}
              fill="none"
              stroke="#b8ad9e"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Motion.g>
        ))}
      </svg>

      {ANNOTATIONS.map(({ key, label, rotation, emojiLink }, i) => (
        <Motion.span
          key={key}
          ref={(el) => (labelRefs.current[key] = el)}
          className={`home-label home-label--${key}`}
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
        </Motion.span>
      ))}
    </div>
  );
}
