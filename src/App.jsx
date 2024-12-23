import {useState } from 'react'
import './App.css'

function App() {

  const [apiData, setApiData] = useState(null)

  const [catchCity, setCatchCity] = useState('')

  const apiKey = 'dbee502200c5a09d25ea1c0595c75ab6'


  const fetchData = async (catchCity) => {
    try{  
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${catchCity}&appid=${apiKey}`)
      if(!res.ok){
        throw new Error (`HTTP Error: ${res.status}`)
      }
      const data = await res.json()
      setApiData(data)
    } catch(error){
      console.log(error.message)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    fetchData(catchCity)
  }

  return (
    <div className='p-5 bg-orange-300 rounded rounded-5 shadow-2xl w-[600px] mx-auto'>

      <form onSubmit={submitHandler}>
        <input className='p-2 w-[300px]' type="text" placeholder='Enter City...' onChange={(e)=> setCatchCity(e.target.value)}/>
        <button className='p-2 px-4 bg-blue-600 text-white ml-2' type='submit'>Fetch Weather</button>
      </form>

      <div className='mt-5 bg-white p-5'>
          {apiData && (
           <div>
              <h1 className='text-cente text-xl'>{`Weather Info of ${apiData.name}`}</h1>
              <h2 className='font-bold'>{`Temperature: ${apiData.main.temp}°C`}</h2>
              <ul className='text-left mt-5 flex flex-col gap-2'>
                <li>{`Feels_like: ${apiData.main.feels_like}`}</li>
                <li>{`Humidity: ${apiData.main.humidity}`}</li>
                <li>{`Pressure: ${apiData.main.pressure}`}</li>
              </ul>
           </div>
          )}
      </div>
    </div>
  )
}

export default App
