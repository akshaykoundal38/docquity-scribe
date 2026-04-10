import { ExternalLink, Pencil, Copy, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const soapSections = [
  {
    title: "Subjective",
    content:
      'Patient is a 58-year-old male presenting with intermittent chest tightness over the past 2 weeks, typically occurring during exertion and resolving at rest. Denies shortness of breath, diaphoresis, or syncope. Reports mild fatigue. No prior cardiac history. Family history of MI (father at age 62).',
  },
  {
    title: "Objective",
    content:
      "BP 142/88 mmHg, HR 78 bpm, RR 16, SpO₂ 98% on room air. Cardiac auscultation reveals regular rate and rhythm, no murmurs or gallops. Lungs clear bilaterally. No peripheral edema. ECG shows normal sinus rhythm with nonspecific ST changes in leads V4-V6.",
  },
  {
    title: "Assessment",
    content:
      "Suspected stable angina pectoris vs. atypical chest pain. Risk factors include age, hypertension, and family history. Low-to-intermediate pre-test probability for obstructive CAD.",
  },
  {
    title: "Plan",
    content:
      "1. Order stress echocardiogram\n2. Fasting lipid panel and HbA1c\n3. Start aspirin 81 mg daily\n4. Lifestyle counseling: dietary modification, exercise\n5. Follow-up in 2 weeks to review results\n6. If symptoms worsen, refer for coronary angiography",
  },
];

const references = [
  {
    title: "2023 AHA/ACC Guideline for Chronic Coronary Disease",
    journal: "Circulation",
    url: "#",
  },
  {
    title: "Stress Testing in Stable Angina: A Systematic Review",
    journal: "JAMA Cardiology",
    url: "#",
  },
];

const OutputPanel = () => {
  return (
    <Card className="flex-1 flex flex-col shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Structured SOAP Note Preview</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-5 overflow-auto">
        <div className="space-y-4">
          {soapSections.map((s) => (
            <div key={s.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">
                {s.title}
              </h4>
              <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line">{s.content}</p>
            </div>
          ))}
        </div>

        <Separator />

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Literature Recommendations
          </h4>
          <div className="space-y-2">
            {references.map((r) => (
              <a
                key={r.title}
                href={r.url}
                className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-accent transition-colors group"
              >
                <ExternalLink className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                    {r.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{r.journal}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

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
            onClick={() => toast.success("Note copied to clipboard")}
          >
            <Copy className="h-3.5 w-3.5" />
            Copy Text
          </Button>
          <Button size="sm" className="ml-auto gap-1.5 font-semibold">
            <Send className="h-3.5 w-3.5" />
            Publish to Docquity Network
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutputPanel;
