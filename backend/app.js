const express = require("express");
// Node.js
var admin = require("firebase-admin");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  await sendMessage();
  res.send();
});

var serviceAccount = require("./pushnotification-bb2bb-firebase-adminsdk-rnfz1-fe9cb6a86e.json");

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pushnotification.firebaseio.com",
});

async function sendMessage() {
  // Fetch the tokens from an external datastore (e.g. database)
  const tokens = [
    "eN66fUYmTXqfLXcaykpqeq:APA91bE9zLMO2g_WCg_TUSilODiTNoPdaNtMQD3v35GyTeUzSGRwF_L0-PPpAUycRdogU_HMTulLYgU3vqhuOUD0mnhGwhR3dzL9gJMf3kM_pnGrkUg292RyU3K02-CaFCqEjEdv0rGL",
    "APA91bE9zLMO2g_WCg_TUSilODiTNoPdaNtMQD3v35GyTeUzSGRwF_L0-PPpAUycRdogU_HMTulLYgU3vqhuOUD0mnhGwhR3dzL9gJMf3kM_pnGrkUg292RyU3K02-CaFCqEjEdv0rGL",
    "APA91bGjx4PLL5_3SNLJ4oalj5X3TeIm8OlPPAABztbIQNlVWsQOruULKbnIyfoK66codMU40R2BXDoU6Ef-UsxePkeqjgfxmK8FzbnQK76xTmX2l7TN51wxOw87ZJflJufZqqKyMevZ",
    "fFQ8l1zlTKKGWNHrrKntxu:APA91bGjx4PLL5_3SNLJ4oalj5X3TeIm8OlPPAABztbIQNlVWsQOruULKbnIyfoK66codMU40R2BXDoU6Ef-UsxePkeqjgfxmK8FzbnQK76xTmX2l7TN51wxOw87ZJflJufZqqKyMevZ",
  ];

  // Send a message to devices with the registered tokens
  await admin
    .messaging()
    .sendMulticast({
      tokens,
      data: {
        notification: JSON.stringify({
          body: "tum manjho dadho matho khadho aa aj :)",
          title: "ohh hello",
          //   android: {
          //     channelId: "default",
          //     smallIcon: "ic_launcher",
          //     // actions: [
          //     //   {
          //     //     title: "Mark as Read",
          //     //     pressAction: {
          //     //       id: "read",
          //     //     },
          //     //   },
          //     // ],
          //   },
        }),
      },
    })
    .then((response) => {
      console.log(response.successCount + " messages were sent successfully");
    });
}

// // Send messages to our users
// sendMessage();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
