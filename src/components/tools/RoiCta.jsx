"use client";
import { useLeadForm } from '@/context/LeadFormContext';
import React from 'react'
import PrimaryButton from '../custom/shared/PrimaryButton';

const RoiCta = () => {
    const { showLeadForm } = useLeadForm();
  return (
    <div
    onClick={() =>
      showLeadForm("roi calculator page - free counseling cta")
    }
    className="inline-block cursor-pointer"
  >
    <PrimaryButton
      title="Talk to a Counsellor "
      
    />
  </div>
  )
}

export default RoiCta