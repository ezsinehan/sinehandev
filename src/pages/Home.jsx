import { useEffect, useRef, useState } from "react";
import { motion as Motion } from "motion/react";
import Typewriter from "typewriter-effect";
import "./Home.css";

const VISITED_KEY = "sinehan-visited";

const NAME = '<span class="rainbow">sinehan</span>';

const GREETINGS = [
  `good day! i'm known as ${NAME}`,
  `greetings, i'm ${NAME}`,
  `howdy, ${NAME} here`,
  `salutations, i'm ${NAME}`,
  `hiya, i'm ${NAME}`,
  `yo, ${NAME} here`,
  `if you didn't know i'm ${NAME}`,
];

const FIRST_GREETING = `hi, i'm ${NAME}`;

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
  const [greeting] = useState(() => {
    if (typeof window === "undefined") return FIRST_GREETING;
    const visited = window.localStorage.getItem(VISITED_KEY);
    if (!visited) return FIRST_GREETING;
    return GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
  });

  const labelRef = useRef(null);
  const [arrow, setArrow] = useState(null);

  useEffect(() => {
    window.localStorage.setItem(VISITED_KEY, "1");
  }, []);

  useEffect(() => {
    const measure = () => {
      const labelEl = labelRef.current;
      const targetEl = document.getElementById("social-bar");
      if (!labelEl || !targetEl) {
        setArrow(null);
        return;
      }

      const lr = labelEl.getBoundingClientRect();
      const tr = targetEl.getBoundingClientRect();
      const PAD = 8;

      const lx = lr.left + lr.width / 2;
      const ly = lr.bottom + PAD;
      const tx = tr.left + tr.width / 2;
      const ty = tr.top - PAD;

      const cpx = (lx + tx) / 2 - 30;
      const cpy = (ly + ty) / 2;

      setArrow({ lx, ly, tx, ty, cpx, cpy });
    };

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
              delay: 60,
            }}
            onInit={(typewriter) => {
              typewriter.typeString(greeting).start();
            }}
          />
        </h1>
      </Motion.div>

      <Motion.div
        className="construction"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="construction__tape" />
        <p className="construction__text">
          <span className="rainbow">under construction</span>
        </p>
        <div className="construction__tape" />
      </Motion.div>

      <Motion.span
        ref={labelRef}
        className="home-label home-label--socials"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        my socials!
      </Motion.span>

      <svg className="home-arrows-svg" aria-hidden="true">
        {arrow && (
          <Motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <path
              d={`M ${arrow.lx} ${arrow.ly} Q ${arrow.cpx} ${arrow.cpy} ${arrow.tx} ${arrow.ty}`}
              fill="none"
              stroke="#b8ad9e"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d={arrowhead(arrow.tx, arrow.ty, arrow.cpx, arrow.cpy)}
              fill="none"
              stroke="#b8ad9e"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Motion.g>
        )}
      </svg>
    </div>
  );
}
