import React from 'react'
import CourseContentHeading from './CourseContentHeading'
import { cleanHTML } from '@/lib/cleanHTML'

const CoursePageSyllabusSubjects = ({ id, courseData,screenSize,title, specializationData }) => {
  const syllabusSubjects = specializationData?.sections?.syllabus_subjects ?? courseData?.sections?.syllabus_subjects;
  return (
    <div id={id} className='content_card'> 
    <CourseContentHeading title={title} />
    <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(syllabusSubjects) }} />
   
    </div>
  )
}

export default CoursePageSyllabusSubjects