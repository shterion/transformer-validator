const eioUtils = require('elasticio-node').messages;
const request = require('request-promise');
const Ajv = require('ajv');

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */
async function processAction(msg) {
  try {

    const options = {
      uri: 'https://raw.githubusercontent.com/openintegrationhub/Data-and-Domain-Models/master/src/main/schema/addresses/personV2.json',
      json: true
    };
    const optionsSharedDef = {
      uri: 'https://raw.githubusercontent.com/openintegrationhub/Data-and-Domain-Models/master/src/main/schema/addresses/sharedDefinitionsV2.json',
      json: true
    };
    const optionsRecord = {
      uri: 'https://raw.githubusercontent.com/openintegrationhub/Data-and-Domain-Models/master/src/main/schema/oih-data-record.json',
      json: true
    };

    const person = await request.get(options);
    const sharedDefinitions = await request.get(optionsSharedDef);
    const record = await request.get(optionsRecord);

    let ajv = new Ajv();
    let validate = ajv.addSchema(sharedDefinitions).addSchema(record).compile(person);
    let valid = validate(msg);

    if (valid) {
      return eioUtils.newMessageWithBody(msg.body);
    } else {
      console.log(validate.errors);
      throw new Error(validate.errors);
    }

    (!valid) ? console.log(validate.errors) : console.log('Validation successful');


  } catch (e) {
    throw new Error(e);
    console.log(`ERROR: ${e}`);
  }
}

module.exports.process = processAction;
