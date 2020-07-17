let instProcedure = { //This loops over the object
  timeline: [welcome, instructions_1, instructions_2, instructions_3, instructions_4, instructions_5], 
}    

////////////////PRACTICE SLOW PROCEDURES/////////////
  
let practiceProcedureCountDownSlow = { //This loops over the object
  timeline: [countDownSlow], //if you put fixation in front and the feedback after, it will display those in that order
  //timeline_variables: stimuliTone,
  randomize_order: false,// This is the outer procedure, looping over the stimuli
  timeline_variables: countdown_practice_stim
}

////////////////PRACTICE FAST PROCEDURES/////////////

let practiceProcedureCountDownFast = { //This loops over the object
  timeline: [countDownFast], //if you put fixation in front and the feedback after, it will display those in that order
  //timeline_variables: stimuliTone,
  randomize_order: false,// This is the outer procedure, looping over the stimuli
  timeline_variables: countdown_practice_stim
}


////////////////EXPERIMENT SLOW PROCEDURES/////////////
  
  let procedureCountDownSlow = { //This loops over the object
    timeline: [countDownSlow], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    timeline_variables: countdown_experiment_stim
  }

  let procedureToneSlow = { //This loops over the object
    timeline: [tapToneSlow, toneITISlow], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    repetitions: 12,
  }

  let procedureNoToneSlow = { //This loops over the object
    timeline: [tapNoToneSlow, noToneITISlow], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    repetitions: 30,
  }
  
  ////////////////EXPERIMENT FAST PROCEDURES/////////////

  let procedureCountDownFast = { //This loops over the object
    timeline: [countDownFast], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    timeline_variables: countdown_experiment_stim
  }

  let procedureToneFast = { //This loops over the object
    timeline: [tapToneFast, toneITIFast], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    repetitions: 12,
  }

  let procedureNoToneFast = { //This loops over the object
    timeline: [tapNoToneFast, noToneITIFast], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    repetitions: 30,
  }

  timeline.push(instProcedure)
  timeline.push(getReadySlow, practiceProcedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, practiceProcedureCountDownFast, procedureToneFast, procedureNoToneFast)// PRACTICE
  timeline.push(experimentStartInst)
  timeline.push(getReadySlow, procedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, procedureCountDownFast, procedureToneFast, procedureNoToneFast)// BLOCK 1
  timeline.push(getReadySlow, procedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, procedureCountDownFast, procedureToneFast, procedureNoToneFast)// BLOCK 2
  timeline.push(getReadySlow, procedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, procedureCountDownFast, procedureToneFast, procedureNoToneFast)// BLOCK 3
  timeline.push(getReadySlow, procedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, procedureCountDownFast, procedureToneFast, procedureNoToneFast)// BLOCK 4
  timeline.push(getReadySlow, procedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, procedureCountDownFast, procedureToneFast, procedureNoToneFast)// BLOCK 5
  timeline.push(getReadySlow, procedureCountDownSlow, procedureToneSlow, procedureNoToneSlow, getReadyFast, procedureCountDownFast, procedureToneFast, procedureNoToneFast)// BLOCK 6
