import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import InputPanel from "@/components/InputPanel";
import OutputPanel from "@/components/OutputPanel";

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
      const res = await fetch("https://screen-roman-arkansas-moss.trycloudflare.com/webhook-test/process-case", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: notes }),
      });
      const data = await res.json();
      setSoap(data.soap);

      // Fetch literature
      if (data.soap?.assessment || data.soap?.Assessment) {
        setIsLoadingLit(true);
        try {
          const litRes = await fetch("https://screen-roman-arkansas-moss.trycloudflare.com/webhook-test/get-literature", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: data.soap.assessment ?? data.soap.Assessment }),
          });
          const litData = await litRes.json();
          setLiterature(litData.recommendations || litData);
        } catch {
          console.error("Failed to fetch literature");
        } finally {
          setIsLoadingLit(false);
        }
      }
    } catch {
      console.error("Failed to process case");
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
