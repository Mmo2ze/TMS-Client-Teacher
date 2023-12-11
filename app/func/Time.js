function toHoursAndMinutes(totalSeconds) {
    const totalMinutes = Math.floor(totalSeconds / 60);
    if(totalSeconds > 60*60*24-1 || totalSeconds< 0)
    return "invalid number "
    var P = "AM"
    var hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if(hours > 12 ){
        hours -=12;
        P = "PM"
    }
    return { H: hours, M: minutes, P: P };
  }
  

function TimeToSecond(timeString ) {
    const timeArray = timeString.split(":");
    const hours = parseInt(timeArray[0], 10);
    const minutes = parseInt(timeArray[1], 10);
  
    const totalSeconds = hours * 3600 + minutes * 60;
    return totalSeconds;
}

export default {toHoursAndMinutes,TimeToSecond}