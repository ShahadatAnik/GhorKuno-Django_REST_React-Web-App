import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    // x: "-100vw",
    y: "-100vh",
    scale: 0.8,
  },
  in: {
    opacity: 1,
    y: 0,
    // x: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: "100vh",
    // x: "100vw",
    scale: 5,
  },
};

const pageTransition = {
  type: "spring",
  ease: "anticipate",
  duration: 3,
  transition: "linear",
  stiffness: 50,
};

const animations = {
  initial: { opacity: 0, x: 100, scale: 1 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -100, scale: 1 },
};

const Animation = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default Animation;
