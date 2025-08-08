"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HamburgerButtonProps } from "@/types/navigation";
import { Menu, X } from "lucide-react";

const HamburgerButton = ({ isMenuOpen, onToggle }: HamburgerButtonProps) => {
  return (
    <motion.button
      onClick={onToggle}
      className="cursor-pointer rounded-md p-2 transition-colors duration-200"
      whileHover={{ scale: 1.1 }}
    >
      <AnimatePresence mode="wait">
        {isMenuOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="h-6 w-6" />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Menu className="h-6 w-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default HamburgerButton;
