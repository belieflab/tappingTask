// let workerID = prompt( 'Subject ID' );

// let handedness =prompt("Are you right or left handed?");
let workerID;

let handedness;
let antihandedness;

var audio = ["stim/50msec.wav"];

// let stimuli;

let j=0;
practiceIterator = -1;
experimentIterator = 1;
blockIterator = 0;

//iterator for adding if the blocks are matched on number of taps or time tapping
timeVsNumIterator = 1;

// practiceIterator = [];
// for (let i = -999; i < -1; i++){
//     practiceIterator.push(i);
// }

// experimentIterator = [];
// for (let i = 0; i < 5000; i++){
//     experimentIterator.push(i);
// }

// creates the html code to be placed in the countdown object for displaying the countdown
countdownTrial  = [];
for (let k = 10; k > 0; k--){
    countdownTrial.push("<p style='text-align:center; color:white; font-size:30px'>" + k + "</p>")
}
    
// adds sound to the countdown stimuli to be passed to the countdown object
countdown_practice_stim = [];
for (let i = 0; i < 10; i++){
    countdown_practice_stim.push({stimulus: countdownTrial[i], sound: audio, data: {test_part: 'practice'}},)
}

// adds sound to the countdown stimuli to be passed to the countdown object
countdown_experiment_stim = [];
for (let i = 0; i < 10; i++){
    countdown_experiment_stim.push({stimulus: countdownTrial[i], sound: audio, data: {test_part: 'experiment'}},)
}