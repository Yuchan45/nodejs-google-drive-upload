const stream = require("stream");
const express = require("express");
const multer = require("multer");
const path = require("path");
const { google } = require("googleapis");

const uploadRouter = express.Router();
const upload = multer();

const GOOGLE_DRIVE_ID = ['1I5BRhc32LwbmAjbAxgMkEJRCX1oyDfmp'];
const KEY_FILE_PATH = path.join(__dirname, "credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
});


const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);

    const { data } = await google.drive({ 
        version: "v3", 
        auth 
    }).files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.originalname,
            parents: GOOGLE_DRIVE_ID,
        },
        fields: "id,name",
    });
    console.log(`Uploaded file: ${data.name} with id: ${data.id}`);
};

uploadRouter.post("/upload", upload.any(), async (req, res) => {
    try {
        // En realidad lo que viene en el body (nombre, mail y pais) no tienen uso.. Pero bueno.
        // console.log(req.body);
        // console.log(req.files);
        const { body, files } = req;
        files.map(async (file) => {
            await uploadFile(file);
        });

        console.log(body);
        res.status(200).send("Form Submitted");
    } catch (i) {
        res.send(i.message);
    }
});

module.exports = uploadRouter;