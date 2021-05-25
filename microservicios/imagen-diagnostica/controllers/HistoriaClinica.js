'use strict';

var utils = require('../utils/writer.js');
var HistoriaClinica = require('../service/HistoriaClinicaService');

module.exports.addProcedimientoHistoriaClinica = function addProcedimientoHistoriaClinica (req, res, next) {
  var body = req.swagger.params['body'].value;
  var cedula = req.swagger.params['cedula'].value;
  HistoriaClinica.addProcedimientoHistoriaClinica(body,cedula)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
