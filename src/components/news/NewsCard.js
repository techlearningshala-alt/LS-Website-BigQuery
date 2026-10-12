import React from 'react'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, CircleUser, ShieldCheck, UserRound } from 'lucide-react'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'

const NewsCard = ({ data }) => {

  return (
    <Card className="relative mx-auto w-full pt-0 overflow-hidden shadow-xl hover:shadow-lg group border border-transparent transition-all duration-300 h-full">
    <Image
      src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${data?.thumbnail}`}
      alt={data?.h1_tag}
      width={400}
      height={250}
      className="relative z-20 w-full aspect-auto"
    />
    <CardHeader className="px-4">
      <p className="flex items-center justify-between gap-3 mb-2 flex-wrap">
        <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none font-semibold">
          {data?.category_title}
        </Badge>

        {/* <span className="text-[12px] text-muted-foreground items-center gap-2 hidden md:flex">
          <ClockIcon className="h-4 w-4" />8 min read
        </span> */}
        <span className="text-[12px] text-muted-foreground flex items-center gap-1">
          <Calendar className="h-3 w-3" /> {formatDate(data?.updated_at)}
        </span>
      </p>

      <CardTitle className="text-[14px] font-bold md:text-[16px] line-clamp-2 group-hover:text-primary transition-all duration-200">{data?.h1_tag}</CardTitle>
      <CardDescription className="text-muted-foreground line-clamp-2">
        {data?.short_description}
      </CardDescription>
    </CardHeader>
   
    <p className="text-muted-foreground px-4 flex justify-between items-center"><span className="text-[12px] flex items-center gap-1">
      {data?.author_image && (
        <Image src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}${data?.author_image}`} alt={data?.author_name} width={25} height={25} className="rounded-full" />
      )}
      {data?.author_name && (
        <span>{data?.author_name}</span>
      )}
      
       </span><span className="flex items-center gap-1 font-semibold text-green-500 !text-[12px]"><ShieldCheck className="h-4 w-4 text-green-500" /> LS Verified</span></p>
  </Card>
  )
}

export default NewsCard