const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

let open = true;

let failedGetInfoPaciente = 0;
let failedInvokedRPA = 0;

const getInfoPaciente = async (cedula) => {
  const infoPaciente = await axios.get(`http://localhost:3001/${cedula}`);
  return infoPaciente.data;
};

const getHealthInfoPaciente = async () => {
  try {
    const infoPaciente = await axios.get(`http://localhost:3001/health`);

    if (infoPaciente.data.success) {
      failedGetInfoPaciente = 0;
    }
    if (failedInvokedRPA <= 2) {
      open = true;
    }
  } catch (err) {
    console.log(err);
    failedGetInfoPaciente++;
  }
};

const sendDataToRPA = async (data) => {
  const rpaRespose = await axios.post(
    "http://localhost:9090/checkout/dardealta/generate/runBot",
    data
  );
  return rpaRespose.data;
};

const getHealthRPA = async () => {
  try {
    const infoRpa = await axios.get(
      `http://localhost:9090/bothost/management/status/100`
    );

    if (infoRpa.data.status === "READY") {
      failedInvokedRPA = 0;
    }
    if (failedGetInfoPaciente <= 2) {
      open = true;
    }
  } catch (err) {
    console.log(err);
    failedInvokedRPA++;
  }
};

app.post("/salida", async (req, res) => {
  if (!open) {
    getHealthInfoPaciente();
    getHealthRPA();
    res.status(503).send({
      message: "service not avilable",
    });
    return;
  }

  let infoPaciente;

  try {
    infoPaciente = await getInfoPaciente(req.body.cedula);
    failedGetInfoPaciente = 0;
  } catch (err) {
    console.log(err);

    failedGetInfoPaciente++;
    if (failedGetInfoPaciente > 2) {
      open = false;
    }

    res.status(500).send({
      message: "could not retrieve paciente's information",
    });
    return;
  }

  try {
    const rpaRespose = await sendDataToRPA(infoPaciente);
    failedGetInfoPaciente = 0;
    res.send(rpaRespose);
  } catch (err) {
    console.log(err);

    failedInvokedRPA++;
    if (failedInvokedRPA > 2) {
      open = false;
    }

    res.status(500).send({
      message: "could not invocate rpa",
    });
    return;
  }
});

app.listen(3000, () => {
  console.log("app is listening on port 3000!");
});
