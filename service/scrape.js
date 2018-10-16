const request = require("request");
const cheerio = require("cheerio");    

async function scrape(searchString, callback) {
    searchString = 'Medication for ' + searchString;
    var url = `https://www.google.com/search?q=${searchString}`;
    var options = {
        url,
        headers: {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
        }
    };

    request(options, requestHandler);

    async function requestHandler(err, res, html) {
        if (err) callback(err, { msg: "request error" });

        var $ = cheerio.load(html);
        var dataUrl = "https://www.google.co.in/async/health_imex_contents?";
        var params = $('.knowledge-health__tab-treatment').attr();
        
        //CHECK IF TREATMENTS ARE FOUND ON WEB
        if(params == undefined){
            callback(null,{err:"No Treatment Found!!!"});   //NOT FOUND
        }
        else{
            //FOUND
            var dataved = params['data-ved'];
            var asyncContext = params['data-async-context'].split(';').join(',');
            var dataUrl = `${dataUrl}ved=${dataved}&yv=3&async=${asyncContext},_id:hixcs,_pms:s,_fmt:pc`;
            let data = {};
            await request({
                url: dataUrl,
                headers: {
                    'user-agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
                }
            },(err, res, htmli) => {
                if (err) throw err;
                let result = htmli.split(';<')[1];
                result = '<' + result;
                result = result.split('4;[5')[0];
                $ = cheerio.load(result);
                let headings = $('.hXYDxb');
                headings.filter(e => {
                    let head = $(headings[e]).text();
                    data[head] = {};
                    let nextHead = headings[e].parent.parent.nextSibling.firstChild
                    for (let i of nextHead.children) {
                        data[head][$(i.children[0]).text()] = {};
                        data[head][$(i.children[0]).text()].text = $(i.children[1]).text();
                        data[head][$(i.children[0]).text()].url = "https://www.google.com" + $(i.children[0].firstChild).attr()['href'];
                    }
                });
                callback(null, data);
            });
        }
    }
}


module.exports={
  scrape
}
