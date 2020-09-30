// let workerId = prompt( 'Subject ID' );

// let handedness =prompt("Are you right or left handed?");
// let workerId;

let handedness;
let antihandedness;

let tone = ["stim/50msec.wav"];

// let stimuli;

let j=0; //this is increment in countdown through countdown_stim
practiceIterator = -1;
experimentIterator = 1;
blockIterator = -1;


// creates the html code to be placed in the countdown object for displaying the countdown
countdownTrial  = [];
for (let k = 10; k > 0; k--){
    countdownTrial.push("<h1 style='text-align:center; color:white'>" + k + "</h1>")
}

// adds sound to the countdown stimuli to be passed to the countdown object
countdown_practice_stim = [];
for (let i = 0; i < 10; i++){
    countdown_practice_stim.push({stimulus: countdownTrial[i], stimulus: tone.slice(5,15), data: {test_part: 'practice'}})
}

// adds sound to the countdown stimuli to be passed to the countdown object
countdown_experiment_stim = [];
for (let i = 0; i < 10; i++){
    countdown_experiment_stim.push({stimulus: countdownTrial[i], stimulus: tone.slice(5,15), data: {test_part: 'experiment'}})
}
