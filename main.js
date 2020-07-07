    let instProcedure = { //This loops over the object
      timeline: [welcome, instructions_1, instructions_2, instructions_3, instructions_4], 
    }    

    let procedureRight = { //This loops over the object
      timeline: [tapRight], //if you put fixation in front and the feedback after, it will display those in that order
      timeline_variables: stimuliRight,
      randomize_order: false,// This is the outer procedure, looping over the stimuli
    }

    let procedureLeft = { //This loops over the object
      timeline: [tapLeft], //if you put fixation in front and the feedback after, it will display those in that order
      timeline_variables: stimuliLeft,
      randomize_order: false,// This is the outer procedure, looping over the stimuli
    }

    timeline.push(instProcedure)
    timeline.push(promptRight, countDownTap, startTimer, procedureRight, promptLeft, countDownTap, startTimer, procedureLeft) //1st block
    timeline.push(promptRight, countDownTap, startTimer, procedureRight, promptLeft, countDownTap, startTimer, procedureLeft) //2nd block
    timeline.push(promptRight, countDownTap, startTimer, procedureRight, promptLeft, countDownTap, startTimer, procedureLeft) //3rd block



