function checkHandedness(){
    if (handedness.toUpperCase() == 'RIGHT'){
     //     EasyKey_uCase = 'L';  // 108
     //     HardKey_uCase = 'S';  // 115
         antihandedness = 'LEFT';
     //     EasyKey_ASCII = 108;
     //     HardKey_ASCII = 115;
    } else if (handedness.toUpperCase() == 'LEFT') {
     //     EasyKey_uCase = 'S';  // 115
     //     HardKey_uCase = 'L';  // 108
         antihandedness = 'RIGHT';
     //     EasyKey_ASCII = 115;
     //     HardKey_ASCII = 108;
    } 
 }

 function saveData(name, data){
    let xhr = new XMLHttpRequest();
    // let sec = 30;
    xhr.open('POST', 'index.php'); // 'write_data.php' is the path to the php file described above.
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({filename: name, filedata: data}));
  }

/* start the experiment */
function startExperiment(){
    jsPsych.init({
    timeline: timeline,
    preload_audio: tone,
    show_progress_bar: true,
    //use_webaudio: false,
    // on_finish: countdown(1),
    // prompt: '<div id = "counter" style="color:white; font-size:60px;">timer</div>',
    on_finish: function(){ saveData("variable-tempo-tapping_" + workerId, jsPsych.data.get().csv()); }
    //on_finish: function(){
    //jsPsych.data.get().filter([{test_part: 'test'},{test_part: 'prediction'},{test_part: 'c2_test'}]).localSave("csv", `test-self-deception-data.csv`);
        //jsPsych.data.displayData(); 
    //}
    });
}
