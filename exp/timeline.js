/* create timeline */
let timeline = [];

//////////////////////////////////////////////////
///////////////////INSTRUCTIONS//////////////////
////////////////////////////////////////////////

/* define welcome message */
let welcome = {
    type: "html-keyboard-response",
    stimulus: '<h1 style="color:white">Welcome to the last part of the Finger Tapping experiment!</h1>' +
    '<p style="color:white">Press the 1 key to continue.</p>', //by default, jsPysch is white background and white text
    choices: [49],
    // on_load: checkHandedness(),
};

/* define experiment end message */

let endExperiment = {
    type: "html-keyboard-response",
    stimulus: '<h2 style="color:white">Thank you for participating!</h2>' +
    '<p style="color:white">Press the 1 key to exit. Then wait for further instructions.</p>', //by default, jsPysch is white background and white text
    choices: [49],
    // on_load: checkHandedness(),
};

/* define break message */

let selfTimeBreak = {
    type: "html-keyboard-response",
    stimulus: '<h2 style="color:white">Please take a brief 30 second break.</h2>' +
    '<h3 style="color:white">The experiment will continue automatically, so please be prepared.</h3>', //by default, jsPysch is white background and white text
    choices: jsPsych.NO_KEYS,
    trial_duration: 30000,
    // on_load: checkHandedness(),
};

let secondHalfStart = {
    type: "html-keyboard-response",
    stimulus: '<h2 style="color:white">The experiment is going to start.</h2>' +
    '<h3 style="color:white">Get ready to start tapping.</h3>', //by default, jsPysch is white background and white text
    choices: jsPsych.NO_KEYS,
    trial_duration: 5000,
    // on_load: checkHandedness(),
};


/* define instructions trial */
let instructions_1 = {
    type: "html-keyboard-response",
    stimulus: '<h2 style="color:white">Just like last time, your goal is to tap at the same speed as the tones you hear.</h2>' +
    '<h2 style="color:white">This time, however, sometimes the tones will be slow and sometimes the tones will be fast.</h2>' +
    '<h3 style="color:white">When you see "Slow Tapping" you will be tapping along with the slower tones.</h3>' +
    '<h3 style="color:white">When you see "Fast Tapping" you will be tapping along with the faster tones.</h3>' +
    '<h2 style="color:white">Just like last time, you will tap the spacebar with the hand you use for writing.</h2>' +
    '<p style="color:white">Press the 1 key to continue.</p>',
    choices: [49], //without this, it can be any keyboard response
};


let instructions_2 = {
    type: "html-keyboard-response",
    stimulus: '<h2 style="color:white">When each new trial starts, a countdown will begin at the same pace that you will be tapping.<h2>'+
    '<h2 style="color:white">Each number from 10 to 1 is accompanied by the tone that you will try and tap along with during each trial.</h2>' +
    '<h2 style="color:white">Please tap along with each tone.</h2>' +
    '<h2 style="color:white">These first ten tones are practice and you should tap along with them to get the right pace.</h2>' +
    '<p style="color:white">Press the 1 key to continue.</p>',
    choices: [49]
};


let instructions_3 = {
    type: "html-keyboard-response",
    stimulus: '<h2 style="color:white">After the countdown reaches 1, you will see a "+" symbol presented with the tone.</h2>' + 
    '<h3 style="color:white">When you see the "+" symbol, listen carefully and continue tapping the spacebar at the same rate as the tone.</h3>' +
    '<p style="color:white">Press the 1 key to continue.</p>',
    choices: [49]
};

let instructions_4 = {
    type: "html-keyboard-response",
    stimulus: '<h2 style="color:white">After tapping for a while, the tone will suddenly stop.</h2>' +
    '<h2 style="color:white">Please continue tapping at the same rate!</h2>' +
    '<h2 style="color:white">Do your best to keep tapping at the same rate as the tone.</h2>' +
    '<h3 style="color:white">Do you have any questions?</h3>' +
    '<p style="color:white">Press the 1 key to continue.</p>',
    choices: [49]
};

let instructions_5 = {
    type: "html-keyboard-response",
    stimulus: '<h2 style="color:white">Try this one for practice.</h2>' +
    '<h2 style="color:white">Do your best to keep tapping at the same rate as the tone.</h2>' +
    '<h3 style="color:white">Do you have any questions?</h3>' +
    '<p style="color:white">Press the 1 key to start the practice trial.</p>',
    choices: [49]
};

let experimentStartInst = {
    type: "html-keyboard-response",
    stimulus: '<h2 style="color:white">The experiment will now begin.</h2>' +
    '<h3 style="color:white">If you need more practice, refresh your browser to repeat the instructions and practice trials.</h3>' +
    '<h2 style="color:white">Do you have any questions?</h2>' +
    '<p style="color:white">If not, press the 1 key to start the experiment.</p>',
    choices: [49]
};

//////////////////////////////////////////////////
/////////////////SLOW TAPPING OBJECTS////////////
////////////////////////////////////////////////

let stopTapping = {
  type: 'html-keyboard-response',
  stimulus: '<h1 style="text-align:center; color:white">Stop Tapping!</h1>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 5000,
}

/* Slow Tapping Condition Instruction Object */

let getReadySlow = { 
    type: 'html-button-response',
    stimulus: '<h2 id="counter" style="text-align:center; color:white">Slow Tapping</h2>' + '<h3 style="color:white">GET READY!</h3>',
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

/* Slow Countodwn Object */

let countDownSlow = { 
    type: 'audio-keyboard-response', //html is the most versatile. Use html-keyboard-response and stuff as many things in it as possible
    stimulus: tone,
    prompt: function(){
        return countdownTrial[j];
    },
    choices: [32],
    response_ends_trial: false,
    trial_duration: 500,
    data: jsPsych.timelineVariable('data'),
    on_finish: function(data){
    j++
    data.tap_type = "slow-countdown";
    if (practiceIterator >= -188) {
      data.trial = practiceIterator;
      practiceIterator--;
      data.test_part = "practice";
    } else if (practiceIterator < -188) {
      data.trial = experimentIterator;
      experimentIterator++
      data.test_part = "experiment";
    }
    if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
      data.condition = "number-match";
      timeVsNumIterator++
    } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
      data.condition = "time-tapping-match";
    }
    data.block = blockIterator;
    data.subjectKey = 'GUID';
    data.src_subject_id = workerId;
    data.interview_date = today;
    data.interview_age = ageAtAssessment;
    data.sex = sexAtBirth;
    }
}

/* Slow Tap w/ Tone Object */

let tapToneSlow = { // Collects responses for tone paced tapping for the first 250 ms
    type: "audio-keyboard-response",
    choices: [32],
    response_ends_trial: false,
    trial_ends_after_audio: false,
    trial_duration: 250,
    stimulus: tone,
    on_finish: function (data) {
        console.log(data.key_press);
        j=0;
        data.tap_type = "slow-tone-paced";
        if (practiceIterator >= -188) {
          data.trial = practiceIterator;
          practiceIterator--;
          data.test_part = "practice";
        } else if (practiceIterator < -188) {
          data.trial = experimentIterator;
          experimentIterator++
          data.test_part = "experiment";
        }
        if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
          data.condition = "number-match";
          timeVsNumIterator++
        } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
          data.condition = "time-tapping-match";
        }
        data.block = blockIterator;
        data.subjectkey = 'GUID';
        data.src_subject_id = workerId;
        data.interview_date = today;
        data.interview_age = ageAtAssessment;
        data.sex = sexAtBirth;
        },
    // stimulus: function() { return "Stimuli/50msec.wav" },
    prompt: '<h1 style="text-align:center; color:white">+</h1>',
}

/* 2nd Post-Tone Slow Tap Catchment Object */

let toneITISlow = { // this was added to capture taps before the next tone in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
    type: 'html-keyboard-response',
    stimulus: '<h1 id="counter" style="text-align:center; color:white">+</h1>',
    choices: [32], //Spacebar
    response_ends_trial: false,
    on_finish: function (data) {
        console.log(data.key_press);
        data.tap_type = "slow-tone-paced";
        if (practiceIterator >= -188) {
          data.trial = practiceIterator;
          practiceIterator--;
          data.test_part = "practice";
        } else if (practiceIterator < -188) {
          data.trial = experimentIterator;
          experimentIterator++
          data.test_part = "experiment";
        }
        if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
          data.condition = "number-match";
          timeVsNumIterator++
        } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
          data.condition = "time-tapping-match";
        }
        data.block = blockIterator;
        data.subjectkey = 'GUID';
        data.src_subject_id = workerId;
        data.interview_date = today;
        data.interview_age = ageAtAssessment;
        data.sex = sexAtBirth;
        },
    trial_duration: 250,
}

/* 1st Self-Paced Slow Tap Catchment Object */

let tapNoToneSlow = { // this was added to capture taps before the next tap interval in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
    type: 'html-keyboard-response',
    stimulus: '<h1 id="counter" style="text-align:center; color:white">+</h1>',
    choices: [32], //Spacebar
    response_ends_trial: false,
    on_finish: function (data) {
        console.log(data.key_press);
        data.tap_type = "slow-self-paced";
        if (practiceIterator >= -188) {
          data.trial = practiceIterator;
          practiceIterator--;
          data.test_part = "practice";
        } else if (practiceIterator < -188) {
          data.trial = experimentIterator;
          experimentIterator++
          data.test_part = "experiment";
        }
        if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
          data.condition = "number-match";
          timeVsNumIterator++
        } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
          data.condition = "time-tapping-match";
        }
        data.block = blockIterator;
        data.subjectkey = 'GUID';
        data.src_subject_id = workerId;
        data.interview_date = today;
        data.interview_age = ageAtAssessment;
        data.sex = sexAtBirth;
        },
    trial_duration: 250,
}

/* 2nd Self-Paced Slow Tap Catchment Object */

let noToneITISlow = { // this was added to capture taps before the next tap interval in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
    type: 'html-keyboard-response',
    stimulus: '<h1 id="counter" style="text-align:center; color:white">+</h1>',
    choices: [32], //Spacebar
    response_ends_trial: false,
    on_finish: function (data) {
        console.log(data.key_press);
        data.tap_type = "slow-self-paced";
        if (practiceIterator >= -188) {
          data.trial = practiceIterator;
          practiceIterator--;
          data.test_part = "practice";
        } else if (practiceIterator < -188) {
          data.trial = experimentIterator;
          experimentIterator++
          data.test_part = "experiment";
        }
        if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
          data.condition = "number-match";
          timeVsNumIterator++
        } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
          data.condition = "time-tapping-match";
        }
        data.block = blockIterator;
        data.subjectkey = 'GUID';
        data.src_subject_id = workerId;
        data.interview_date = today;
        data.interview_age = ageAtAssessment;
        data.sex = sexAtBirth;
        },
    trial_duration: 250,
}

//////////////////////////////////////////////////
/////////////////FAST TAPPING OBJECTS////////////
////////////////////////////////////////////////

/* Fast Tapping Condition Instruction Object */

let getReadyFast = { 
    type: 'html-button-response',
    stimulus: '<h2 id="counter" style="text-align:center; color:white">Fast Tapping</h2>' + '<h3 style="color:white">GET READY!</h3>',    button_html: '<button id="countdownPrompt" style = "outline:none; border:none; background-color:gray" onclick="countdown()" onkeypress="countdown()"></button>', //7.15.20 this used to have START in it which was displayed for some reason
    choices: jsPsych.NO_KEYS, //Spacebar
    trial_duration: 5000,
    on_load: function() {
    document.getElementByID("countdownPrompt").focus() // getElementByID is camel case variable naming
    }
}

/* Fast Countodwn Object */

let countDownFast = { 
    type: 'audio-keyboard-response', //html is the most versatile. Use html-keyboard-response and stuff as many things in it as possible
    stimulus: tone,
    prompt: function(){
        return countdownTrial[j];
    },
    choices: [32],
    trial_duration: 250,
    response_ends_trial: false,
    data: jsPsych.timelineVariable('data'),
    on_finish: function(data){
    j++//this shit is critical for the countdown to function properly.
    data.tap_type = "fast-countdown";
    if (practiceIterator >= -188) {
      data.trial = practiceIterator;
      practiceIterator--;
      data.test_part = "practice";
    } else if (practiceIterator < -188) {
      data.trial = experimentIterator;
      experimentIterator++
      data.test_part = "experiment";
    }
    if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
      data.condition = "number-match";
      timeVsNumIterator++
    } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
      data.condition = "time-tapping-match";
    }
    data.block = blockIterator;
    data.subjectkey = 'GUID';
    data.src_subject_id = workerId;
    data.interview_date = today;
    data.interview_age = ageAtAssessment;
    data.sex = sexAtBirth;
    }
}

/* Fast Tap w/ Tone Object */

let tapToneFast = { // Collects responses for tone paced tapping for the first 250 ms
    type: "audio-keyboard-response",
    choices: [32],
    response_ends_trial: false,
    trial_ends_after_audio: false,
    trial_duration: 125,
    stimulus: tone,
    on_finish: function (data) {
        console.log(data.key_press);
        j=0; // if you do not reset
        data.tap_type = "fast-tone-paced";
        if (practiceIterator >= -188) {
          data.trial = practiceIterator;
          practiceIterator--;
          data.test_part = "practice";
        } else if (practiceIterator < -188) {
          data.trial = experimentIterator;
          experimentIterator++
          data.test_part = "experiment";
        }
        if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
          data.condition = "number-match";
          timeVsNumIterator++
        } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
          data.condition = "time-tapping-match";
        }
        data.block = blockIterator;
        data.subjectkey = 'GUID';
        data.src_subject_id = workerId;
        data.interview_date = today;
        data.interview_age = ageAtAssessment;
        data.sex = sexAtBirth;
        },
    // stimulus: function() { return "Stimuli/50msec.wav" },
    prompt: '<h1 id="counter" style="text-align:center; color:white">+</h1>',
}

/* 2nd Post-Tone Fast Tap Catchment Object */

let toneITIFast = { // this was added to capture taps before the next tone in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
    type: 'html-keyboard-response',
    stimulus: '<h1 id="counter" style="text-align:center; color:white">+</h1>',
    choices: [32], //Spacebar
    response_ends_trial: false,
    on_finish: function (data) {
        console.log(data.key_press);
        data.tap_type = "fast-tone-paced";
        if (practiceIterator >= -188) {
          data.trial = practiceIterator;
          practiceIterator--;
          data.test_part = "practice";
        } else if (practiceIterator < -188) {
          data.trial = experimentIterator;
          experimentIterator++
          data.test_part = "experiment";
        }
        if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
          data.condition = "number-match";
          timeVsNumIterator++
        } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
          data.condition = "time-tapping-match";
        }
        data.block = blockIterator;
        data.subjectkey = 'GUID';
        data.src_subject_id = workerId;
        data.interview_date = today;
        data.interview_age = ageAtAssessment;
        data.sex = sexAtBirth;
        },
    trial_duration: 125,
}

/* 1st Self-Paced Fast Tap Catchment Object */

let tapNoToneFast = { // this was added to capture taps before the next tap interval in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
    type: 'html-keyboard-response',
    stimulus: '<h1 id="counter" style="text-align:center; color:white">+</h1>',
    choices: [32], //Spacebar
    response_ends_trial: false,
    on_finish: function (data) {
        console.log(data.key_press);
        data.tap_type = "fast-self-paced";
        if (practiceIterator >= -188) {
          data.trial = practiceIterator;
          practiceIterator--;
          data.test_part = "practice";
        } else if (practiceIterator < -188) {
          data.trial = experimentIterator;
          experimentIterator++
          data.test_part = "experiment";
        }
        if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
          data.condition = "number-match";
          timeVsNumIterator++
        } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
          data.condition = "time-tapping-match";
        }
        data.block = blockIterator;
        data.subjectkey = 'GUID';
        data.src_subject_id = workerId;
        data.interview_date = today;
        data.interview_age = ageAtAssessment;
        data.sex = sexAtBirth;
        },
    trial_duration: 125,
}

/* 2nd Self-Paced Fast Tap Catchment Object */

let noToneITIFast = { // this was added to capture taps before the next tap interval in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
    type: 'html-keyboard-response',
    stimulus: '<h1 id="counter" style="text-align:center; color:white">+</h1>',
    choices: [32], //Spacebar
    response_ends_trial: false,
    on_finish: function (data) {
        console.log(data.key_press);
        data.tap_type = "fast-self-paced";
        if (practiceIterator >= -188) {
          data.trial = practiceIterator;
          practiceIterator--;
          data.test_part = "practice";
        } else if (practiceIterator < -188) {
          data.trial = experimentIterator;
          experimentIterator++
          data.test_part = "experiment";
        }
        if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
          data.condition = "number-match";
          timeVsNumIterator++
        } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
          data.condition = "time-tapping-match";
        }
        data.block = blockIterator;
        data.subjectkey = 'GUID';
        data.src_subject_id = workerId;
        data.interview_date = today;
        data.interview_age = ageAtAssessment;
        data.sex = sexAtBirth;
        },
    trial_duration: 125,
}

let save_data = {
  type: "html-keyboard-response",
  stimulus: "<p>Data saving...</p>"+
  '<div class="sk-cube-grid">'+
'<div class="sk-cube sk-cube1"></div>'+
'<div class="sk-cube sk-cube2"></div>'+
'<div class="sk-cube sk-cube3"></div>'+
'<div class="sk-cube sk-cube4"></div>'+
'<div class="sk-cube sk-cube5"></div>'+
'<div class="sk-cube sk-cube6"></div>'+
'<div class="sk-cube sk-cube7"></div>'+
'<div class="sk-cube sk-cube8"></div>'+
'<div class="sk-cube sk-cube9"></div>'+
'</div>'+
  "<p>Do not close this window until the text dissapears.</p>",

  choices: jsPsych.NO_KEYS,
  trial_duration: 5000,
  on_finish: function(){
    saveData("variable-tempo-tapping_" + workerId, jsPsych.data.get().csv());
    document.getElementById("unload").onbeforeunload='';
    $(document).ready(function(){
    $("body").addClass("showCursor"); // returns cursor functionality
});
  }
};

let end = {
  type: "html-keyboard-response",
  stimulus:   "<p>Thank you!</p>"+
  "<p>You have successfully completed the experiment and your data has been saved.</p>"+
  "<p>To leave feedback on this task, please click the following link:</p>"+
  "<p><a href='https://omnibus.sh/eCRFs/feedback/vartempotapping.php'>Leave Task Feedback!</a></p>"+
      // "<p>Please wait for the experimenter to continue.</p>"+
  "<p>You may now close the expriment window at anytime.</p>",
  choices: jsPsych.NO_KEYS,
  trial_duration: 60000,
};
