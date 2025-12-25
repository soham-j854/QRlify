import { Smartphone, Download, Palette, Lock, Zap, Globe } from "lucide-react";
import GlassCard from "./GlassCard";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Create QR codes in milliseconds with our lightning-fast generator.",
  },
  {
    icon: Download,
    title: "High-Quality Export",
    description: "Download your QR codes in high resolution PNG format for any use case.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Perfectly responsive design that works flawlessly on any device.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your data never leaves your browser. Complete privacy guaranteed.",
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description: "Apple's liquid glass aesthetic for a premium, modern experience.",
  },
  {
    icon: Globe,
    title: "Universal Support",
    description: "Works with URLs, text, phone numbers, emails, and more.",
  },
];

const Features = () => {
  return (
    <section id="features" className="relative z-10 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Why Choose QRify?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Built with love and attention to detail for the best QR generation experience.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal 
              key={feature.title} 
              delay={0.1 * index}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <GlassCard>
                <div className="flex flex-col items-start">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 
                                flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
