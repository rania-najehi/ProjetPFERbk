// import { config } from "dotenv";
// config({ path: "../config/config.env" });
import nodemailer from "nodemailer";
const accepted = (url, name) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verified</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-color: #007BFF;
            color: #ffffff;
            padding: 10px;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            color: #333333;
            margin-bottom: 20px;
        }
        .content a {
            display: inline-block;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #28a745;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .content a:hover {
            background-color: #218838;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #666666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Your Account Has Been Verified!</h1>
        </div>
        <div class="content">
            <p>Hello ${name},</p>
            <p>Congratulations! Your account has been successfully verified. You can now fully access all our features.</p>
            <p>Click the button below to visit our website:</p>
            <a href="${url}">Go to Website</a>
        </div>
        <div class="footer">
            <p>If you have any questions, feel free to <a href="hello@rbk.com">contact us</a>.</p>
            <p>&copy; 2024 RebootKamp Tunisia. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
const rejected = (url, name) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Rejected</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-color: #007BFF;
            color: #ffffff;
            padding: 10px;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            color: #333333;
            margin-bottom: 20px;
        }
        .content a {
            display: inline-block;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #28a745;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .content a:hover {
            background-color: #218838;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #666666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header" style="background-color: #dc3545;">
            <h1>Your Account Has Been Rejected</h1>
        </div>
        <div class="content">
            <p>Hello ${name},</p>
            <p>We regret to inform you that your account registration has been rejected.</p>
            <p>If you believe this was a mistake or if you have any questions, please contact us:</p>
           
        </div>
        <div class="footer">
            <p>&copy; 2024 RBK Rebootkamp Tunisia . All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
console.log("process.env.EMAIL_USER", process.env.EMAIL_USER);
console.log("process.env.EMAIL_PASS", process.env.EMAIL_PASS);
// Configure the transport options
const transporter = (user, pass) =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user, // Your email
      pass,
    },
  });

// Function to send email
export const sendVerificationEmail = (to, type, userName) => {
  let subject = "";
  let htmlContent = "";

  switch (type) {
    case "Rejected":
      subject = "Account Rejected";
      htmlContent = rejected("http://localhost:5173/", userName);
      break;
    case "Accepted":
      subject = "Account Accepted";
      htmlContent = accepted("http://localhost:5173/", userName);
      break;
    default:
      throw new Error("Invalid email type");
  }
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: htmlContent,
  };

  return transporter(process.env.EMAIL_USER, process.env.EMAIL_PASS).sendMail(
    mailOptions
  );
};
