import { QRType } from "./QRTypeSelector";

interface QRTypeInputsProps {
  type: QRType;
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

const QRTypeInputs = ({ type, values, onChange }: QRTypeInputsProps) => {
  const inputClass = "glass-input text-foreground bg-background/50 mb-3";

  switch (type) {
    case "url":
      return (
        <input
          type="text"
          value={values.url || ""}
          onChange={(e) => onChange("url", e.target.value)}
          placeholder="https://example.com or any text..."
          className={inputClass}
        />
      );
    
    case "wifi":
      return (
        <div className="space-y-3">
          <input
            type="text"
            value={values.ssid || ""}
            onChange={(e) => onChange("ssid", e.target.value)}
            placeholder="Network Name (SSID)"
            className={inputClass}
          />
          <input
            type="password"
            value={values.password || ""}
            onChange={(e) => onChange("password", e.target.value)}
            placeholder="Password"
            className={inputClass}
          />
          <select
            value={values.encryption || "WPA"}
            onChange={(e) => onChange("encryption", e.target.value)}
            className={inputClass}
          >
            <option value="WPA">WPA/WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">No Password</option>
          </select>
        </div>
      );
    
    case "vcard":
      return (
        <div className="space-y-3">
          <input
            type="text"
            value={values.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Full Name"
            className={inputClass}
          />
          <input
            type="tel"
            value={values.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="Phone Number"
            className={inputClass}
          />
          <input
            type="email"
            value={values.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="Email Address"
            className={inputClass}
          />
          <input
            type="text"
            value={values.company || ""}
            onChange={(e) => onChange("company", e.target.value)}
            placeholder="Company (optional)"
            className={inputClass}
          />
        </div>
      );
    
    case "email":
      return (
        <div className="space-y-3">
          <input
            type="email"
            value={values.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="Email Address"
            className={inputClass}
          />
          <input
            type="text"
            value={values.subject || ""}
            onChange={(e) => onChange("subject", e.target.value)}
            placeholder="Subject (optional)"
            className={inputClass}
          />
          <textarea
            value={values.body || ""}
            onChange={(e) => onChange("body", e.target.value)}
            placeholder="Message (optional)"
            rows={3}
            className={inputClass + " resize-none"}
          />
        </div>
      );
    
    case "phone":
      return (
        <input
          type="tel"
          value={values.phone || ""}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="+1 234 567 8900"
          className={inputClass}
        />
      );
    
    case "sms":
      return (
        <div className="space-y-3">
          <input
            type="tel"
            value={values.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="Phone Number"
            className={inputClass}
          />
          <textarea
            value={values.message || ""}
            onChange={(e) => onChange("message", e.target.value)}
            placeholder="Message (optional)"
            rows={3}
            className={inputClass + " resize-none"}
          />
        </div>
      );
    
    default:
      return null;
  }
};

export default QRTypeInputs;

// Helper to generate QR value from type and values
export const generateQRValue = (type: QRType, values: Record<string, string>): string => {
  switch (type) {
    case "url":
      return values.url || "";
    
    case "wifi":
      const encryption = values.encryption || "WPA";
      const hidden = values.hidden === "true" ? "H:true" : "";
      return `WIFI:T:${encryption};S:${values.ssid || ""};P:${values.password || ""};${hidden};`;
    
    case "vcard":
      return `BEGIN:VCARD
VERSION:3.0
N:${values.name || ""}
FN:${values.name || ""}
TEL:${values.phone || ""}
EMAIL:${values.email || ""}
ORG:${values.company || ""}
END:VCARD`;
    
    case "email":
      let mailtoUrl = `mailto:${values.email || ""}`;
      const params = [];
      if (values.subject) params.push(`subject=${encodeURIComponent(values.subject)}`);
      if (values.body) params.push(`body=${encodeURIComponent(values.body)}`);
      if (params.length) mailtoUrl += `?${params.join("&")}`;
      return mailtoUrl;
    
    case "phone":
      return `tel:${values.phone || ""}`;
    
    case "sms":
      let smsUrl = `sms:${values.phone || ""}`;
      if (values.message) smsUrl += `?body=${encodeURIComponent(values.message)}`;
      return smsUrl;
    
    default:
      return "";
  }
};
