import { motion } from "framer-motion";
import { QrCode } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 py-6 px-4"
    >
      <nav className="max-w-6xl mx-auto">
        <div className="glass-panel rounded-2xl px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent 
                          flex items-center justify-center shadow-lg shadow-primary/30">
              <QrCode className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">QRify</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#generator" className="text-muted-foreground hover:text-foreground transition-colors">
              Generator
            </a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <motion.a
              href="#generator"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-button text-sm text-foreground"
            >
              Get Started
            </motion.a>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
