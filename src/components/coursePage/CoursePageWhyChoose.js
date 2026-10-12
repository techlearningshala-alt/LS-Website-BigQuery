import React from 'react'
import CourseContentHeading from './CourseContentHeading'
import Link from 'next/link'
import { cleanHTML } from '@/lib/cleanHTML';

const CoursePageWhyChoose = ({ id, courseData,screenSize,title, specializationData }) => {
    const whyChoose = specializationData?.sections?.why_choose ?? courseData?.sections?.why_choose;
    return (
        <div id={id} className='content_card'> 
            <CourseContentHeading title={title} />
            <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(whyChoose) }} />
           
        </div>
    )
}

export default CoursePageWhyChoose