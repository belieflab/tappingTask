/* create timeline */
let timeline = []; // this needs to be first in code or it will error

/* define welcome message trial */
let welcome = {
  type: "html-keyboard-response",
  stimulus: '<h1 style="color:white; ">Welcome to the Finger Tapping experiment!</h1>' +
  '<p style="color:white; ">Press the 1 key to continue.</p>', //by default, jsPysch is white background and white text
  choices: [49],
};

/* define experiment end message */

let endExperiment = {
  type: "html-keyboard-response",
  stimulus: '<h2 style="color:white; ">Thank you for participating!</h2>' +
  '<p style="color:white; ">Press the 1 key to exit. Then wait for further instructions.</p>', //by default, jsPysch is white background and white text
  choices: [49],
  // on_load: checkHandedness(),
};

/* define instructions trial */
let instructions_1 = {
  type: "html-keyboard-response",
  stimulus: '<h2 style="color:white">This is a test of your finger speed.</p>' +
    '<h2 style="color:white">We want to see how many times you can press the spacebar in 10 seconds.</h2>' +
    '<h2 style="color:white">You will start with the hand that you use when writing.</h2>' +
    '<h2 style="color:white">After each 10 second trial, you will switch hands.</h2>' +
    '<p style="color:white">Press the 1 key to continue the instructions.</p>',
  choices: [49], //without this, it can be any keyboard response
};

let instructions_2 = {
  type: "html-keyboard-response",
  stimulus: '<h2 style="color:white">While testing, you must keep your hand in the position pictured below.</h2>' +
  '<img src="stim/handposition1.jpg" width="400" height="300"> &nbsp&nbsp <img src="stim/handposition2.jpg" width="400" height="300">' +
  '<h2 style="color:white">Keep your non-pointer finger curled and your thumb under your pointer finger.</h2>'+
  '<p style="color:white">Press the 1 key to continue.</p>',
  choices: [49]
  };

  let instructions_3 = {
  type: "html-keyboard-response",
  stimulus: '<h2 style="color:white">Before we start, lets try a few practice trials.</h2>' +
  '<h2 style="color:white; ">The screen is going to countdown from 5 to 1 before each trial.</h2>' +
  '<h2 style="color:white; ">When the screen says:</h2>' +
  '<h1 style="color:green; "> "Go!"</h1>' +
  '<h2 style="color:white; ">Tap the SPACEBAR as fast as you can.</h2>' +
  '<h2 style="color:white; ">Remember to use the hand position shown earlier.</h2>' +
  '<h3 style="color:white; ">Stay in that position for each trial and do not use your whole hand or wrist or arm to press the spacebar.</h2>' +
  '<h2 style="color:white; ">Just use your pointer finger to tap.</h2>' +
  '<p style="color:white; ">Press the 1 key to begin.</p>',
  choices: [49]
  };

  let instructions_4 = {
    type: "html-keyboard-response",
    stimulus: '<h2 style="color:white">Try this one for practice.</h2>' +
    '<h3 style="color:white">Do you have any questions?</h3>' +
    '<p style="color:white">Press the 1 key to start the practice trial.</p>',
    choices: [49]
};

let experimentStartInst = {
    type: "html-keyboard-response",
    stimulus: '<p style="color:white">The experiment will now begin.</p>' +
    '<p style="color:white">If you need more practice, refresh your browser to repeat the instructions and practice trials.</p>' +
    '<p style="color:white">Do you have any questions?</p>' +
    '<p style="color:white">If not, press the 1 key to start the first trial.</p>',
    choices: [49]
};

let promptDominant = { 
  type: 'html-keyboard-response',
  stimulus: '<p id="counter" style="text-align:center; color:white; ">Get ready to tap with your ' + handedness + ' hand.</p>',  //+
  //'<p style="color:white; ">Press the SPACEBAR to start tapping.</p>',
//   choices: [32], //Spacebar
choices: jsPsych.NO_KEYS,
  on_finish: countdown(1),
  trial_duration: 5000,
}

let countDownTap = { 
  type: 'html-keyboard-response',
  stimulus: '<p style="color:white; " id="countdown"></p>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 6000,
}

let startTimer = {
  type: "html-keyboard-response",
  stimulus: '<p id="timer" style="text-align:center; color:green; ">Go!</p>',
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

let stopTapping = { 
    type: 'html-keyboard-response',
    stimulus: '<p style="text-align:center; color:red; ">Stop!</p>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
    on_finish: function(data) {
        blockIterator++
      },
  }

  let practiceStopTapping = { 
    type: 'html-keyboard-response',
    stimulus: '<p style="text-align:center; color:red; ">Stop!</p>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000,
  }

let tapNondominant = { // I think this is the object for collecting responses //
  type: "html-keyboard-response",
  choices: [32],
  response_ends_trial: true,
  stimulus: jsPsych.timelineVariable('stimulus'), //This loads the array of your stimulus order
  data: jsPsych.timelineVariable('data'), //Data is a method (function), saves and knows to write it later
  prompt: '<p hidden id="counter" style="text-align:center; color:white; "></p>',
  on_finish: function (data) {
    console.log(data.key_press)
    data.subjectKey = 'GUID';
    data.src_subject_id = workerID;
    data.site = siteNumber;
    data.interview_date = today;
    data.interview_age = ageAtAssessment;
    data.sex = sexAtBirth;
    data.block = blockIterator;
    data.index = experimentIterator;
    experimentIterator++
  }
}

let practiceTapNondominant = { // I think this is the object for collecting responses //
  type: "html-keyboard-response",
  choices: [32],
  response_ends_trial: true,
  stimulus: jsPsych.timelineVariable('stimulus'), //This loads the array of your stimulus order
  data: jsPsych.timelineVariable('data'), //Data is a method (function), saves and knows to write it later
  prompt: '<p hidden id="counter" style="text-align:center; color:white; "></p>',
  on_finish: function (data) {
    console.log(data.key_press)
    data.block = "practice";
    data.index = -1;
  }
}

let promptNondominant = { // 
  type: 'html-keyboard-response',
  stimulus: '<p id="counter" style="text-align:center; color:white; ">Get ready to tap with your ' + antihandedness + ' hand.</p>',  //+
  //'<p style="color:white; ">Press the SPACEBAR to start tapping.</p>',
  //choices: [32], //Spacebar
  choices: jsPsych.NO_KEYS,
  trial_duration: 5000,
  response_ends_trial: false,
  on_finish: countdown(1),
}

let tapDominant = { // I think this is the object for collecting responses //
  type: "html-keyboard-response",
  choices: [9,' '],
  response_ends_trial: true,
  stimulus: jsPsych.timelineVariable('stimulus'), //This loads the array of your stimulus order
  data: jsPsych.timelineVariable('data'), //Data is a method (function), saves and knows to write it later
  prompt: '<p hidden id="counter" style="text-align:center; color:white; "></p>',
  on_finish: function (data) {
    console.log(data.key_press)
    data.subjectKey = 'GUID';
    data.src_subject_id = workerID;
    data.site = siteNumber;
    data.interview_date = today;
    data.interview_age = ageAtAssessment;
    data.sex = sexAtBirth;
    data.block = blockIterator;
    data.index = experimentIterator;
    experimentIterator++
  }
}

let practiceTapDominant = { // I think this is the object for collecting responses //
  type: "html-keyboard-response",
  choices: [9,' '],
  response_ends_trial: true,
  stimulus: jsPsych.timelineVariable('stimulus'), //This loads the array of your stimulus order
  data: jsPsych.timelineVariable('data'), //Data is a method (function), saves and knows to write it later
  prompt: '<p hidden id="counter" style="text-align:center; color:white; "></p>',
  on_finish: function (data) {
    console.log(data.key_press)
    data.block = "practice";
    data.index = -1;
  }
}
