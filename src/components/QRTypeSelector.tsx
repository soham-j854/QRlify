import { motion } from "framer-motion";
import { Link2, Wifi, User, Mail, Phone, MessageSquare } from "lucide-react";

export type QRType = "url" | "wifi" | "vcard" | "email" | "phone" | "sms";

interface QRTypeSelectorProps {
  selectedType: QRType;
  onSelectType: (type: QRType) => void;
}

const qrTypes = [
  { id: "url" as QRType, icon: Link2, label: "URL / Text" },
  { id: "wifi" as QRType, icon: Wifi, label: "WiFi" },
  { id: "vcard" as QRType, icon: User, label: "vCard" },
  { id: "email" as QRType, icon: Mail, label: "Email" },
  { id: "phone" as QRType, icon: Phone, label: "Phone" },
  { id: "sms" as QRType, icon: MessageSquare, label: "SMS" },
];

const QRTypeSelector = ({ selectedType, onSelectType }: QRTypeSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {qrTypes.map((type) => (
        <motion.button
          key={type.id}
          onClick={() => onSelectType(type.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
            transition-all duration-300
            ${selectedType === type.id 
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
              : "glass-panel text-muted-foreground hover:text-foreground"
            }
          `}
        >
          <type.icon className="w-4 h-4" />
          <span className="hidden sm:inline">{type.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default QRTypeSelector;
