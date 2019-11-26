const express = require('express');
var cheerio = require('cheerio');
let Parser = require('rss-parser');
let parser = new Parser();
const app = express(); 
const port = process.env.PORT || 80 ;

app.use(express.static('/app'));

app.get('/fb', function(req, res) {
    var inc = req.query;
    var incL = Object.keys(req.query).length;
    var arr = [];
    var L1 = '';
    var L2 = '';
    var L3 = '';
    var fb = 0;
    inc.forEach(function(item) {
        //if ((incL%3)==1) {L1= 
        //arr.push(item.id);
        console.log(item);
    });
    console.log(req.query);
    console.log(Object.keys(req.query).length);
    
    res.send('hellö');
});


// Hürriyet - Genel
app.get('/gen100', function (req, res) {
         (async () => {
           let parser = new Parser({customFields: {item: ['category','enclosure']}});       
           let feed = await parser.parseURL(req.query.url);
           var result = [];    
           feed.items.forEach(item => {                 
              var tmpLink = item.link;
              var vCat = 'X'; 
              if (tmpLink.includes("/gundem/")) { vCat = 'Gündem';}      
              else if (tmpLink.includes("/ekonomi/")) { vCat = 'Ekonomi';}            
              else if (tmpLink.includes("/teknoloji/")) { vCat = 'Teknoloji';}                  
              else if (tmpLink.includes("/dunya/")) { vCat = 'Dünya';}
              else { vCat = 'X';}
              if (!(vCat=='X')) {      
                       result.push({category: vCat, link: item.link, title: item.title, news: item.contentSnippet, img:  item.enclosure.url, dt: item.isoDate  });      
              }
           });
                  res.contentType('application/json');
                  res.send(result);
         })();
   
});


// Sözcü - Genel
app.get('/gen110', function (req, res) {
         (async () => {
           let parser = new Parser();       
           let feed = await parser.parseURL(req.query.url);
           var result = [];    
           feed.items.forEach(item => {                 
              var tmpLink = item.link;
              var vCat = 'X'; 
              if (tmpLink.includes("/gundem/")) { vCat = 'Gündem';}      
              else if (tmpLink.includes("/ekonomi/")) { vCat = 'Ekonomi';}            
              else if (tmpLink.includes("/teknoloji/")) { vCat = 'Teknoloji';}                  
              else if (tmpLink.includes("/dunya/")) { vCat = 'Dünya';}
              else { vCat = 'X';}      
              if (!(vCat=='X')) {      
                       result.push({category: vCat, link: item.link, title: item.title, news: item.contentSnippet, img: '', dt: item.isoDate  });      
              }
           });
                  res.contentType('application/json');
                  res.send(result);
         })();
   
});


// BBC
app.get('/gen120', function (req, res) {
         (async () => {
           let parser = new Parser();       
           let feed = await parser.parseURL(req.query.url);
           var result = [];    
           feed.items.forEach(item => {                 
              var tmpLink = item.link;
              var vCat = 'X'; 
              if (tmpLink.includes("/turkce/haberler-dunya-")) { vCat = 'Dünya';}      
              else if (tmpLink.includes("/turkce/haberler-turkiye-")) { vCat = 'Gündem';}
              else { vCat = 'X';}
              if (!(vCat=='X')) {          
                  result.push({category: vCat, link: item.link, title: item.title, news: item.contentSnippet, img: '', dt: item.isoDate  });      
              }         
           });
                  res.contentType('application/json');
                  res.send(result);
         })();
   
});


// Resimsiz , Kategorisiz
app.get('/gen10', function (req, res) {
         (async () => {
           let parser = new Parser();       
           let feed = await parser.parseURL(req.query.url);
           var result = [];    
           feed.items.forEach(item => {                     
              result.push({link: item.link, title: item.title, news: item.contentSnippet, img: '', dt: item.isoDate  });      
           });
                  res.contentType('application/json');
                  res.send(result);
         })();
   
});


app.get('/gen1', function (req, res) {
         (async () => {
           let parser = new Parser({
                    customFields: {
                      item: ['subcategory','enclosure']
                             
                    }
                  });       
           let feed = await parser.parseURL(req.query.url);
           var result = [];    
           feed.items.forEach(item => {                 
              result.push({link: item.link, title: item.title, news: item.contentSnippet, img: item.enclosure.url, dt: item.isoDate  });      
           });
                  res.contentType('application/json');
                  res.send(result);
         })();
   
});

// Link , Title , Content , Date
app.get('/gen2', function (req, res) {
         (async () => {
           let parser = new Parser();       
           let feed = await parser.parseURL(req.query.url);
           var result = [];    
           feed.items.forEach(item => {                 
              result.push({link: item.link, title: item.title, news: item.contentSnippet, dt: item.isoDate });      
           });
                  res.contentType('application/json');
                  res.send(result);
         })();
   
});



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
                 
              result.push({link: item.link, title: item.subcategory + ' - ' + item.title, news: item.contentSnippet, img: item.enclosure.url, dt: item.isoDate  });      
              
              
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



