'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import About from '@/components/About'
import Services from '@/components/Services'
export default function Page() {
  const pathname = usePathname()
 
  return (
    <>
      <About/>
      <div className='my-20'></div>
      <Services/>
    </>
  )
}