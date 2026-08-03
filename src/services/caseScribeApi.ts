export const SOAP_SCRIBE_URL =
  "http://localhost:5678/webhook/soap-scribe";

export interface SoapNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export async function generateSoapNote(transcript: string): Promise<SoapNote> {
  const res = await fetch(SOAP_SCRIBE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ transcript }),
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const raw = await res.json();
  const payload = Array.isArray(raw) ? raw[0] : raw;
  const soap = payload?.soap ?? payload ?? {};

  return {
    subjective: soap.subjective ?? soap.Subjective ?? "",
    objective: soap.objective ?? soap.Objective ?? "",
    assessment: soap.assessment ?? soap.Assessment ?? "",
    plan: soap.plan ?? soap.Plan ?? "",
  };
}
