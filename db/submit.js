// function to store subject number on submit
let workerID;
// let handedness;
// let antihandedness;
// let EasyKey_uCase; 
// let HardKey_uCase;
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
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
    // let rightHandedness = document.getElementById("rightHanded").checked;
    // let leftHandedness = document.getElementById("leftHanded").checked;
    let siteID = document.getElementById("siteid");
    let age = document.getElementById("age").value;
    let sexMale = document.getElementById("male");
    let sexFemale = document.getElementById("female");
    let sex;

    if(sexMale == true) {
        sex = "M";
    } else if(sexFemale == true) {
        sex = "F"
    } 
    // if(rightHandedness == true) {
    //     handedness = "R";
    // } else if(leftHandedness == true) {
    //     handedness = "L"
    // } 
    switch(siteID.options[siteID.selectedIndex].value){
        case "Maryland":
            siteNumber = "10";
            break;
        case "Northwestern":
            siteNumber = "20";
            break;
        case "Temple":
            siteNumber = "30";
            break;
        case "Georgia":
            siteNumber = "40";
            break;
        case "Yale":
            siteNumber = "50";
            break;
        case "Emory":
            siteNumber = "60";
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
        workerID = parseInt(siteNumber + subjectID);
        validateIntake();
        // checkHandedness();
    }
}