    let instProcedure = { //This loops over the object
      timeline: [welcome, instructions_1, instructions_2, instructions_3], 
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

    timeline.push(instProcedure)
    timeline.push(promptDominant, countDownTap, startTimer, procedureNondominant, stopTapping, promptNondominant, countDownTap, startTimer, procedureNondominant, stopTapping) //1st block
    timeline.push(promptDominant, countDownTap, startTimer, procedureNondominant, stopTapping, promptNondominant, countDownTap, startTimer, procedureNondominant, stopTapping) //2nd block
    timeline.push(promptDominant, countDownTap, startTimer, procedureNondominant, stopTapping, promptNondominant, countDownTap, startTimer, procedureNondominant, stopTapping)  //3rd block



