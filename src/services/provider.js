// required imports
const ResponseManager = require("../utils/ResponseManager");
const ProvidersRepository = require("../repository/provider-repository");

const providersMap = new Map();

/**
 * Get all providers
 * @param {object} req 
 * @param {object} res 
 */
const getAllProviders = (req, res) => {
    
    // fill the map to avoid unnecessary database connections
    if(providersMap.size == 0)
        loadInitialData();
    
    const providers = Array.from(providersMap, ([key, value]) => (value));
    
    if(providers.length == 0)
        res.status(404).send(ResponseManager.buildResponse("Data not found"));

    return res.status(200).send(ResponseManager.buildResponse(paginate(req, providers)));
};

/**
 * Fill the map to avoid unnecessary database connections
 * @param {array} providers 
 */
const fillMap = (providers) => {
    providers.forEach(p => {
        if(providersMap.get(p.id)==undefined)
            providersMap.set(p.first_name, p);
    });
};

/**
 * Insert a new provider
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const insertProvider = (req, res) => {
    
    if(providersMap.size == 0)
        loadInitialData();

    const provider = req.body;
    if(providersMap.get(provider.first_name) != undefined) {
        return res.status(400).send(ResponseManager.buildResponse("Duplicated provider"));
    } else {
        // save new provider in DB and in memory
        ProvidersRepository.insertProvider(provider);
        providersMap.set(provider.first_name, provider);
    }
    return res.status(200).send(ResponseManager.buildResponse("Provider inserted successfully"));
};

/**
 * Delete a provider
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteProvider = (req, res) => {
    if(providersMap.size == 0)
        loadInitialData();
    
    const provider = req.body;
    if(providersMap.get(provider.first_name) == undefined) {
        return res.status(404).send(ResponseManager.buildResponse("Can't delete non existing provider"));
    } else {
        // delete provider in DB and in memory
        ProvidersRepository.deleteProvider(provider);
        providersMap.delete(provider.first_name, provider);
    }
    return res.status(200).send(ResponseManager.buildResponse("Provider deleted successfully"));
};

/**
 * Do the pagination
 * @param {object} req 
 * @param {} providers 
 * @returns 
 */
const paginate = (req, providers) => {
    
    const paginationObject = {};
    const { page = 1, limit = 50 } = req.query;
    const startIndex = (page-1) * limit;
    const endIndex = page*limit;
    
    // find for next page
    if(endIndex < providers.length) {
        paginationObject.next = {
            page: parseInt(page)+1,
            limit: limit
        }
    }

    // find for previous page
    if(startIndex > 0) {
        paginationObject.previous = {
            page: parseInt(page)-1,
            limit: limit
        }
    }

    paginationObject.providers = providers.slice(startIndex, endIndex);
    return paginationObject;
};

/**
 * loadInitialData
 */
const loadInitialData = () => {
    fillMap(ProvidersRepository.getProviders());
};


module.exports = {
    getAllProviders,
    insertProvider,
    deleteProvider
};