const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
const bcrypt = require('bcrypt-nodejs');

let url = "mongodb://localhost:27017/";

csvtojson()
  .fromFile("skillhub-user-list-2.csv")
  .then(csvData => {
    nwCSVData = csvData.map(p => {
      return {
        name: p.name, code: p.code, type: p.type, subType: p.subType, address: p.address, password: bcrypt.hashSync(p.password)
      }
    });
    console.log(nwCSVData);
    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db("skillhub12")
          .collection("users")
          .insertMany(nwCSVData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });