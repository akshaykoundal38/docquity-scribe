import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import InputPanel from "@/components/InputPanel";
import OutputPanel from "@/components/OutputPanel";
import SoapScribeComponent from "@/components/SoapScribeComponent";
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
      const res = await fetch("https://mule-enzyme-unbend.ngrok-free.dev/webhook/process-case", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ transcript: notes }),
      });
      const raw = await res.json();
      // Unwrap: array -> first item, then optional .output / .data / .json / .soap wrappers
      let payload: any = Array.isArray(raw) ? raw[0] : raw;
      if (payload?.output) payload = payload.output;
      if (Array.isArray(payload)) payload = payload[0];
      if (payload?.data) payload = payload.data;
      if (payload?.json) payload = payload.json;
      if (typeof payload === "string") {
        try {
          payload = JSON.parse(payload);
        } catch {
          /* keep as string */
        }
      }
      const src: any = payload?.soap ?? payload ?? {};
      const pick = (k: string) =>
        src[k] ?? src[k.charAt(0).toUpperCase() + k.slice(1)] ?? "";
      const soapData =
        pick("subjective") || pick("objective") || pick("assessment") || pick("plan")
          ? {
              Subjective: pick("subjective"),
              Objective: pick("objective"),
              Assessment: pick("assessment"),
              Plan: pick("plan"),
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
          const litRes = await fetch("https://mule-enzyme-unbend.ngrok-free.dev/webhook/get-literature", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
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
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex gap-6">
              <InputPanel onProcess={handleProcess} isProcessing={isProcessing} />
              <OutputPanel soap={soap} literature={literature} isLoadingLit={isLoadingLit} />
            </div>
            <SoapScribeComponent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
