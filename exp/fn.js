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
 
//  function checkHandedness(){
//   if (handedness.toUpperCase() == 'RIGHT'){
//        handedness = 'RIGHT';
//        antihandedness = 'LEFT';
//        EasyKey_uCase = 'L';  // 108
//        HardKey_uCase = 'S';  // 115
//        EasyKey_ASCII = 108;
//        HardKey_ASCII = 115;
//   } else if (handedness.toUpperCase() == 'LEFT') {
//        handedness = 'LEFT';
//        antihandedness = 'RIGHT';
//        EasyKey_uCase = 'S';  // 115
//        HardKey_uCase = 'L';  // 108
//        EasyKey_ASCII = 115;
//        HardKey_ASCII = 108;
//   } 
// }

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


      // function to store subject number on submit


function validateIntake() {
    let intake = document.getElementById("intake");
    let consent = document.getElementById("nextButton");
    if (intake.style.display === "none") {
      intake.style.display = "block";
    } else {
      intake.style.display = "none";
      consent.style.display = "block";
    }
  }

function submitIntake() {
    let subjectID = document.getElementById("subjectid").value;
    let rightHandedness = document.getElementById("rightHanded").checked;
    let leftHandedness = document.getElementById("leftHanded").checked;
    let siteID = document.getElementById("siteid");
   
    if(rightHandedness == true) {
        handedness = "RIGHT";
        antihandedness = "LEFT";
    } else if(leftHandedness == true) {
        handedness = "LEFT";
        antihandedness = "RIGHT";
    } 

    switch(siteID.options[siteID.selectedIndex].value){
        case "Yale":
            siteNumber = "10";
            break;
        case "UGA":
            siteNumber = "20";
            break;
        case "Northwestern":
            siteNumber = "30";
            break;
        case "Temple":
            siteNumber = "40";
            break;
        case "Maryland":
            siteNumber = "50";
            break;
        default:
            siteNumber = "00";
    }

    // if(siteID.options[siteID.selectedIndex].value == "Yale") {
    //     siteNumber = "10"
    // }

    if(subjectID == "") {
        alert("Please enter a valid subjectid")
    } else {
        alert("your subjectid is " + siteNumber + subjectID);
        workerId = parseInt(siteNumber + subjectID);
        validateIntake();
        checkHandedness();
    // loads the experiment (i.e., variables and main javascript) 
      $.getScript("exp/main.js");
        }
    }


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


function experimentTimer(minutes) {
    // jsPsych.endCurrentTimeline();
    let seconds = 10;
    let mins = minutes;
    function tick() {
        //This script expects an element with an ID = "counter". You can change that to what ever you want. 
        // let counter = document.getElementById("counter");
        // let counter = '';
        let current_minutes = mins-1
        seconds--;
        // counter = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds); //comment out .innerHTML method to hide the timer
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
            console.log(seconds);
        } else {
            if(mins > 1){
                countdown(mins-1);           
            }
            else if (seconds == 0) { //ends experiment when timer reaches 0
                // jsPsych.endCurrentTimeline();
                // seconds = 10;
            }
        }
    }
    tick();
  } 
    
    
function countdown(){ // initialize timer
    let sec = 5; // set timer in seconds
    let counTdown = setInterval(function(){
    document.getElementById('countdown').innerHTML=sec;
    sec--;
    if (sec < 0) {
        sec = 5;
      } 
    }, 1000);
  }
    
    //   function experimentTimer(){ // initialize timer
    //     let seconds = 10; // set timer in seconds
    //     let counTdown = setInterval(function(){
    //     document.getElementById('experimentTimer').innerHTML=sec;
    //     seconds--;
    //     console.log(seconds)
    //     if (seconds < 0) {
    //         seconds = 10;
    //         while (stimuliLeft.length > 0) {
    //         stimuliLeft.pop()       
    //         }
    //         while (stimuliRight.length > 0) {
    //         stimuliRight.pop()       
    //         }
    //       } 
    //     }, 1000);
    //   }