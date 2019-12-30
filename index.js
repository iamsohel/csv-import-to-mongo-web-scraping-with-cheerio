const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('properties.csv');

// Write Headers
writeStream.write(`name address city state zip_code country type phone capacity \n`);

request('https://apps.hhs.texas.gov/LTCSearch/namesearch.cfm', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    const title = $('div#pageTitle').text();

    writeStream.write(`${title}\n`);
    console.log('Scraping Done...');
  }
});