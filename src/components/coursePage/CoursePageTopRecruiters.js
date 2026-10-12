import React from 'react'
import CourseContentHeading from './CourseContentHeading'
import { cleanHTML } from '@/lib/cleanHTML';

const CoursePageTopRecruiters = ({ id, courseData,screenSize,title, specializationData }) => {
    const topRecruiters = specializationData?.sections?.top_recruiters ?? courseData?.sections?.top_recruiters;
    return (
        <div id={id} className='content_card'> 
            <CourseContentHeading title={title} />
            <div className="rich_text" dangerouslySetInnerHTML={{ __html: cleanHTML(topRecruiters) }} />
           
        </div>
    )
}

export default CoursePageTopRecruiters