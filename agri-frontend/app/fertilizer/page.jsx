'use client'
import {useState,useEffect} from 'react'

export default function page() {
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorous, setPhosphorous] = useState("");
  const [pottasium, setPottasium] = useState("");
  const[crop,setCrop] = useState("")

  const[fertilizer,setFertilizer] = useState("")

  const submitLogin = async () => {
    
    const config = {
      method:"POST",
      data : {
        "nitrogen": nitrogen,
        "phosphorous": phosphorous,
        "pottasium": pottasium, 
        "crop":crop
      },
      headers: {
        "Content-Type": "application/json" 
      }
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/fertilizer-recommend", config);
      const data = await res.json();
      setFertilizer(data.fertilizer)
      console.log(res);
    }
    catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  }
  return (
    <div className='object-center px-4 pt-10 text-3xl font-sans bg-[#CECEE4] min-h-screen'>
      <h1 className='text-center mb-12'>Get informed advice on fertilizer based on soil</h1>
      <form className="max-w-sm mx-auto pb-12" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="nitrogen" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nitrogen</label>
          <input type="number" id="nitrogen" value={nitrogen} onChange={ (e)=>{setNitrogen(e.target.value)} } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the value (example:50)" required />
        </div>
        <div className="mb-5">
          <label htmlFor="phosphorous" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phosphorous</label>
          <input type="number" id="phosphorous" value={phosphorous} onChange={ (e)=>{setPhosphorous(e.target.value)} } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the value (example:50)" required />
        </div>
        <div className="mb-5">
          <label htmlFor="pottasium" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pottasium</label>
          <input type="number" id="pottasium" value={pottasium} onChange={ (e)=>{setPottasium(e.target.value)} } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the value (example:50)" required />
        </div>
        <div className='mb-5'>
          <label htmlFor="crop" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Crop you want to grow</label>
          <select id="crop" value={crop} onChange={ (e)=>{setCrop(e.target.value)} } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>Select Crop</option>
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </select>
        </div>
        
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Recommend</button>
      </form>
      <p className={fertilizer?'text-center pb-12':'hidden'} onClick={(e)=>{setFertilizer("")}}> Fertilizer : {fertilizer}</p>
    </div>
  )
}
