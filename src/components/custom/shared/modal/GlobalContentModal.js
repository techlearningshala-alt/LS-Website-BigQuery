import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { useModal } from "@/context/ModalContext";
  import React from "react";

  
  const GlobalContentModal = ({
    id,
    title,
    trigger,
    content,
    ContentClassName,
    triggerClassName,
    asChild,
  }) => {
    const { openModalId, closeModal } = useModal();
  
    const isOpen = openModalId === id;
  
    return (
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) closeModal();
        }}
        key={id || title}
      >
        {!trigger ? null : (
          <DialogTrigger
            asChild={asChild}
            className={`${
              triggerClassName || "text-black"
            } flex cursor-pointer items-center`}
          >
            {trigger}
          </DialogTrigger>
        )}
  
        <DialogContent
          className={`border-0 max-h-[90vh] overflow-y-auto ${
            ContentClassName || ""
          }`}
        >
          <DialogHeader>
            <DialogTitle className="text-md font-bold pe-[70px]">
              {title}
            </DialogTitle>
            <div className="bg-white whitespace-pre-wrap">
              {typeof content === "function" ? content({ closeModal }) : content}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default GlobalContentModal;
  