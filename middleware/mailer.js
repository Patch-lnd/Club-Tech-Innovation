const { text } = require('express');
const nodemailer = require('nodemailer');

// Configuration du transporteur SMTP (exemple Gmail)
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "djeumenipatchepiaarthursamuel@gmail.com",
        pass: "jsmq xcha fwsa zmde",
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
        from: '"CETI Club"<djeumenipatchepiaarthursamuel@gmail.com>',
        to: email,
        subject: "Terminez la création de votre compte CETI",
        html: `</br><p>Valide 15 minutes, Ne le partagez avec personne.</p>`,
    };
    await transporter.sendMail(mailOptions); // Envoi de l'email
    console.log(`Mail de Creation de compte envoyé avec success vers ${email} : ${verificationLink}`);
}

module.exports = {sendOTP,sendEmailVerify};