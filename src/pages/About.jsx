import { useEffect, useRef, useState } from "react";
import { motion as Motion } from "motion/react";
import "./About.css";

const SECTIONS = [
  { id: "intro", label: "intro" },
  { id: "currently", label: "currently" },
  { id: "contact", label: "contact" },
];

export default function About() {
  const [activeId, setActiveId] = useState("intro");
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const scrollTimerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (isAutoScrolling) return;
      let closest = SECTIONS[0].id;
      let closestDist = Infinity;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const dist = Math.abs(el.getBoundingClientRect().top - 200);
        if (dist < closestDist) {
          closestDist = dist;
          closest = id;
        }
      }
      setActiveId(closest);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isAutoScrolling]);

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveId(id);
    setIsAutoScrolling(true);
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }
    const top = el.getBoundingClientRect().top + window.scrollY - 200;
    window.scrollTo({ top, behavior: "smooth" });
    scrollTimerRef.current = setTimeout(() => {
      setIsAutoScrolling(false);
      scrollTimerRef.current = null;
    }, 800);
  };

  return (
    <div className="about-layout">
      <nav className="about-toc" aria-label="Page sections">
        {SECTIONS.map(({ id, label }, i) => (
          <Motion.button
            key={label}
            className={`about-toc__item${activeId === id ? " about-toc__item--active" : ""}`}
            onClick={() => scrollTo(id)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.5 + i * 0.12 }}
          >
            {label}
          </Motion.button>
        ))}
      </nav>

      <Motion.div
        className="about-page"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <section id="intro">
          <h1 className="about-heading">
            if you didn't know already i'm sinehan
          </h1>
          <p className="about-text">blah blah blah</p>
          <p className="about-text">blah blah blah</p>
        </section>

        <section id="currently" className="about-section">
          <h2 className="about-subheading">currently</h2>
          <p className="about-text">blah blah blah</p>
        </section>

        <section id="contact" className="about-section">
          <h2 className="about-subheading">contact</h2>
          <p className="about-text">
            Interested in working together? Feel free to reach out:
          </p>
          <ul className="about-contact-list">
            <li>
              <a href="mailto:ezsinehan@gmail.com">ezsinehan@gmail.com</a>
            </li>
            <li>
              <a
                href="https://github.com/ezsinehan"
                target="_blank"
                rel="noopener noreferrer"
              >
                github
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/sinehanezhilmuthu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin
              </a>
            </li>
          </ul>
        </section>
      </Motion.div>
    </div>
  );
}
