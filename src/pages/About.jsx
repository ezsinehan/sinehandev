import { useEffect, useRef, useState } from "react";
import { motion as Motion } from "motion/react";
import "./About.css";

const SECTIONS = [
  { id: "intro", label: "intro" },
  { id: "currently", label: "currently" },
  { id: "experience", label: "experience" },
  { id: "contact", label: "contact" },
];

const EXPERIENCE = [
  {
    role: "AI Engineering Intern",
    company: "OMRON Robotics",
    type: "Internship",
    period: "Aug 2025 – Dec 2025",
    duration: "5 mos",
    location: "Pleasanton, CA · Remote",
    description: "developed internal tooling, data workflows, and system-level engineering tasks",
    logo: "/omron-logo.png",
  },
  {
    role: "Software Engineering Intern",
    company: "Milano Technical Group",
    type: "Internship",
    period: "Jun 2025 – Aug 2025",
    duration: "3 mos",
    location: "Merced, CA · On-site",
    description: "automated motion control, optimized workflows, supported integration and assembly",
    logo: "/milano-logo.png",
  },
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
          <p className="about-text">
            engineer with a software focus. bs in computer science & engineering.
            passionate about performance & results.
          </p>
          {/* TODO: expand this section — currently pulled from LinkedIn bio, needs work */}
          <p className="about-text" style={{ color: '#c9c0b2', fontSize: '0.8rem' }}>
            — via linkedin
          </p>
        </section>

        <section id="currently" className="about-section">
          <h2 className="about-subheading">currently</h2>
          <p className="about-text">
            currently building Sinehan LLM, a RAG-based system that indexes my experience and
            projects so visitors can ask questions about my background. the model is being
            developed to run on my local GPU and power an interactive assistant on this site.
          </p>
          <hr className="about-divider" />
          <p className="about-text">
            also experimenting with a Rust-based internal combustion engine simulation as a
            personal project. the goal is to explore engine physics while deepening my
            understanding of Rust through building the model from scratch.
          </p>
        </section>

        <section id="experience" className="about-section">
          <h2 className="about-subheading">experience</h2>
          <ul className="exp-list">
            {EXPERIENCE.map((job) => (
              <li key={job.role + job.company} className="exp-entry">
                <div className="exp-header">
                  {job.logo && (
                    <img src={job.logo} alt={job.company} className="exp-logo" />
                  )}
                  <div className="exp-header__text">
                    <div className="exp-role">{job.role}</div>
                    <div className="exp-meta">{job.company} · {job.type}</div>
                    <div className="exp-meta">{job.period} · {job.duration}</div>
                    <div className="exp-meta exp-meta--location">{job.location}</div>
                  </div>
                </div>
                <p className="exp-description">{job.description}</p>
              </li>
            ))}
          </ul>
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
