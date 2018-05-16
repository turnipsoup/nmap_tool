// Dependencies

var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var exec = require('child_process').exec;



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

app.get('/', function (req, res) {
    var ip = req.query.ip
    var scanType = req.query.typeData
    var cmd;

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

  exec(cmd, function(error, stdout, stderr) {
      //console.log(stdout)
      res.send(stdout)
});
})

app.get('/udp', function (req, res) {
    var ip = req.query.ip
    var cmd;
        var cmd = "traceroute" + " " + ip
    exec(cmd, function(error, stdout, stderr) {
      //console.log(stdout)
      res.send(stdout)
});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

