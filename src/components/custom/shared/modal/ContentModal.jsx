import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";

const ContentModal = ({
  id,
  title,
  trigger,
  content,
  ContentClassName,
  triggerClassName,
  asChild,
  isOpen: externalOpen, // externally controlled open state
  onClose, // callback when modal closes
}) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    onClose && onClose();
  };

  const finalOpen = externalOpen ?? open;

  return (
    <Dialog open={finalOpen} onOpenChange={setOpen} key={id || title}>
      {!externalOpen && trigger && (
        <DialogTrigger
          asChild={asChild}
          className={`${
            triggerClassName || "text-black"
          } flex cursor-pointer items-center justify-center`}
        >
          {trigger}
        </DialogTrigger>
      )}

      <DialogContent
        className={`border-0 max-h-[95vh] overflow-y-auto ${
          ContentClassName && ContentClassName
        }`}
      >
        <DialogHeader>
          <DialogTitle className="text-md pe-[70px] text-start">
            {title && title}
          </DialogTitle>
          <div className="bg-white/100 whitespace-pre-wrap">
            {typeof content === "function" ? content({ closeModal }) : content}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ContentModal;
