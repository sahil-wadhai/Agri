'use client'
import {useState,useEffect} from 'react'

export default function page() {
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorous, setPhosphorous] = useState("");
  const [pottasium, setPottasium] = useState("");
  const [ph, setPh] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const[crop,setCrop] = useState("")

  const submitLogin = async () => {
    
    const config = {
      method:"POST",
      data : {
        "nitrogen": nitrogen,
        "phosphorous": phosphorous,
        "pottasium": pottasium,
        "ph": ph,
        "rainfall": rainfall,
        "state":state,
        "city":city
      },
      headers: {
        "Content-Type": "application/json" 
      }
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/crop-recommend", config);
      const data = await res.json();
      setCrop(data.crop)
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
      <h1 className='text-center mb-12'>Find out the most suitable crop to grow in your farm</h1>
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
        <div className="mb-5">
          <label htmlFor="ph" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Soil pH level</label>
          <input type="number" id="ph" value={ph} onChange={ (e)=>{setPh(e.target.value)} } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the value (example:50)" required />
        </div>
        <div className="mb-5">
          <label htmlFor="rainfall" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rainfall (in mm)</label>
          <input type="number" id="rainfall" value={rainfall} onChange={ (e)=>{setRainfall(e.target.value)} } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the value (example:50)" required />
        </div>
        
        <div className='mb-5'>
          <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your State</label>
          <select id="state" value={state} onChange={ (e)=>{setState(e.target.value)} } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>Select City</option>
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </select>
        </div>
        <div className='mb-5'>
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your City</label>
          <select id="city" value={city} onChange={ (e)=>{setCity(e.target.value)} } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>Select City</option>
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </select>
        </div>
        
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Recommend</button>
      </form>
      <p className={crop?'text-center pb-12':'hidden'} onClick={(e)=>{setCrop("")}}> Crop : {crop}</p>
    </div>
  )
}
