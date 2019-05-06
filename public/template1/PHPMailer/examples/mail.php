<?php
/**
 * This example shows sending a message using PHP's mail() function.
 */
if ( isset($_POST['submit']) ) {

    echo "string";


    // clean user inputs to prevent sql injections
    $name = trim($_POST['Name']);
    $name = strip_tags($name);
    $name = htmlspecialchars($name);

    $email = trim($_POST['Email']);
    $email = strip_tags($email);
    $email = htmlspecialchars($email);

    $number = trim($_POST['MobileNumber']);
    $number = strip_tags($email);
    $number = htmlspecialchars($email);

    $msg = trim($_POST['Message']);
    $msg = strip_tags($msg);
    $msg = htmlspecialchars($msg);

    $autoresp=file_get_contents('contents.html');
    $autoresp.=nl2br("<p>From :".$name."</p> ");
    $autoresp.=nl2br("<p>Email :".$email."</p> ");
    $autoresp.=nl2br("<p>Content :".$msg."</p> ");
    $autoresp.=nl2br("<p>phone :".$number."</p> ");


    echo "<script>console.log(".json_encode($msg).")</script>";
    SendEmail($name,$email,$number,$autoresp);






}

function SendEmail($name,$email,$number,$msg)
{

require '../PHPMailerAutoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer;
//Set who the message is to be sent from
    $mail->setFrom('autoreply@hayouni.com', 'autoreply@hayouni.com');
//Set an alternative reply-to address
    $mail->addReplyTo('hayouniabdessattar@gmail.com', $name);
//Set who the message is to be sent to
    $mail->addAddress($email, $name);
    $mail->addAddress('hayounimailer@gmail.com', 'Me');
//Set the subject line
$mail->Subject = 'Am glad to hear from you .';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
    $mail->msgHTML($msg, dirname(__FILE__));
//Replace the plain text body with one created manually
    $mail->AltBody = $msg;
//Attach an image file
    $mail->addAttachment('images/Resume.V1.pdf');

//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
    header('Location: redirect/index.html ');
}
}
