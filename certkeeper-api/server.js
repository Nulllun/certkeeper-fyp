const express = require("express");
const cors = require('cors');
const app = express();
const viewCert = require('./viewCert.js');
const verifyCert = require('./verifyCert.js');
const issueCert = require('./issueCert.js');
const login = require('./login.js');
const register = require('./register.js');


app.use(cors());
app.use(express.json());


app.get("/test", function (req, res) {
    res.json({ data: "Get Request Success" });
});

app.post("/test", function (req, res) {
    res.json({ data: "Post Request Success" });
});

app.post("/file", function (req, res) {
    res.json({ data: "File test" });
})

app.use("/view", viewCert);
app.use("/verify", verifyCert);
app.use("/issue", issueCert);
app.use("/login", login);
app.use("/register", register);

const port = 5000;

app.listen(port, function () {
    console.log(`Server listening on port ${port}!`);
});
