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
                      item: ['subcategory','enclosure']
                             
                    }
                  });       
           let feed = await parser.parseURL('http://www.hurriyet.com.tr/rss/yazarlar');
           var b = '';
           var result = [];    
          
           feed.items.forEach(item => {
             b = b + item.link + '<br>';  
              
             //console.log(item.title + ':' + item.link)
             
             b = b + item.isoDate + '<br>';   
                    b = b + item.title + '<br>';  
                    b = b + item.subcategory + '<br>';     
                    b = b + item.enclosure.url + '<br>';   
                    b = b + item.contentSnippet + '<br><br><br>';   
                 
              result.push({link: item.link, title: item.subcategory + ' - ' + item.title, news: item.contentSnippet, img: item.enclosure.url  });      
              
              
           });
           //res.send(b);
                  res.contentType('application/json');
                  //res.send(JSON.stringify(result));
                  res.send(result);
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



