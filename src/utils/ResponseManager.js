
/**
 * Build the response in this form
 * {
 *  "data" : {} // some value
 * }
 * @param {*} value 
 * @returns 
 */
const buildResponse = (value) => {
    return {data: value};
};

module.exports = {
    buildResponse
};