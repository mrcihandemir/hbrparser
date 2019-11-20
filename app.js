const express = require('express');
var cheerio = require('cheerio');
let Parser = require('rss-parser');
let parser = new Parser();
const app = express(); 
const port = process.env.PORT || 80 ;
var pg = require('pg');

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
   
   var pool = new pg.Pool({connectionString: process.env.DATABASE_URL, ssl:true})
   pool.connect(function(err,client,done){
        if(err){
            console.error("PG Connection Error")
        }
        console.log("Connected to Postgres");
          var query = "SELECT table_schema,table_name FROM information_schema.tables";
          var result = [];
          client.query(query, function(err, result){
              console.log("Jobs Query Result Count: " + result.rows.length);
             res.send("Jobs Query Result Count: " + result.rows.length);
              //res.send("index.ejs", {connectResults: result.rows});
          }); 
        
    });
   
   pool.end();
   
   
   
   
});

app.listen(port, function(){
  console.log("Listening port!")
});






