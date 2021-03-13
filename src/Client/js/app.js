//create a new date for coutdown 

//api for pixabay


//api for Weatherbit



//api for Geonames
const baseURL = "http://api.geonames.org/searchJSON?q=";
const search = "&maxRows=1&"
const apiKey = "username=marjeanm";

// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener("click", performAction);

/* Function called by event listener */
function performAction(event){
    event.preventDefault();
   //countdown
  //find the distance between now and the future date 
  let picker = document.getElementById("picker").value;
  let tripDay = new Date(picker).getTime();
  let today = new Date().getTime();
  let distance = tripDay - today;
  let days = Math.floor(Math.abs(distance / (1000 * 60 * 60 * 24)));
  document.getElementById("show").innerHTML = days;
//geo name 
  const cityName = document.getElementById("city").value;
  getCity(baseURL,cityName,search,apiKey)

  .then(function(data){
    console.log("data:", data);
    postData('http://localhost:8080/add', {latitude: data.geonames[0].lat, longitude: data.geonames[0].lng, country: data.geonames[0].countryName});
})
.then(function( ) {
  updateUI();
})
}

/* Function to GET Web API Data/geonames*/
const getCity = async (baseURL ,cityName,search, apiKey)=>{
  const res = await fetch(baseURL+cityName+search+apiKey)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }catch (error) {
    console.log("error", error);
  }
};



/* Function to POST data  geonames*/
const postData = async (url = '', data = {}) =>{
  console.log("postData Function running", data);

  const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

  try {
    const newData = await response.json();

    return newData
    
  }catch(error){
    console.log('error',error)
  }
};




/* Function to GET Project Data geonames */
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const newData = await request.json();
    console.log(newData)
    document.getElementById('lat').innerHTML = `latitude: ${newData.latitude}`;
    document.getElementById('long').innerHTML = `longitude: ${newData.longitude}`;
    document.getElementById('country').innerHTML =`country: ${newData.country}`;
    
  }catch (error){
    console.log('error error ');
  }
}
export { performAction }