<?php
// define variables and set to empty values
$name = $email = $emailMessage = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $emailHoneyPot = test_input($_POST["email"]);
    $name = test_input($_POST["name"]);
    $email = test_input($_POST["emailAddress"]);
    $emailMessage = test_input($_POST["message"]);
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  $data = urldecode($data);
  return $data;
}

$to = 'info@highlight-science-writing.com';
$message = "Hieronder vind je een bericht verstuurd via de HIGHLIGHT website!\n\n".
        "From : $name \n".
        "Email : $email\n\n".
        "Message : \n $emailMessage ";
if (empty($emailHoneyPot) && !empty($emailMessage) && !empty($email)){
    mail($to, '[HIGHLIGHT bericht van website]', $message, 'From:'.$name);
    echo 'ok';
}
else{
    echo 'nok';
}

?>
