import { useState, useRef, useEffect } from "react";
import { Mic, Loader2, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface InputPanelProps {
  onProcess: (notes: string) => void;
  isProcessing: boolean;
}

// Minimal typing for the Web Speech API (not in default TS lib)
type SpeechRecognitionType = any;

const InputPanel = ({ onProcess, isProcessing }: InputPanelProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [notes, setNotes] = useState("");
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);
  const baseTextRef = useRef<string>("");

  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.stop();
      } catch {
        // ignore
      }
    };
  }, []);

  const startRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Voice recording not supported in this browser. Try Chrome or Edge.");
      return;
    }

    const recognition: SpeechRecognitionType = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    baseTextRef.current = notes ? notes.trimEnd() + (notes.trim() ? " " : "") : "";

    recognition.onresult = (event: any) => {
      let finalText = "";
      let interimText = "";
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript;
        } else {
          interimText += result[0].transcript;
        }
      }
      setNotes(baseTextRef.current + finalText + interimText);
    };

    recognition.onerror = (event: any) => {
      const err = event?.error || "unknown";
      if (err !== "no-speech" && err !== "aborted") {
        toast.error(`Recording error: ${err}`);
      }
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      // Auto-handoff: process the final transcript
      const finalNotes = (baseTextRef.current + "").trim()
        ? baseTextRef.current
        : "";
      // Use latest notes from state via functional update trick
      setNotes((current) => {
        const trimmed = current.trim();
        if (trimmed && !isProcessingRef.current) {
          onProcess(trimmed);
        }
        return current;
      });
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
      toast.success("Recording started — speak now");
    } catch (e: any) {
      toast.error("Could not start recording: " + (e?.message ?? "unknown"));
    }
  };

  const stopRecording = () => {
    try {
      recognitionRef.current?.stop();
    } catch {
      // ignore
    }
  };

  // Track latest isProcessing without re-creating recognition handlers
  const isProcessingRef = useRef(isProcessing);
  useEffect(() => {
    isProcessingRef.current = isProcessing;
  }, [isProcessing]);

  return (
    <Card className="flex-1 flex flex-col shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Capture Case Details</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className={`
            w-full flex items-center justify-center gap-3 py-5 rounded-xl border-2 border-dashed
            transition-all font-medium text-sm
            ${isRecording
              ? "border-destructive bg-destructive text-destructive-foreground animate-pulse"
              : "border-border hover:border-destructive/50 hover:bg-destructive/5 text-muted-foreground hover:text-destructive"
            }
          `}
        >
          {isRecording ? (
            <>
              <Square className="h-5 w-5 fill-current" />
              Recording... Tap to Stop
            </>
          ) : (
            <>
              <Mic className="h-5 w-5" />
              Start Voice Recording
            </>
          )}
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
          disabled={isProcessing || !notes.trim() || isRecording}
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
