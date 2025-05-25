import { useState, useEffect, useRef } from "react";
//import './App.css'
import search from './assets/search.png'

const App = () => {
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState([]);
  const input=useRef(null)
  const [city,setcity]=useState('london')

  

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b130f2b2f02704e1069d6cb27c2d90a1`

        const response = await fetch(url);
        const result = await response.json();

        if (result.cod !== 200) {
        alert("City not found. Please enter a valid city name.");
        input.current.value=""
        return;
        }
        
        setloading(false);
        setdata(result);
        //console.log(input.current.value)
        //console .log(result)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
    fetchData();
  }, [city]);

  if (loading) return <h1>loading....</h1>;
  return (
    
    <div className=" h-dvh sm:py-20 flex justify-center bg-amber-500 ">

      <div className=" min-w-[300px] flex-col w-full sm:w-2xl border-2 border-amber-600 flex sm:flex-row bg-linear-to-t from-sky-400 to-indigo-400 sm:rounded-4xl ">
      <div className=" ml-4 mr-4  flex flex-col  pt-2">
        <div className="flex gap-2  mb-2 h-10">
        <input ref={input} type={"text"} placeholder="search for cites.." className=" rounded-4xl border-none outline-none w-full text-amber-50 text-lg"/>
        <img  onClick={()=>{
          //setcity((input.current.value))
          if (input.current.value.trim() !== "") {
          setcity(input.current.value.trim());
          }
        }}src={search} alt="search image" className="size-8  m-auto active:size-6"/>
        </div>
        <div>
        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} className="size-60 "/>
        <div className=" flex flex-col gap-3 pb-3 pl-2">
        <p className=" text-6xl  text-amber-50">{Math.round(data.main.temp)}<sup className=" text-amber-600" >°C</sup></p>
        <p className=" text-lg  text-amber-50 pl-2 mr-2 border-b-2  border-amber-200 shadow-amber-200 shadow-2xl ">Monday , 16:00</p>
        <p className=" text-lg  text-amber-50 pl-2 my-10">Feels like {Math.round(data.main.feels_like)}<sup className=" text-lg text-amber-600" >°C</sup> </p>
        </div>
      
        
        </div>


      </div>
      <div className="pl-7 grid grid-cols-2 gap-10 bg-linear-to-b from-sky-500 to-sky-400  sm:bg-linear-to-t sm:from-sky-400 sm:to-indigo-400 sm:place-content-evenly">
        <div className="w-32 h-32 border-2 border-amber-300 rounded-3xl  text-amber-50 pl-2 pt-2">Wind Speed<p className="text-4xl mt-2  text-amber-50">{Math.round(data.wind.speed)}m/s</p></div>
        <div className="w-32 h-32 border-2 border-amber-300 rounded-3xl  text-amber-50  pl-2 pt-2">Humidity<p className="text-4xl mt-2  text-amber-50">{Math.round(data.main.humidity)}%</p></div>
        <div className="w-32 h-32 border-2 border-amber-300 rounded-3xl  text-amber-50  pl-2 pt-2">Visibility<p className="text-4xl mt-2 text-amber-50">{Math.round(data.visibility/1000)}km</p></div>
        <div className="w-32 h-32 border-2 border-amber-300 rounded-3xl  text-amber-50  pl-2 pt-2">sunset & sunrise<p className="text-4xl mt-2 v">7/s</p></div>
        

      </div>


      </div>
    </div>











    
  )
};

//background: linear-gradient(to top left, #B7C965, #C4BF97);
//background: -webkit-linear-gradient(to top left, #B7C965, #C4BF97);
//background: -moz-linear-gradient(to top left, #B7C965, #C4BF97);
//https://hexcolor.co/generate-color-gradient
export default App;


