<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/*
|--------------------------------------------------------------------------
| PHPMailer Autoload
|--------------------------------------------------------------------------
*/
require __DIR__ . '/../vendor/autoload.php';


/*
|--------------------------------------------------------------------------
| ONLY ACCEPT POST REQUEST
|--------------------------------------------------------------------------
*/
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
   header("Location: /yojnagroups-main/contact.html");
    exit;
}


/*
|--------------------------------------------------------------------------
| GET FORM DATA
|--------------------------------------------------------------------------
*/
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$service = trim($_POST['service'] ?? '');
$message = trim($_POST['message'] ?? '');


/*
|--------------------------------------------------------------------------
| VALIDATION
|--------------------------------------------------------------------------
*/
if (
    empty($name) ||
    empty($email) ||
    empty($service) ||
    empty($message)
) {
    die("Please fill all required fields.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Please enter a valid email address.");
}

if (!preg_match('/^[0-9]{10}$/', $phone)) {
    die("Please enter a valid 10-digit phone number.");
}


/*
|--------------------------------------------------------------------------
| CREATE PHPMailer
|--------------------------------------------------------------------------
*/
$mail = new PHPMailer(true);

try {

    /*
    |--------------------------------------------------------------------------
    | SMTP SETTINGS
    |--------------------------------------------------------------------------
    */
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'internshiva61@gmail.com';
    $mail->Password   = 'vvfw kvcp wcbs fqay'; // App password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;


    /*
    |--------------------------------------------------------------------------
    | SENDER & RECEIVER
    |--------------------------------------------------------------------------
    */
    $mail->setFrom('internshiva61@gmail.com', 'Yojna Group Website');
    $mail->addAddress('internshiva61@gmail.com', 'Yojna Group');
    $mail->addReplyTo($email, $name);


    /*
    |--------------------------------------------------------------------------
    | EMAIL CONTENT
    |--------------------------------------------------------------------------
    */
    $mail->isHTML(true);
    $mail->Subject = 'New Contact Enquiry from ' . $name;

    $mail->Body = '
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 20px auto; border: 1px solid #e2e8ea; border-radius: 10px; overflow: hidden; background: #ffffff;">

        <div style="background: #12343b; padding: 25px; color: white;">
            <h2 style="margin: 0; color: #73dce3; font-size: 25px;">Yojna Group</h2>
            <p style="margin: 8px 0 0; color: #ffffff; font-size: 15px;">New Website Enquiry</p>
        </div>

        <div style="padding: 30px; background: #ffffff;">

            <p style="margin: 0 0 15px;"><strong>Name:</strong><br>' . htmlspecialchars($name) . '</p>
            <p style="margin: 0 0 15px;"><strong>Email:</strong><br>' . htmlspecialchars($email) . '</p>
            <p style="margin: 0 0 15px;"><strong>Phone:</strong><br>' . htmlspecialchars($phone ?: 'Not provided') . '</p>
            <p style="margin: 0 0 15px;"><strong>Service:</strong><br>' . htmlspecialchars($service) . '</p>

            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 25px 0;">

            <p style="margin-bottom: 10px;"><strong>Message:</strong></p>
            <div style="line-height: 1.7; color: #45575b; background: #f7fafb; padding: 15px; border-radius: 6px;">
                ' . nl2br(htmlspecialchars($message)) . '
            </div>

        </div>
    </div>
    ';

    $mail->AltBody =
        "New Yojna Group Website Enquiry\n\n" .
        "Name: $name\n" .
        "Email: $email\n" .
        "Phone: " . ($phone ?: 'Not provided') . "\n" .
        "Service: $service\n\n" .
        "Message:\n$message";


    /*
    |--------------------------------------------------------------------------
    | SEND EMAIL
    |--------------------------------------------------------------------------
    */
    $mail->send();


    /*
    |--------------------------------------------------------------------------
    | SUCCESS PAGE
    |--------------------------------------------------------------------------
    */
    echo '
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message Sent - Yojna Group</title>
        <style>
            * { box-sizing: border-box; }
            body {
                margin: 0; padding: 20px;
                font-family: Arial, sans-serif;
                background: #f5f9fa;
                display: flex; align-items: center; justify-content: center;
                min-height: 100vh;
            }
            .success-box {
                background: #ffffff; padding: 50px 40px;
                max-width: 520px; width: 100%;
                text-align: center; border-radius: 15px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
            }
            .icon {
                width: 75px; height: 75px;
                margin: 0 auto 20px; border-radius: 50%;
                background: #eaf8f9; color: #087f8c;
                display: flex; align-items: center; justify-content: center;
                font-size: 38px; font-weight: bold;
            }
            h1 { margin-bottom: 15px; color: #12343b; }
            p { color: #68777b; line-height: 1.7; font-size: 16px; }
            .back-button {
                display: inline-block; margin-top: 20px;
                padding: 14px 28px; background: #087f8c; color: #ffffff;
                text-decoration: none; border-radius: 6px; transition: 0.3s;
            }
            .back-button:hover { background: #0a9aa8; }
        </style>
    </head>
    <body>
        <div class="success-box">
            <div class="icon">✓</div>
            <h1>Message Sent!</h1>
            <p>Thank you for contacting Yojna Group. Our team will get back to you soon.</p>
            <a href="../contact.html" class="back-button">Back to Contact</a>
        </div>
    </body>
    </html>
    ';

} catch (Exception $e) {

    /*
    |--------------------------------------------------------------------------
    | ERROR PAGE
    |--------------------------------------------------------------------------
    */
    echo '
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Error - Yojna Group</title>
        <style>
            body {
                margin: 0; padding: 20px;
                font-family: Arial, sans-serif;
                background: #f5f9fa;
                display: flex; align-items: center; justify-content: center;
                min-height: 100vh;
            }
            .error-box {
                background: #ffffff; padding: 45px 35px;
                max-width: 520px; width: 100%;
                text-align: center; border-radius: 15px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
            }
            .icon {
                width: 70px; height: 70px;
                margin: 0 auto 20px; border-radius: 50%;
                background: #fff0f0; color: #d9534f;
                display: flex; align-items: center; justify-content: center;
                font-size: 35px; font-weight: bold;
            }
            h1 { color: #12343b; }
            p { color: #68777b; line-height: 1.7; }
            a {
                display: inline-block; margin-top: 20px;
                padding: 14px 25px; background: #087f8c;
                color: white; text-decoration: none; border-radius: 6px;
            }
        </style>
    </head>
    <body>
        <div class="error-box">
            <div class="icon">!</div>
            <h1>Message Could Not Be Sent</h1>
            <p>Something went wrong while sending your message. Please try again later.</p>
            <a href="../contact.html">Back to Contact</a>
        </div>
    </body>
    </html>
    ';

    // Uncomment this line while debugging to see exact error:
    // echo "<pre>" . $mail->ErrorInfo . "</pre>";
}