import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

const GlassCard = ({ children, className, delay = 0, hover = true }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={hover ? { scale: 1.02, y: -5 } : undefined}
      className={cn(
        "glass-panel rounded-3xl p-8 transition-all duration-500",
        hover && "hover:shadow-glass-lg cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
