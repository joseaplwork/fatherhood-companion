"use client";

import { type ReactNode, useEffect, useRef } from "react";

type DialogProps = {
  open: boolean;
  isClosing: boolean;
  onClose: () => void;
  onRequestClose: () => void;
  onAnimationEnd: () => void;
  children: ReactNode;
};

export function Dialog({
  open,
  isClosing,
  onClose,
  onRequestClose,
  onAnimationEnd,
  children,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isVisible = open || isClosing;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isVisible && !dialog.open) {
      dialog.showModal();
      return;
    }

    if (!isVisible && dialog.open) {
      dialog.close();
    }
  }, [isVisible]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onRequestClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onRequestClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onRequestClose();
      }}
      className={`fixed inset-0 z-50 m-0 grid h-full w-full max-w-none place-items-center overflow-visible bg-transparent p-0${isClosing ? " ui-dialog--closing" : ""}`}
      style={{ display: isVisible ? "grid" : "none" }}
    >
      <div
        className="ui-dialog-panel w-[min(100%-2rem,32rem)] rounded-2xl bg-surface p-6 shadow-lg"
        onAnimationEnd={(e) => {
          if (!isClosing || e.animationName !== "uiDialogFadeOut") return;
          const dialog = dialogRef.current;
          if (dialog) {
            // Force display:none before dialog.close() so the element is
            // already hidden when the browser removes it from the top layer.
            // Without this the top-layer removal resets the forwards fill on
            // uiDialogFadeOut, snapping the panel to opacity:1 for one frame.
            dialog.style.display = "none";
            if (dialog.open) dialog.close();
          }
          onAnimationEnd();
        }}
      >
        {children}
      </div>
    </dialog>
  );
}
