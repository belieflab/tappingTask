
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
  });
}
