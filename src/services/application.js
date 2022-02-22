// required imports
const ResponseManager = require("../utils/ResponseManager");

/**
 * Get a greeting for the current candidate
 * @param {object} req 
 * @param {object} res 
 */
const getGreeting = (req, res) => {
    res.status(200).send(ResponseManager.buildResponse("Bienvenido Candidato 01"));
};

/**
 * Get the application version
 * @param {object} req 
 * @param {object} res 
 */
const getVersion = (req, res) => {
    res.status(200).send(ResponseManager.buildResponse("0.0.1"));
};

module.exports = {
    getGreeting,
    getVersion
};