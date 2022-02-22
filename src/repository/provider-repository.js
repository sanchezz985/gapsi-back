const fs = require('fs');

/**
 * Establish a connection to my fake database and find all records in the database.
 * @returns 
 */
const getProviders = () => {
    const content = dbConnection();
    const providers = JSON.parse(content);
    return providers.length == 0 ? [] : providers;
};

/**
 * Insert a new provider in my fake database
 * @param {object} provider
 */
const insertProvider = (provider) => {
    const content = dbConnection();
    const providers = JSON.parse(content);
    providers.push(provider);
    fs.writeFileSync('./bd.json', JSON.stringify(providers), 'utf8');
};

/**
 * Delete the selected record
 * @param {object} provider 
 */
const deleteProvider = (provider) => {
    const content = dbConnection();
    const providers = JSON.parse(content);
    for(let i = 0; i < providers.length; i++) {
        if(providers[i].first_name == provider.first_name) {
            providers[i] = undefined;
            break;
        }
    }
    fs.writeFileSync('./bd.json', JSON.stringify(providers).replace(",null", ""), 'utf8');
};

/**
 * Simulates the database connection
 * @returns the file content for bd.json
 */
const dbConnection = () => {
    return fs.readFileSync("./bd.json", {encoding:'utf8', flag:'r'});
};

module.exports = {
    getProviders,
    insertProvider,
    deleteProvider
};