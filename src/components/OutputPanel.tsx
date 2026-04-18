import { ExternalLink, Pencil, Copy, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import type { SoapData, LiteratureItem } from "@/pages/Index";

interface OutputPanelProps {
  soap: SoapData | null;
  literature: LiteratureItem[];
  isLoadingLit: boolean;
}

const soapKeys: (keyof SoapData)[] = ["Subjective", "Objective", "Assessment", "Plan"];

const OutputPanel = ({ soap, literature, isLoadingLit }: OutputPanelProps) => {
  return (
    <Card className="flex-1 flex flex-col shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Structured SOAP Note Preview</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-5 overflow-auto">
        {soap ? (
          <div className="space-y-4">
            {soapKeys.map((key) => (
              <div key={key}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">
                  {key}
                </h4>
                <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line">
                  {soap[key]}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Pencil className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">
              Your structured note will appear here
            </p>
            <p className="text-xs text-muted-foreground max-w-xs">
              Record or paste clinical notes, then process the case to generate a SOAP note.
            </p>
          </div>
        )}

        {(soap || isLoadingLit) && <Separator />}

        {isLoadingLit && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading literature recommendations...
          </div>
        )}

        {literature.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Literature Recommendations
            </h4>
            <div className="space-y-2">
              {literature.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-accent transition-colors group"
                >
                  <ExternalLink className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                      {r.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {r.authors} — {r.journal}, {r.year}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {soap && (
          <>
            <Separator />
            <div className="flex items-center gap-2 pt-1">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Pencil className="h-3.5 w-3.5" />
                Edit Note
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  const text = soapKeys.map((k) => `${k}:\n${soap[k]}`).join("\n\n");
                  navigator.clipboard.writeText(text);
                  toast.success("Note copied to clipboard");
                }}
              >
                <Copy className="h-3.5 w-3.5" />
                Copy Text
              </Button>
              <Button size="sm" className="ml-auto gap-1.5 font-semibold">
                <Send className="h-3.5 w-3.5" />
                Publish to Docquity Network
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default OutputPanel;
