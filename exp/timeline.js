/* create timeline */
let timeline = []; // this needs to be first in code or it will error
  
/* define welcome message trial */
let welcome = {
  type: "html-keyboard-response",
  stimulus: '<h1 style="color:white;">Welcome to the next part of the Finger Tapping experiment!</h2>' +
  '<p style="color:white;">Press the 1 key to continue.</p>', //by default, jsPysch is white background and white text
  choices: [49],
  // on_load: checkHandedness(),
};

/* define experiment end message */

let endExperiment = {
    type: "html-keyboard-response",
    stimulus: '<h2 style="color:white">Thank you for participating!</h2>' +
    '<p style="color:white;">Press the 1 key to exit. Then wait for further instructions.</p>', //by default, jsPysch is white background and white text
    choices: [49],
    // on_load: checkHandedness(),
};

/* define instructions trial */
let instructions_1 = {
  type: "html-keyboard-response",
  stimulus: '<h2 style="color:white;">Your goal is to tap at the same speed as the tones you hear.</h2>' +
  '<h2 style="color:white">When each new trial starts, a countdown will begin at the same pace that you will be tapping.<h2>'+
  '<h2 style="color:white">Each number from 10 to 1 is accompanied by tones that you will try and tap along with during each trial.</h2>' +
  '<h2 style="color:white">Unlike last time, you will <i>only</i> tap the spacebar with the hand you use for writing</h2>' +
  '<p style="color:white">Press the 1 key to continue.</p>',
  choices: [49], //without this, it can be any keyboard response
};

let instructions_2 = {
  type: "html-keyboard-response",
  stimulus: '<h2 style="color:white">After the countdown reaches 1, you will see a "+" symbol presented with the tones.</h2>' +
  '<h3 style="color:white">When you see the "+" symbol, listen carefully and continue tapping the spacebar at the same rate as the tones.</h3>' +
  '<p style="color:white; ">Press the 1 key to continue.</p>',
  choices: [49]
};


let instructions_3 = {
  type: "html-keyboard-response",

  stimulus: '<p style="color:white; ">In summary:</p>'+
  '<img src="stim/summary.png" width="800" height="400">',
  prompt:   '<p style="color:white; ">Press the 1 key to continue.</p>',
  choices: [49]
};


let instructions_4 = {
  type: "html-keyboard-response",
  stimulus: '<h2 style="color:white; ">Do you have any questions?</h2>' +
  '<p style="color:white; ">If not, press the 1 key to start the practice trial.</p>',
  choices: [49]
};

let instructions_5 = {
  type: "html-keyboard-response",
  stimulus: '<h2 style="color:white; ">Try this one for practice.</h2>' + 
  '<h2 style="color:white; ">Do your best to keep tapping at the same rate as the tones.</h2>' +
  '<p style="color:white; ">Press the 1 key to start the first trial.</p>',
  choices: [49]
};

let experimentStartInst = {
  type: "html-keyboard-response",
  stimulus: '<h2 style="color:white; ">The experiment will begin now.</h2>' + 
  '<h3 style="color:white; ">If you need more practice, refresh your browser to repeat the instructions and practice trials.</h3>' +
  '<h2 style="color:white; ">Do you have any questions?</h2>' +
  '<p style="color:white; ">If not, press the 1 key to start the first trial.</p>',
  choices: [49]
};

/* START TRAINING TRIAL FOR PARTICIPANTS */

let getReady = { 
  type: 'html-button-response',
  stimulus: '<h2 id="counter" style="text-align:center; color:white; ">Get Ready to Tap!</h2>',
  button_html: '<button id="countdownPrompt" style = "outline:none; border:none; background-color:gray" onclick="countdown()" onkeypress="countdown()"></button>', //7.15.20 this used to have START in it which was displayed for some reason
  choices: jsPsych.NO_KEYS, //Spacebar
  trial_duration: 5000,
  on_load: function() {
  document.getElementByID("countdownPrompt").focus() // getElementByID is camel case variable naming
  },
  on_finish: function(data) {
          blockIterator++
        },
  }

let countDown = { 
  type: 'audio-keyboard-response', //html is the most versatile. Use html-keyboard-response and stuff as many things in it as possible
  stimulus: tone,
  prompt: function(){
      return countdownTrial[j];
  },
  choices: [32],
  response_ends_trial: false,
  trial_duration: 500,
  on_finish: function(data){
      j++
      data.tap_type = "countdown";
      if (practiceIterator >= -94) {
          data.trial = practiceIterator;
          practiceIterator--;
          data.test_part = "practice";
        } else if (practiceIterator < -94) {
          data.trial = experimentIterator;
          experimentIterator++
          data.test_part = "experiment";
        }
      data.block = blockIterator;
  },
}

let tapTone = { // Collects responses for tone paced tapping for the first 250 ms
  type: "audio-keyboard-response",
  choices: [32],
  response_ends_trial: false,
  trial_ends_after_audio: false,
  trial_duration: 250,
  // trial_ends_after_audio: true,
  stimulus: tone,
  on_finish: function (data) {
      console.log(data.key_press)
      data.subjectkey = 'GUID';
      data.src_subject_id = workerId;
      data.interview_date = today;
      data.interview_age = ageAtAssessment;
      data.sex = sexAtBirth;
      j=0; //this has to be reset to 0 for the countdown to work. j is left at 10 in countdown.
      data.tap_type = "tone-paced";
      if (practiceIterator >= -94) {
          data.trial = practiceIterator;
          practiceIterator--;
          data.test_part = "practice";
        } else if (practiceIterator < -94) {
          data.trial = experimentIterator;
          experimentIterator++
          data.test_part = "experiment";
        }
      data.block = blockIterator;
      },
  // stimulus: function() { return "Stimuli/50msec.wav" },
  prompt: '<h1 style="text-align:center; color:white; ">+</h1>',
}

let toneITI = { // this was added to capture taps before the next tone in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
  type: 'html-keyboard-response',
  stimulus: '<h1 id="counter" style="text-align:center; color:white; ">+</h1>',
  choices: [32], //Spacebar
  response_ends_trial: false,
  on_finish: function (data) {
      console.log(data.key_press)
      data.subjectkey = 'GUID';
      data.src_subject_id = workerId;
      data.interview_date = today;
      data.interview_age = ageAtAssessment;
      data.sex = sexAtBirth;
      data.tap_type = "tone-paced";
      if (practiceIterator >= -94) {
          data.trial = practiceIterator;
          practiceIterator--;
          data.test_part = "practice";
        } else if (practiceIterator < -94) {
          data.trial = experimentIterator;
          experimentIterator++
          data.test_part = "experiment";
        }
      data.block = blockIterator;
      },
  trial_duration: 250,
}

let tapNoTone = { // this was added to capture taps before the next tap interval in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
  type: 'html-keyboard-response',
  stimulus: '<h1 id="counter" style="text-align:center; color:white; ">+</h1>',
  choices: [32], //Spacebar
  response_ends_trial: false,
  on_finish: function (data) {
      console.log(data.key_press)
      data.subjectkey = 'GUID';
      data.src_subject_id = workerId;
      data.interview_date = today;
      data.interview_age = ageAtAssessment;
      data.sex = sexAtBirth;
      data.tap_type = "self-paced";
      if (practiceIterator >= -94) {
          data.trial = practiceIterator;
          practiceIterator--;
          data.test_part = "practice";
        } else if (practiceIterator < -94) {
          data.trial = experimentIterator;
          experimentIterator++
          data.test_part = "experiment";
        }
      data.block = blockIterator;
      },
  trial_duration: 250,
}

let noToneITI = { // this was added to capture taps before the next tap interval in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
  type: 'html-keyboard-response',
  stimulus: '<h1 id="counter" style="text-align:center; color:white; ">+</h1>',
  choices: [32], //Spacebar
  response_ends_trial: false,
  on_finish: function (data) {
      console.log(data.key_press)
      data.subjectkey = 'GUID';
      data.src_subject_id = workerId;
      data.interview_date = today;
      data.interview_age = ageAtAssessment;
      data.sex = sexAtBirth;
      data.tap_type = "self-paced";
      if (practiceIterator >= -94) {
          data.trial = practiceIterator;
          practiceIterator--;
          data.test_part = "practice";
        } else if (practiceIterator < -94) {
          data.trial = experimentIterator;
          experimentIterator++
          data.test_part = "experiment";
        }
      data.block = blockIterator;
      },
  trial_duration: 250,
}