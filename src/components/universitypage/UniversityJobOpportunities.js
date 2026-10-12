import React from 'react'
import UniversityContentHeading from './UniversityContentHeading'
import { cleanHTML } from '@/lib/cleanHTML'

const UniversityJobOpportunities = ({id,title,universityData,courseData,specializationData}) => {
  // const jobOpportunities = specializationData?.sections_transformed?.job_opportunities ? specializationData?.sections_transformed?.job_opportunities : courseData?.sections_transformed?.job_opportunities ? courseData?.sections_transformed?.job_opportunities : universityData?.sections?.job_opportunities;

  const jobOpportunities = specializationData?.sections_transformed?.Job_Opportunities ?? courseData?.sections_transformed?.Job_Opportunities ?? null;


  return (
    <div id={id} className="content_card">
          <UniversityContentHeading title={title} />

          <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(jobOpportunities) }} />
    </div>
  )
}

export default UniversityJobOpportunities