import React from 'react'
import ContentDrawer from '../custom/shared/drawer/ContentDrawer'
import SecondaryButton from '../custom/shared/SecondaryButton'
import PrimaryButton from '../custom/shared/PrimaryButton'
import { Badge } from '../ui/badge'
import { Grip, UserRound } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import useWindowSize from '@/lib/use-window-size'
import { useLeadForm } from '@/context/LeadFormContext'
import { useLeadGuard } from '../auth/useLeadGuard'

const NewsMobileStickyFooter = ({ allCategories }) => {
  // console.log(allCategories,"allCategories");
  const screenSize = useWindowSize();

  const { showLeadForm } = useLeadForm();
  const { withVerification } = useLeadGuard();
  return (
    <>
    {screenSize && screenSize.width < 768 && ( 
 <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-gradient-to-t from-background via-background to-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-2xl z-40">
 <div className="flex justify-between items-center gap-4 px-4 py-4">
   
   <div className="w-1/2">
     <ContentDrawer
       trigger={<SecondaryButton title="Blog Categories" icon={<Grip className="w-4 h-4" />} iconPos="left" />}
       title="All Blog Categories"
       content={
         <ul>
           {allCategories?.map((category) => (
           <Link key={category.name} href={`/blog/category/${category.category_slug}`} target="_self">
             <li className="text-sm bg-gray-100 p-4 rounded-2xl transition-all font-bold text-foreground  hover:text-primary flex items-center gap-4 justify-between mb-2">
               <span className="line-clamp-1"> {category.title}</span>
               <Badge className="px-1.5 rounded-full bg-foreground/7 text-foreground">
             {category.updated_at ? formatDate(category.updated_at) : ''}
               </Badge>
             </li></Link>
           ))}
         </ul>
       }
     />
   </div>

   <div className="w-1/2">
     

     <div onClick={(e) => {
                      if (!withVerification()) {
                        e.preventDefault(); // ⛔ stop navigation
                        showLeadForm("apply to course from course page banner");
                        return;
                      }
                      toast.success("Applied to this course successfully");
                    }}><PrimaryButton title="Talk to an Expert" icon={<UserRound className="w-4 h-4" />} iconPos="left" /></div>
   </div>

 </div>
</div>
)}</>
  )
}

export default NewsMobileStickyFooter