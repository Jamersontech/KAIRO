"use client";

import { useRef, useState } from "react";
import { Phone, PhoneOff, Loader2 } from "lucide-react";

// The Vapi browser SDK, loaded from a CDN at click-time so there's no npm
// dependency to install. Prefer `npm i @vapi-ai/web` later and swap this for
// a static `import Vapi from "@vapi-ai/web"` if you'd rather bundle it.
const VAPI_SDK_URL = "https://esm.sh/@vapi-ai/web@2.3.0";

/**
 * "Talk to our AI" live web-call button (scaffold).
 *
 * Renders nothing until NEXT_PUBLIC_VAPI_PUBLIC_KEY + NEXT_PUBLIC_VAPI_ASSISTANT_ID
 * are set, so the marketing site stays clean until the voice agent is live.
 * Set up a Vapi assistant + web credentials, drop the keys in .env.local, and
 * this activates automatically.
 */
export function VoiceAgentButton({ className }: { className?: string }) {
  const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
  const [state, setState] = useState<"idle" | "connecting" | "live">("idle");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vapiRef = useRef<any>(null);

  // Not configured yet → don't render anything.
  if (!publicKey || !assistantId || publicKey.includes("REPLACE")) return null;

  const start = async () => {
    try {
      setState("connecting");
      if (!vapiRef.current) {
        const mod = await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ VAPI_SDK_URL);
        const Vapi = mod.default;
        vapiRef.current = new Vapi(publicKey);
        vapiRef.current.on("call-start", () => setState("live"));
        vapiRef.current.on("call-end", () => setState("idle"));
        vapiRef.current.on("error", (e: unknown) => {
          console.error("[voice] call error", e);
          setState("idle");
        });
      }
      await vapiRef.current.start(assistantId);
    } catch (err) {
      console.error("[voice] failed to start call", err);
      setState("idle");
    }
  };

  const stop = () => {
    vapiRef.current?.stop();
    setState("idle");
  };

  const live = state === "live";
  const connecting = state === "connecting";

  return (
    <button
      onClick={live || connecting ? stop : start}
      className={
        className ??
        `inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
          live
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-[#C9A24B] text-[#0D0D0F] hover:bg-[#E8C87A]"
        }`
      }
      aria-label={live ? "End call with AI agent" : "Start a call with our AI agent"}
    >
      {connecting ? (
        <>
          <Loader2 size={15} className="animate-spin" /> Connecting…
        </>
      ) : live ? (
        <>
          <PhoneOff size={15} /> End call
        </>
      ) : (
        <>
          <Phone size={15} /> Talk to our AI now
        </>
      )}
    </button>
  );
}
