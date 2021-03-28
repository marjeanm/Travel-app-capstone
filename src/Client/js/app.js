

  // api for pixabay 
  const PixUrl = "https://pixabay.com/api/?";
  const PixKey = "key=20738675-30b19f083024a2db5a5f5aee5&q=";
  const image ="&image_type=photo"

  //api for Geonames
const baseURL = "http://api.geonames.org/searchJSON?q=";
const search = "&maxRows=1&"
const apiKey = "username=marjeanm";


//api for weatherbit 
const baseWurl = 'http://api.weatherbit.io/v2.0/forecast/daily?units=I&lat=';
const long = "&lon=";
const weatherKey ="&key=c93e38df2a1247dea4bb3e0dbf3ffaa1";

//GET GEONAMES API
const getGeoData = async(baseURL, cityName,search,apiKey) =>{
  console.log('Processing Geodata')
  const res = await fetch(baseURL+ cityName+search+apiKey);
  try{
  const data = await res.json();
  return data;
   } catch(error){
     console.log("error",error);
   }
}
//GET WEATHER API
const getWeather = async(lat1, long1) =>{
  console.log('processing Weather Data');
  const res = await fetch(baseWurl+lat1+long+long1+weatherKey);
  try{
    const data = await res.json();
    console.log(lat1,long1);
    return data;
  } catch(error){
    console.log('error',error)
  }
}
const getImage = async(cityName)=>{
  console.log('pressing pixabay');
  const res = await fetch(PixUrl+PixKey+cityName+image);
  try{
    const data = await res.json();
    console.log();
    return data;   
    }catch(error){
      console.log("error",error);
    }
  }
  document.getElementById('generate').addEventListener("click", performAction)
  function performAction(e){
    e.preventDefault();
    //COUNTDOWN DAYS

    let picker = document.getElementById('picker').value;
    let tripDay = new Date(picker).getTime();
    let today = new Date().getTime();
    let distance = tripDay - today;    
  let days = Math.floor(Math.abs(distance / (1000 * 60 * 60 * 24)));

 //Assigning days to the INNER HTML 
 document.getElementById('show').innerHTML= `Your trip is in ${days} days !`;
  let cityName = document.getElementById('city').value;

  //CALL BACK TO GEODATA 
  getGeoData(baseURL,cityName,search,apiKey)
  .then(geoData =>{
    console.log("geoData", geoData);
    const lat1 = geoData.geonames[0].lat;
    const long1 = geoData.geonames[0].lng;
    const  name = geoData.geonames[0].name;
    console.log(geoData.geonames[0].lng)
      console.log(geoData.geonames[0].lat)
      console.log(geoData.geonames[0].name);
      postData('http://localhost:8080/add',{latitude: geoData.geonames[0].lat,
      show: days,
      longitude: geoData.geonames[0].lng,
      country: geoData.geonames[0].countryName,
      travelLocation: geoData.geonames[0].name
    })
   
  
 
      //WEATHER POST CALL
  
         
       if(days <= 16){
  getWeather(lat1,long1)   
    .then(weatherData =>{  
    console.log('weatherData', weatherData);     
     console.log(weatherData.data[0].high_temp);
    console.log(weatherData.data[0].low_temp);
    console.log(weatherData.data[0].weather.description);
       postData('http://localhost:8080/add', {
      hightemp: weatherData.data[0].high_temp,
      lowtemp: weatherData.data[0].low_temp,
      currentTemp: weatherData.data[0].temp
   
    })
  })
} else {
  alert('Weather is not available after 16 days')
  document.getElementById('picker').value= "";
}  
 })
///CALL BACK to IMAGEDATA 
getImage(cityName).then(imageData =>{
  console.log('imageData',imageData);
  document.getElementById('blob').setAttribute('src',imageData.hits[0].webformatURL);
  postData('http://localhost:8080/add',{
    img: imageData.hits[0].webformatURL
  });
  })
  .then(function (){
    updateUI();
  });
  
  }
const updateUI = async() => {
  const req = fetch('http://localhost:8080/all');
  try{
    const newData = await (await req).json();
    document.getElementById('travelLocation').innerHTML = `City name:${newData.travelLocation}`;
                        document.getElementById('country').innerHTML = `country: ${newData.country}`;
                        document.getElementById('hightemp').innerHTML = ` high temp: ${newData.lowtemp}`;
                        document.getElementById('lowtemp').innerHTML = ` low temp: ${newData.hightemp}`;
                        document.getElementById('currentTemp').innerHTML = `current temp: ${newData.currentTemp}`;
  }catch(error){
    console.log('error',error);
  }
}
  const postData = async(url ='',data ={}) =>{
    console.log("postData Function running", data)
    const res = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',  
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  try{
    const newData = await res.json();
    
    return newData
    
  }catch(error){
    console.log('error',error)
  }
}



export{performAction}