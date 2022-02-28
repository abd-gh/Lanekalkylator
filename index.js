
const express = require('express')
const cors = require('cors')
const rulesEngine = require('./rulesEngine')
const lenders = require('./lenders')
const req = require('express/lib/request')
const res = require('express/lib/response')
const fs =require('fs')
const { send } = require('express/lib/response')


const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/public'));



app.post('/submit', function (req, res){

  var lenderRes=rulesEngine.run(req,lenders);

  lenderRes.forEach(element => {
    sendToBank(element)
  })
  
  return res.status(200).send(JSON.stringify(lenderRes));
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

/**
 * Simulates an API call to bank
 * @param {object} lender
 * @return {Promise<>}
 */

function sendToBank(lender) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Applied to ${lender.name}`)
      resolve({
        name: lender.name,
        response: `Successfully applied to ${lender.name}`
      })
    }, 1000)
  })
}
module.exports = { sendToBank };
