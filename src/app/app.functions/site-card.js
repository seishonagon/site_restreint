// Example crm-card.js file

// Include HubSpot node API client
const hubspot = require('@hubspot/api-client');

exports.main = async (context = {}, sendResponse) => {
  // Store contact info, configured as propertiesToSend in crm-card.json
  const { hs_object_id, firstname, lastname, site, specialite_du_site } = context.propertiesToSend;
  
  // instantiate HubSpot Node API client
  const hubspotClient = new hubspot.Client({
    accessToken: context.secrets.PRIVATE_APP_ACCESS_TOKEN,
  });

  // Defines the first section of the CRM card

  try {
    // Defines variables for API endpoint and response data
    // const resp = await hubspotClient.crm.contacts.basicApi.getById('51');
    // const email = resp.properties.email
    
    const resp = await hubspotClient
    .apiRequest({
      method: 'GET',
      path: `/crm/v4/objects/contacts/51/associations/companies`,
      }
    );
    const companyId = resp.body[0].id;
    
    // Defines how the returned data will be displayed
    sendResponse({
      sections: [
        {
          type: "heading",
          text: "Sample project custom CRM card"
        },
        {
          type: "text",
          text: "This card will retrieve data on the contact record."
        },
        {
          type: "text",
          format: "markdown",
          text: "This serverless function will retrieve a specific contact by ID."
        },
      ]
    });
  } catch (error) {
    console.error(error);
  }
};