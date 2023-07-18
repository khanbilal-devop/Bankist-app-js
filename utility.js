// It caluclates current time and updates in the inner html of the pass element
const currentTime = (htmlElement)  =>{
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";
  
    if(hh == 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
     ss = (ss < 10) ? "0" + ss : ss;
      
     let time = hh + ":" + mm + " " + session;
     htmlElement.innerText = time;
     setTimeout(function(){ currentTime(htmlElement) }, 60000);
  }


  // It return the difference between passed date and current date in days
  const calcDaysFromCurrentDate = date => {
    let difference =
      new Date().getTime() - stringToDate(date, 'dd/MM/yyyy', '/').getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
  };


// it convert's passed string into date . Need to specify the date format and the delimiter used
// Eg : 18/07/2023 (_format 'dd/MM/yyyy' , _delimiter : '/'
  const stringToDate = (_date, _format, _delimiter) => {
    const formatLowerCase = _format.toLowerCase();
    const formatItems = formatLowerCase.split(_delimiter);
    const dateItems = _date.split(_delimiter);
    const monthIndex = formatItems.indexOf('mm');
    const dayIndex = formatItems.indexOf('dd');
    const yearIndex = formatItems.indexOf('yyyy');
    let month = parseInt(dateItems[monthIndex]);
    month -= 1;
    return new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
  }
  

// based on day hour it woul return appropriates day's greeting
  const greetingsBasedOnHrs = (hour) =>  hour < 17 ? (hour < 12? 'Good morning': 'Good afternoon') : 'Good evening';