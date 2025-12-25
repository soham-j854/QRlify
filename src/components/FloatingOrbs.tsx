import { motion } from "framer-motion";

const FloatingOrbs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Large purple orb */}
      <motion.div
        className="floating-orb w-[700px] h-[700px] -top-64 -left-64"
        style={{ background: "radial-gradient(circle, hsl(270 95% 50% / 0.3) 0%, transparent 70%)" }}
        animate={{
          x: [0, 80, -50, 0],
          y: [0, -50, 80, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Cyan accent orb */}
      <motion.div
        className="floating-orb w-[500px] h-[500px] top-1/4 -right-48"
        style={{ background: "radial-gradient(circle, hsl(180 70% 50% / 0.25) 0%, transparent 70%)" }}
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 60, -30, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      
      {/* Pink/magenta orb */}
      <motion.div
        className="floating-orb w-[600px] h-[600px] -bottom-48 left-1/3"
        style={{ background: "radial-gradient(circle, hsl(330 85% 55% / 0.2) 0%, transparent 70%)" }}
        animate={{
          x: [0, 50, -70, 0],
          y: [0, -70, 50, 0],
          scale: [1, 1.1, 0.85, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
      
      {/* Small bright accent orb */}
      <motion.div
        className="floating-orb w-[350px] h-[350px] top-32 left-1/2"
        style={{ background: "radial-gradient(circle, hsl(200 95% 60% / 0.2) 0%, transparent 70%)" }}
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 40, -60, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Extra small floating accent */}
      <motion.div
        className="floating-orb w-[200px] h-[200px] bottom-1/3 right-1/4"
        style={{ background: "radial-gradient(circle, hsl(270 95% 70% / 0.25) 0%, transparent 70%)" }}
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.2, 0.95, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
};

export default FloatingOrbs;
