const baseURL = "http://api.geonames.org/searchJSON?q=";
const search = "&maxRows=1&"
const apiKey = "username=marjeanm";

// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener("click", performAction);

/* Function called by event listener */
function performAction(event){
    event.preventDefault();
  //const feeling = document.getElementById('feelings').value;
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

/* Function to GET Web API Data*/
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



/* Function to POST data */
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




/* Function to GET Project Data */
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