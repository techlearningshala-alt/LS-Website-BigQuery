import React from 'react'
import UniversityContentHeading from './UniversityContentHeading'
import { cleanHTML } from '@/lib/cleanHTML'

const UniversitySyllabusCurriculum = ({id,title,universityData,courseData,specializationData}) => {
  // const syllabusCurriculum = specializationData?.sections_transformed?.syllabus_curriculum ? specializationData?.sections_transformed?.syllabus_curriculum : courseData?.sections_transformed?.syllabus_curriculum ? courseData?.sections_transformed?.syllabus_curriculum : universityData?.sections?.syllabus_curriculum;


 const syllabusCurriculum = specializationData?.sections_transformed?.Syllabus_Curriculum ?? courseData?.sections_transformed?.Syllabus_Curriculum ?? null;

  return (
    <div id={id} className="content_card">
          <UniversityContentHeading title={title} />
      
          <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(syllabusCurriculum) }} />
    </div>
  )
}

export default UniversitySyllabusCurriculum