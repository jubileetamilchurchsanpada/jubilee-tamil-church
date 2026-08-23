import React from "react";
import { motion } from "framer-motion";

export default function SectionTitle({ eyebrow, title, text, light = false, align = "center" }) {
  return (
    <motion.div
      className={`section-title ${light ? "light" : ""} ${align}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65 }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </motion.div>
  );
}
