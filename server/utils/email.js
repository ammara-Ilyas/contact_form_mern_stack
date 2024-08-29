import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "jeanne.rolfson42@ethereal.email",
    pass: "4G8VnmXBC7FJ8YfF4K",
  },
});

export const sendVerificationEmail = async (user, token) => {
  const verificationUrl = `http://localhost:8000/api/auth/email?token=${token}`;
  console.log("everything ok in verification");
  console.log("user emil", user.email);

  const mailOptions = {
    from: '"Ammara Ilyas 👻" <jeanne.rolfson42@ethereal.email>',
    to: user.email,
    subject: "Account Verification",
    html: `<h1>Email Verification</h1>
               <p>Thank you for registering. Please click the link below to verify your account:</p>
               <a href="${verificationUrl}">${verificationUrl}</a>`,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Verification email sent: %s", info.messageId);

  return {
    html: mailOptions.html,
    verificationUrl: verificationUrl,
  };
};
