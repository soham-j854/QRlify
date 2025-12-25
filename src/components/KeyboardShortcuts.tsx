import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Keyboard } from "lucide-react";

interface KeyboardShortcutsProps {
  onGenerate: () => void;
  onDownload: () => void;
  canGenerate: boolean;
  canDownload: boolean;
}

const KeyboardShortcuts = ({ 
  onGenerate, 
  onDownload, 
  canGenerate,
  canDownload 
}: KeyboardShortcutsProps) => {
  const [showHints, setShowHints] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Enter to generate
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && canGenerate) {
        e.preventDefault();
        onGenerate();
        setLastAction("Generated!");
        setTimeout(() => setLastAction(null), 1500);
      }
      
      // Cmd/Ctrl + S to download
      if ((e.metaKey || e.ctrlKey) && e.key === "s" && canDownload) {
        e.preventDefault();
        onDownload();
        setLastAction("Downloaded!");
        setTimeout(() => setLastAction(null), 1500);
      }

      // Cmd/Ctrl + K to show shortcuts
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowHints(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onGenerate, onDownload, canGenerate, canDownload]);

  return (
    <>
      {/* Hints toggle button */}
      <motion.button
        onClick={() => setShowHints(prev => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 glass-panel px-4 py-3 rounded-2xl
                   flex items-center gap-2 text-sm text-muted-foreground
                   hover:text-foreground transition-colors"
      >
        <Keyboard className="w-4 h-4" />
        <span className="hidden sm:inline">Shortcuts</span>
      </motion.button>

      {/* Shortcuts panel */}
      <AnimatePresence>
        {showHints && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 z-50 glass-panel-strong rounded-2xl p-5 min-w-[240px]"
          >
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Command className="w-4 h-4" />
              Keyboard Shortcuts
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">Generate QR</span>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 rounded-lg bg-muted text-xs font-mono">⌘</kbd>
                  <span className="text-muted-foreground">+</span>
                  <kbd className="px-2 py-1 rounded-lg bg-muted text-xs font-mono">↵</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">Download QR</span>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 rounded-lg bg-muted text-xs font-mono">⌘</kbd>
                  <span className="text-muted-foreground">+</span>
                  <kbd className="px-2 py-1 rounded-lg bg-muted text-xs font-mono">S</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">Toggle hints</span>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 rounded-lg bg-muted text-xs font-mono">⌘</kbd>
                  <span className="text-muted-foreground">+</span>
                  <kbd className="px-2 py-1 rounded-lg bg-muted text-xs font-mono">K</kbd>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action feedback */}
      <AnimatePresence>
        {lastAction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                       glass-panel-strong px-6 py-4 rounded-2xl text-foreground font-medium"
          >
            {lastAction}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default KeyboardShortcuts;
