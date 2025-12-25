import { motion } from "framer-motion";
import { Palette, Upload, X } from "lucide-react";
import { useRef } from "react";

export interface QRCustomOptions {
  fgColor: string;
  bgColor: string;
  logo: string | null;
}

interface QRCustomizationProps {
  options: QRCustomOptions;
  onChange: (options: QRCustomOptions) => void;
}

const presetColors = [
  "#0a0a0a", // Black
  "#1e40af", // Blue
  "#7c3aed", // Purple
  "#059669", // Green
  "#dc2626", // Red
  "#ea580c", // Orange
  "#0891b2", // Cyan
  "#be185d", // Pink
];

const QRCustomization = ({ options, onChange }: QRCustomizationProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({ ...options, logo: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    onChange({ ...options, logo: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="space-y-5 pt-4 border-t border-border/30"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Palette className="w-4 h-4 text-primary" />
        Customize
      </div>

      {/* Foreground Color */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">QR Color</label>
        <div className="flex items-center gap-2 flex-wrap">
          {presetColors.map((color) => (
            <motion.button
              key={color}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onChange({ ...options, fgColor: color })}
              className={`w-7 h-7 rounded-lg transition-all ${options.fgColor === color
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                : ""
                }`}
              style={{ backgroundColor: color }}
            />
          ))}
          <input
            type="color"
            value={options.fgColor}
            onChange={(e) => onChange({ ...options, fgColor: e.target.value })}
            className="w-7 h-7 rounded-lg cursor-pointer bg-transparent"
          />
        </div>
      </div>

      {/* Background Color */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Background</label>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange({ ...options, bgColor: "#ffffff" })}
            className={`w-7 h-7 rounded-lg border border-border bg-white ${options.bgColor === "#ffffff"
              ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
              : ""
              }`}
          />
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange({ ...options, bgColor: "transparent" })}
            className={`w-7 h-7 rounded-lg border border-border bg-[repeating-conic-gradient(#ccc_0_90deg,#fff_0_180deg)_0_0/8px_8px] ${options.bgColor === "transparent"
              ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
              : ""
              }`}
          />
          <input
            type="color"
            value={options.bgColor === "transparent" ? "#ffffff" : options.bgColor}
            onChange={(e) => onChange({ ...options, bgColor: e.target.value })}
            className="w-7 h-7 rounded-lg cursor-pointer bg-transparent"
          />
        </div>
      </div>



      {/* Logo Upload */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Center Logo</label>
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel text-sm text-muted-foreground hover:text-foreground"
          >
            <Upload className="w-4 h-4" />
            Upload Logo
          </motion.button>
          {options.logo && (
            <div className="relative">
              <img
                src={options.logo}
                alt="Logo preview"
                className="w-10 h-10 rounded-lg object-cover"
              />
              <button
                onClick={removeLogo}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default QRCustomization;
