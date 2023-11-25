const time_calculated = (seconds) => {
    if(seconds <=0){
        return "0 hours and 0 minutes"
    }
    const hours = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds % 3600) / 60);
    return `Time  ${hours<10?"0"+hours:hours}:${minute<10?"0"+minute:minute}`
  };
  
  // Example usage:
  const totalSeconds = 3665; // Replace with your desired number of seconds
  console.log(time_calculated(3664))