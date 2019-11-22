const express = require('express');
var cheerio = require('cheerio');
let Parser = require('rss-parser');
let parser = new Parser();
const app = express(); 
const port = process.env.PORT || 80 ;

app.use(express.static('/app'));

app.get('/hurriyet/yazarlar', function (req, res) {
         (async () => {
           let feed = await parser.parseURL('http://www.hurriyet.com.tr/rss/yazarlar');
           var b = '';
           feed.items.forEach(item => {
             b = b + item.link + '<br>';  
              
             //console.log(item.title + ':' + item.link)
             
             b = b + item.isoDate + '<br>';   
            
              
           });
           res.send(b);
            res.send(feed.items);
         })();
   
});

app.listen(port, function(){
  console.log("Listening port!")
});



/*
var $ = cheerio.load(item.link);
             var img = $('meta[property="og:image"]').attr('content'); 
             var tit = $('meta[property="og:title"]').attr('content'); 
             var des = $('meta[property="og:description"]').attr('content'); 
             */



