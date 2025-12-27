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
        text: `Votre code unique est: ${otp}, valide 5 minutes. Ne le partagez avec personne.`,
    };
    await transporter.sendMail(mailOptions); // Envoi de l'email
    console.log(`OTP envoyé avec success vers ${email} : ${otp}`);
}

module.exports = {sendOTP};