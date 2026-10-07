"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "ul" | "ol" | "dl" | "article";
};

/** Fades and slides its content up when it scrolls into view. */
export function Reveal({ children, className, delay = 0, as = "div" }: Props) {
  const M = motion[as];
  return (
    <M
      data-reveal
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={item}
      transition={{ delay }}
    >
      {children}
    </M>
  );
}

/** Parent for a group of RevealItem children that appear one after another. */
export function Stagger({ children, className, as = "div", gap = 0.09 }: Props & { gap?: number }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </M>
  );
}

export function RevealItem({ children, className, as = "div" }: Props) {
  const M = motion[as];
  return (
    <M data-reveal className={className} variants={item}>
      {children}
    </M>
  );
}
