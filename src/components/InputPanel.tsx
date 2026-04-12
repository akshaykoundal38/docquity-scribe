import { useState } from "react";
import { Mic, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InputPanelProps {
  onProcess: (notes: string) => void;
  isProcessing: boolean;
}

const InputPanel = ({ onProcess, isProcessing }: InputPanelProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [notes, setNotes] = useState("");

  return (
    <Card className="flex-1 flex flex-col shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Capture Case Details</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`
            w-full flex items-center justify-center gap-3 py-5 rounded-xl border-2 border-dashed
            transition-all font-medium text-sm
            ${isRecording
              ? "border-destructive bg-destructive/5 text-destructive animate-pulse"
              : "border-border hover:border-destructive/50 hover:bg-destructive/5 text-muted-foreground hover:text-destructive"
            }
          `}
        >
          {isRecording ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
          {isRecording ? "Recording... Tap to Stop" : "Start Voice Recording"}
        </button>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex-1 h-px bg-border" />
          <span>OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <Textarea
          placeholder="Or paste raw clinical notes here..."
          className="flex-1 min-h-[160px] resize-none text-sm"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <Button
          className="w-full py-5 text-sm font-semibold"
          size="lg"
          disabled={isProcessing || !notes.trim()}
          onClick={() => onProcess(notes)}
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Process & Anonymize Case"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default InputPanel;
