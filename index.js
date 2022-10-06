require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')
const KJUR = require('jsrsasign')
const AccessToken = require('twilio').jwt.AccessToken
const VideoGrant = AccessToken.VideoGrant

const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.json(), cors())
app.options('*', cors())

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

app.post('/', (req, res) => {
  // Used when generating any kind of tokens
  // To set up environmental variables, see http://twil.io/secure
  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioApiKey = process.env.TWILIO_API_KEY;
  const twilioApiSecret = process.env.TWILIO_API_SECRET;

  //const identity = `user-${getRandomInt(10000)}`;

  // Create Video Grant
  const videoGrant = new VideoGrant({
    room: req.body.roomName
  });

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    {identity: req.body.identity}
  );
  token.addGrant(videoGrant);

  // Serialize the token to a JWT string
  console.log(token.toJwt());
  const signature = token.toJwt();

  res.json({
    signature: signature
  });
})

app.listen(port, () => console.log(`Zoom Meeting SDK Sample Signature Node.js on port ${port}!`))
