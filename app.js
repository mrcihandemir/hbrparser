const express = require('express');
var cheerio = require('cheerio');
var request = require('request');
let Parser = require('rss-parser');
let parser = new Parser();
const app = express(); 
const port = process.env.PORT || 80 ;

app.use(express.static('/app'));

app.get('/fb', function(req, res) {
    var inc = Object.values(req.query);
    var incL = Object.keys(req.query).length;
    var arr = [];
    var L1 = ''; // key 1
    var L2 = ''; // key 2 link 
    var L3 = ''; // epoch
    var fb = 0;
    var x = 0;
    var fbLink = '';
    var ret = '';
    inc.forEach(function(item) {
        /*
        x++;
        if ((x%3)==1) {L1=item;} 
        if ((x%3)==2) {L2=item;} 
        if ((x%3)==0) {L3=item;} 
        if ((x%3)==0) {
            var valueToPush = new Array();
            valueToPush[0] = L2;
            valueToPush[1] = L1;
            valueToPush[2] = L3;
            valueToPush[3] = 0;
            arr.push(valueToPush);
            
            fbLink = fbLink + item + ',' ;
        } 
        */
        fbLink = fbLink + item + ',' ;
        var valueToPush = new Array();
            valueToPush[0] = item;
            valueToPush[1] = 0;
            arr.push(valueToPush);
        
        //arr.push(item.id);
        //console.log(arr);
    });
    //console.log(req.query);
    //console.log(Object.keys(req.query).length);
    fbLink = fbLink.substring(0, fbLink.length - 1);
    fbLink = 'https://graph.facebook.com/?ids=' + fbLink + '&fields=og_object{engagement}';
    request.get(fbLink, function(err, response, body) {
            ret = JSON.parse(body);
            console.log(ret);
            var retArr = [];
            var r1 = Object.values(ret);
                for (i=0;i<r1.length;i++) {
                   var ret12 = new Array(); 
                   var r2 = Object.values(r1[i]) ;
                   ret12[0] = r2[1];
                   var r3 = Object.values(r2[0]) ; 
                   var r4 = Object.values(r3[0]) ; 
                   ret12[1] = r4[0];
                   retArr.push(ret12); 
                }
        
            for (i=0;i<arr.length;i++) {
              for(j=0;j<retArr.length;j++) {
                if (arr[i][0] == retArr[j][0]) {
                  arr[i][1] = retArr[j][1];
                }
              }
            }
        
            console.log(retArr);
            res.send(arr);
        });
    
    
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



// Sputnik
app.get('/gen130', function (req, res) {
         (async () => {
           let parser = new Parser({customFields: {item: ['category','enclosure']}});       
           let feed = await parser.parseURL(req.query.url);
           var result = [];    
           feed.items.forEach(item => {                 
              var tmpLink = item.link;
              var vCat = 'X'; 
              if (tmpLink.includes("/turkiye/")) { vCat = 'Gündem';}          
              else if (tmpLink.includes("/ekonomi/")) { vCat = 'Ekonomi';}    
              else if (tmpLink.includes("/politika/")) { vCat = 'Gündem';}     
              else if (tmpLink.includes("/bilim/")) { vCat = 'Teknoloji';}                  
              else if (tmpLink.includes("/rusya/")) { vCat = 'Dünya';}
              else if (tmpLink.includes("/avrupa/")) { vCat = 'Dünya';}
              else if (tmpLink.includes("/dogu_akdeniz/")) { vCat = 'Dünya';}
              else if (tmpLink.includes("/ortadogu/")) { vCat = 'Dünya';}
              else if (tmpLink.includes("/abd/")) { vCat = 'Dünya';}
              else if (tmpLink.includes("/guney_amerika/")) { vCat = 'Dünya';}
              else if (tmpLink.includes("/asya/")) { vCat = 'Dünya';}
              else if (tmpLink.includes("/afrika/")) { vCat = 'Dünya';}
              else { vCat = 'X';}
              if (!(vCat=='X')) {      
                       result.push({category: vCat, link: item.link, title: item.title, news: item.contentSnippet, img:  item.enclosure.url, dt: item.isoDate  });      
              }
           });
                  res.contentType('application/json');
                  res.send(result);
         })();
   
});



// Duvar
app.get('/gen140', function (req, res) {
         (async () => {
           let parser = new Parser();       
           let feed = await parser.parseURL(req.query.url);
           var result = [];    
           feed.items.forEach(item => {                 
              var tmpLink = item.link;
              var vCat = 'X'; 
              if (tmpLink.includes("/gundem/")) { vCat = 'Gündem';}      
              else if (tmpLink.includes("/dunya/")) { vCat = 'Dünya';}
               else if (tmpLink.includes("/politika/")) { vCat = 'Gündem';}
               else if (tmpLink.includes("/ekonomi/")) { vCat = 'Ekonomi';}
               else if (tmpLink.includes("/bilim/")) { vCat = 'Teknoloji';}
               else if (tmpLink.includes("/teknoloji/")) { vCat = 'Teknoloji';}
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



