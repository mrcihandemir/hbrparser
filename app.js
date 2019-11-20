const express = require('express');
var cheerio = require('cheerio');
let Parser = require('rss-parser');
const { Client } = require('pg');
let parser = new Parser();
const app = express(); 
const port = process.env.PORT || 80


app.use(express.static('/app'));

app.get('/', function (req, res) {
   /*
   //res.send('Hello World');
  //res.sendfile('index.html');
         (async () => {
           let feed = await parser.parseURL('http://www.hurriyet.com.tr/rss/yazarlar');
           var b = '';
           feed.items.forEach(item => {
             b = b + item.link + '<br>';  
              
             //console.log(item.title + ':' + item.link)
             var $ = cheerio.load(item.link);
             var img = $('meta[property="og:image"]').attr('content'); 
             var tit = $('meta[property="og:title"]').attr('content'); 
             var des = $('meta[property="og:description"]').attr('content'); 
             b = b + ite.isoDate + '<br>';   
             b = b + tit + '<br>';  
             b = b + des + '<br>';   
             b = b + img + '<br><br><br>';   
              
           });
           res.send(b);
         })();
         */
   
      const client = new Client({
     connectionString: process.env.DATABASE_URL,
        ssl: true,
      });

      client.connect();

      client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
        if (err) throw err;
         var b = '';
        for (let row of res.rows) {
          //console.log(JSON.stringify(row));
          b = b + JSON.stringify(row); 
        }
        client.end();
         res.send(b);
      });
});

app.listen(port, function(){
  console.log("Listening port!")
});






