'use client'
import {useState,useEffect} from 'react'
import parse from 'html-react-parser';

export default function page() {
  let text = " Achalpur | Aheri | Ahmednagar | Ahmedpur | Ajara | Akkalkot | Akola | Akole | Akot | Alibagh | Amagaon | Amalner | Ambad | Ambejogai | Amravati | Arjuni Merogaon | Arvi | Ashti | Atpadi | Aurangabad | Ausa | Babhulgaon | Balapur | Baramati | Barshi Takli | Barsi | Basmatnagar | Bassein | Beed | Bhadrawati | Bhamregadh | Bhandara | Bhir | Bhiwandi | Bhiwapur | Bhokar | Bhokardan | Bhoom | Bhor | Bhudargad | Bhusawal | Billoli | Brahmapuri | Buldhana | Butibori | Chalisgaon | Chamorshi | Chandgad | Chandrapur | Chandur | Chanwad | Chhikaldara | Chikhali | Chinchwad | Chiplun | Chopda | Chumur | Dahanu | Dapoli | Darwaha | Daryapur | Daund | Degloor | Delhi Tanda | Deogad | Deolgaonraja | Deori | Desaiganj | Dhadgaon | Dhanora | Dharani | Dhiwadi | Dhule | Dhulia | Digras | Dindori | Edalabad | Erandul | Etapalli | Gadhchiroli | Gadhinglaj | Gaganbavada | Gangakhed | Gangapur | Gevrai | Ghatanji | Golegaon | Gondia | Gondpipri | Goregaon | Guhagar | Hadgaon | Hatkangale | Hinganghat | Hingoli | Hingua | Igatpuri | Indapur | Islampur | Jalgaon | Jalna | Jamkhed | Jamner | Jath | Jawahar | Jintdor | Junnar | Kagal | Kaij | Kalamb | Kalamnuri | Kallam | Kalmeshwar | Kalwan | Kalyan | Kamptee | Kandhar | Kankavali | Kannad | Karad | Karjat | Karmala | Katol | Kavathemankal | Kedgaon | Khadakwasala | Khamgaon | Khed | Khopoli | Khultabad | Kinwat | Kolhapur | Kopargaon | Koregaon | Kudal | Kuhi | Kurkheda | Kusumba | Lakhandur | Langa | Latur | Lonar | Lonavala | Madangad | Madha | Mahabaleshwar | Mahad | Mahagaon | Mahasala | Mahaswad | Malegaon | Malgaon | Malgund | Malkapur | Malsuras | Malwan | Mancher | Mangalwedha | Mangaon | Mangrulpur | Manjalegaon | Manmad | Maregaon | Mehda | Mekhar | Mohadi | Mohol | Mokhada | Morshi | Mouda | Mukhed | Mul | Mumbai | Murbad | Murtizapur | Murud | Nagbhir | Nagpur | Nahavara | Nanded | Nandgaon | Nandnva | Nandurbar | Narkhed | Nashik | Navapur | Ner | Newasa | Nilanga | Niphad | Omerga | Osmanabad | Pachora | Paithan | Palghar | Pali | Pandharkawada | Pandharpur | Panhala | Paranda | Parbhani | Parner | Parola | Parseoni | Partur | Patan | Pathardi | Pathari | Patoda | Pauni | Peint | Pen | Phaltan | Pimpalner | Pirangut | Poladpur | Pune | Pusad | Pusegaon | Radhanagar | Rahuri | Raigad | Rajapur | Rajgurunagar | Rajura | Ralegaon | Ramtek | Ratnagiri | Raver | Risod | Roha | Sakarwadi | Sakoli | Sakri | Salekasa | Samudrapur | Sangamner | Sanganeshwar | Sangli | Sangola | Sanguem | Saoner | Saswad | Satana | Satara | Sawantwadi | Seloo | Shahada | Shahapur | Shahuwadi | Shevgaon | Shirala | Shirol | Shirpur | Shirur | Shirwal | Sholapur | Shri Rampur | Shrigonda | Shrivardhan | Sillod | Sinderwahi | Sindhudurg | Sindkheda | Sindkhedaraja | Sinnar | Sironcha | Soyegaon | Surgena | Talasari | Talegaon S.Ji Pant | Taloda | Tasgaon | Thane | Tirora | Tiwasa | Trimbak | Tuljapur | Tumsar | Udgir | Umarkhed | Umrane | Umrer | Urlikanchan | Vaduj | Velhe | Vengurla | Vijapur | Vita | Wada | Wai | Walchandnagar | Wani | Wardha | Warlydwarud | Warora | Washim | Wathar | Yavatmal | Yawal | Yeola | Yeotmal ";
  const maharashtra_cities = text.split("|");
  const soil_types = ["Sandy","Loamy","Black","Red","Clayey"]
  const crops = ['Barley', 'Cotton',  'Ground Nuts', 'Maize',  'Millets', 'Oil seeds',  'Paddy', 'Pulses',  'Sugarcane',  'Tobacco',  'Wheat']
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorous, setPhosphorous] = useState("");
  const [pottasium, setPottasium] = useState("");
  const [moisture, setMoisture] = useState("");
  const [state, setState] = useState("Maharashtra");
  const [city, setCity] = useState("");
  const [soil, setSoil] = useState("");
  const [crop, setCrop] = useState("");


  const[fertilizer,setFertilizer] = useState("")
  const[advice,setAdvice] = useState("<div></div>")

  const submitLogin = async () => {
    const data = {
      "nitrogen": nitrogen,
      "phosphorous": phosphorous,
      "pottasium": pottasium,
      "moisture": moisture,
      "soil": soil,
      "crop": crop,
      "state":state,
      "city":city
    }
    const config = {
      method:"POST",
      body : JSON.stringify(data),
      headers: {
        "Content-Type": "application/json" 
      }
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/fertilizer-recommend", config,{ cache: 'no-store' });
      const data = await res.json();
      setFertilizer(data.fertilizer)
      setAdvice(data.advice)
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
        <div className="mb-5">
          <label htmlFor="moisture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Soil Moisture</label>
          <input type="number" id="moisture" value={moisture} onChange={ (e)=>{setMoisture(e.target.value)} } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the value (example:50)" required />
        </div>
        <div className='mb-5'>
          <label htmlFor="soil" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Soil Type</label>
          <select id="soil" value={soil} onChange={ (e)=>{setSoil(e.target.value)} } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>Select Soil</option>
            {soil_types.map((soil)=>
              (<option value={soil}>{soil}</option>)
            )}
          </select>
        </div>
        <div className='mb-5'>
          <label htmlFor="crop" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Crop you want to grow</label>
          <select id="crop" value={crop} onChange={ (e)=>{setCrop(e.target.value)} } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>Select Crop</option>
            {crops.map((crop)=>
              (<option value={crop}>{crop}</option>)
            )}
          </select>
        </div>
        <div className='mb-5'>
          <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your State</label>
          <select id="state" value={state} onChange={ (e)=>{setState(e.target.value)} } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {/* <option>Select City</option> */}
            <option value="Maharashtra">Maharashtra</option>
          </select>
        </div>
        <div className='mb-5'>
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your City</label>
          <select id="city" value={city} onChange={ (e)=>{setCity(e.target.value)} } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>Select City</option>
            {maharashtra_cities.map((city)=>
              (<option value={city}>{city}</option>)
            )}
            
          </select>
        </div>
        
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Recommend</button>
      </form>
      <p className={fertilizer?'text-center pb-12':'hidden'} onClick={(e)=>{setFertilizer("")}}>"{fertilizer} is a best fertilizer for cultivation of {crop} based on given environmental conditions "</p>
      {/* {parse(advice)} */}
    </div>
  )
}
