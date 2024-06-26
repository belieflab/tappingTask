<?php
  require_once 'db/data.php';
  require_once 'db/config.php';
?>


<!DOCTYPE html>
<html>
  <head>
    <title>Tapping Task</title>  <!-- This is for changing the title -->
    <script src="db/validate.js"></script>
    <script src="js/jquery-3.5.1.min.js"></script>
    <script src="jsPsych/jspsych.js"></script>
    <script src="jsPsych/plugins/jspsych-html-keyboard-response.js"></script> <!--script is for javascript -->
    <link href="jsPsych/css/jspsych.css" rel="stylesheet" type="text/css"></link> <!--link is for any other text file; href is for local directory, either a url or path -->
    <link rel="stylesheet" type="text/css" href="css/style.css"> <!--the interpreter will take care of ordering, rel, type, href do not have to be in a specific order-->
    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"> -->
  </head>
  <body id='unload' onbeforeunload="return areYouSure()" style="background-color:gray;">  <!--any time you see style = all properties that follow are inline css -->
    <?php
      if (isset($_GET["src_subject_id"])) {
        include_once "include/nda.php";
        // echo'<br>';
        // echo'connected';
      } else if (isset($_GET["workerId"])) {
        include_once "include/consent.php";
        // echo'<br>';
        // echo'not connected';
      } else {
        include_once "include/intake.php";
      }
    ?>
  </body>
  <footer>
  <script src="exp/conf.js"></script>
    <script src="exp/fn.js"></script>
    <script src="exp/var.js"></script>
    <script type="text/javascript">
      // declare NDA required variables
      let GUID;
      let subjectID;
      let sexAtBirth;
      let siteNumber;
      let ageAtAssessment;
      let groupStatus;
      let visit;
      let feedbackLink;

      
        GUID = "<?php echo $subjectKey?>";
        subjectID = "<?php echo $consortId?>";
        sexAtBirth = "<?php echo $sexAtBirth?>";
        siteNumber = "<?php echo $institutionAlias?>";
        ageAtAssessment = "<?php echo $ageInMonths?>";
        groupStatus = "<?php echo $groupStatus?>";
        visit = "<?php echo $visit?>";
        feedbackLink = "https://belieflab.yale.edu/omnibus/eCRFs/feedback/tasks/kamin.php?candidateId=<?php echo $candidateId?>&studyId=<?php echo $studyId?>";
    </script>
  </footer>
  </html>
