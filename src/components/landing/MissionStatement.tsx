"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * What SAIN is for, said once, before the landing starts offering doors.
 *
 * The problem, then SAIN's answer to it. The problem is the skill gap in
 * docs/theory_of_change.md ("Too few people have the knowledge to work on AI
 * safety, in research, policy, industry, or public discourse"); the answer's
 * three verbs carry the emphasis in the statement's own serif, semibold and
 * orange, and they ink in from faint in turn as the sentence comes into view.
 * Once, on intersection, not on scroll position. They used to be led by a
 * glyph each and underlined in orange as well, which was three devices where
 * one does the work, and the underline is reserved for links. The words are
 * bold from the first paint so nothing reflows, and the rest state is
 * readable (faint, never hidden) for anyone the animation never reaches.
 * Reduced motion shows the end state. Set on the navy mission band, so the
 * rest is white.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

function Verb({ step, children }: { step: number; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.strong
      className="font-semibold text-orange"
      initial={reduce ? false : { opacity: 0.28 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, delay: 0.35 + step * 0.35, ease: EASE }}
    >
      {children}
    </motion.strong>
  );
}

export default function MissionStatement() {
  return (
    /* Set above the heading role on purpose: this is the landing's one
       statement band, and it has to carry the band on its own. */
    <p className="mx-auto max-w-[1000px] text-balance text-center font-serif text-[clamp(1.75rem,1.6vw+1.35rem,2.625rem)] leading-[1.3] tracking-[-0.018em] text-white">
      <span className="text-white/50">
        Too few people know how to work on AI safety, in research, in policy, or
        in public debate.
      </span>{" "}
      SAIN <Verb step={0}>trains</Verb> more of them,{" "}
      <Verb step={1}>connects</Verb> them, and gets them{" "}
      <Verb step={2}>started</Verb>.
    </p>
  );
}
