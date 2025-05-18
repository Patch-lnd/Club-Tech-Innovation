exports.connexion = (req, res) => {
    // Logs all the data w'eve gotten from the form
    console.log("Requête reçue !");
    console.log(req.body);
    res.send("Form Sublitted");
}