<script>src = "js/jQuery.js"</script>
<script>
  // loads the experiment (i.e., variables and main javascript) 
  $("button.loadMain").click(function(){
    // $.getScript("js/fn.js");
    // $.getScript("js/main.js");
    // $.getScript("js/var.js");
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
        <option value="UGA">UGA</option>
        <option value="Northwestern">Northwestern</option>
        <option value="Temple">Temple</option>
        <option value="Maryland">Maryland</option>
    </select>
    <label for="facility"></label>

    <!-- <form name="myForm" action="/action_page.php" onsubmit="return validateForm()" method="post">
    Name: <input type="text" name="fname">
    <input type="submit" value="Submit">
    </form> -->

    <!-- <form action="/action_page.php" method="post">
        <input type="text" name="fname" required>
        <input type="submit" value="Submit">
    </form> -->

    <form>
    <p><b>Subject ID Number:</b></p>
    <input id="subjectid" type="number" required>
</form>
    <!-- <button onclick="submitIntake()">submit subjectid</button> -->

    <!-- <p><b>Participant DOB</b></p>
    <p><b>Enter as MM/DD/YYYY</b></p>
    <p style="color:red">*must provide value</p>
    <input type="date">
    <form> -->
   

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

  <label class="container">Headphones volume at 50%? &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp          
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