function experimentTimer(minutes) {
    // jsPsych.endCurrentTimeline();
    let seconds = 10;
    let mins = minutes;
    function tick() {
        //This script expects an element with an ID = "counter". You can change that to what ever you want. 
        // let counter = document.getElementById("counter");
        // let counter = '';
        let current_minutes = mins-1
        seconds--;
        // counter = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds); //comment out .innerHTML method to hide the timer
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
            console.log(seconds);
        } else {
            if(mins > 1){
                countdown(mins-1);           
            }
            else if (seconds == 0) { //ends experiment when timer reaches 0
                // jsPsych.endCurrentTimeline();
               // seconds = 10;
            }
        }
    }
    tick();
}


function countdown(){ // initialize timer
    let sec = 5; // set timer in seconds
    let counTdown = setInterval(function(){
    document.getElementById('countdown').innerHTML=sec;
    sec--;
    if (sec < 0) {
        sec = 5;
      } 
    }, 1000);
  }

//   function experimentTimer(){ // initialize timer
//     let seconds = 10; // set timer in seconds
//     let counTdown = setInterval(function(){
//     document.getElementById('experimentTimer').innerHTML=sec;
//     seconds--;
//     console.log(seconds)
//     if (seconds < 0) {
//         seconds = 10;
//         while (stimuliLeft.length > 0) {
//         stimuliLeft.pop()       
//         }
//         while (stimuliRight.length > 0) {
//         stimuliRight.pop()       
//         }
//       } 
//     }, 1000);
//   }