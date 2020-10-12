
let instProcedure = { //This loops over the object
    timeline: [welcome, instructions_1, instructions_2, instructions_3, instructions_4]
}

let procedureCountDown = { //This loops over the object
    timeline: [countDownTap], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    timeline_variables: countdown_experiment_stim,
}

let practiceProcedureDominant = { //This loops over the object
    timeline: [practiceTapDominant], //if you put fixation in front and the feedback after, it will display those in that order
    timeline_variables: stimuliDominant,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
}

let procedureDominant = { //This loops over the object
    timeline: [tapDominant], //if you put fixation in front and the feedback after, it will display those in that order
    timeline_variables: stimuliDominant,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
}

let procedureNondominant = { //This loops over the object
    timeline: [tapNondominant], //if you put fixation in front and the feedback after, it will display those in that order
    timeline_variables: stimuliNondominant,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
}

let practiceProcedureNondominant = { //This loops over the object
    timeline: [practiceTapNondominant], //if you put fixation in front and the feedback after, it will display those in that order
    timeline_variables: stimuliNondominant,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
}

let endExperimentProcedure = { //This loops over the intrudction objects
  timeline: [endExperiment],
}

timeline.push(instProcedure)
timeline.push(promptDominant, procedureCountDown, startTimer, practiceProcedureDominant, practiceStopTapping, promptNondominant, procedureCountDown, startTimer, practiceProcedureNondominant, practiceStopTapping) //1st block
timeline.push(experimentStartInst)
timeline.push(promptDominant, procedureCountDown, startTimer, procedureDominant, stopTapping, promptNondominant, procedureCountDown, startTimer, procedureNondominant, stopTapping) //1st block
timeline.push(promptDominant, procedureCountDown, startTimer, procedureDominant, stopTapping, promptNondominant, procedureCountDown, startTimer, procedureNondominant, stopTapping) //2nd block
timeline.push(promptDominant, procedureCountDown, startTimer, procedureDominant, stopTapping, promptNondominant, procedureCountDown, startTimer, procedureNondominant, stopTapping)  //3rd block
timeline.push(endExperimentProcedure)
timeline.push(save_data)
timeline.push(end)