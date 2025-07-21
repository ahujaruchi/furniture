<?php
// PHP script to process form submission and send email

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Check if the form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") { 
    // Get and sanitize form data
    $firstName = htmlspecialchars($_POST['firstName']);
    $lastName = htmlspecialchars($_POST['lastName']);
    $email = 'ahuja.ruchi94@gmail.com'; 
    $mobileNo = htmlspecialchars($_POST['phoneNo']);
    $message = htmlspecialchars($_POST['message']);

    // Validate email format on the server side
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    }

    // Recipient email address
    $to = "ahuja.ruchi94@gmail.com"; 

    // Email subject
    $subject = "Form Submission from Your Website";

    // Build the email message
    $email_message = "First Name: $firstName\n"; 
    $email_message .= "Last Name: $lastName\n"; 
    $email_message .= "Email: $email\n";
    $email_message .= "Phone No: $mobileNo\n";
    $email_message .= "Message:\n$message";

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true); // Passing `true` enables exceptions

    try {
        // Server settings
        $mail->isSMTP(); 
        $mail->Host = 'smtp.gmail.com'; // Use your email provider's SMTP host
        $mail->SMTPAuth = true; 
        $mail->Username = 'ahuja.ruchi94@gmail.com'; // Use your full email address
        $mail->Password = 'lgef vvuf muvn yuac'; // Use your generated App Password for Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // or PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 587; // or 465 for SMTPS

        // Recipients
        $mail->setFrom($email, "$firstName $lastName"); 
        $mail->addAddress($to); 

        // Content
        $mail->isHTML(false); // Set email format to plain text
        $mail->Subject = $subject;
        $mail->Body = $email_message;

        $mail->send();
        echo "Thank you for your submission! Your message has been sent.";
    } catch (Exception $e) {
        error_log("Email sending failed: {$mail->ErrorInfo}");
        echo "Oops! Something went wrong, and your message could not be sent. Please try again later. Mailer Error: {$mail->ErrorInfo}";
        // It's good to log the error, but revealing Mailer Error info to the user might be too verbose for production.
    }
} else {
    // If the form was not submitted via POST, return a 403 Forbidden error
    header("HTTP/1.1 403 Forbidden"); 
    echo "You are not allowed to access this page directly.";
}
?>
