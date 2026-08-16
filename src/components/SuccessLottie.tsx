"use client";

import dynamic from "next/dynamic";

const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => {
      // Serve the WASM from our own origin — the CDN defaults (jsdelivr /
      // unpkg) fail in restricted networks, breaking the animation entirely.
      mod.setWasmUrl("/wasm/dotlottie-player.wasm");
      return mod.DotLottieReact;
    }),
  { ssr: false }
);

interface SuccessLottieProps {
  width?: number;
  height?: number;
  onComplete?: () => void;
}

export default function SuccessLottie({
  width = 240,
  height = 240,
  onComplete,
}: SuccessLottieProps) {
  return (
    <DotLottieReact
      src="/success.lottie"
      autoplay
      loop={false}
      style={{ width, height }}
      dotLottieRefCallback={(ref) => {
        if (!ref) return;
        ref.addEventListener("complete", () => {
          onComplete?.();
        });
      }}
    />
  );
}
