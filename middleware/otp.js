// Fonction qui genere un OTP (One Time Password) a 6 chiffres 
function generateOTP(){
    // Math.random() donne un nombre enre 0 et 1 
    // On multiplie par 900000 et on ajoute 100000 pour avoir toujours 6 chiffres 
    const otp = math.floor(100000 + Math.random()*900000);
    return otp.toString(); // On retourne l'OTP sous forme de chaine de caracteres
}

module.exports = {generateOTP};