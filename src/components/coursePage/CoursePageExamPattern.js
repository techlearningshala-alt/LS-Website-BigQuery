import React from 'react'
import CourseContentHeading from './CourseContentHeading'
import { cleanHTML } from '@/lib/cleanHTML'

const CoursePageExamPattern = ({ id, courseData,screenSize,title, specializationData }) => {
  const syllabusSubjects = specializationData?.sections?.exam_pattern ? specializationData?.sections?.exam_pattern : courseData?.exam_pattern;
  return (
    <div id={id} className='content_card'> 
    <CourseContentHeading title={title} />
    <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(syllabusSubjects) }} />
   
    </div>
  )
}

export default CoursePageExamPattern