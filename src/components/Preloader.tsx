"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/* Hand-picked hero shots for the slideshow — visually varied, high impact */
const SLIDES = [
  { src: "/_DSC3547.jpg.jpeg",           pos: "center 40%" },
  { src: "/fox.jpg",                      pos: "center 50%" },
  { src: "/1729262756010.jpg.jpeg",       pos: "center 55%" },
  { src: "/_ARG7935_ed.jpg.jpeg",         pos: "center 45%" },
  { src: "/SAVE_20230915_185529.jpg",     pos: "center 50%" },
];

const TOTAL_MS  = 3200;   // total preloader duration
const SLIDE_MS  = TOTAL_MS / SLIDES.length; // time each slide is "active"

export default function Preloader() {
  const [progress, setProgress]   = useState(0);
  const [slideIdx, setSlideIdx]   = useState(0);
  const [visible,  setVisible]    = useState(true);

  /* ── Progress counter ── */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / TOTAL_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.floor(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = "";
        }, 420);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); document.body.style.overflow = ""; };
  }, []);

  /* ── Slide cycling ── */
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      setSlideIdx(i => (i + 1) % SLIDES.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(28px)", scale: 1.08 }}
          transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* ── Photo slideshow ── */}
          <div className="preloader__slides">
            <AnimatePresence mode="sync">
              <motion.div
                key={slideIdx}
                className="preloader__slide"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1,  scale: 1.0 }}
                exit={{    opacity: 0,  scale: 0.97 }}
                transition={{ duration: 1.1, ease }}
              >
                <Image
                  src={SLIDES[slideIdx].src}
                  alt=""
                  fill
                  priority={slideIdx === 0}
                  className="preloader__slide-img"
                  style={{ objectPosition: SLIDES[slideIdx].pos }}
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Layered overlays ── */}
          <div className="preloader__overlay preloader__overlay--dark"   aria-hidden />
          <div className="preloader__overlay preloader__overlay--vignette" aria-hidden />
          <div className="preloader__overlay preloader__overlay--bottom"  aria-hidden />

          {/* ── Central identity ── */}
          <div className="preloader__center">
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
              transition={{ delay: 0.25, duration: 1.2, ease }}
              className="preloader__logo-wrap"
            >
              <Image
                src="/logo main.png"
                alt="Arghyadeep Midya"
                width={140}
                height={105}
                className="preloader__logo"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.9, ease }}
              className="preloader__rule"
              style={{ originX: 0.5 }}
            />

            <motion.p
              className="preloader__subtitle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8, ease }}
            >
              Wildlife photographer &amp; naturalist
            </motion.p>
          </div>

          {/* ── Slide dots ── */}
          <motion.div
            className="preloader__dots"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {SLIDES.map((_, i) => (
              <span
                key={i}
                className={`preloader__dot${i === slideIdx ? " preloader__dot--active" : ""}`}
              />
            ))}
          </motion.div>

          {/* ── Bottom bar: counter + progress ── */}
          <div className="preloader__bottom">
            <motion.span
              className="preloader__status"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease }}
            >
              Loading
            </motion.span>

            <motion.span
              className="preloader__counter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              {String(progress).padStart(2, "0")}
              <span className="preloader__counter-pct">%</span>
            </motion.span>
          </div>

          {/* ── Thin progress bar ── */}
          <motion.div
            className="preloader__bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ ease: "linear", duration: 0.12 }}
            style={{ originX: 0 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
