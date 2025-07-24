"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedHeaderProps {
  children: ReactNode;
}

const AnimatedHeader = ({ children }: AnimatedHeaderProps) => {
  return (
    <motion.header
      className="bg-figma-alizarin-crimson sticky top-0 z-[101] w-full text-white shadow-lg"
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {children}
    </motion.header>
  );
};

export default AnimatedHeader;
