const express = require('express');
var cheerio = require('cheerio');
let Parser = require('rss-parser');
let parser = new Parser();
const app = express(); 
const port = process.env.PORT || 80


app.use(express.static('/app'));

app.get('/', function (req, res) {
   //res.send('Hello World');
  //res.sendfile('index.html');
         (async () => {
           let feed = await parser.parseURL('http://www.hurriyet.com.tr/rss/yazarlar');
           var b = '';
           feed.items.forEach(item => {
             //console.log(item.title + ':' + item.link)
             b = b + item.title + '<br>';
           });
           res.send(b);
         })();
});

app.listen(port, function(){
  console.log("Listening port!")
});


