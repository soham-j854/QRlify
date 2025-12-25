import { motion } from "framer-motion";
import { ArrowDown, Zap, Shield, Palette } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Hero = () => {
  return (
    <section className="relative z-10 py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-muted-foreground">Free & Beautiful QR Codes</span>
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Create</span>{" "}
            <span className="text-gradient">Stunning</span>
            <br />
            <span className="text-foreground">QR Codes</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Transform any link or text into a beautiful, scannable QR code in seconds. 
            Designed with Apple's liquid glass aesthetic for a premium experience.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {[
              { icon: Zap, label: "Instant Generation" },
              { icon: Shield, label: "Privacy First" },
              { icon: Palette, label: "Beautiful Design" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="glass-panel px-5 py-3 rounded-2xl flex items-center gap-3"
              >
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <motion.a
            href="#generator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex w-12 h-12 rounded-full glass-panel items-center justify-center
                     hover:bg-primary/10 transition-colors cursor-pointer"
          >
            <ArrowDown className="w-5 h-5 text-muted-foreground" />
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Hero;
