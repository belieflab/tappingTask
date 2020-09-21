/* create timeline */
let timeline = [];

//////////////////////////////////////////////////
///////////////////INSTRUCTIONS//////////////////
////////////////////////////////////////////////

/* define welcome message */
let welcome = {
    type: "html-keyboard-response",
    stimulus: '<h1 style="color:white">Welcome to the last part of the Finger Tapping experiment!</h1>' +
    '<p style="color:white">Press the spacebar to continue.</p>', //by default, jsPysch is white background and white text
    choices: [32],
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
    stimulus: '<h2 style="color:white">The experiment is going start.</h2>' +
    '<h3 style="color:white">Get ready to start tapping.</h3>', //by default, jsPysch is white background and white text
    choices: jsPsych.NO_KEYS,
    trial_duration: 5000,
    // on_load: checkHandedness(),
};


/* define instructions trial */
let instructions_1 = {
    type: "html-keyboard-response",
    stimulus: '<h2 style="color:white">Just like last time, your goal is to tap at the same speed as the tone you hear.</h2>' +
    '<h2 style="color:white">This time, however, sometimes the tone will be slow and sometimes th tones will be fast.</h2>' +
    '<h3 style="color:white">When you see "Slow Tapping" you will be tapping along with the slower tone.</h3>' +
    '<h3 style="color:white">When you see "Fast Tapping" you will be tapping along with the faster tone.</h3>' +
    '<h2 style="color:white">Like last time, you will only tap with the hand that you use when writing using the spacebar to tap.</h2>' +
    '<p style="color:white">Press the 1 key to continue the instructions.</p>',
    choices: [49], //without this, it can be any keyboard response
};


let instructions_2 = {
    type: "html-keyboard-response",
    stimulus: '<h2 style="color:white">When each trial begins, a count down from 10 will start that counts down at the same pace that you will be tapping.<h2>'+
    '<h3 style="color:white"> These are practice taps and you should tap along with them to get the right pace.</h23>' +
    '<h2 style="color:white">Each number from 10 to 1 is accompanied by the same tone that you will try and tap along with during the trial. So just tap along with every tone.</h2>' + 
    '<p style="color:white">Press the 1 key to continue.</p>',
    choices: [49]
};


let instructions_3 = {
    type: "html-keyboard-response",
    stimulus: '<h2 style="color:white">After the countdown, you will see a "+" symbol presented with the tone.</h2>' + 
    '<h3 style="color:white">When you see the "+" symbol, listen carefully and continue tapping the spacebar at the same rate with the tone.</h3>' +
    '<p style="color:white">Press the 1 key to start the first trial.</p>',
    choices: [49]
};

let instructions_4 = {
    type: "html-keyboard-response",
    stimulus: '<h2 style="color:white">After a number of taps, the tone will stop.</h2>' + 
    '<h3 style="color:white">You should continue tapping at the same rate.</h3>' + 
    '<h2 style="color:white">Do your best to keep tapping at the same rate as the tone.</h2>' +
    '<h3 style="color:white">Do you have any questions?</h3>' +
    '<p style="color:white">Press the 1 key to start the first trial.</p>',
    choices: [49]
};

let instructions_5 = {
    type: "html-keyboard-response",
    stimulus: '<h2 style="color:white">Try this one for practice.</h2>' + 
    '<h2 style="color:white">Do your best to keep tapping at the same rate as the tone.</h2>' +
    '<h3 style="color:white">Do you have any questions?</h3>' +
    '<p style="color:white">Press the 1 key to start the first trial.</p>',
    choices: [49]
};

let experimentStartInst = {
    type: "html-keyboard-response",
    stimulus: '<h2 style="color:white">The experiment will now begin.</h2>' + 
    '<h3 style="color:white">If you need more practice, refresh your browser to repeat the instructions and practice trials.</h3>' +
    '<h3 style="color:white">Do you have any questions?</h3>' +
    '<p style="color:white">If not, press the 1 key to start the first trial.</p>',
    choices: [49]
};

//////////////////////////////////////////////////
/////////////////SLOW TAPPING OBJECTS////////////
////////////////////////////////////////////////

/* Slow Tapping Condition Instruction Object */

let getReadySlow = { 
    type: 'html-button-response',
    stimulus: '<p id="counter" style="text-align:center; color:white; font-size:24px">Slow Tapping</p>' + '<p style="color:white; font-size:24px">GET READY!</p>',
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
    stimulus: audio,
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
    }
}

/* Slow Tap w/ Tone Object */

let tapToneSlow = { // Collects responses for tone paced tapping for the first 250 ms
    type: "audio-keyboard-response",
    choices: [32],
    response_ends_trial: false,
    trial_ends_after_audio: false,
    trial_duration: 250,
    stimulus: "stim/50msec.wav",
    on_finish: function (data) {
        console.log(data.key_press);
        j=0;
        data.subjectKey = 'GUID';
        data.src_subject_id = workerID;
        data.site = siteNumber;
        data.interview_date = today;
        data.interview_age = ageAtAssessment;
        data.sex = sexAtBirth;
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
        },
    // stimulus: function() { return "Stimuli/50msec.wav" },
    prompt: '<p style="text-align:center; color:white; font-size:24px">+</p>',
}

/* 2nd Post-Tone Slow Tap Catchment Object */

let toneITISlow = { // this was added to capture taps before the next tone in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
    type: 'html-keyboard-response',
    stimulus: '<p id="counter" style="text-align:center; color:white; font-size:24px">+</p>',
    choices: [32], //Spacebar
    response_ends_trial: false,
    on_finish: function (data) {
        console.log(data.key_press);
        data.subjectKey = 'GUID';
        data.src_subject_id = workerID;
        data.site = siteNumber;
        data.interview_date = today;
        data.interview_age = ageAtAssessment;
        data.sex = sexAtBirth;
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
        },
    trial_duration: 250,
}

/* 1st Self-Paced Slow Tap Catchment Object */

let tapNoToneSlow = { // this was added to capture taps before the next tap interval in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
    type: 'html-keyboard-response',
    stimulus: '<p id="counter" style="text-align:center; color:white; font-size:24px">+</p>',
    choices: [32], //Spacebar
    response_ends_trial: false,
    on_finish: function (data) {
        console.log(data.key_press);
        data.subjectKey = 'GUID';
        data.src_subject_id = workerID;
        data.site = siteNumber;
        data.interview_date = today;
        data.interview_age = ageAtAssessment;
        data.sex = sexAtBirth;
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
        },
    trial_duration: 250,
}

/* 2nd Self-Paced Slow Tap Catchment Object */

let noToneITISlow = { // this was added to capture taps before the next tap interval in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
    type: 'html-keyboard-response',
    stimulus: '<p id="counter" style="text-align:center; color:white; font-size:24px">+</p>',
    choices: [32], //Spacebar
    response_ends_trial: false,
    on_finish: function (data) {
        console.log(data.key_press);
        data.subjectKey = 'GUID';
        data.src_subject_id = workerID;
        data.site = siteNumber;
        data.interview_date = today;
        data.interview_age = ageAtAssessment;
        data.sex = sexAtBirth;
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
        },
    trial_duration: 250,
}

//////////////////////////////////////////////////
/////////////////FAST TAPPING OBJECTS////////////
////////////////////////////////////////////////

/* Fast Tapping Condition Instruction Object */

let getReadyFast = { 
    type: 'html-button-response',
    stimulus: '<p id="counter" style="text-align:center; color:white; font-size:24px">Fast Tapping</p>' + '<p style="color:white; font-size:24px">GET READY!</p>',
    button_html: '<button id="countdownPrompt" style = "outline:none; border:none; background-color:gray" onclick="countdown()" onkeypress="countdown()"></button>', //7.15.20 this used to have START in it which was displayed for some reason
    choices: jsPsych.NO_KEYS, //Spacebar
    trial_duration: 5000,
    on_load: function() {
    document.getElementByID("countdownPrompt").focus() // getElementByID is camel case variable naming
    }
}

/* Fast Countodwn Object */

let countDownFast = { 
    type: 'audio-keyboard-response', //html is the most versatile. Use html-keyboard-response and stuff as many things in it as possible
    stimulus: audio,
    prompt: function(){
        return countdownTrial[j];
    },
    choices: [32],
    trial_duration: 250,
    response_ends_trial: false,
    data: jsPsych.timelineVariable('data'),
    on_finish: function(data){
    j++
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
    }
}

/* Fast Tap w/ Tone Object */

let tapToneFast = { // Collects responses for tone paced tapping for the first 250 ms
    type: "audio-keyboard-response",
    choices: [32],
    response_ends_trial: false,
    trial_ends_after_audio: false,
    trial_duration: 125,
    stimulus: "stim/50msec.wav",
    on_finish: function (data) {
        console.log(data.key_press);
        data.subjectKey = 'GUID';
        data.src_subject_id = workerID;
        data.site = siteNumber;
        data.interview_date = today;
        data.interview_age = ageAtAssessment;
        data.sex = sexAtBirth;
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
        },
    // stimulus: function() { return "Stimuli/50msec.wav" },
    prompt: '<p style="text-align:center; color:white; font-size:24px">+</p>',
}

/* 2nd Post-Tone Fast Tap Catchment Object */

let toneITIFast = { // this was added to capture taps before the next tone in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
    type: 'html-keyboard-response',
    stimulus: '<p id="counter" style="text-align:center; color:white; font-size:24px">+</p>',
    choices: [32], //Spacebar
    response_ends_trial: false,
    on_finish: function (data) {
        console.log(data.key_press);
        data.subjectKey = 'GUID';
        data.src_subject_id = workerID;
        data.site = siteNumber;
        data.interview_date = today;
        data.interview_age = ageAtAssessment;
        data.sex = sexAtBirth;
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
        },
    trial_duration: 125,
}

/* 1st Self-Paced Fast Tap Catchment Object */

let tapNoToneFast = { // this was added to capture taps before the next tap interval in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
    type: 'html-keyboard-response',
    stimulus: '<p id="counter" style="text-align:center; color:white; font-size:24px">+</p>',
    choices: [32], //Spacebar
    response_ends_trial: false,
    on_finish: function (data) {
        console.log(data.key_press);
        data.subjectKey = 'GUID';
        data.src_subject_id = workerID;
        data.site = siteNumber;
        data.interview_date = today;
        data.interview_age = ageAtAssessment;
        data.sex = sexAtBirth;
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
        },
    trial_duration: 125,
}

/* 2nd Self-Paced Fast Tap Catchment Object */

let noToneITIFast = { // this was added to capture taps before the next tap interval in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
    type: 'html-keyboard-response',
    stimulus: '<p id="counter" style="text-align:center; color:white; font-size:24px">+</p>',
    choices: [32], //Spacebar
    response_ends_trial: false,
    on_finish: function (data) {
        console.log(data.key_press);
        data.subjectKey = 'GUID';
        data.src_subject_id = workerID;
        data.site = siteNumber;
        data.interview_date = today;
        data.interview_age = ageAtAssessment;
        data.sex = sexAtBirth;
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
        },
    trial_duration: 125,
}
