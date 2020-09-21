let instProcedure = { //This loops over the object
  timeline: [welcome, instructions_1, instructions_2, instructions_3, instructions_4, instructions_5], 
}    

////////////////PRACTICE PROCEDURES/////////////

let practiceProcedureCountDown = { //This loops over the object
timeline: [countDown], //if you put fixation in front and the feedback after, it will display those in that order
//timeline_variables: stimuliTone,
randomize_order: false,// This is the outer procedure, looping over the stimuli
timeline_variables: countdown_practice_stim
}

let procedureCountDown = { //This loops over the object
  timeline: [countDown], //if you put fixation in front and the feedback after, it will display those in that order
  //timeline_variables: stimuliTone,
  randomize_order: false,// This is the outer procedure, looping over the stimuli
  timeline_variables: countdown_experiment_stim
}

let procedureTone = { //This loops over the object
  timeline: [tapTone, toneITI], //if you put fixation in front and the feedback after, it will display those in that order
  //timeline_variables: stimuliTone,
  randomize_order: false,// This is the outer procedure, looping over the stimuli
  repetitions: 12,
}

let procedureNoTone = { //This loops over the object
  timeline: [tapNoTone, noToneITI], //if you put fixation in front and the feedback after, it will display those in that order
  //timeline_variables: stimuliTone,
  randomize_order: false,// This is the outer procedure, looping over the stimuli
  repetitions: 30,
}

let endExperimentProcedure = { //This loops over the intrudction objects
  timeline: [endExperiment], 
}    

timeline.push(instProcedure)
timeline.push(getReady, practiceProcedureCountDown, procedureTone, procedureNoTone)// PRACTICE
timeline.push(experimentStartInst)
timeline.push(getReady, procedureCountDown, procedureTone, procedureNoTone)// BLOCK 1
timeline.push(getReady, procedureCountDown, procedureTone, procedureNoTone)// BLOCK 2
timeline.push(getReady, procedureCountDown, procedureTone, procedureNoTone)// BLOCK 3
timeline.push(getReady, procedureCountDown, procedureTone, procedureNoTone)// BLOCK 4
timeline.push(getReady, procedureCountDown, procedureTone, procedureNoTone)// BLOCK 5
timeline.push(getReady, procedureCountDown, procedureTone, procedureNoTone)// BLOCK 6
timeline.push(endExperimentProcedure)