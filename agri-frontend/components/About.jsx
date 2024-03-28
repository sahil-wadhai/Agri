export default function About() {
 
    return (
      <>
        <h1 className='text-center text-5xl font-sans text-[#323648] py-20 font-normal'>About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10 ">
          <img className="w-full aspect-video object-cover" src="/about.jpg" />
          <div className="w-full text-balance" >
            <p className='text-2xl text-[#323648] tracking-wide leading-relaxed font-normal py-4'>
              IMPROVING AGRICULTURE, IMPROVING LIVES, CULTIVATING CROPS TO MAKE FARMERS INCREASE PROFIT.
            </p>
            <p className='text-[#707579] tracking-wide leading-relaxed font-normal'>
              We use state-of-the-art machine learning and deep learning technologies to help you guide 
              through the entire farming process. Make informed decisions to understand the demographics 
              of your area, understand the factors that affect your crop and keep them healthy for a 
              super awesome successful yield.
            </p>
          </div>
        </div>
      </>
    )
}
