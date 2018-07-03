"use strict";
const request = require('request-promise');
const Ajv = require('ajv');

(async function getSchema(){
  const data = {
    "categories": [],
    "calendars": [],
    "contactData": [
      {
        "description": "phone number",
        "type": "phone",
        "value": ""
      },
      {
        "description": "second phone number",
        "type": "phone"
      },
      {
        "description": "third phone number",
        "type": "phone"
      },
      {
        "description": "mobile phone number",
        "type": "phone"
      },
      {
        "description": "private mobile phone number",
        "type": "phone",
        "value": ""
      },
      {
        "description": "private phone number",
        "type": "phone",
        "value": ""
      },
      {
        "description": "fax",
        "type": "fax",
        "value": ""
      },
      {
        "description": "email",
        "type": "email",
        "value": ""
      },
      {
        "description": "private email",
        "type": "email",
        "value": ""
      },
      {
        "description": "xing",
        "type": "xing"
      }
    ],
    "address": [
      {
        "description": "",
        "primaryContact": "",
        "country": 5,
        "region": "",
        "district": "",
        "city": "null",
        "zipCode": "null",
        "unit": ""
      }
    ],
    "anniversary": "",
    "nickname": "",
    "language": "",
    "displayName": "",
    "notes": "",
    "birthday": "01-01-2018",
    "gender": "male",
    "lastName": "test",
    "middleName": "",
    "firstName": "Hannes",
    "salutation": "",
    "title": "dr.",
    "oihApplicationRecords": [
      {
        "created": 4,
        "recordUid": "413954",
        "applicationUid": ""
      }
    ],
    "oihLastModified": 5,
    "oihCreated": 2,
    "oihUid": ""
  };

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
    let valid = validate(data);

    (!valid) ? console.log(validate.errors) : console.log('Validation successful');
  } catch (e) {
    throw new Error(e);
  }
}())
