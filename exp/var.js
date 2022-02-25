// let workerID = prompt( 'Subject ID' );

// let handedness =prompt("Are you right or left handed?");
// let workerID;

// let handedness;
// let antihandedness;

let tone = ["stim/50ms.wav"];

// let stimuli;

let j=0;
let tapTotal=0;
practiceIterator = -1;
experimentIterator = 1;
blockIterator = -1;

//iterator for adding if the blocks are matched on number of taps or time tapping
timeVsNumIterator = 1;

// creates the html code to be placed in the countdown object for displaying the countdown
countdownTrial  = [];
for (let k = 10; k > 0; k--){
    countdownTrial.push("<h1 style='text-align:center; color:white;'>" + k + "</h1>")
}
    
// adds sound to the countdown stimuli to be passed to the countdown object
countdown_practice_stim = [];
for (let i = 0; i < 10; i++){
    countdown_practice_stim.push({stimulus: countdownTrial[i], stimulus: tone, data: {test_part: 'practice', stim: tone[0].slice(5,13)}},)
}

// adds sound to the countdown stimuli to be passed to the countdown object
countdown_experiment_stim = [];
for (let i = 0; i < 10; i++){
    countdown_experiment_stim.push({stimulus: countdownTrial[i], stimulus: tone, data: {test_part: 'experiment', stim: tone[0].slice(5,13)}},)
}