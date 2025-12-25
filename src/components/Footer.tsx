import { motion } from "framer-motion";
import { QrCode, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative z-10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-3xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent 
                            flex items-center justify-center">
                <QrCode className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">QRify</span>
            </div>

            <p className="text-muted-foreground flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> for beautiful QR codes
            </p>

            <p className="text-sm text-muted-foreground">
              © 2024 QRify. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
