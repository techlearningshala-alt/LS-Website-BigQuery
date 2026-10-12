"use client";
import React, { useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const ContentDrawer = ({ title,
    description,
    trigger,
    content,
    asChild,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <p
            
                asChild={asChild}
                className="text-center cursor-pointer text-blue-600"
                onClick={() => setIsOpen(true)}
            >
                {trigger}
            </p>

            <Drawer side="left" open={isOpen} onOpenChange={setIsOpen}>
                <DrawerContent className=" w-full p-1 h-auto">
                    <DrawerHeader className="p-0 pt-4">
                        <DrawerTitle className="text-xl">{title}</DrawerTitle>
                        <DrawerDescription className="mb-4 text-md">{description}</DrawerDescription>
                    </DrawerHeader>
                    <div className="pb-8 px-1 md:px-4 overflow-y-auto">
                        {content}
                    </div>
                    <DrawerClose
                        onClick={() => setIsOpen(false)}
                        className="absolute top-3 right-3"
                    >
                        <X className="w-4 h-4 text-gray-400 cursor-pointer" />
                    </DrawerClose>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default ContentDrawer;
