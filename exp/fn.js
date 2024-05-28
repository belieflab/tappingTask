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
    });
}

  //onbeforeunload in body
  function areYouSure() {
    return "Write something clever here...";
  }
  areYouSure();