require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')
const KJUR = require('jsrsasign')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json(), cors())
app.options('*', cors())

app.post('/', (req, res) => {
  

  const iat = Math.round((new Date().getTime() - 30000) / 1000)
  const exp = iat + 60 * 60 * 2

  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    app_key: req.body.sdkKey,
    tpc: req.body.sessionName,
    role_type: 1,
    pwd: req.body.password,
    user_identity: req.body.userIdentity,
    session_key: req.body.sessionKey,
    role_type:req.body.role,
    iat: iat,
    exp: exp
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, req.body.sdkSecretKey)

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json({
    signature: signature
  })
})

app.listen(port, () => console.log(`Zoom Meeting SDK Sample Signature Node.js on port ${port}!`))
