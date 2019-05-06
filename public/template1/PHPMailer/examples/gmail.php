<?php
/**
 * This example shows settings to use when sending via Google's Gmail servers.
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

echo "Staring email msg";
//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
	date_default_timezone_set('Etc/UTC');

	require '../PHPMailerAutoload.php';

//Create a new PHPMailer instance
	$mail = new PHPMailer;

//Tell PHPMailer to use SMTP
	$mail->isSMTP();

//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
	$mail->SMTPDebug = 2;

//Ask for HTML-friendly debug output
	$mail->Debugoutput = 'html';

//Set the hostname of the mail server
	$mail->Host = 'smtp.gmail.com';
// use
// $mail->Host = gethostbyname('smtp.gmail.com');
// if your network does not support SMTP over IPv6

//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
	$mail->Port = 587;

//Set the encryption system to use - ssl (deprecated) or tls
	$mail->SMTPSecure = 'tls';

//Whether to use SMTP authentication
	$mail->SMTPAuth = true;

//Username to use for SMTP authentication - use full email address for gmail
	$mail->Username = "hayounimailer@gmail.com";

//Password to use for SMTP authentication
	$mail->Password = "Stoura226901";

//Set who the message is to be sent from
	$mail->setFrom($email, $name);

//Set an alternative reply-to address
	$mail->addReplyTo($email, $name);

//Set who the message is to be sent to
	//$mail->addAddress('hayounimailer@gmail.com', 'Me');
	$mail->addAddress($email, $name);
	$mail->addAddress('hayounimailer@gmail.com', 'Me');

//Set the subject line
	$mail->Subject = 'PHPMailer GMail SMTP test';

//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body

	$mail->msgHTML($msg, dirname(__FILE__));


//Replace the plain text body with one created manually
	$mail->AltBody = $msg;

//Attach an image file
	$mail->addAttachment('images/resume.pdf');

//send the message, check for errors
	if (!$mail->send()) {
		echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
		echo "Message sent!";
	}

}
