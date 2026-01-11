const multer = require("multer");
const path = require("path");

// Stockage sur le serveur local 
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/uploads/avatars"); // Dossier pour stocker les avatars
    },
    filenameme: function(req, file, cb){
        // On renomme le fichier avec l'ID utilisateur + timestamp + extesion
        const ext = path.extname(file.oroginalname);
        cb(null, req.user.id+"-"+Date.now()+ext);
    }
});

// Filtre pour accepter uniquement images 
const fileFilter = (req, file, cb)=>{
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedTypes.includes(file.mimetype)){
        cb(null, true); // Fichier accepté
    }else{
        cb(new Error("Seuls les images jpg,jpeg et png sont autorisées"), false)
    }
};

const upload = multer({
    storage, fileFilter, limits: {filesize: 2*1024*1024} // Limite de 2MB   
})

module.exports = upload;