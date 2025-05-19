exports.connexion = (req, res) => {
    // Logs all the data w'eve gotten from the form
    console.log("Requête reçue !");
    console.log(req.body);
    res.send("Form Sublitted");

    /* const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const passwordConfim = req.body.passwordConfim */

    // Using destructuring syntax
    const {name, email, password, passwordConfirm} = req.body
}