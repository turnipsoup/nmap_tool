// Dependencies

var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var exec = require('child_process').exec;
var fs = require('fs')


var timeout = require('connect-timeout')

// Server

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
app.use(timeout("5000s"))

app.get('/', function (req, res) {
  // What I am going to do here is that I am going to pick some long string to check to see if it has the "authentication" information
  // Something like "ASDJLKASd8123kjasdfiyasdkfjhU"
    var ip = req.query.ip
    var scanType = req.query.typeData
    var authenticationBits = req.query.authenticationBits
    var cmd;
    if (authenticationBits != "<g3BB>j#&Pb7L4x^e3Y6h%J(^") {
      res.send("You are not authorized to make this request. Please go away.")
    } 
    else {
      if (scanType == "standard") {
          var cmd = 'nmap -Pn' + ' ' + ip
      }
      else if (scanType == "speedy") {
          var cmd = 'nmap -Pn -p 80,443,5060,6060,8000,8080,8081,8443' + ' ' + ip
      }
      else if (scanType == "aggressive") {
          var cmd = "nmap -Pn -T4 -A" + " " + ip
      }
      else if (scanType == "selected") {
          var cmd = "echo 'I can haz scan type selected?'"
      }
      else if (scanType == "custom") {
          var cmd = "echo 'CUSTOM MODE IS NOT READY YET'"
      }
      else {
          var command_string = "Error: Your Scan Type Was - " + scanType + "IP: " + ip
          var cmd = "nmap -Pn -p 21,22,80,443,5060,5061,6000-6999,8000-8100,65443" + " " + ip
      }
      var data_for_saving;

      exec(cmd, function(error, stdout, stderr) {
        data_for_saving = stdout
        var dir_name = "/var/www/html/t2/nmap/storage"
        var file_name = ip + "_" + scanType + "_" + Date()
        var write_name = dir_name + "/" + file_name
        //console.log(write_name)

          fs.writeFile(write_name, data_for_saving, function(err) {
            //console.log('file saved!')
            if(err) throw err;
          });
          res.send(data_for_saving)
        });
    }



})


//// SECTION FOR UDP TRACE
var data_for_saving;

app.get('/udp', function (req, res) {
    var ip = req.query.ip
    var cmd;
        var cmd = "traceroute" + " " + ip
    exec(cmd, function(error, stdout, stderr) {
      data_for_saving = stdout
      //console.log(data_for_saving)
      });

      res.send(data_for_saving)
});

//// IP SEARCH SECTION

app.get("/ip/:ip", function(req,res,next) {


  fs.readdir("/var/www/html/t2/nmap/storage/", function(err, items) {
    var html_list = []
    html_list.push("<table><tr><th>Date</th><th>Type</th><th>IP</th></tr>")
      for (var i=0; i<items.length;i++) {
        if (items[i].split("_")[0] == req.params.ip) {
          var unique_url = "http://www.phonetools.net/t2/nmap/storage/" + items[i]
          html_list.push("<tr>" + "<td><a href='" + unique_url + "'>" + items[i].split("_")[2] + "</a></td>" + "<td>" + items[i].split("_")[1] + "</td>" + "<td>" + items[i].split("_")[0] + "</td>")
        }
        else {
          // pass
        }
      }
      // console.log(items[0].split("\n"))
      //console.log(items[0].split("_")[0])
    html_list.push("</table><style>td:hover {background-color: #f5f5f5;}</style>")
    res.send(html_list.join("\n"))
  });

})

app.listen(3000, function () {
  console.log("beta!")
  console.log('Example app listening on port 3000!')
