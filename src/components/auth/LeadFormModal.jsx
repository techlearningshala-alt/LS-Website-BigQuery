"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useLeadForm } from "@/context/LeadFormContext";
import LeadForm from "./LeadForm";
import { CheckCircle2, IndianRupee } from "lucide-react";
import Logo from "../custom/shared/Logo";
import Image from "next/image";


export default function LeadFormModal() {
 
 
  const { isOpen, hideLeadForm, clickSource, pageUrl, menuData } = useLeadForm();
  
  return (
    <Dialog open={isOpen} onOpenChange={hideLeadForm}>
      <DialogContent className="md:min-w-4xl max-h-[85vh] overflow-y-auto">
        <div className="grid grid-cols-12 md:gap-8">
          <div className="col-span-12 hidden md:block md:col-span-5 bg-[#faf9f7] rounded-lg p-4">
         <div className="mb-4"><Logo/></div>
            <ul className="font-bold">
              <li className="flex items-start gap-2 mb-3"> <CheckCircle2 className="text-primary mt-1" size={20} /> 100% Placement Assistance</li>
              <li className="flex items-start gap-2 mb-3"><CheckCircle2 className="text-primary mt-1" size={20} /> Get Only Approved University</li>
              <li className="flex items-start gap-2 mb-3"><CheckCircle2 className="text-primary mt-1" size={20} /> Easy EMI Options Available</li>
              <li className="flex items-start gap-2 mb-3"><CheckCircle2 className="text-primary mt-1" size={20} /> Get upto 10% off on your first course</li>
             
            </ul>
            <Image src="/images/tag.png" alt="LearningShala trust" width={300} height={300} className="rounded-lg"  />
          </div>
          <div className="col-span-12 md:col-span-7">
          <div className="mb-0 md:hidden"><Logo/></div>
            <h1 className="text-lg md:text-2xl font-bold mb-3">
              Get Top University in Just 2 Minutes
            </h1>
            <p className="text-md text-green-500 mb-8 font-medium flex items-center gap-1">
              <IndianRupee className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-green-100 p-1 animate-pulse" />{" "}
              <span className="font-bold text-green-500 text-[14px] md:text-base">Get upto 15,000 off on your course</span>
       
            </p>
            {isOpen ? (
              <LeadForm
                clickSource={clickSource}
                pageUrl={pageUrl}
                menuData={menuData}
              />
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
