/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 */

const functions = require('firebase-functions');
const { setGlobalOptions } = require("firebase-functions/v2")

// Set the maximum instances to 10 for all functions
setGlobalOptions({ maxInstances: 10 });

exports.canUseApp = functions.region("southamerica-east1").https.onRequest((request, response) => {
  const responseData = {
    response: true
  };
  response.json(responseData);
});
