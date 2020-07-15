  let instProcedure = { //This loops over the object
    timeline: [welcome, instructions_1, instructions_2, instructions_3, instructions_4], 
  }    
  
  let procedureCountDown = { //This loops over the object
    timeline: [countDown], //if you put fixation in front and the feedback after, it will display those in that order
    //timeline_variables: stimuliTone,
    randomize_order: false,// This is the outer procedure, looping over the stimuli
    timeline_variables: countdown_stim
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
  
  timeline.push(instProcedure)
  timeline.push(getReady, procedureCountDown, procedureTone, procedureNoTone)// BLOCK 1
  timeline.push(getReady, procedureCountDown, procedureTone, procedureNoTone)// BLOCK 2
  timeline.push(getReady, procedureCountDown, procedureTone, procedureNoTone)// BLOCK 3
  timeline.push(getReady, procedureCountDown, procedureTone, procedureNoTone)// BLOCK 4
  timeline.push(getReady, procedureCountDown, procedureTone, procedureNoTone)// BLOCK 5
  timeline.push(getReady, procedureCountDown, procedureTone, procedureNoTone)// BLOCK 6