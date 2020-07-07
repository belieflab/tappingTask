<?php
$post_data = json_decode(file_get_contents('php://input'), true); //json is a type of javascript variable that functions as a structure. json_decode makes it php. file_get_contents gets the raw input for php
// the directory "data" must be writable by the server
$name = "data/".$post_data['filename'].".csv"; 
$data = $post_data['filedata'];
// write the file to disk
file_put_contents($name, $data);
?>


<!DOCTYPE html>
<html>
  <head>
    <title>Tapping Task</title>  <!-- This is for changing the title -->
    <script src="js/timer.js"></script>
    <!--<script type="text/javascript" src="js/stimuli.js"></script>-->
    <script src="jsPsych/jspsych.js"></script>
    <link href="jsPsych/css/jspsych.css" rel="stylesheet" type="text/css"></link> <!--link is for any other text file; href is for local directory, either a url or path -->
    <link rel="stylesheet" type="text/css" href="css/style.css"> <!--the interpreter will take care of ordering, rel, type, href do not have to be in a specific order -->
  </head>
  <body  style="background-color:gray;">  <!--any time you see style = all properties that follow are inline css -->
  
  <div class="loading centeredDiv">
    <h1 class="loading">Loading...</h1>
  </div>
  <div id="consentHolder" class="consent centeredDiv">
  <h3 id="consentPreamble" class="consent" style="color:white;">In order for us to conduct this test online, we need to include the standard consent form below. <br /> <br /> </h3>
  <div id="consentForm" class="consent consent-box"> 
    <h2 id="consentHeading" class="consent">
      CONSENT FOR PARTICIPATION IN RESEARCH STUDY
      <br>
      Northwestern University Department of Psychology
    </h2> 

    <h2>
      
    </h2>
    <p id="consentInstructions" class="consent">
      <b>Study Title:</b> Finger Tapping <!-- Text in between the <b> <b> bolds the text -->
      <br><br> <!-- This is for adding line breaks, you can add them at the end of a line or on their own -->
      <b>Principal Investigator:</b> Vijay A. Mittal, PhD
      <br><br>
      <b>Funding Source:</b> department funds
      <br><br>
      <u><b>Invitation to Participate and Description of Project</b></u>
      <br>
      You are invited to participate in a research study that concerns psychological processes related to beliefs, perceptions, and decisions. Due to the nature of psychology experiments, we cannot explain the precise purpose of the experiment until after the session is over. Afterwards, the experimenter will be happy to answer any questions you might have about the purpose of the study.
      <br><br>
      <u><b>Description of Procedures</b></u>
      <br>
      If you agree to participate in this study, this task will require you to (1) press (tap) the spacebar as quickly as you can for 10 seconds and (2) press (tap) the spacebar in time with the sound you hear and the without it. You will never be asked for personally identifiable information such as your name, address, or date of birth. 
      <br><br>
      The experiment is designed to take approximately 20 minutes. 
      <br><br>
      <u><b>Risks and Inconveniences</b></u>
      <br>
      There are little to no risks associated with this study. Some individuals may experience mild boredom. 
      <br><br>
      <u><b>Economic Considerations</b></u>
      <br>
      You will receive the payment specified in broader consent form completed when you first started the study.  
      <br><br>
      <u><b>Confidentiality</b></u>
      <br>
      We will never ask for your name, birth date, email or any other identifying piece of information. Your data will be pooled with those of others, and your responses will be completely anonymous. We will keep this data indefinitely for possible use in scientific publications and presentations. 
      <br><br>
      <u><b>Voluntary Participation</b></u>
      <br>
      Your participation in this study is completely voluntary. You are free to decline to participate or to end participation at any time by simply closing your browser window. However, please note that if you stop your participation in the study, you will only be compensated for the duration of your participation. 
      <br><br>
      <u><b>Questions or Concerns</b></u>
      <br>
      If you have any questions or concerns regarding the experiment, you may contact us here at the lab by emailing adapt@northwestern.edu If you have general questions about your rights as a research participant, you may contact the Yale University Human Investigation Committee at 203-785-4688 or human.subjects@yale.edu (HSC# 2000026290).

    </p>
  </div>


</div> <!-- This is testing our settings to the computer being used and if it doesn't fit, then it knows it a mobile device -->
<div id="attritionHolder" class="attrition centeredDiv"> 
  <p id="attritionInstructions" class="attrition"></p>
  <input required type="text" id="attritionAns" class="attrition" size="60" style="width:inherit; height:17px; font-size:15px; margin: 0 auto;" />
</div>
<div id="errorMessageHolder" class="error centeredDiv">
  <p id="mobileBrowserErrorMessage">You cannot access this test from a mobile browser. Please use a desktop computer to complete the task.</p>
  <p id="workerIDErrorMessage">You are ineligible for this task, since your worker ID has been recorded as participating in this task already. 
    Please return the HIT.</p>
</div>



  <div id="nextButtonHolder" class="buttonHolder">
  <button id="nextButton" onclick="startExperiment()">CONSENT/NEXT</button>
  <!-- <div id = "counter" style="color:white; font-size:60px;">timer</div> -->
</div>
</body>


  
  <script>

    let stimuli;
    // let countdownTimer = '<div id = "counter" style="color:white; font-size:60px;">timer</div>';

    /* create timeline */
    let timeline = [];

    // timeline.push({stimulus: '<p style="text-align:center; color:green; font-size:100px">Go!</p>', data: {test_part: 'tap', correct_response: ' '}})

    /* define welcome message trial */
    let welcome = {
      type: "html-keyboard-response",
      stimulus: '<p style="color:black; font-size:40px">Welcome to the FINGER TAPPING experiment!</p>' + '<br>' + '<p style="color:black; font-size:40px">Press the SPACEBAR to continue.</p>', //by default, jsPysch is white background and black text
      choices: [32],
    };
    timeline.push(welcome);

    /* define instructions trial */
    let instructions_1 = {
      type: "html-keyboard-response",
      stimulus: '<p style="color:black; font-size:30px">This is a test of your finger speed.</p>' +
        '<p style="color:black; font-size:30px">We want to see how many times you can press the SPACEBAR in 10 seconds.</p>' +
        '<p style="color:black; font-size:30px">You will start with the hand that you use when writing.</p>' +
        '<p style="color:black; font-size:30px">After each 10 second trail, you will switch hands.</p>' + '<br>' +
        '<p style="color:black; font-size:30px">Press the SPACEBAR to continue the instructions.</p>',
      choices: [32], //without this, it can be any keyboard response
    };
    timeline.push(instructions_1);

    let instructions_2 = {
      type: "html-keyboard-response",
      stimulus: '<p style="color:black; font-size:30px">Do you WRITE with your LEFT hand or RIGHT hand?</p>' +
      '<p style="color:black; font-size:30px">Press 1 for LEFT hand or 2 for RIGHT hand.</p>',
      choices: [49, 50],
    };
    timeline.push(instructions_2);

    
    let instructions_3 = {
      type: "html-keyboard-response",
      stimulus: '<p style="color:black; font-size:30px">While testing, you must keep your hand in the position pitured below.</p>' + '<img src="Stimuli/handposition1.jpg" width="600" height="300" /><img src="Stimuli/handposition2.jpg" width="600" height="300" />' + '<br>' + 
      '<p style="color:black; font-size:30px">Keep your non-pointer finger curled and your thumb under your pointer finger.</p>'+ '<br>' + 
      '<p style="color:black; font-size:30px">Press the SPACEBAR to continue.</p>',
      choices: [32]
      };
      timeline.push(instructions_3);

      let instructions_4 = {
      type: "html-keyboard-response",
      stimulus: '<p style="color:black; font-size:30px">Before we start, lets try a few practice trials.</p>' + '<p style="color:black; font-size:30px">The screen is going to count down from 5 before each trial.</p>' + '<p style="color:black; font-size:30px">When the screen says: </p>' + '<p style="color:green; font-size:30px"> "GO!"</p>' + '<p style="color:black; font-size:30px">Tap the SPACEBAR as fast as you can.</p>' + '<p style="color:black; font-size:30px">Remember to use the hand position shown earlier.</p>' + '<p style="color:black; font-size:30px">Stay in that position for each trial and do not use your whole hand or wrist or arm to press the SPACEBAR.</p>' + '<p style="color:black; font-size:30px">Just use your pointer finger to tap.</p>' + '<p style="color:black; font-size:30px">Press the SPACEBAR to begin.</p>',
      choices: [32]
      };
      timeline.push(instructions_4);

    /* START TRAINING TRIAL FOR PARTICIPANTS */
    let tapping_stimuli = []; /* I believe this creates an array that holds the trial information. Does this need to be done in a for loop? */
    for (let i = 0; i < 100; i++){
      tapping_stimuli.push('<p style="text-align:center; color:green; font-size:100px">Go!</p>'); //this is a thought of these in between the ps in an array
    }

    stimuliLeft = [ 
{stimulus: tapping_stimuli[ 0 ], data: {test_part: 'tapLeft', correct_response: ' '}},
{stimulus: tapping_stimuli[ 1 ], data: {test_part: 'tapLeft', correct_response: ' '}},
{stimulus: tapping_stimuli[ 2 ], data: {test_part: 'tapLeft', correct_response: ' '}},
{stimulus: tapping_stimuli[ 3 ], data: {test_part: 'tapLeft', correct_response: ' '}},
{stimulus: tapping_stimuli[ 4 ], data: {test_part: 'tapLeft', correct_response: ' '}},
{stimulus: tapping_stimuli[ 5 ], data: {test_part: 'tapLeft', correct_response: ' '}},
{stimulus: tapping_stimuli[ 6 ], data: {test_part: 'tapLeft', correct_response: ' '}},
{stimulus: tapping_stimuli[ 7 ], data: {test_part: 'tapLeft', correct_response: ' '}},
{stimulus: tapping_stimuli[ 8 ], data: {test_part: 'tapLeft', correct_response: ' '}},
{stimulus: tapping_stimuli[ 9 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 10 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 11 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 12 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 13 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 14 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 15 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 16 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 17 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 18 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 19 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 20 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 21 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 22 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 23 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 24 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 25 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 26 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 27 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 28 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 29 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 30 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 31 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 32 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 33 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 34 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 35 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 36 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 37 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 38 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 39 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 40 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 41 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 42 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 43 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 44 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 45 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 46 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 47 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 48 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 49 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 50 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 51 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 52 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 53 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 54 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 55 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 56 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 57 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 58 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 59 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 60 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 61 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 62 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 63 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 64 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 65 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 66 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 67 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 68 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 69 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 70 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 71 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 72 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 73 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 74 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 75 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 76 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 77 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 78 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 79 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 80 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 81 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 82 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 83 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 84 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 85 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 86 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 87 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 88 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 89 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 90 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 91 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 92 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 93 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 94 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 95 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 96 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 97 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 98 ], data: {test_part: 'tapLeft', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 99 ], data: {test_part: 'tapLeft', correct_response: ' '}},
]  

stimuliRight = [ 
{stimulus: tapping_stimuli[ 0 ], data: {test_part: 'tapRight', correct_response: ' '}},
{stimulus: tapping_stimuli[ 1 ], data: {test_part: 'tapRight', correct_response: ' '}},
{stimulus: tapping_stimuli[ 2 ], data: {test_part: 'tapRight', correct_response: ' '}},
{stimulus: tapping_stimuli[ 3 ], data: {test_part: 'tapRight', correct_response: ' '}},
{stimulus: tapping_stimuli[ 4 ], data: {test_part: 'tapRight', correct_response: ' '}},
{stimulus: tapping_stimuli[ 5 ], data: {test_part: 'tapRight', correct_response: ' '}},
{stimulus: tapping_stimuli[ 6 ], data: {test_part: 'tapRight', correct_response: ' '}},
{stimulus: tapping_stimuli[ 7 ], data: {test_part: 'tapRight', correct_response: ' '}},
{stimulus: tapping_stimuli[ 8 ], data: {test_part: 'tapRight', correct_response: ' '}},
{stimulus: tapping_stimuli[ 9 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 10 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 11 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 12 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 13 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 14 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 15 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 16 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 17 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 18 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 19 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 20 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 21 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 22 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 23 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 24 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 25 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 26 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 27 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 28 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 29 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 30 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 31 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 32 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 33 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 34 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 35 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 36 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 37 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 38 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 39 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 40 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 41 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 42 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 43 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 44 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 45 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 46 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 47 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 48 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 49 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 50 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 51 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 52 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 53 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 54 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 55 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 56 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 57 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 58 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 59 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 60 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 61 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 62 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 63 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 64 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 65 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 66 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 67 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 68 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 69 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 70 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 71 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 72 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 73 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 74 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 75 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 76 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 77 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 78 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 79 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 80 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 81 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 82 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 83 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 84 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 85 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 86 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 87 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 88 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 89 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 90 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 91 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 92 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 93 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 94 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 95 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 96 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 97 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 98 ], data: {test_part: 'tapRight', correct_response: ' '}},
// {stimulus: tapping_stimuli[ 99 ], data: {test_part: 'tapRight', correct_response: ' '}},
]


    let promptLeft = { 
      type: 'html-keyboard-response',
      stimulus: '<p id="counter" style="text-align:center; color:white; font-size:30px">Get ready to tap with you LEFT hand.</p>'  +
      '<p style="color:white; font-size:30px">Press the SPACEBAR to start tapping.</p>',
      choices: [32], //Spacebar
      on_finish: countdown(1),
    }

    let countDownTap = { 
      type: 'html-keyboard-response',
      stimulus: '<p style="color:black; font-size:60px;" id="countdown"></p>',
      choices: jsPsych.NO_KEYS,
      trial_duration: 6000,
    }

    let startTimer = {
      type: "html-keyboard-response",
      stimulus: '<p id="timer" style="text-align:center; color:white; font-size:30px"></p>',
      trial_duration: 1000,
      on_finish: function experimentTimer(minutes) {// jsPsych on_finish cannot handle nested functions, you have to directly paste it in.
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
                    jsPsych.endCurrentTimeline();
                  seconds = 10;
                }
            }
        }
        tick();
    }
      // response_ends_trial: false
    }

    let tapLeft = { // I think this is the object for collecting responses //
      type: "html-keyboard-response",
      choices: [32],
      response_ends_trial: true,
      stimulus: jsPsych.timelineVariable('stimulus'), //This loads the array of your stimulus order
      data: jsPsych.timelineVariable('data'), //Data is a method (function), saves and knows to write it later
      prompt: '<p hidden id="counter" style="text-align:center; color:white; font-size:30px"></p>',
      on_finish: function (data) {
        console.log(data.key_press)
      }
    }

    let promptRight = { // 
      type: 'html-keyboard-response',
      stimulus: '<p id="counter" style="text-align:center; color:white; font-size:30px">Get ready to tap with you LEFT hand.</p>'  +
      '<p style="color:white; font-size:30px">Press the SPACEBAR to start tapping.</p>',
      choices: [32], //Spacebar
      on_finish: countdown(1),
    }

    let tapRight = { // I think this is the object for collecting responses //
      type: "html-keyboard-response",
      choices: [9,' '],
      response_ends_trial: true,
      stimulus: jsPsych.timelineVariable('stimulus'), //This loads the array of your stimulus order
      data: jsPsych.timelineVariable('data'), //Data is a method (function), saves and knows to write it later
      prompt: '<p hidden id="counter" style="text-align:center; color:white; font-size:30px"></p>',
      on_finish: function (data) {
        console.log(data.key_press)
      }
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

    timeline.push(promptRight, countDownTap, startTimer, procedureRight, promptLeft, countDownTap, startTimer, procedureLeft) //1st block
    timeline.push(promptRight, countDownTap, startTimer, procedureRight, promptLeft, countDownTap, startTimer, procedureLeft) //2nd block
    timeline.push(promptRight, countDownTap, startTimer, procedureRight, promptLeft, countDownTap, startTimer, procedureLeft) //3rd block

    function saveData(name, data){
      let xhr = new XMLHttpRequest();
      // let sec = 30;
      xhr.open('POST', 'index.php'); // 'write_data.php' is the path to the php file described above.
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({filename: name, filedata: data}));
    }

    let workerID = prompt( 'Subject ID' );

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

</script>

<footer>
<script src="jsPsych/plugins/jspsych-html-keyboard-response.js"></script> <!--script is for javascript -->
<script src="jsPsych/plugins/jspsych-image-keyboard-response.js"></script>
<script src="jsPsych/plugins/jspsych-html-button-response.js"></script>

<script type="text/javascript" src="//code.jquery.com/jquery-git.js"></script>

<script>
// show consent page when loaded 
window.onload = function() {
  $(".loading").css({display: "none"});
  $(".consent").css({display: "block"});
  $(".buttonHolder").css({display: "block"});
};
</script>
</footer>
  </html>
