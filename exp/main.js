
//////////////////////////////////////////////////
////////////////////PROCEDURES///////////////////
////////////////////////////////////////////////

/* Instructions Procedure */

let instProcedure = { //This loops over the intrudction objects
  timeline: [welcome, instructions_1, instructions_2, instructions_3, instructions_4, instructions_5]
};

let endExperimentProcedure = { //This loops over the intrudction objects
    timeline: [endExperiment]
};

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
timeline.push(save_data)
timeline.push(end)