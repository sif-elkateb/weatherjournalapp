/*
Start Global Variables
*/

const key='fd2efef3805766767314ac66937661a7';
const generate=document.querySelector('#generate');
const zipCode=document.querySelector('#zip');
const feeling=document.querySelector('#feelings');
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
  //create date object
let d = new Date();
// get full date in the format month.day.year 
// getMonth() return months zero indexed so i added 1 
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
return newDate;

}
const updateUI=(userData)=>{
  temp.innerHTML='Temperature:&nbsp;&nbsp;&nbsp;&nbsp;'+userData.currentTemp+'&nbsp;celsius';
  content.innerHTML='Feeling Today:&nbsp;&nbsp;&nbsp;&nbsp;'+userData.userFeeling;
  date.innerHTML='Date:&nbsp;&nbsp;&nbsp;&nbsp;'+userData.currentDate;

}
/*
End Helper Functions 
*/




/*
Start Main Functions 
*/
const getData= async()=>{
try{
  const response= await fetch('/getdata');
  const userData = await response.json();
  console.log(userData);
  updateUI(userData);
  
}
catch(error){
  console.log(error);
}

}


const postData= async (responseJson)=>{
  try{
    const currentDate=getDate();
    const userFeeling=feeling.value;
    const currentTemp=responseJson.main.temp;
    const userData={
      currentDate,
      userFeeling,
      currentTemp,
    }
    await fetch('/postdata',{
      method:'POST',
      credentials: 'same-origin',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)   
    })
    
  }
  catch(error){
    console.log(error);

  }

}

const requestData= async ()=>{
  try{
  if(zipCode.value===""||feeling.value===""){
    alert("please enter both zipCode and how do you feel ");
    throw new Error("Either zipCode or feeling not provided")
  }
  if(isNaN(zipCode.value)){
    alert('zip code values are only numbers');
    throw new Error("zip codes can only be numbers")
  }
  const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value},us&appid=${key}&units=metric`);
  const responseJson= await response.json();
  if(responseJson.cod==="404")
  {
    alert('there is no city with this zip code ');
    throw new Error('there no city with this zipcode');
  }
  await postData(responseJson);
  getData();

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


 







