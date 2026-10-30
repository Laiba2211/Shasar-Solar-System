import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,

  // Port 587 uses STARTTLS
  secure: false,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const verifyEmailConnection = async () => {
  try {
    await transporter.verify();

    console.log("Email SMTP connection verified successfully.");
  } catch (error) {
    console.error(
      "Email SMTP connection failed:",
      error.message
    );
  }
};

const sendContactNotification = async (contact) => {
  const {
    fullName,
    companyName,
    email,
    phone,
    projectType,
    location,
    systemSize,
    message,
  } = contact;

  const mailOptions = {
    from: `"Shasar Solar Website" <${process.env.SMTP_USER}>`,

    to: process.env.COMPANY_EMAIL,

    // When CEO clicks Reply, it can reply to the client.
    replyTo: email,

    subject: `New Solar Inquiry - ${fullName}`,

    text: `
New Solar Project Inquiry

A new client has submitted an inquiry through the Shasar Solar System website.

Please contact this client because they are interested in solar installation/services.

----------------------------------------
CLIENT INFORMATION
----------------------------------------

Full Name: ${fullName}
Company Name: ${companyName || "Not provided"}
Email: ${email}
Phone: ${phone}

----------------------------------------
PROJECT INFORMATION
----------------------------------------

Project Type: ${projectType}
Project Location: ${location}
Estimated System Size: ${systemSize || "Not provided"}

----------------------------------------
CLIENT MESSAGE
----------------------------------------

${message}

----------------------------------------

This inquiry was submitted through the Shasar Solar System website.
    `.trim(),

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 700px;
        margin: 0 auto;
        color: #1f2937;
      ">

        <div style="
          background: #081c3a;
          padding: 30px;
          border-radius: 12px 12px 0 0;
          color: white;
        ">

          <h1 style="
            margin: 0;
            font-size: 24px;
          ">
            New Solar Inquiry Received
          </h1>

          <p style="
            margin: 8px 0 0;
            color: #ffb200;
            font-size: 15px;
          ">
            Shasar Solar System
          </p>

        </div>

        <div style="
          padding: 30px;
          border: 1px solid #e5e7eb;
          border-top: none;
        ">

          <div style="
            background: #fff7df;
            border-left: 4px solid #ffb200;
            padding: 15px;
            margin-bottom: 25px;
          ">

            <strong>
              New inquiry has been received.
            </strong>

            <p style="margin-bottom: 0;">
              Please contact this client because they
              are interested in solar installation/services.
            </p>

          </div>

          <h2>
            Client Information
          </h2>

          <table style="
            width: 100%;
            border-collapse: collapse;
          ">

            <tr>
              <td style="
                padding: 10px 0;
                font-weight: bold;
                width: 180px;
              ">
                Full Name
              </td>

              <td style="padding: 10px 0;">
                ${fullName}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 10px 0;
                font-weight: bold;
              ">
                Company
              </td>

              <td style="padding: 10px 0;">
                ${companyName || "Not provided"}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 10px 0;
                font-weight: bold;
              ">
                Email
              </td>

              <td style="padding: 10px 0;">
                ${email}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 10px 0;
                font-weight: bold;
              ">
                Phone
              </td>

              <td style="padding: 10px 0;">
                ${phone}
              </td>
            </tr>

          </table>

          <hr style="
            margin: 25px 0;
            border: none;
            border-top: 1px solid #e5e7eb;
          " />

          <h2>
            Solar Project Information
          </h2>

          <table style="
            width: 100%;
            border-collapse: collapse;
          ">

            <tr>
              <td style="
                padding: 10px 0;
                font-weight: bold;
                width: 180px;
              ">
                Service / Inquiry
              </td>

              <td style="padding: 10px 0;">
                ${projectType}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 10px 0;
                font-weight: bold;
              ">
                Project Location
              </td>

              <td style="padding: 10px 0;">
                ${location}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 10px 0;
                font-weight: bold;
              ">
                Estimated System Size
              </td>

              <td style="padding: 10px 0;">
                ${systemSize || "Not provided"}
              </td>
            </tr>

          </table>

          <hr style="
            margin: 25px 0;
            border: none;
            border-top: 1px solid #e5e7eb;
          " />

          <h2>
            Client Message
          </h2>

          <div style="
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            line-height: 1.7;
          ">
            ${message}
          </div>

          <div style="
            margin-top: 30px;
            padding: 18px;
            background: #081c3a;
            color: white;
            border-radius: 8px;
          ">

            <strong>
              Action Required
            </strong>

            <p style="margin-bottom: 0;">
              Please contact the client and follow up
              regarding their solar project requirements.
            </p>

          </div>

        </div>

        <div style="
          padding: 20px;
          text-align: center;
          color: #6b7280;
          font-size: 13px;
        ">
          Shasar Solar System — Contact Form Notification
        </div>

      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log(
    "Contact notification email sent:",
    info.messageId
  );

  return info;
};

export default sendContactNotification;