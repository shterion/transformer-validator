"use strict";
const request = require('request-promise');
const Ajv = require('ajv');
const person = require('./schemas/addresses/personsV2.json');
const sharedDefinitions = require('./schemas/addresses/sharedDefinitionsV2.json');
const record = require('./schemas/addresses/oih-data-record.json');

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
    "addresses": [
      {
        "description": "",
        "primaryContact": "",
        "country": "DE",
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
    let ajv = new Ajv();
    let validate = ajv.addSchema(sharedDefinitions).addSchema(record).compile(person);
    let valid = validate(data);

    (!valid) ? console.log(validate.errors) : console.log('Validation successful!');
  } catch (e) {
    throw new Error(e);
  }
}())
