import React,{useEffect,useState} from "react";
import './App.css';

function App() {
  const [country,setCountry] = useState([]);
  const [state,setState] = useState([]);
  const [city,setCity] = useState([]);
  const [ipCountry,setIpCountry] = useState("");
  const [ipState,setIpState] = useState("");
  const [ipCity,setIpCity] = useState("");
  const [check1,setCheck1] = useState(true); 
  const [check2,setCheck2] = useState(true); 
  const apiCall = async(url)=>{
    try{
      let response = await fetch(url);
      let data = await response.json();
      return data;

    }catch(err){
      console.log(err.response)
    }
  
  }

  useEffect(()=>{
    
    let resCountry = apiCall("https://crio-location-selector.onrender.com/countries");
    resCountry.then((coun)=>setCountry(coun));
    
  },[])

  useEffect(()=>{
    if(ipCountry){
    let resState = apiCall(`https://crio-location-selector.onrender.com/country=${ipCountry}/states`);
    if(ipCountry==="India"){
      resState.then((ele)=>{
        if(ele.length === 1){
          throw new Error('status code 500')
        }
    })}
    resState.then((st)=>setState(st));
    setCheck1(false)
    }else{
      setCheck1(true);
    }
  },[ipCountry])

  useEffect(()=>{
    if(ipState && ipCountry){
      
    let resCity = apiCall(`https://crio-location-selector.onrender.com/country=${ipCountry}/state=${ipState}/cities`);
    resCity.then((ci)=>setCity(ci))
    setCheck2(false);
    }
  },[ipState,ipCountry])

  return (
    <div className="App">
      <h1>Select Location</h1>
      <div className="selectDiv">
         <div style={{border:"1px solid black",width:"50%",height:"50px"}}>
            <select value={ipCountry} onChange={(e)=>setIpCountry(e.target.value)} style={{width:"100%",height:"100%",paddingLeft:".5rem",}} >
              <option>Select Country</option>
              {
               country.length? country.map((ele)=>{
                  return <option value={ele}>{ele}</option>

                }):""
              }
               
            </select>
         </div>
         <div style={{border:"1px solid black",width:"20%",height:"50px"}}>
            <select value={ipState} onChange={(e)=>setIpState(e.target.value)} style={{width:"100%",height:"100%",paddingLeft:".5rem"}} disabled={check1} >
            <option>Select State</option>
            {
               state.length?state.map((ele)=>{
                  return <option value={ele}>{ele}</option>

                }):""
              }
            </select>
         </div>

         <div style={{border:"1px solid black",width:"20%",height:"50px"}}>
            <select value={ipCity} onChange={(e)=>setIpCity(e.target.value)} style={{width:"100%",height:"100%",paddingLeft:".5rem"}} disabled={check2} >
               <option>Select City</option>
               {
                city.length?city.map((ele)=>{
                  return <option value={ele}>{ele}</option>

                }):""
              }
            </select>
         </div>
         
      </div>
      {ipCity?<p>You selected {ipCity},{ipState},{ipCountry}</p>:""}
    </div>
  );
}

export default App;
