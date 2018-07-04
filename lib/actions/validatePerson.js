const eioUtils = require('elasticio-node').messages;
const request = require('request-promise');
const Ajv = require('ajv');

const person = require('../schemas/addresses/personsV2.json');
const sharedDefinitions = require('../schemas/addresses/sharedDefinitionsV2.json');
const record = require('../schemas/addresses/oih-data-record.json');

/**
 * This method will be called from elastic.io platform providing following data
 *
 * @param msg incoming message object that contains ``body`` with payload
 * @param cfg configuration that is account information and configuration field values
 */
async function processAction(msg) {
  try {
    let ajv = new Ajv();
    let validate = ajv.addSchema(sharedDefinitions).addSchema(record).compile(person);
    let valid = validate(msg);
    console.log(`VALID: ${valid}`);

    if (valid) {
      console.log('Validation successful!');
      return eioUtils.newMessageWithBody(msg.body);
    } else {
      console.log(JSON.stringify(validate.errors));
      throw new Error(JSON.stringify(validate.errors));
    }

  } catch (e) {
    throw new Error(e);
    console.log(`ERROR: ${e}`);
  }
}

module.exports.process = processAction;
