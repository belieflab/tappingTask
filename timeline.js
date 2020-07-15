/* create timeline */
let timeline = [];

/* define welcome message trial */
let welcome = {
    type: "html-keyboard-response",
    stimulus: '<p style="color:white; font-size:18px">Welcome to the next part of the FINGER TAPPING experiment!</p>' + '<br>' + '<p style="color:white; font-size:18px">Press the SPACEBAR to continue.</p>', //by default, jsPysch is white background and white text
    choices: [32],
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
    choices: jsPsych.NO_KEYS,
    trial_duration: 500,
    on_finish: function(){
    j++
    }
}

let tapTone = { // Collects responses for tone paced tapping for the first 250 ms
    type: "audio-keyboard-response",
    choices: [32],
    response_ends_trial: false,
    trial_ends_after_audio: false,
    trial_duration: 250,
    stimulus: "stim/50msec.wav",
    on_finish: function (data) {
        console.log(data.key_press)
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
