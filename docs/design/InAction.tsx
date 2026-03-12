"use client";

import DeletionAnimation from "@/components/DeletionAnimation";
import UnsubscribeAnimation from "@/components/UnsubscribeAnimation";

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface MockupColumn {
  animation: React.ReactNode;
  glowClass: string;
  title: string;
  subtitle: string;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const MOCKUPS: MockupColumn[] = [
  {
    animation: <DeletionAnimation />,
    glowClass: "glow-purple",
    title: "Mass Deletion",
    subtitle: "Select a category. One tap. Done.",
  },
  {
    animation: <UnsubscribeAnimation />,
    glowClass: "glow-red",
    title: "Unsubscribe & Delete",
    subtitle: "Cuts the sender off and cleans up after them.",
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function InAction() {
  return (
    <section
      id="action"
      className="relative overflow-hidden py-28 lg:py-36"
      style={{ background: "#0F0A1E" }}
    >
      {/* ── Top edge — gradient bridge from white Features section ──────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.30) 35%, rgba(74,222,128,0.20) 65%, transparent 100%)",
        }}
      />

      {/* ── Ambient radial bloom — sits behind everything ────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── Subtle noise grain overlay ────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="mb-20 text-center inaction-header">
          {/* Eyebrow */}
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.22em] text-brand-green/70">
            See it in action
          </p>

          {/* Headline */}
          <h2
            className="mb-4 font-black leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Watch the clutter{" "}
            <span className="text-gradient-purple-green">disappear.</span>
          </h2>

          {/* Subheadline */}
          <p
            className="mx-auto max-w-sm text-base font-medium leading-relaxed"
            style={{ color: "rgba(255,255,255,0.42)" }}
          >
            Two taps. Hundreds of emails. Gone.
          </p>
        </div>

        {/* ── Mockup grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12 lg:gap-20">
          {MOCKUPS.map((col, i) => (
            <div
              key={col.title}
              className="flex flex-col items-center inaction-mockup"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Phone + glow wrapper */}
              <div className="relative">
                {/* Glow disc — sits behind the phone */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 -z-10 rounded-full blur-3xl ${col.glowClass}`}
                  style={{
                    transform: "scale(1.35) translateY(8%)",
                  }}
                />

                {/* Phone mockup */}
                {col.animation}
              </div>

              {/* Label — below the phone */}
              <div className="mt-8 text-center">
                <p className="mb-1 text-[15px] font-black tracking-tight text-white">
                  {col.title}
                </p>
                <p
                  className="text-sm font-medium leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  {col.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Keyframes + glow utilities ──────────────────────────────────────── */}
      <style>{`
        /* Staggered fade-up entrance */
        @keyframes inactionFadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .inaction-header {
          animation: inactionFadeUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0ms;
        }

        .inaction-mockup {
          animation: inactionFadeUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* Glow disc colours — kept out of Tailwind arbitrary values for clarity */
        .glow-purple {
          background: rgba(139, 92, 246, 0.20);
          width: 100%;
          height: 100%;
        }

        .glow-red {
          background: rgba(239, 68, 68, 0.20);
          width: 100%;
          height: 100%;
        }
      `}</style>
    </section>
  );
}
