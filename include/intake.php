
<script>
  // loads the experiment (i.e., variables and main javascript) 
  $("button.loadMain").click(function(){
    // $.getScript("include/intake.js");
    $.getScript("exp/jQuery.js");
    $.getScript("exp/main.js");

  // $.load("include/consent.php");
}); 
</script>


<div class="screening" style="background-color:powderblue; text-align:center; margin:35px; vertical-align:middle">
  <div id="intake">
  <br>
  <h1 style="text-align:center;">CAPR Participant Intake</h1>


    <p><b>Select your Research Site:</b></p>

    <select name="facility" id="siteid">
        <option value="">---</option>
        <option value="Yale">Yale</option>
        <option value="UGA">Georgia</option>
        <option value="Northwestern">Northwestern</option>
        <option value="Temple">Temple</option>
        <option value="Maryland">Maryland</option>
        <option value="Emory">Emory</option>
    </select>
    <label for="facility"></label>


    <form>
    <p><b>Subject ID Number:</b></p>
    <input id="subjectid" type="number" required>
</form>

   
  <form>
    <!-- <label for="handedness"><b>Are you right or left handed?</b></label> -->
    <p><b>Which is your dominant hand?</b></p>
    
        <input id="rightHanded" type="radio" value="rightHanded">
        <label for="right">Right</label><br>
        <!-- <span class="checkmark"></span> -->
        <input id="leftHanded" type="radio" value="leftHanded">
        <label for="left">&nbsp Left</label><br>
        <!-- <span class="checkmark"></span> -->
  </form>

    <!-- <input type="checkbox"><p>Left</p> -->

  <form>
    <p><b>Before proceeding to the task, please confirm that the following are true:</b></p>
    <label class="container">Screen brightness is up to 100% &nbsp&nbsp&nbsp&nbsp   
    <input type="checkbox">
    <br>
  </label>
  
  <label class="container">Headphones plugged in? &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp               
    <input type="checkbox"> 
    <br>
  </label>

  <label class="container">Headphone volume at 50%? &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp          
    <input type="checkbox"> 
    <br>
  </label>

<!-- <label class="container">Headphones are plugged in
    <input type="checkbox">
</label>
<br> -->
    <!-- <label class="container">Volume is up to 100% &nbsp&nbsp&nbsp&nbsp
    <input type="checkbox">
</label> -->
</form>

<br>
<button class="loadMain" onclick="submitIntake();" type="button">submit</button>

</div>
<div id="validation">
    <br>
    <form>


</form>


</div>
<button id="nextButton" style="display: none" onclick="startExperiment()">CONSENT/NEXT</button>
<br>
</div>

<!-- <label class="container">One
  <input type="checkbox" checked="checked">
  <span class="checkmark"></span>
</label>

<label class="container">Two
  <input type="checkbox">
  <span class="checkmark"></span>
</label>

<label class="container">Three
  <input type="checkbox">
  <span class="checkmark"></span>
</label>

<label class="container">Four
  <input type="checkbox">
  <span class="checkmark"></span>
</label> -->