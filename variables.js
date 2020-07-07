let workerID = prompt( 'Subject ID' );

let stimuli;

let tapping_stimuli = []; /* I believe this creates an array that holds the trial information. Does this need to be done in a for loop? */
for (let i = 0; i < 100; i++){
  tapping_stimuli.push('<p style="text-align:center; color:green; font-size:100px">Go!</p>'); //this is a thought of these in between the ps in an array
}

stimuliLeft = [];
for (let i = 0; i < 100; i++){
  stimuliLeft.push({stimulus: tapping_stimuli[i], data: {test_part: 'tapLeft', correct_response: ' '}},)
}

stimuliRight = [];
for (let i = 0; i < 100; i++){
  stimuliRight.push({stimulus: tapping_stimuli[i], data: {test_part: 'tapRight', correct_response: ' '}},)
}