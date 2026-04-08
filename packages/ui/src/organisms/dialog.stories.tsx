import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "../atoms/button";

import { Dialog } from "./dialog";

const meta = {
  title: "Organisms/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    open: { control: false },
    isClosing: { control: false },
    onClose: { control: false },
    onRequestClose: { control: false },
    onAnimationEnd: { control: false },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function DialogDemo({ children }: { children: (onClose: () => void) => React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  function handleOpen() {
    setIsClosing(false);
    setOpen(true);
  }

  function handleClose() {
    if (!open || isClosing) return;
    setIsClosing(true);
  }

  function handleAnimationEnd() {
    setOpen(false);
    setIsClosing(false);
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Button variant="primary" onClick={handleOpen}>
        Open dialog
      </Button>

      <Dialog
        open={open}
        isClosing={isClosing}
        onClose={() => {
          setOpen(false);
          setIsClosing(false);
        }}
        onRequestClose={handleClose}
        onAnimationEnd={handleAnimationEnd}
      >
        {children(handleClose)}
      </Dialog>
    </div>
  );
}

export const Default: Story = {
  name: "Simple message",
  args: {
    open: false,
    isClosing: false,
    onClose: () => {},
    onRequestClose: () => {},
    onAnimationEnd: () => {},
    children: null,
  },
  render: () => (
    <DialogDemo>
      {(onClose) => (
        <div role="dialog" aria-modal="true" aria-labelledby="demo-title">
          <h2 id="demo-title" className="font-display text-xl font-semibold text-on-surface mb-3">
            Confirm action
          </h2>
          <p className="font-body text-sm text-on-surface-variant mb-6">
            Are you sure you want to continue? This cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" className="flex-1" onClick={onClose}>
              Confirm
            </Button>
          </div>
        </div>
      )}
    </DialogDemo>
  ),
};

export const WithRichContent: Story = {
  name: "Rich content",
  args: {
    open: false,
    isClosing: false,
    onClose: () => {},
    onRequestClose: () => {},
    onAnimationEnd: () => {},
    children: null,
  },
  render: () => (
    <DialogDemo>
      {(onClose) => (
        <div role="dialog" aria-modal="true" aria-labelledby="rich-title">
          <h2 id="rich-title" className="font-display text-xl font-semibold text-on-surface mb-6">
            Share a reflection
          </h2>
          <div className="flex flex-col gap-4">
            <textarea
              rows={4}
              placeholder="Write something…"
              className="w-full rounded-xl bg-surface-container-low px-4 py-3 font-body text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none resize-none"
            />
            <div className="flex gap-3">
              <Button variant="ghost" onClick={onClose}>
                Discard
              </Button>
              <Button variant="primary" className="flex-1" onClick={onClose}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </DialogDemo>
  ),
};
