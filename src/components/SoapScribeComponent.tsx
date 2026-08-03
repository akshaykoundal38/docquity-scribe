import { useState } from "react";
import { Loader2, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { generateSoapNote, type SoapNote } from "@/services/caseScribeApi";

const sections: { key: keyof SoapNote; label: string }[] = [
  { key: "subjective", label: "Subjective" },
  { key: "objective", label: "Objective" },
  { key: "assessment", label: "Assessment" },
  { key: "plan", label: "Plan" },
];

const SoapScribeComponent = () => {
  const [transcript, setTranscript] = useState("");
  const [note, setNote] = useState<SoapNote | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setNote(null);
    try {
      const result = await generateSoapNote(transcript.trim());
      setNote(result);
      toast.success("SOAP note generated");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error("Could not generate SOAP note: " + message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-primary" />
          SOAP Scribe
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Textarea
          placeholder="Paste or dictate the consultation transcript..."
          className="min-h-[140px] resize-none text-sm"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />
        <Button
          className="w-full font-semibold"
          disabled={isLoading || !transcript.trim()}
          onClick={handleGenerate}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate SOAP Note"
          )}
        </Button>

        {note ? (
          <div className="space-y-4">
            {sections.map(({ key, label }) => (
              <div key={key}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">
                  {label}
                </h4>
                <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line">
                  {note[key] || "—"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            Your structured SOAP note will appear here after processing.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SoapScribeComponent;
