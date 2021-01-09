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
    <script src="js/jquery-3.5.1.min.js"></script>
    <script src="jsPsych/jspsych.js"></script>
    <script src="jsPsych/plugins/jspsych-html-keyboard-response.js"></script> <!--script is for javascript -->
    <link href="jsPsych/css/jspsych.css" rel="stylesheet" type="text/css"></link> <!--link is for any other text file; href is for local directory, either a url or path -->
    <link rel="stylesheet" type="text/css" href="css/style.css"> <!--the interpreter will take care of ordering, rel, type, href do not have to be in a specific order-->
    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous"> -->
  </head>
  <body id='unload' onbeforeunload="return areYouSure()" style="background-color:gray;">  <!--any time you see style = all properties that follow are inline css -->
  <?php
    if ($db_connection_status == true) {
      include_once "include/nda.php";
      // echo'<br>';
      // echo'connected';
    } else if ($db_connection_status == false) {
      include_once "include/intake.php";
      // echo'<br>';
      // echo'not connected';
    }
    ?>
  </body>
  <footer>
  <script src="exp/conf.js"></script>
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
