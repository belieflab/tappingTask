  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
 /// *  make sure you know what you are doing with these buttons and levers; you may break the experiment  * ///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// this one has to start at 1 because it is updated after the first block
let blockIterator = 1;
let experimentIterator = 1;
let practiceIterator = -1;
let j=0;

// creates the html code to be placed in the countdown object for displaying the countdown
countdownTrial  = [];
for (let k = 5; k > 0; k--){
    countdownTrial.push("<h1 style='text-align:center; color:white'>" + k + "</h1>")
}

let tapping_stimuli = []; /* I believe this creates an array that holds the trial information. Does this need to be done in a for loop? */
for (let i = 0; i < 100; i++){
  tapping_stimuli.push('<h1 style="text-align:center; color:lightgreen">Go!</h1>'); //this is a thought of these in between the ps in an array
}

stimuliDominant = [];
for (let i = 0; i < 100; i++){
  stimuliDominant.push({stimulus: tapping_stimuli[i], data: {test_part: 'dominant', tap_number: i+1}},)
}

stimuliNondominant = [];
for (let i = 0; i < 100; i++){
  stimuliNondominant.push({stimulus: tapping_stimuli[i], data: {test_part: 'non-dominant', tap_number: i+1}},)
}

// adds sound to the countdown stimuli to be passed to the countdown object
countdown_experiment_stim = [];
for (let i = 0; i < 5; i++){
    countdown_experiment_stim.push({stimulus: countdownTrial[i]})
}