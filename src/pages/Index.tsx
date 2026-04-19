import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import InputPanel from "@/components/InputPanel";
import OutputPanel from "@/components/OutputPanel";
import { toast } from "sonner";

export interface SoapData {
  Subjective: string;
  Objective: string;
  Assessment: string;
  Plan: string;
}

export interface LiteratureItem {
  title: string;
  authors: string;
  journal: string;
  year: string | number;
  url: string;
}

const Index = () => {
  const [soap, setSoap] = useState<SoapData | null>(null);
  const [literature, setLiterature] = useState<LiteratureItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingLit, setIsLoadingLit] = useState(false);

  const handleProcess = async (notes: string) => {
    setIsProcessing(true);
    setSoap(null);
    setLiterature([]);
    try {
      const res = await fetch("https://opportunities-sought-poet-night.trycloudflare.com/webhook/process-case", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: notes }),
      });
      const raw = await res.json();
      const payload = Array.isArray(raw) ? raw[0] : raw;
      const soapData = payload?.soap
        ? {
            Subjective: payload.soap.subjective ?? payload.soap.Subjective ?? "",
            Objective: payload.soap.objective ?? payload.soap.Objective ?? "",
            Assessment: payload.soap.assessment ?? payload.soap.Assessment ?? "",
            Plan: payload.soap.plan ?? payload.soap.Plan ?? "",
          }
        : null;
      setSoap(soapData);
      if (soapData) {
        toast.success("SOAP note generated successfully");
      }

      // Fetch literature
      if (soapData?.Assessment) {
        setIsLoadingLit(true);
        try {
          const litRes = await fetch("https://opportunities-sought-poet-night.trycloudflare.com/webhook/get-literature", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: soapData.Assessment }),
          });
          const litData = await litRes.json();
          setLiterature(litData.recommendations || litData);
        } catch (error: any) {
          console.log("Exact error:", JSON.stringify(error), error?.message, error?.stack);
          alert("Error: " + error?.message);
        } finally {
          setIsLoadingLit(false);
        }
      }
    } catch (error: any) {
      console.log("Exact error:", JSON.stringify(error), error?.message, error?.stack);
      alert("Error: " + error?.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex gap-6 h-full max-w-7xl mx-auto">
            <InputPanel onProcess={handleProcess} isProcessing={isProcessing} />
            <OutputPanel soap={soap} literature={literature} isLoadingLit={isLoadingLit} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
