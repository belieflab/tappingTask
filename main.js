let timeline= [];  

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


   /* start the experiment */
   function startExperiment(){
    jsPsych.init({
      timeline: timeline,
      show_progress_bar: true,
      // on_finish: countdown(1),
      // prompt: '<div id = "counter" style="color:white; font-size:60px;">timer</div>',
      on_finish: function(){ saveData("tapping-task_" + workerID, jsPsych.data.get().csv()); }
      //on_finish: function(){
        //jsPsych.data.get().filter([{test_part: 'test'},{test_part: 'prediction'},{test_part: 'c2_test'}]).localSave("csv", `test-self-deception-data.csv`);
          //jsPsych.data.displayData(); 
      //}
    });
  }
