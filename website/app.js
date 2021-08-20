/*
Start Global Variables
*/

const key='fd2efef3805766767314ac66937661a7';
const generate=document.querySelector('#generate');
const zipCode=document.querySelector('#zip');
const feeling=document.querySelector('#feeling');
const date=document.querySelector('#date');
const temp=document.querySelector('#temp');
const content=document.querySelector('#content');
const form=document.querySelector('form'); 
/*
End Global Variables
*/

/*
Start Helper Functions 
*/


const getDate=()=>{
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
return newDate;

}
/*
End Helper Functions 
*/




/*
Start Main Functions 
*/



const requestData= async ()=>{
  if(isNaN(zipCode.value)){
    alert('zip code values are only numbers');
    throw new Error("zip codes can only be numbers")
  }
  try{
  const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value},us&appid=${key}&units=metric`);
  const responseJson= await response.json();
  if(responseJson.cod==="404")
  {
    alert('there is no city with this zip code ');
    throw new Error('there no city with this zipcode');
  }
  console.log(responseJson);

  }
  catch(error){
    console.log(error);  
  }

}
/*
Start Event Listeners
*/



 generate.addEventListener('click',requestData);

 form.addEventListener('submit',(e)=>{
  e.preventDefault();
})
/*
End Event Listeners
*/

 







