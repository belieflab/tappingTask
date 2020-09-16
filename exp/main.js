/* create timeline */
let timeline = [];

//////////////////////////////////////////////////
///////////////////INSTRUCTIONS//////////////////
////////////////////////////////////////////////

/* define welcome message */
let welcome = {
    type: "html-keyboard-response",
    stimulus: '<p style="color:white; font-size:18px">Welcome to the last part of the FINGER TAPPING experiment!</p>' + '<br>' + '<p style="color:white; font-size:18px">Press the SPACEBAR to continue.</p>', //by default, jsPysch is white background and white text
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

/* define break message */

let selfTimeBreak = {
    type: "html-keyboard-response",
    stimulus: '<p style="color:white; font-size:18px">Please take a brief 30 second break.</p>' + '<br>' + '<p style="color:white; font-size:18px">The experiment will continue automatically, so please be prepared.</p>', //by default, jsPysch is white background and white text
    choices: jsPsych.NO_KEYS,
    trial_duration: 30000,
    // on_load: checkHandedness(),
};

let secondHalfStart = {
    type: "html-keyboard-response",
    stimulus: '<p style="color:white; font-size:18px">The experiment is going start.</p>' + '<br>' + '<p style="color:white; font-size:18px">Get ready to start tapping.</p>', //by default, jsPysch is white background and white text
    choices: jsPsych.NO_KEYS,
    trial_duration: 5000,
    // on_load: checkHandedness(),
};


/* define instructions trial */
let instructions_1 = {
    type: "html-keyboard-response",
    stimulus: '<p style="color:white; font-size:18px">Just like last time, your goal is to tap at the same speed as the tone you hear.</p>' +
    '<p style="color:white; font-size:18px">However, now when tapping, sometimes the tone will be slow and sometimes the tone will be fast.</p>' +
    '<p style="color:white; font-size:18px">When you see "Slow Tapping" you will be tapping along with a slower pace.</p>' +
    '<p style="color:white; font-size:18px">When you see "Fast Tapping" you will be tapping along with a faster pace.</p>' +
    '<p style="color:white; font-size:18px">You will only tap with the hand that you use when writing. Use the SPACEBAR to tap.</p>' + '<br>' +
    '<p style="color:white; font-size:18px">Press the 1 key to continue the instructions.</p>',
    choices: [49], //without this, it can be any keyboard response
};


let instructions_2 = {
    type: "html-keyboard-response",
    stimulus: '<p style="color:white; font-size:18px">When each trial begins, a count down from 10 will start that counts down at the same pace that you will be tapping. These are practice taps and you should tap along with them to get the right pace.</p>' + '<p style="color:white; font-size:18px">Each number from 10 to 1 is accompanied by the same tone that you will try and tap along with during the trial. So just tape along with every tone.</p>' + '<br>' + 
    '<p style="color:white; font-size:18px">Press the 1 key to continue.</p>',
    choices: [49]
};


let instructions_3 = {
    type: "html-keyboard-response",
    stimulus: '<p style="color:white; font-size:18px">After the count down, you will see a "+" symbol with the tone.</p>' + 
    '<p style="color:white; font-size:18px">When you see the "+" symbol, listen carefully and continue tapping the SPACEBAR at the same rate with the tone.</p>' + '<br>' + '<p style="color:white; font-size:18px">Press the 1 key to start the first trial.</p>',
    choices: [49]
};

let instructions_4 = {
    type: "html-keyboard-response",
    stimulus: '<p style="color:white; font-size:18px">After a number of taps, the tone will stop.</p>' + 
    '<p style="color:white; font-size:18px">You should continue tapping at the same rate.</p>'
    + 
    '<p style="color:white; font-size:18px">Do your best to keep tapping at the same rate as the tone.</p>' + '<br>' + '<p style="color:white; font-size:18px">Do you have any questions?</p>' + '<br>' + '<p style="color:white; font-size:18px">Press the 1 key to start the first trial.</p>',
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

//////////////////////////////////////////////////
/////////////////SLOW TAPPING OBJECTS////////////
////////////////////////////////////////////////

/* Slow Tapping Condition Instruction Object */

let getReadySlow = { 
    type: 'html-button-response',
    stimulus: '<p id="counter" style="text-align:center; color:white; font-size:30px">Slow Tapping</p>' + '<p style="color:white; font-size:30px">GET READY!</p>',
    button_html: '<button id="countdownPrompt" style = "outline:none; border:none; background-color:gray" onclick="countdown()" onkeypress="countdown()"></button>', //7.15.20 this used to have START in it which was displayed for some reason
    choices: jsPsych.NO_KEYS, //Spacebar
    trial_duration: 5000,
    on_load: function() {
    document.getElementByID("countdownPrompt").focus() // getElementByID is camel case variable naming
    }
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
    if (blockCounter <= 188 && data.test_part == "experiment") {
      data.block = blockIterator;
      blockCounter++
    } else if (blockCounter > 188 && data.test_part == "experiment") {
      blockIterator++
      blockCounter = 1
    }
    if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
      data.condition = "number-match";
      timeVsNumIterator++
    } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
      data.condition = "time-tapping-match";
    }
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
        if (blockCounter <= 188 && data.test_part == "experiment") {
          data.block = blockIterator;
          blockCounter++
        } else if (blockCounter > 188 && data.test_part == "experiment") {
          blockIterator++
          blockCounter = 1
        }
        if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
          data.condition = "number-match";
          timeVsNumIterator++
        } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
          data.condition = "time-tapping-match";
        }
        },
    // stimulus: function() { return "Stimuli/50msec.wav" },
    prompt: '<p style="text-align:center; color:white; font-size:30px">+</p>',
}

/* 2nd Post-Tone Slow Tap Catchment Object */

let toneITISlow = { // this was added to capture taps before the next tone in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
    type: 'html-keyboard-response',
    stimulus: '<p id="counter" style="text-align:center; color:white; font-size:30px">+</p>',
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
        if (blockCounter <= 188 && data.test_part == "experiment") {
          data.block = blockIterator;
          blockCounter++
        } else if (blockCounter > 188 && data.test_part == "experiment") {
          blockIterator++
          blockCounter = 1
        }
        if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
          data.condition = "number-match";
          timeVsNumIterator++
        } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
          data.condition = "time-tapping-match";
        }
        },
    trial_duration: 250,
}

/* 1st Self-Paced Slow Tap Catchment Object */

let tapNoToneSlow = { // this was added to capture taps before the next tap interval in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
    type: 'html-keyboard-response',
    stimulus: '<p id="counter" style="text-align:center; color:white; font-size:30px">+</p>',
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
        if (blockCounter <= 188 && data.test_part == "experiment") {
          data.block = blockIterator;
          blockCounter++
        } else if (blockCounter > 188 && data.test_part == "experiment") {
          blockIterator++
          blockCounter = 1
        }
        if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
          data.condition = "number-match";
          timeVsNumIterator++
        } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
          data.condition = "time-tapping-match";
        }
        },
    trial_duration: 250,
}

/* 2nd Self-Paced Slow Tap Catchment Object */

let noToneITISlow = { // this was added to capture taps before the next tap interval in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
    type: 'html-keyboard-response',
    stimulus: '<p id="counter" style="text-align:center; color:white; font-size:30px">+</p>',
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
        if (blockCounter <= 188 && data.test_part == "experiment") {
          data.block = blockIterator;
          blockCounter++
        } else if (blockCounter > 188 && data.test_part == "experiment") {
          blockIterator++
          blockCounter = 1
        }
        if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
          data.condition = "number-match";
          timeVsNumIterator++
        } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
          data.condition = "time-tapping-match";
        }
        },
    trial_duration: 250,
}

//////////////////////////////////////////////////
/////////////////FAST TAPPING OBJECTS////////////
////////////////////////////////////////////////

/* Fast Tapping Condition Instruction Object */

let getReadyFast = { 
    type: 'html-button-response',
    stimulus: '<p id="counter" style="text-align:center; color:white; font-size:30px">Fast Tapping</p>' + '<p style="color:white; font-size:30px">GET READY!</p>',
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
    if (blockCounter <= 188 && data.test_part == "experiment") {
      data.block = blockIterator;
      blockCounter++
    } else if (blockCounter > 188 && data.test_part == "experiment") {
      blockIterator++
      blockCounter = 1
    }
    if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
      data.condition = "number-match";
      timeVsNumIterator++
    } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
      data.condition = "time-tapping-match";
    }
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
        if (blockCounter <= 188 && data.test_part == "experiment") {
          data.block = blockIterator;
          blockCounter++
        } else if (blockCounter > 188 && data.test_part == "experiment") {
          blockIterator++
          blockCounter = 1
        }
        if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
          data.condition = "number-match";
          timeVsNumIterator++
        } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
          data.condition = "time-tapping-match";
        }
        },
    // stimulus: function() { return "Stimuli/50msec.wav" },
    prompt: '<p style="text-align:center; color:white; font-size:30px">+</p>',
}

/* 2nd Post-Tone Fast Tap Catchment Object */

let toneITIFast = { // this was added to capture taps before the next tone in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
    type: 'html-keyboard-response',
    stimulus: '<p id="counter" style="text-align:center; color:white; font-size:30px">+</p>',
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
        if (blockCounter <= 188 && data.test_part == "experiment") {
          data.block = blockIterator;
          blockCounter++
        } else if (blockCounter > 188 && data.test_part == "experiment") {
          blockIterator++
          blockCounter = 1
        }
        if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
          data.condition = "number-match";
          timeVsNumIterator++
        } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
          data.condition = "time-tapping-match";
        }
        },
    trial_duration: 125,
}

/* 1st Self-Paced Fast Tap Catchment Object */

let tapNoToneFast = { // this was added to capture taps before the next tap interval in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
    type: 'html-keyboard-response',
    stimulus: '<p id="counter" style="text-align:center; color:white; font-size:30px">+</p>',
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
        if (blockCounter <= 188 && data.test_part == "experiment") {
          data.block = blockIterator;
          blockCounter++
        } else if (blockCounter > 188 && data.test_part == "experiment") {
          blockIterator++
          blockCounter = 1
        }
        if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
          data.condition = "number-match";
          timeVsNumIterator++
        } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
          data.condition = "time-tapping-match";
        }
        },
    trial_duration: 125,
}

/* 2nd Self-Paced Fast Tap Catchment Object */

let noToneITIFast = { // this was added to capture taps before the next tap interval in order to capture 2 taps within a single 500 ms inter-tap interval. Otherwise, get nulls.
    type: 'html-keyboard-response',
    stimulus: '<p id="counter" style="text-align:center; color:white; font-size:30px">+</p>',
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
        if (blockCounter <= 188 && data.test_part == "experiment") {
          data.block = blockIterator;
          blockCounter++
        } else if (blockCounter > 188 && data.test_part == "experiment") {
          blockIterator++
          blockCounter = 1
        }
        if (timeVsNumIterator <= 188*6 && data.test_part == "experiment") {
          data.condition = "number-match";
          timeVsNumIterator++
        } else if (timeVsNumIterator > 188*6 && data.test_part == "experiment") {
          data.condition = "time-tapping-match";
        }
        },
    trial_duration: 125,
}

//////////////////////////////////////////////////
////////////////////PROCEDURES///////////////////
////////////////////////////////////////////////

/* Instructions Procedure */

let instProcedure = { //This loops over the intrudction objects
  timeline: [welcome, instructions_1, instructions_2, instructions_3, instructions_4, instructions_5], 
}    

let endExperimentProcedure = { //This loops over the intrudction objects
    timeline: [endExperiment], 
  }    

/* Slow Practice Countdown Procedure */

//The way the experiment is designed is that the only the differentiating experiment blocks from practice
//is the countdown procedure to denote it as practice.
let practiceProcedureCountDownSlow = { //This loops over the object
  timeline: [countDownSlow], //This is the loop through objects, just one, so it does countdown
  randomize_order: false,// This is the outer procedure, looping over the stimuli
  timeline_variables: countdown_practice_stim
}

/* Fast Practice Countdown Procedure */

let practiceProcedureCountDownFast = { //This loops over the object
  timeline: [countDownFast], //if you put fixation in front and the feedback after, it will display those in that order
  //timeline_variables: stimuliTone,
  randomize_order: false,// This is the outer procedure, looping over the stimuli
  timeline_variables: countdown_practice_stim
}


////////////////EXPERIMENT SLOW PROCEDURES/////////////
  
/* Slow Experiment Countdown Procedure */

  let procedureCountDownSlow = { //This loops over the object
    timeline: [countDownSlow], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    timeline_variables: countdown_experiment_stim
  }

/* Slow Experiment Tone Tapping Procedure */

  let procedureToneSlow = { //This loops over the object
    timeline: [tapToneSlow, toneITISlow], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    repetitions: 12,
  }

/* Slow Experiment Self-Paced Tapping Procedure */

  let procedureNoToneSlow = { //This loops over the object
    timeline: [tapNoToneSlow, noToneITISlow], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    repetitions: 30,
  }
  
  ////////////////EXPERIMENT FAST PROCEDURES/////////////

/* Fast Experiment Countdown Procedure */

  let procedureCountDownFast = { //This loops over the object
    timeline: [countDownFast], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    timeline_variables: countdown_experiment_stim
  }

/* Tap-Matched Fast Experiment Tone Tapping Procedure */

  let procedureToneFast = { //This loops over the object
    timeline: [tapToneFast, toneITIFast], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    repetitions: 12,
  }

/* Tap-Matched Fast Experiment Self-Paced Tapping Procedure */

  let procedureNoToneFast = { //This loops over the object
    timeline: [tapNoToneFast, noToneITIFast], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    repetitions: 30,
  }

  /* Time-Matched Fast Experiment Tone Tapping Procedure */

  let procedureToneFast_timeMatched = { //This loops over the object
    timeline: [tapToneFast, toneITIFast], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    repetitions: 24,
  }

/* Time-Matched Fast Experiment Self-Paced Tapping Procedure */

  let procedureNoToneFast_timeMatched = { //This loops over the object
    timeline: [tapNoToneFast, noToneITIFast], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    repetitions: 60,
  }

 ////////////////DEFINING BLOCKS/////////////

timeline.push(instProcedure)
timeline.push(getReadySlow, practiceProcedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, practiceProcedureCountDownFast, procedureToneFast, procedureNoToneFast)// PRACTICE
timeline.push(experimentStartInst)
timeline.push(getReadySlow, procedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, procedureCountDownFast, procedureToneFast, procedureNoToneFast)// BLOCK 1- Tap Matched
timeline.push(getReadySlow, procedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, procedureCountDownFast, procedureToneFast, procedureNoToneFast)// BLOCK 2
timeline.push(getReadySlow, procedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, procedureCountDownFast, procedureToneFast, procedureNoToneFast)// BLOCK 3
timeline.push(getReadySlow, procedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, procedureCountDownFast, procedureToneFast, procedureNoToneFast)// BLOCK 4
timeline.push(getReadySlow, procedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, procedureCountDownFast, procedureToneFast, procedureNoToneFast)// BLOCK 5
timeline.push(getReadySlow, procedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, procedureCountDownFast, procedureToneFast, procedureNoToneFast)// BLOCK 6- Tap Matched
timeline.push(selfTimeBreak, secondHalfStart)
timeline.push(getReadySlow, procedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, procedureCountDownFast, procedureToneFast_timeMatched, procedureNoToneFast_timeMatched)// BLOCK 1- Time Matched
timeline.push(getReadySlow, procedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, procedureCountDownFast, procedureToneFast_timeMatched, procedureNoToneFast_timeMatched)
timeline.push(getReadySlow, procedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, procedureCountDownFast, procedureToneFast_timeMatched, procedureNoToneFast_timeMatched)
timeline.push(getReadySlow, procedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, procedureCountDownFast, procedureToneFast_timeMatched, procedureNoToneFast_timeMatched)
timeline.push(getReadySlow, procedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, procedureCountDownFast, procedureToneFast_timeMatched, procedureNoToneFast_timeMatched)
timeline.push(getReadySlow, procedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, procedureCountDownFast, procedureToneFast_timeMatched, procedureNoToneFast_timeMatched)// BLOCK 6- Time Matched
timeline.push(endExperimentProcedure)