'use strict';

const express = require('express');
const csvtojson = require("csvtojson");
const json2csv = require("json2csv").parse;

const fields = [{ label: "code", value: "code" }, , { label: "name", value: "name" }, { label: "phone", value: "phone" },
{ label: "address", value: "address" },  { label: "type", value: "type" },{ label: "sub_type", value: "sub_type" }, 
{ label: "password", value: "password" },];

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  
csvtojson()
.fromFile("skillhub-user-list.csv")
.then(csvData => {
  let nwCSVData = csvData.map(p => {
    return {
      name: p.name, phone: p.phone, type: p.type, sub_type: p.sub_type, code: p.code, address: p.address, password: Math.floor(Math.random()*90000) + 10000
    }
  });
    console.log(nwCSVData)
    let filename = 'skillhub-user-list-2' + '.csv';
    let csvf = json2csv(nwCSVData, { fields });
    res.attachment(filename);
    res.status(200).send(csvf);
});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);