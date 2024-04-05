import Link from "next/link"
export default function Services() {
  return (
    <>
        <h1 className='text-center text-5xl font-sans text-[#323648] p-20 font-normal'>Our Services</h1>
        <div className="grid grid-cols-2 gap-8 px-10 mx-20 mb-20">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link href="/crop">
                    <img className="rounded-t-lg" src="/crop.png" alt="" />
                </Link>
                <div className="p-5">
                    <Link href="/crop">
                        <h5 className="mb-2 text-2xl text-[#323648] tracking-wide leading-relaxed font-medium">Crop</h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Recommendation about the type of crops to be cultivated which is best suited for the respective conditions</p>
                    <Link href="/crop" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Predict
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </Link>
                </div>
            </div>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link href="/fertilizer">
                    <img className="rounded-t-lg" src="/fert.jpg" alt="" />
                </Link>
                <div className="p-5">
                    <Link href="/fertilizer">
                        <h5 className="mb-2 text-2xl text-[#323648] tracking-wide leading-relaxed font-medium">Fertilizer</h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Recommendation about the type of fertilizer best suited for the particular soil and the recommended crop</p>
                    <Link href="/fertilizer" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Predict
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    </>
  )
}
