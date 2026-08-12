'use client';

import { useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { PERSONAL } from '@/data';
import { EASE_OUT, m } from './motion';

const START = 1.05;

function useTypedRole(roles: string[]) {
  const [text, setText] = useState('');

  useEffect(() => {
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = roles[roleIdx];
      charIdx += deleting ? -1 : 1;
      setText(current.slice(0, charIdx));

      if (!deleting && charIdx === current.length) {
        deleting = true;
        timer = setTimeout(tick, 1900);
      } else if (deleting && charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        timer = setTimeout(tick, 320);
      } else {
        timer = setTimeout(tick, deleting ? 38 : 72);
      }
    };

    timer = setTimeout(tick, START * 1000 + 900);
    return () => clearTimeout(timer);
  }, [roles]);

  return text;
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const role = useTypedRole(PERSONAL.roles);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  /* The whole hero recedes into the floor as you leave it. */
  const coreY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const coreScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const coreOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const floorRotate = useTransform(scrollYProgress, [0, 1], [70, 84]);
  const floorY = useTransform(scrollYProgress, [0, 1], ['0%', '-38%']);
  const floorOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15]);

  return (
    <section id="hero" ref={ref}>
      <m.div className="hero-floor" style={{ y: floorY, opacity: floorOpacity }} aria-hidden="true">
        <m.div
          className="hero-floor-grid"
          style={{ rotateX: floorRotate, transformPerspective: 620 }}
        />
      </m.div>

      <m.div className="hero-core" style={{ y: coreY, scale: coreScale, opacity: coreOpacity }}>
        <m.div
          className="hero-status"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: START, ease: EASE_OUT }}
        >
          <span className="hero-status-dot" />
          Available for opportunities · {PERSONAL.location}
        </m.div>

        <h1 className="hero-name">
          {['MUHAMMAD', 'SULEMAN'].map((word, i) => (
            <span className="hero-line" key={word}>
              <m.span
                className="hero-word"
                initial={{ y: '108%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: START + 0.1 + i * 0.11, ease: EASE_OUT }}
              >
                {word}
              </m.span>
            </span>
          ))}
        </h1>

        <m.div
          className="hero-typed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: START + 0.55 }}
        >
          <span className="hero-typed-prefix">$</span>
          <span className="hero-typed-text">{role}</span>
        </m.div>

        <m.div
          className="hero-meta"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: START + 0.65, ease: EASE_OUT }}
        >
          <div className="hero-meta-cell">
            <span>Currently</span>
            <b>Software Engineer @ Codbeyon</b>
          </div>
          <div className="hero-meta-cell">
            <span>Building with</span>
            <b>React · Next.js · Golang</b>
          </div>
          <div className="hero-meta-cell">
            <span>Shipping since</span>
            <b>2023</b>
          </div>
        </m.div>

        <m.div
          className="hero-cta"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: START + 0.78, ease: EASE_OUT }}
        >
          <m.a href="#work" className="btn-primary" whileHover={{ y: -3 }} whileTap={{ y: 0 }}>
            <span>See the work</span>
            <span>→</span>
          </m.a>
          <m.a href="#contact" className="btn-secondary" whileHover={{ y: -3 }} whileTap={{ y: 0 }}>
            Get in touch
          </m.a>
        </m.div>
      </m.div>

      <m.div className="hero-foot" style={{ opacity: coreOpacity }}>
        <m.div
          className="hero-foot-inner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: START + 1 }}
        >
          <span className="hero-foot-rule" />
          <span>Scroll</span>
        </m.div>
      </m.div>
    </section>
  );
}
