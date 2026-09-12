const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Load email CSS
const mailCSS = fs.readFileSync(
  path.join(__dirname, "../", "public", "mail_UI.css"),
  "utf8"
);

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

// Send OTP
async function sendOTP(email, otp) {
  const mailOptions = {
    from: '"CETI Club" <djeumenipatchepiaarthursamuel@gmail.com>',
    to: email,
    subject: "Votre code unique pour le CETI",

    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          ${mailCSS}
        </style>
      </head>

      <body>
        <div class="email-wrapper">
          <div class="email-card">

            <div class="email-header">
              <p class="email-brand">
                CETI <span>Club</span>
              </p>
            </div>

            <div class="email-content">

              <h1 class="email-title">
                Votre code de vérification
              </h1>

              <p class="email-text">
                Utilisez le code ci-dessous pour continuer votre
                procédure de vérification sur la plateforme CETI.
              </p>

              <div class="otp-box">
                <p class="otp-label">Code unique</p>
                <p class="otp-code">${otp}</p>
              </div>

              <div class="info-box">
                Ce code est valable pendant <strong>5 minutes</strong>.
                Pour votre sécurité, ne communiquez jamais ce code.
              </div>

              <p class="email-text" style="margin-top: 25px;">
                Si vous n'êtes pas à l'origine de cette demande,
                vous pouvez simplement ignorer cet email.
              </p>

            </div>

            <div class="email-footer">
              <p>CETI Club — Technologie & Innovation</p>
              <p>Ceci est un message automatique.</p>
            </div>

          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);

  console.log(`OTP envoyé avec succès vers ${email} : ${otp}`);
}

// Send email verification
async function sendEmailVerify(email, verificationLink) {
  const mailOptions = {
    from: '"CETI Club" <djeumenipatchepiaarthursamuel@gmail.com>',
    to: email,
    subject: "Terminez la création de votre compte CETI",

    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          ${mailCSS}
        </style>
      </head>

      <body>
        <div class="email-wrapper">
          <div class="email-card">

            <div class="email-header">
              <p class="email-brand">
                CETI <span>Club</span>
              </p>
            </div>

            <div class="email-content">

              <h1 class="email-title">
                Bienvenue au CETI Club
              </h1>

              <p class="email-text">
                Votre compte est presque prêt.
                Veuillez confirmer votre adresse email afin de
                terminer la création de votre compte.
              </p>

              <div class="verify-button-wrapper">
                <a
                  href="${verificationLink}"
                  class="verify-button"
                >
                  Vérifier mon email
                </a>
              </div>

              <div class="info-box">
                Ce lien de vérification est valable pendant
                <strong>15 minutes</strong>.
              </div>

              <p class="email-text" style="margin-top: 25px;">
                Si le bouton ne fonctionne pas, copiez et collez
                le lien suivant dans votre navigateur :
              </p>

              <div class="link-box">
                <a href="${verificationLink}">
                  ${verificationLink}
                </a>
              </div>

              <p class="email-text" style="margin-top: 25px;">
                Si vous n'avez pas demandé la création de ce compte,
                vous pouvez ignorer cet email.
              </p>

            </div>

            <div class="email-footer">
              <p>CETI Club — Technologie & Innovation</p>
              <p>Ceci est un message automatique.</p>
            </div>

          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);

  console.log(
    `Mail de création de compte envoyé vers ${email} : ${verificationLink}`
  );
}

module.exports = {
  sendOTP,
  sendEmailVerify,
};