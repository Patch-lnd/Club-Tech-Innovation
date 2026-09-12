const nodemailer = require('nodemailer');
const fs = require('fs'); 
const path = require('path');

// Load email CSS 
const mailCSS = fs.readFileSync(path.join(__dirname, 'public','mail_UI.css'), 'utf8');

// Configuration du transporteur SMTP (exemple Gmail)
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
})

// Fonction pour envoyer l'OTP 
async function sendOTP(email, otp){
    const mailOptions = {
        from: '"CETI Club"<djeumenipatchepiaarthursamuel@gmail.com>',
        to: email,
        subject: "Votre code unique pour le CETI",
        html: `<p>Votre code unique est: <b style="font-size: 24px;">${otp}</b></p> </br><p>Valide 5 minutes, Ne le partagez avec personne.</p>`,
    };
    await transporter.sendMail(mailOptions); // Envoi de l'email
    console.log(`OTP envoyé avec success vers ${email} : ${otp}`);
}

async function sendEmailVerify(email, verificationLink){
    const mailOptions = {
        from: '"CETI Club" <djeumenipatchepiaarthursamuel@gmail.com>',
        to: email,
        subject: "Terminez la création de votre compte CETI",
        html: `
            <h2>Bienvenue au CETI Club</h2>
            <p>Veuillez cliquer sur le lien ci-dessous pour vérifier votre email :</p>
            <p>
                <a href="${verificationLink}" 
                   style="background:#2563eb;color:#ffffff;text-decoration:none;padding:10px 15px;display:block;width:max-content;">
                    Vérifier mon email
                </a>
            </p>
            <p>Si le bouton ne fonctionne pas, copiez-collez ce lien dans votre navigateur :</p>
            <p>${verificationLink}</p>
            <p>Valide 15 minutes. Ne le partagez avec personne.</p>
         `,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Mail de Création de compte envoyé vers ${email} : ${verificationLink}`);
}


module.exports = {sendOTP,sendEmailVerify};