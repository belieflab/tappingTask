/* create timeline */
let timeline = [];

// timeline.push({stimulus: '<p style="text-align:center; color:green; font-size:100px">Go!</p>', data: {test_part: 'tap', correct_response: ' '}})

/* define welcome message trial */
let welcome = {
  type: "html-keyboard-response",
  stimulus: '<p style="color:black; font-size:40px">Welcome to the FINGER TAPPING experiment!</p>' + '<br>' + '<p style="color:black; font-size:40px">Press the SPACEBAR to continue.</p>', //by default, jsPysch is white background and black text
  choices: [32],
};

/* define instructions trial */
let instructions_1 = {
  type: "html-keyboard-response",
  stimulus: '<p style="color:black; font-size:30px">This is a test of your finger speed.</p>' +
    '<p style="color:black; font-size:30px">We want to see how many times you can press the SPACEBAR in 10 seconds.</p>' +
    '<p style="color:black; font-size:30px">You will start with the hand that you use when writing.</p>' +
    '<p style="color:black; font-size:30px">After each 10 second trail, you will switch hands.</p>' + '<br>' +
    '<p style="color:black; font-size:30px">Press the SPACEBAR to continue the instructions.</p>',
  choices: [32], //without this, it can be any keyboard response
};

let instructions_2 = {
  type: "html-keyboard-response",
  stimulus: '<p style="color:black; font-size:30px">Do you WRITE with your LEFT hand or RIGHT hand?</p>' +
  '<p style="color:black; font-size:30px">Press 1 for LEFT hand or 2 for RIGHT hand.</p>',
  choices: [49, 50],
};


let instructions_3 = {
  type: "html-keyboard-response",
  stimulus: '<p style="color:black; font-size:30px">While testing, you must keep your hand in the position pitured below.</p>' + '<img src="Stimuli/handposition1.jpg" width="600" height="300" /><img src="Stimuli/handposition2.jpg" width="600" height="300" />' + '<br>' + 
  '<p style="color:black; font-size:30px">Keep your non-pointer finger curled and your thumb under your pointer finger.</p>'+ '<br>' + 
  '<p style="color:black; font-size:30px">Press the SPACEBAR to continue.</p>',
  choices: [32]
  };

  let instructions_4 = {
  type: "html-keyboard-response",
  stimulus: '<p style="color:black; font-size:30px">Before we start, lets try a few practice trials.</p>' + '<p style="color:black; font-size:30px">The screen is going to count down from 5 before each trial.</p>' + '<p style="color:black; font-size:30px">When the screen says: </p>' + '<p style="color:green; font-size:30px"> "GO!"</p>' + '<p style="color:black; font-size:30px">Tap the SPACEBAR as fast as you can.</p>' + '<p style="color:black; font-size:30px">Remember to use the hand position shown earlier.</p>' + '<p style="color:black; font-size:30px">Stay in that position for each trial and do not use your whole hand or wrist or arm to press the SPACEBAR.</p>' + '<p style="color:black; font-size:30px">Just use your pointer finger to tap.</p>' + '<p style="color:black; font-size:30px">Press the SPACEBAR to begin.</p>',
  choices: [32]
  };


let promptLeft = { 
  type: 'html-keyboard-response',
  stimulus: '<p id="counter" style="text-align:center; color:white; font-size:30px">Get ready to tap with you LEFT hand.</p>'  +
  '<p style="color:white; font-size:30px">Press the SPACEBAR to start tapping.</p>',
  choices: [32], //Spacebar
  on_finish: countdown(1),
}

let countDownTap = { 
  type: 'html-keyboard-response',
  stimulus: '<p style="color:black; font-size:60px;" id="countdown"></p>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 6000,
}

let startTimer = {
  type: "html-keyboard-response",
  stimulus: '<p id="timer" style="text-align:center; color:white; font-size:30px"></p>',
  trial_duration: 1000,
  on_finish: function experimentTimer(minutes) {// jsPsych on_finish cannot handle nested functions, you have to directly paste it in.
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
                jsPsych.endCurrentTimeline();
              seconds = 10;
            }
        }
    }
    tick();
}
}

let tapLeft = { // I think this is the object for collecting responses //
  type: "html-keyboard-response",
  choices: [32],
  response_ends_trial: true,
  stimulus: jsPsych.timelineVariable('stimulus'), //This loads the array of your stimulus order
  data: jsPsych.timelineVariable('data'), //Data is a method (function), saves and knows to write it later
  prompt: '<p hidden id="counter" style="text-align:center; color:white; font-size:30px"></p>',
  on_finish: function (data) {
    console.log(data.key_press)
  }
}

let promptRight = { // 
  type: 'html-keyboard-response',
  stimulus: '<p id="counter" style="text-align:center; color:white; font-size:30px">Get ready to tap with you LEFT hand.</p>'  +
  '<p style="color:white; font-size:30px">Press the SPACEBAR to start tapping.</p>',
  choices: [32], //Spacebar
  on_finish: countdown(1),
}

let tapRight = { // I think this is the object for collecting responses //
  type: "html-keyboard-response",
  choices: [9,' '],
  response_ends_trial: true,
  stimulus: jsPsych.timelineVariable('stimulus'), //This loads the array of your stimulus order
  data: jsPsych.timelineVariable('data'), //Data is a method (function), saves and knows to write it later
  prompt: '<p hidden id="counter" style="text-align:center; color:white; font-size:30px"></p>',
  on_finish: function (data) {
    console.log(data.key_press)
  }
}