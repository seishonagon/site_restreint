// Example crm-card.js file

// Include HubSpot node API client
const hubspot = require('@hubspot/api-client');

exports.main = async (context = {}, sendResponse) => {
  // Store contact info, configured as propertiesToSend in crm-card.json
  const { hs_object_id, firstname, lastname } = context.propertiesToSend;

  // instantiate HubSpot Node API client
  const hubspotClient = new hubspot.Client({
    accessToken: context.secrets.PRIVATE_APP_ACCESS_TOKEN,
  });

  // const response = await hubspotClient.apiRequest({
  //       method: 'get',
  //       path: '/crm/v3/objects/contacts',
  //   })
  //   const json = await response.json()
  //   console.log(json)

  let data = '';
  let email = '';
  // Defines the first section of the CRM card
  // Defines variables for API endpoint and response data
  const response = await hubspotClient
    //.crm.contacts.basicApi.getById(hs_object_id)
    .apiRequest({
      method: 'GET',
      // path: `/crm/v4/objects/contacts/${hs_object_id}/associations/companies`,
      path: `/crm/v3/objects/contacts`,
    });
const json = await response.json()

  let data = contactData.results;
  console.log(json);
  // const email = contactData.properties.email;
  sendResponse({
    sections: [{
        type: "heading",
        text: "Sample project custom CRM card"
      },
      {
        type: "text",
        text: `This card will retrieve data on the contact record. It is attached to contact id ${hs_object_id}.`
      },
      {
        type: "text",
        format: "markdown",
        text: "This serverless function will retrieve a specific contact by ID."
      },
      {
        type: "text",
        format: "markdown",
        text: `This contact's email is **${email}**`
      },
    ]
  });


  // hubspotClient
  //   .apiRequest({
  //     method: 'GET',
  //     path: `/crm/v4/objects/contacts/51/associations/companies`,
  //   })
  //   .then(associatedCompanies => {
  //       console.log(associatedCompanies.body.results);
  //       let companyId = associatedCompanies.body.results[0].toObjectId;
  //       
  //       // Defines how the returned data will be displayed
  //       sendResponse({
  //         sections: [{
  //             type: "heading",
  //             text: "Sample project custom CRM card"
  //           },
  //           {
  //             type: "text",
  //             text: `This card will retrieve data on the contact record. It is attached to contact id ${hs_object_id}.`
  //           },
  //           {
  //             type: "text",
  //             format: "markdown",
  //             text: "This serverless function will retrieve a specific contact by ID."
  //           },
  //           {
  //             type: "text",
  //             format: "markdown",
  //             text: `This contact's email is **${email}**`
  //           },
  //         ]
  //       });
  //     }
  //   );

};