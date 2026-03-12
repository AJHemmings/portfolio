"use client";

import { useEffect, useState } from "react";
import { Check, Trash2 } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 1, name: "Promotions",  count: 183, color: "#F97316" },
  { id: 2, name: "Newsletters", count: 94,  color: "#3B82F6" },
  { id: 3, name: "Receipts",    count: 47,  color: "#EAB308" },
  { id: 4, name: "Social",      count: 23,  color: "#06B6D4" },
  { id: 5, name: "Updates",     count: 67,  color: "#8B5CF6" },
];

const TOTAL_EMAILS = CATEGORIES.reduce((sum, c) => sum + c.count, 0);

// ─── Types ───────────────────────────────────────────────────────────────────

type Phase = "idle" | "selecting" | "confirming" | "deleting" | "done";

// ─── Component ───────────────────────────────────────────────────────────────

export default function DeletionAnimation() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());
  const [deletedIds, setDeletedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const schedule = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      timeouts.push(id);
    };

    // Phase 1 — start selecting
    schedule(() => setPhase("selecting"), 800);

    // Phase 2 — tick checkboxes one by one
    CATEGORIES.forEach((cat, index) => {
      schedule(() => {
        setCheckedIds((prev) => new Set([...prev, cat.id]));
      }, 1200 + index * 250);
    });

    const allCheckedAt = 1200 + (CATEGORIES.length - 1) * 250;

    // Phase 3 — confirming (button turns green)
    schedule(() => setPhase("confirming"), allCheckedAt + 200);

    // Phase 4 — deleting (rows slide out)
    schedule(() => {
      setPhase("deleting");
      CATEGORIES.forEach((cat, index) => {
        schedule(() => {
          setDeletedIds((prev) => new Set([...prev, cat.id]));
        }, index * 120);
      });
    }, allCheckedAt + 900);

    const allDeletedAt = allCheckedAt + 900 + (CATEGORIES.length - 1) * 120;

    // Phase 5 — done
    schedule(() => setPhase("done"), allDeletedAt + 300);

    // Phase 6 — loop restart
    schedule(() => {
      setPhase("idle");
      setCheckedIds(new Set());
      setDeletedIds(new Set());
    }, allDeletedAt + 2300);

    return () => timeouts.forEach(clearTimeout);
  }, [phase === "idle" ? "reset" : "running"]);

  // Derived state
  const checkedCount = CATEGORIES.filter(c => checkedIds.has(c.id)).reduce((sum, c) => sum + c.count, 0);
  const isConfirming = phase === "confirming";
  const isDeleting = phase === "deleting";
  const isDone = phase === "done";

  const buttonBg =
    isDone
      ? "bg-brand-green/30"
      : isDeleting
      ? "bg-brand-green/50 text-white/70"
      : isConfirming
      ? "bg-brand-green text-gray-900 scale-105 shadow-lg shadow-brand-green/30"
      : "bg-white/5 text-white/30";

  const buttonLabel =
    isDeleting
      ? "Deleting..."
      : isConfirming && checkedCount > 0
      ? `Delete ${checkedCount} emails`
      : "Delete emails";

  return (
    // Phone shell
    <div
      className="relative mx-auto flex flex-col overflow-hidden"
      style={{
        width: 260,
        height: 480,
        background: "#1a1a2e",
        borderRadius: 32,
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-1">
        <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">
          Inbox
        </span>
        <span className="text-[10px] font-semibold text-white/30">
          {checkedCount > 0 ? `${checkedCount} selected` : `${TOTAL_EMAILS} emails`}
        </span>
      </div>

      {/* Thin divider */}
      <div className="mx-4 h-px bg-white/5" />

      {/* Category list */}
      <div className="flex-1 overflow-hidden px-3 pt-2 pb-1 flex flex-col gap-1.5">
        {CATEGORIES.map((cat) => {
          const isChecked = checkedIds.has(cat.id);
          const isDeleted = deletedIds.has(cat.id);

          return (
            <div
              key={cat.id}
              className="flex items-center gap-2.5 rounded-xl px-2.5 py-2"
              style={{
                background: isChecked
                  ? "rgba(74,222,128,0.06)"
                  : "rgba(255,255,255,0.03)",
                border: isChecked
                  ? "1px solid rgba(74,222,128,0.15)"
                  : "1px solid rgba(255,255,255,0.05)",
                opacity: isDeleted ? 0 : 1,
                transform: isDeleted
                  ? "translateX(32px) scale(0.95)"
                  : "translateX(0) scale(1)",
                transitionProperty: "opacity, transform, background, border",
                transitionDuration: isDeleted ? "280ms" : "200ms",
                transitionTimingFunction: isDeleted
                  ? "cubic-bezier(0.4, 0, 1, 1)"
                  : "ease",
              }}
            >
              {/* Checkbox */}
              <div
                className="shrink-0 flex items-center justify-center rounded-full transition-all duration-200"
                style={{
                  width: 16,
                  height: 16,
                  border: isChecked ? "none" : "1.5px solid rgba(255,255,255,0.20)",
                  background: isChecked ? "#4ADE80" : "transparent",
                  boxShadow: isChecked ? "0 0 8px rgba(74,222,128,0.4)" : "none",
                }}
              >
                {isChecked && (
                  <Check size={9} strokeWidth={3} className="text-gray-900" aria-hidden="true" />
                )}
              </div>

              {/* Category colour dot */}
              <div
                className="shrink-0 rounded-full"
                style={{ width: 8, height: 8, background: cat.color }}
              />

              {/* Category name */}
              <span className="flex-1 text-[11px] font-semibold text-white/80">
                {cat.name}
              </span>

              {/* Email count */}
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold tabular-nums"
                style={{
                  background: isChecked ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.07)",
                  color: isChecked ? "#4ADE80" : "rgba(255,255,255,0.45)",
                }}
              >
                {cat.count}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom action area */}
      <div className="px-3 pb-5 pt-2">
        {isDone ? (
          // Done state — inbox cleared confirmation
          <div
            className="flex items-center justify-center gap-2 rounded-xl py-3 transition-all duration-500"
            style={{
              border: "1px solid rgba(74,222,128,0.4)",
              background: "rgba(74,222,128,0.08)",
              boxShadow: "0 0 20px rgba(74,222,128,0.12)",
            }}
          >
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 20,
                height: 20,
                background: "#4ADE80",
                boxShadow: "0 0 10px rgba(74,222,128,0.5)",
              }}
            >
              <Check size={11} strokeWidth={3} className="text-gray-900" aria-hidden="true" />
            </div>
            <span
              className="text-xs font-bold tracking-wide"
              style={{ color: "#4ADE80" }}
            >
              Inbox cleared
            </span>
          </div>
        ) : (
          // Delete button
          <button
            disabled
            aria-label={buttonLabel}
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold tracking-wide uppercase transition-all duration-300 ${buttonBg}`}
          >
            {!isConfirming && !isDeleting && (
              <Trash2 size={12} strokeWidth={2.5} aria-hidden="true" />
            )}
            {buttonLabel}
          </button>
        )}

        {/* Home indicator */}
        <div className="mt-3 flex justify-center">
          <div
            className="rounded-full"
            style={{
              width: 80,
              height: 4,
              background: "rgba(255,255,255,0.12)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
