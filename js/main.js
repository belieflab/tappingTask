/* create timeline */
let timeline = []; // this needs to be first in code or it will error
  
/* define welcome message trial */
let welcome = {
  type: "html-keyboard-response",
  stimulus: '<p style="color:white; font-size:18px">Welcome to the next part of the FINGER TAPPING experiment!</p>' + '<br>' + '<p style="color:white; font-size:18px">Press the SPACEBAR to continue.</p>', //by default, jsPysch is white background and white text
  choices: [32],
  // on_load: checkHandedness(),
};

/* define experiment end message */

let endExperiment = {
    type: "html-keyboard-response",
    stimulus: '<p style="color:white; font-size:18px">Thank you for participating!</p>' + '<br>' + '<p style="color:white; font-size:18px">Press the 1 key to exit. Then wait for further instructions.</p>', //by default, jsPysch is white background and white text
    choices: [49],
    // on_load: checkHandedness(),
};

/* define instructions trial */
let instructions_1 = {
  type: "html-keyboard-response",
  stimulus: '<p style="color:white; font-size:18px">Now your goal is to tap at the same speed as the tone you hear.</p>' +
  '<p style="color:white; font-size:18px">When the trial begins, a count down from 10 will start that counts down at the same pace that you will be tapping. Each number from 10 to 1 is accompanied by the same tone that you will try and tap along with during the trial</p>' +
  '<p style="color:white; font-size:18px">You will only tap with the hand that you use when writing. Use the SPACEBAR to tap.</p>' + '<br>' +
  '<p style="color:white; font-size:18px">Press the 1 key to continue the instructions.</p>',
  choices: [49], //without this, it can be any keyboard response
};


let instructions_2 = {
  type: "html-keyboard-response",
  stimulus: '<p style="color:white; font-size:18px">After the count down, you will see a "+" symbol and continue to hear the tone.</p>' + '<p style="color:white; font-size:18px">When you see the "+" symbol, listen carefully and continue to tap the SPACEBAR at the same rate with the tone.</p>' + '<br>' + 
  '<p style="color:white; font-size:18px">Press the 1 key to continue.</p>',
  choices: [49]
};


let instructions_3 = {
  type: "html-keyboard-response",
  stimulus: '<img src="stim/instructions_3.png" width="800" height="600" />',
  choices: [49]
};


let instructions_4 = {
  type: "html-keyboard-response",
  stimulus: '<p style="color:white; font-size:18px">Do you have any questions?</p>' + '<br>' + '<p style="color:white; font-size:18px">Press the 1 key to start the first trial.</p>',
  choices: [49]
};

let instructions_5 = {
  type: "html-keyboard-response",
  stimulus: '<p style="color:white; font-size:18px">Try this one for practice.</p>' + 
  '<p style="color:white; font-size:18px">Do your best to keep tapping at the same rate as the tone.</p>' + '<br>' + '<p style="color:white; font-size:18px">Do you have any questions?</p>' + '<br>' + '<p style="color:white; font-size:18px">Press the 1 key to start the first trial.</p>',
  choices: [49]
};

let experimentStartInst = {
  type: "html-keyboard-response",
  stimulus: '<p style="color:white; font-size:18px">The experiment will now begin.</p>' + 
  '<p style="color:white; font-size:18px">If you need more practice, refresh your browser to repeat the instructions and practice trials.</p>' + '<br>' + '<p style="color:white; font-size:18px">Do you have any questions?</p>' + '<br>' + '<p style="color:white; font-size:18px">If not, press the 1 key to start the first trial.</p>',
  choices: [49]
};

/* START TRAINING TRIAL FOR PARTICIPANTS */

let getReady = { 
  type: 'html-button-response',
  stimulus: '<p id="counter" style="text-align:center; color:white; font-size:30px">Get Ready To Tap!</p>',
  button_html: '<button id="countdownPrompt" style = "outline:none; border:none; background-color:gray" onclick="countdown()" onkeypress="countdown()"></button>', //7.15.20 this used to have START in it which was displayed for some reason
  choices: jsPsych.NO_KEYS, //Spacebar
  trial_duration: 5000,
  on_load: function() {
  document.getElementByID("countdownPrompt").focus() // getElementByID is camel case variable naming
  }
}

let countDown = { 
  type: 'audio-keyboard-response', //html is the most versatile. Use html-keyboard-response and stuff as many things in it as possible
  stimulus: audio,
  prompt: function(){
      return countdownTrial[j];
  },
  choices: [32],
  response_ends_trial: false,
  trial_duration: 500,
  on_finish: function(){
      j++
  },
}

let tapTone = { // Collects responses for tone paced tapping for the first 250 ms
  type: "audio-keyboard-response",
  choices: [32],
  response_ends_trial: false,
  trial_ends_after_audio: false,
  trial_duration: 250,
  // trial_ends_after_audio: true,
  stimulus: "stim/50msec.wav",
  on_finish: function (data) {
      console.log(data.key_press)
      j=0; //this has to be reset to 0 for the countdown to work. j is left at 10 in countdown.
      },
  // stimulus: function() { return "Stimuli/50msec.wav" },
  prompt: '<p style="text-align:center; color:white; font-size:30px">+</p>',
}

let toneITI = { // this was added to capture taps before the next tone in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
  type: 'html-keyboard-response',
  stimulus: '<p id="counter" style="text-align:center; color:white; font-size:30px">+</p>',
  choices: [32], //Spacebar
  response_ends_trial: false,
  on_finish: function (data) {
      console.log(data.key_press)
      },
  trial_duration: 250,
}

let tapNoTone = { // this was added to capture taps before the next tap interval in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
  type: 'html-keyboard-response',
  stimulus: '<p id="counter" style="text-align:center; color:white; font-size:30px">+</p>',
  choices: [32], //Spacebar
  response_ends_trial: false,
  on_finish: function (data) {
      console.log(data.key_press)
      },
  trial_duration: 250,
}

let noToneITI = { // this was added to capture taps before the next tap interval in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
  type: 'html-keyboard-response',
  stimulus: '<p id="counter" style="text-align:center; color:white; font-size:30px">+</p>',
  choices: [32], //Spacebar
  response_ends_trial: false,
  on_finish: function (data) {
      console.log(data.key_press)
      },
  trial_duration: 250,
}

  let instProcedure = { //This loops over the object
    timeline: [welcome, instructions_1, instructions_2, instructions_3, instructions_4, instructions_5], 
  }    

  ////////////////PRACTICE PROCEDURES/////////////
  
let practiceProcedureCountDown = { //This loops over the object
  timeline: [countDown], //if you put fixation in front and the feedback after, it will display those in that order
  //timeline_variables: stimuliTone,
  randomize_order: false,// This is the outer procedure, looping over the stimuli
  timeline_variables: countdown_practice_stim
}
  
  let procedureCountDown = { //This loops over the object
    timeline: [countDown], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    timeline_variables: countdown_experiment_stim
  }

  let procedureTone = { //This loops over the object
    timeline: [tapTone, toneITI], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    repetitions: 12,
  }

  let procedureNoTone = { //This loops over the object
    timeline: [tapNoTone, noToneITI], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    repetitions: 30,
  }

  let endExperimentProcedure = { //This loops over the intrudction objects
    timeline: [endExperiment], 
  }    
  
  timeline.push(instProcedure)
  timeline.push(getReady, practiceProcedureCountDown, procedureTone, procedureNoTone)// PRACTICE
  timeline.push(experimentStartInst)
  timeline.push(getReady, procedureCountDown, procedureTone, procedureNoTone)// BLOCK 1
  timeline.push(getReady, procedureCountDown, procedureTone, procedureNoTone)// BLOCK 2
  timeline.push(getReady, procedureCountDown, procedureTone, procedureNoTone)// BLOCK 3
  timeline.push(getReady, procedureCountDown, procedureTone, procedureNoTone)// BLOCK 4
  timeline.push(getReady, procedureCountDown, procedureTone, procedureNoTone)// BLOCK 5
  timeline.push(getReady, procedureCountDown, procedureTone, procedureNoTone)// BLOCK 6
  timeline.push(endExperimentProcedure)