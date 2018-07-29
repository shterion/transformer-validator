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
      uri: 'https://raw.githubusercontent.com/openintegrationhub/Data-and-Domain-Models/master/src/main/schema/addresses/organizationV2.json',
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

    const organization = await request.get(options);
    const sharedDefinitions = await request.get(optionsSharedDef);
    const record = await request.get(optionsRecord);

    let ajv = new Ajv();
    let validate = ajv.addSchema(sharedDefinitions).addSchema(record).compile(organization);
    let valid = validate(msg);
    console.log(`VALID: ${valid}`);

    if (valid) {
      console.log(`FLAG 1`);
      console.log('Validation successful');
      return eioUtils.newMessageWithBody(msg.body);
    } else {
      console.log(`FLAG 2`);
      console.log(JSON.stringify(validate.errors));
      throw new Error(JSON.stringify(validate.errors));
    }

  } catch (e) {
    throw new Error(e);
    console.log(`ERROR: ${e}`);
  }
}

module.exports.process = processAction;
