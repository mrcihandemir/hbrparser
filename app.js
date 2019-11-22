const express = require('express');
var cheerio = require('cheerio');
let Parser = require('rss-parser');
let parser = new Parser();
const app = express(); 
const port = process.env.PORT || 80 ;

app.use(express.static('/app'));

app.get('/hurriyet/yazarlar', function (req, res) {
         (async () => {
           let parser = new Parser({
                    customFields: {
                      item: ['subcategory',['media:thumbnail','img']]
                             
                    }
                  });       
           let feed = await parser.parseURL('http://www.hurriyet.com.tr/rss/yazarlar');
           var b = '';
           feed.items.forEach(item => {
             b = b + item.link + '<br>';  
              
             //console.log(item.title + ':' + item.link)
             
             b = b + item.isoDate + '<br>';   
                    b = b + item.subcategory + '<br>';   
                    b = b + item.img + '<br>';   
            
              
           });
           res.send(b);
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



