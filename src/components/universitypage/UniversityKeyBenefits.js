import React from 'react'
import UniversityContentHeading from './UniversityContentHeading'
import { cleanHTML } from '@/lib/cleanHTML'

const UniversityKeyBenefits = ({id,title,universityData,courseData,specializationData}) => {
  // const keyBenefits =
  // specializationData?.sections_transformed?.Key_Highlights ? specializationData?.sections_transformed?.Key_Highlights : courseData?.sections_transformed?.Key_Highlights ? courseData?.sections_transformed?.Key_Highlights : universityData?.sections?.Key_Highlights;


const keyBenefits =
  specializationData?.sections_transformed?.Key_Highlights ?? 
  (courseData?.sections_transformed?.Key_Highlights ?? 
  (universityData?.sections?.Key_Highlights ?? null));

  return (
    <div id={id} className="content_card">
          <UniversityContentHeading title={title} />
          <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(keyBenefits) }} />
    </div>
  )
}

export default UniversityKeyBenefits