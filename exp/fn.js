
function saveData(name, data){
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'index.php'); // 'write_data.php' is the path to the php file described above.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({filename: name, filedata: data}));
}

/* start the experiment */
function startExperiment(){
  jsPsych.init({
    timeline: timeline,
    show_progress_bar: true,
    // on_finish: countdown(1),
    // prompt: '<div id = "counter" style="color:white; font-size:60px;">timer</div>',
    on_finish: function(){ saveData("tapping-task_" + workerId, jsPsych.data.get().csv()); }
    //on_finish: function(){
      //jsPsych.data.get().filter([{test_part: 'test'},{test_part: 'prediction'},{test_part: 'c2_test'}]).localSave("csv", `test-self-deception-data.csv`);
        //jsPsych.data.displayData(); 
    //}
  });
}

function countdown(){ // initialize timer
    let sec = 5; // set timer in seconds
    setInterval(function(){
    document.getElementById('countdown').innerHTML=sec;
    sec--;
    if (sec < 1) {
        sec = 5;
      } 
    }, 1000);
  }