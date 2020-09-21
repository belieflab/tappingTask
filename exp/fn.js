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
    preload_audio: audio,
    show_progress_bar: true,
    //use_webaudio: false,
    // on_finish: countdown(1),
    // prompt: '<div id = "counter" style="color:white; font-size:60px;">timer</div>',
    on_finish: function(){ saveData("toneTapping-task_" + workerID, jsPsych.data.get().csv()); }
    //on_finish: function(){
        //jsPsych.data.get().filter([{test_part: 'test'},{test_part: 'prediction'},{test_part: 'c2_test'}]).localSave("csv", `test-self-deception-data.csv`);
        //jsPsych.data.displayData(); 
    //}
    });
}

// function to store subject number on submit


// function validateIntake() {
//     let intake = document.getElementById("intake");
//     let consent = document.getElementById("nextButton");
//     if (intake.style.display === "none") {
//     intake.style.display = "block";
//     } else {
//     intake.style.display = "none";
//     consent.style.display = "block";
//     }
// }

// function submitIntake() {
//     let subjectID = document.getElementById("subjectid").value;
//     let rightHandedness = document.getElementById("rightHanded").checked;
//     let leftHandedness = document.getElementById("leftHanded").checked;
//     let siteID = document.getElementById("siteid");
    
//     if(rightHandedness == true) {
//         handedness = "RIGHT";
//         antihandedness = "LEFT";
//     } else if(leftHandedness == true) {
//         handedness = "LEFT";
//         antihandedness = "RIGHT";
//     } 

//     switch(siteID.options[siteID.selectedIndex].value){
//         case "Yale":
//             siteNumber = "10";
//             break;
//         case "UGA":
//             siteNumber = "20";
//             break;
//         case "Northwestern":
//             siteNumber = "30";
//             break;
//         case "Temple":
//             siteNumber = "40";
//             break;
//         case "Maryland":
//             siteNumber = "50";
//             break;
//         default:
//             siteNumber = "00";
//     }

//     // if(siteID.options[siteID.selectedIndex].value == "Yale") {
//     //     siteNumber = "10"
//     // }

//     if(subjectID == "") {
//         alert("Please enter a valid subjectid")
//     } else {
//         alert("your subjectid is " + siteNumber + subjectID);
//         workerID = parseInt(siteNumber + subjectID);
//         validateIntake();
//         checkHandedness();
//     }
// }

function move() { // function definition
    var width = document.getElementById("goTap").style.width; // variable assignment of width property of keyBar
    width = parseInt(width.slice(0, -1)); // variable reassignment
      if (width >= 100) {
        width = document.getElementById("goTap").style.width="0%";
      } else {
        width++;
        width = document.getElementById("goTap").style.width=String(width)+"%";
      }
    }


function countdown(minutes) {
    // jsPsych.endCurrentTimeline();
    let seconds = 15;
    let mins = minutes;
    function tick() {
        //This script expects an element with an ID = "counter". You can change that to what ever you want. 
        let counter = document.getElementById("counter");
        // let counter = '';
        let current_minutes = mins-1
        seconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds); //comment out .innerHTML method to hide the timer
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
            console.log(seconds);
        } else {
            if(mins > 1){
                countdown(mins-1);           
            }
            else if (seconds == 0) { //ends experiment when timer reaches 0
                jsPsych.endCurrentTimeline();
                // seconds = 10;
            }
        }
    }
    tick();

}
    
function countdown2(minutes) {
    // jsPsych.endCurrentTimeline();
    let seconds = 10;
    let mins = minutes;
    function tick() {
        //This script expects an element with an ID = "counter". You can change that to what ever you want. 
        let counter = document.getElementById("counter");
        // let counter = '';
        let current_minutes = mins-1
        seconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds); //comment out .innerHTML method to hide the timer
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
            console.log(seconds);
        } else {
            if(mins > 1){
                countdown(mins-1);           
            }
            else if (seconds == 0) { //ends experiment when timer reaches 0
                jsPsych.endCurrentTimeline();
                // seconds = 10;
            }
        }
    }
    tick();

}