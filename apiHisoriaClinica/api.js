const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.send({
    success: true,
  });
});

app.get("/:cedula", (req, res) => {
  const cedula = req.params.cedula;
  console.log(cedula);

  res.send({
    idPatientType: "CC",
    idPatient: "123456",
    namePatient: "Miguel",
    surnamePatient: "Hoyos",
    birthDatePatient: "1997-10-20",
    admissionDatePatient: "2021-04-12",
    symptom: "Presenta Fiebre, tos seca, sarpullido",
    temperature: "39°",
    diagnosis: "Tomar mucha Agua y acetaminofen",
    numberVoucher: "987654321",
  });
});

app.listen(3001, () => {
  console.log("app is listening on port 3001!");
});
