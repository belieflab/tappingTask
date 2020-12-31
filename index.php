<?php
$post_data = json_decode(file_get_contents('php://input'), true); 
// the directory "data" must be writable by the server
$name = "data/".$post_data['filename'].".csv"; 
$data = $post_data['filedata'];
// write the file to disk
file_put_contents($name, $data);

include_once ("db/config.php");

$studyId = $_GET["studyId"];
$candidateId = $_GET["candidateId"];
if (isset($candidateId)) {
  $query = "SELECT GUID from phi where sub_id = $candidateId";
  $prepare = $db_connection->prepare($query);
  $prepare->execute();
  $result = $prepare->get_result();
  $row = $result->fetch_assoc();
  $guid = $row["GUID"];
  $prepare->close();
  } else {
}
$subjectKey = $_GET["subjectkey"];
$consortId = $_GET["src_subject_id"];
$sexAtBirth = $_GET["sex"];
$institutionAlias = $_GET["site"];
$ageInMonths = $_GET["interview_age"];
?>


<!DOCTYPE html>
<html>
  <head>
    <title>Tapping Task</title>  <!-- This is for changing the title -->
    <script src="db/validate.js"></script>
    <script src="jsPsych/jspsych.js"></script>
    <script src="jsPsych/plugins/jspsych-audio-keyboard-response.js"></script>
    <script src="jsPsych/plugins/jspsych-html-keyboard-response.js"></script> <!--script is for javascript -->
    <script src="jsPsych/plugins/jspsych-image-keyboard-response.js"></script>
    <script src="jsPsych/plugins/jspsych-html-button-response.js"></script>
    <link href="jsPsych/css/jspsych.css" rel="stylesheet" type="text/css"></link> 
    <link rel="stylesheet" type="text/css" href="css/style.css"> <!--the interpreter will take care of ordering, rel, type, href do not have to be in a specific order -->
  </head>
  <body id='unload' onbeforeunload="return areYouSure()" style="background-color:gray;">  <!--any time you see style = all properties that follow are inline css -->
    <?php include_once "include/nda.php"?>
  </body>
<footer>  
  <script src="exp/jQuery.js"></script>
  <script src="exp/fn.js"></script>
  <script src="exp/var.js"></script>
  <script type="text/javascript">
    let feedbackLink = "https://belieflab.yale.edu/omnibus/eCRFs/feedback/tasks/speed-tap.php?candidateId=<?php echo $candidateId?>&studyId=<?php echo $studyId?>";
    let GUID = "<?php echo $subjectKey?>";
    let subjectID = "<?php echo $consortId?>";
    let sexAtBirth = "<?php echo $sexAtBirth?>";
    let siteNumber = "<?php echo $institutionAlias?>";
    let ageAtAssessment = "<?php echo $ageInMonths?>";
    </script>
</footer>
</html>
