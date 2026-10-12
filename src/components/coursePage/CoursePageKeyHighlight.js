import React from 'react'
import CourseContentHeading from './CourseContentHeading'
import Link from 'next/link'
import { cleanHTML } from '@/lib/cleanHTML';

const CoursePageKeyHighlight = ({ id, courseData,screenSize,title, specializationData }) => {
  const keyHighlight = specializationData?.sections?.key_highlights ?? courseData?.sections?.key_highlights;
  return (
     <div id={id} className='content_card'>
    <CourseContentHeading title={title} />
    <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(keyHighlight) }} />
    </div>
  )
}

export default CoursePageKeyHighlight