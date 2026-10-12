import React from 'react'
import MainHeading from '../shared/MainHeading'
import { Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import { globalStore } from '@/lib/store'
import Link from 'next/link'

const Contactus = () => {
   const { email, phone , helpDeskEmail ,companyName , gstNumber, address } = globalStore;
    return (
        <div className='sec_mb'>
            <div className='grid grid-cols-12 gap-4 lg:gap-8'>
                <div className='col-span-12 md:col-span-4 bg-gray-100 p-8 rounded-3xl'>
                    <Image className='mb-3' src="/images/about/inquiries-icon.webp" width={50} height={50} alt="inquiries" />
                     <h3 className='font-bold text-xl mb-4'>Inquiries</h3>
                    <p className='font-medium text-sm text-gray-500 mb-2'>Sales Inquiries - </p>
                   <p> <Link href={`tel:${phone.get()}`} className='inline-flex items-center gap-2 text-sm font-bold mb-2'><Phone className='w-4 h-4' /> {phone.get()}</Link></p>
                   <p> <Link href={`mailto:${email.get()}`} className='inline-flex items-center gap-2 text-sm font-bold mb-3'><Mail className='w-4 h-4' /> {email.get()}</Link></p>
                    {/* <p className='font-medium text-sm text-gray-500 mb-2'>Help Desk - </p>
                    <p><Link href={`mailto:${helpDeskEmail.get()}`} className='inline-flex items-center gap-2 text-sm font-bold mb-3'><Mail className='w-4 h-4' /> {helpDeskEmail.get()}</Link></p> */}
                </div>

                <div className='col-span-12 md:col-span-4 bg-gray-100 p-8 rounded-3xl'> <Image className='mb-3' src="/images/about/addresses-icon.webp" width={50} height={50} alt="address" /><h3 className='font-bold text-xl mb-4'>Our Addresses</h3>
                    <p className='font-medium text-sm text-gray-500 mb-2'>Noida Office - </p>
                    <p className='flex items-center gap-2 text-sm font-bold mb-2'>{address.get()}</p>

                    {/* <p className='font-medium text-sm text-gray-500 mb-2'>Registered Office - </p>
                    <p className='flex items-center gap-2 text-sm font-bold mb-3'>{address.get()}</p> */}
                </div>
                
                <div className='col-span-12 md:col-span-4 bg-gray-100 p-8 rounded-3xl'> <Image className='mb-3' src="/images/about/company-icon.webp" width={50} height={50} alt="company name" /><h3 className='font-bold text-xl mb-4'>Company</h3>
                    <p className='font-medium text-sm text-gray-500 mb-2'>Company Name - </p>
                    <p className='flex items-center gap-2 text-sm font-bold mb-2'>{companyName.get()}</p>
                   
                    {/* <p className='font-medium text-sm text-gray-500 mb-2'>GST Number - </p>
                    <p className='flex items-center gap-2 text-sm font-bold mb-3'>{gstNumber.get()}</p> */}
                </div>
            </div>
        </div>
    )
}

export default Contactus