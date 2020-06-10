function countdown(minutes) {
    // jsPsych.endCurrentTimeline();
    let seconds = 60;
    let mins = minutes;
    function tick() {
        //This script expects an element with an ID = "counter". You can change that to what ever you want. 
        let counter = document.getElementById("counter");
        // let counter = '';
        let current_minutes = mins-1
        seconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
            console.log(seconds);
        } else {
            if(mins > 1){
                countdown(mins-1);           
            }
            else if (seconds == 0) { //ends experiment when timer reaches 0
                jsPsych.endCurrentTimeline();
            }
        }
    }
    tick();

}



// var input = document.getElementById("myInput");
// input.addEventListener("keyup", function(event) {
//   if (event.keyCode === 32) {
//    event.preventDefault();
//    document.getElementById("startTimer").click();
//   }
// });


// document.addEventListener("keydown", checkKeyPressed, false);

// function checkKeyPressed(e) {
// 	if (e.keyCode === 32) {
// 		console.log("press");
// 	}
// }

