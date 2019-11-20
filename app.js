const express = require('express');
var cheerio = require('cheerio');
let Parser = require('rss-parser');
let parser = new Parser();
const app = express(); 
const port = process.env.PORT || 80


app.use(express.static('/app'));

app.get('/', function (req, res) {
   res.send('Hello World');
  //res.sendfile('index.html');
});

app.listen(port, function(){
  console.log("Listening port!")
});



/* 
(async () => {
 
  let feed = await parser.parseURL('https://www.reddit.com/.rss');
  console.log(feed.title);
 
  feed.items.forEach(item => {
    console.log(item.title + ':' + item.link)
  });
 
})();
*/
