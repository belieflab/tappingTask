let workerID = prompt( 'Subject ID' );

let handedness =prompt("Are you right or left handed?");

let stimuli;

let tapping_stimuli = []; /* I believe this creates an array that holds the trial information. Does this need to be done in a for loop? */
for (let i = 0; i < 100; i++){
  tapping_stimuli.push('<p style="text-align:center; color:green; font-size:50px">Go!</p>'); //this is a thought of these in between the ps in an array
}

stimuliDominant = [];
for (let i = 0; i < 100; i++){
  stimuliDominant.push({stimulus: tapping_stimuli[i], data: {test_part: 'tapDominant', correct_response: ' '}},)
}

stimuliNondominant = [];
for (let i = 0; i < 100; i++){
  stimuliNondominant.push({stimulus: tapping_stimuli[i], data: {test_part: 'tapNondominant', correct_response: ' '}},)
}
