import { useState, useRef, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Sparkles, Copy, Check, Settings2 } from "lucide-react";
import GlassCard from "./GlassCard";
import QRTypeSelector, { QRType } from "./QRTypeSelector";
import QRTypeInputs, { generateQRValue } from "./QRTypeInputs";
import QRCustomization, { QRCustomOptions } from "./QRCustomization";
import KeyboardShortcuts from "./KeyboardShortcuts";
import ScrollReveal from "./ScrollReveal";

const QRGenerator = () => {
  const [qrType, setQrType] = useState<QRType>("url");
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [qrValue, setQrValue] = useState("");
  const [copied, setCopied] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [customOptions, setCustomOptions] = useState<QRCustomOptions>({
    fgColor: "#0a0a0a",
    bgColor: "#ffffff",
    cornerStyle: "square",
    logo: null,
  });
  const qrRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (key: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [key]: value }));
  };

  const canGenerate = Object.values(inputValues).some((v) => v.trim());

  const generateQR = useCallback(() => {
    const value = generateQRValue(qrType, inputValues);
    if (value.trim()) {
      setQrValue(value);
    }
  }, [qrType, inputValues]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generateQR();
    }
  };

  const downloadQR = useCallback(() => {
    if (!qrRef.current) return;
    
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = 1024;
      canvas.height = 1024;
      if (ctx) {
        if (customOptions.bgColor === "transparent") {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
          ctx.fillStyle = customOptions.bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const link = document.createElement("a");
        link.download = "qrcode.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  }, [customOptions.bgColor]);

  const copyToClipboard = async () => {
    if (qrValue) {
      await navigator.clipboard.writeText(qrValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTypeChange = (type: QRType) => {
    setQrType(type);
    setInputValues({});
    setQrValue("");
  };

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Create Your QR Code
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Choose a type and enter your content to generate a beautiful QR code
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Input Section */}
          <ScrollReveal delay={0.1} direction="left">
            <GlassCard hover={false}>
              <div className="space-y-4" onKeyPress={handleKeyPress}>
                <QRTypeSelector 
                  selectedType={qrType} 
                  onSelectType={handleTypeChange} 
                />
                
                <QRTypeInputs
                  type={qrType}
                  values={inputValues}
                  onChange={handleInputChange}
                />

                <motion.button
                  onClick={() => setShowCustomization(!showCustomization)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Settings2 className="w-4 h-4" />
                  {showCustomization ? "Hide" : "Show"} customization
                </motion.button>

                <AnimatePresence>
                  {showCustomization && (
                    <QRCustomization
                      options={customOptions}
                      onChange={setCustomOptions}
                    />
                  )}
                </AnimatePresence>

                <motion.button
                  onClick={generateQR}
                  disabled={!canGenerate}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 rounded-2xl font-medium text-primary-foreground
                           bg-gradient-to-r from-primary to-accent shimmer-button
                           shadow-lg shadow-primary/25 transition-all duration-300
                           hover:shadow-xl hover:shadow-primary/30
                           disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Generate QR Code
                  <span className="hidden sm:inline text-xs opacity-70 ml-2">⌘↵</span>
                </motion.button>
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* QR Display Section */}
          <ScrollReveal delay={0.2} direction="right">
            <GlassCard hover={false} className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {qrValue ? (
                  <motion.div
                    key="qr"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center gap-6"
                  >
                    <div
                      ref={qrRef}
                      className="p-6 rounded-2xl shadow-lg relative"
                      style={{ backgroundColor: customOptions.bgColor === "transparent" ? "white" : customOptions.bgColor }}
                    >
                      <QRCodeSVG
                        value={qrValue}
                        size={180}
                        level="H"
                        includeMargin={false}
                        fgColor={customOptions.fgColor}
                        bgColor={customOptions.bgColor === "transparent" ? "transparent" : customOptions.bgColor}
                        imageSettings={customOptions.logo ? {
                          src: customOptions.logo,
                          height: 40,
                          width: 40,
                          excavate: true,
                        } : undefined}
                      />
                    </div>

                    <div className="flex gap-3 w-full">
                      <motion.button
                        onClick={downloadQR}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 glass-button flex items-center justify-center gap-2
                                 text-foreground hover:bg-primary/10"
                      >
                        <Download className="w-4 h-4" />
                        Download
                        <span className="hidden sm:inline text-xs opacity-50">⌘S</span>
                      </motion.button>
                      
                      <motion.button
                        onClick={copyToClipboard}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 glass-button flex items-center justify-center gap-2
                                 text-foreground hover:bg-accent/10"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-accent" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full min-h-[350px] text-center"
                  >
                    <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-muted-foreground/30 
                                  flex items-center justify-center mb-4">
                      <div className="grid grid-cols-3 gap-1">
                        {[...Array(9)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0.2 }}
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                            className="w-3 h-3 rounded-sm bg-muted-foreground/30"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Your QR code will appear here
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-2">
                      Press ⌘ + Enter to generate
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>

      <KeyboardShortcuts
        onGenerate={generateQR}
        onDownload={downloadQR}
        canGenerate={canGenerate}
        canDownload={!!qrValue}
      />
    </section>
  );
};

export default QRGenerator;
