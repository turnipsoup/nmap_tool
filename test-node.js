var fs = require('fs')
var express = require('express')

fs.readdir("test_storage", function(err, items) {
  var html_list = []
  html_list.push("<table><tr><th>Date</th><th>Type</th><th>IP</th></tr>")
    for (var i=0; i<items.length;i++) {
      if (items[i].split("_")[2] == req.params.ip) {
        var unique_url = "http://www.phonetools.net/t2/nmap/storage/" + items[i]
        html_list.push("<tr>" + "<td><a href='" + unique_url + "'>" + items[i].split("_")[2] + "</a></td>" + "<td>" + items[i].split("_")[1] + "</td>" + "<td>" + items[i].split("_")[0] + "</td>")
      }
      else {
        // pass
      }
    }
    // console.log(items[0].split("\n"))
    //console.log(items[0].split("_")[0])
  html_list.push("</table>")
  res.send(html_list.join("\n"))
});

var app = express()

app.get('/:ip', function(req,res,next) {
  console.log(req.params.ip)
})

app.listen(4000)
