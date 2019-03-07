var hostnameAddr = location.hostname // Gets originating hostname of the webserver

var hostUrl = 'http://' + hostnameAddr + ':3000' // This needs to be active on the live server. Do not use the static version below in production

//var hostUrl = "http://127.0.0.1:3000" // This is a static version for testing. I host this site myself for myself.

function clicker() {
    // console.log('Debug |Test') // Test function functionality
    // $('.output').append($('.test-box').val() + '\n') // Test function functionality
    var ipData = $('.test-box').val(); // Set data to send in GET request
    var typeData = $(".select-list-type").val();
    var sendObj = {
        "ip": ipData,
        "typeData": typeData,
        "authenticationBits": "<g3BB>j#&Pb7L4x^e3Y6h%J(^"
    }
    //console.log('Debug |' + 'Request URL: ' + hostUrl);
    //console.log('Debug |' + 'Send data: ' + sendData);
    $('.output').append("Server contacted. It is running...")

    $.get( hostUrl, sendObj).done(function(data) {
        //console.log(data)

        $('.output').append(data)
        var split_list = data.split("\n")
        for (i=0;i<split_list.length;i++) { // This portion allows us to create the link list
          if (split_list[i].includes("/tcp")) {
            if (split_list[i].split(" ").includes("open")) {
              var link_create = "http://" + $('.test-box').val() + ":" + split_list[i].split("/")[0]
              $(".links").append("<a href='" + link_create + "'>"+ link_create + "</a>" + "<br>")
              console.log("<a href='" + link_create + "'>"+ link_create + "</a>")
            }

          }
        }
    })

    var ip_search_string = "https://ipinfo.io/" + ipData
    var json_data = $.get(ip_search_string, function(response) {
      console.log(response)
      $(".ip-info").append("IP Address:    " + response.ip + "\n");
      $(".ip-info").append("Country:    " + response.country + "\n");
      $(".ip-info").append("Region:    " + response.region + "\n");
      $(".ip-info").append("Potential ISP:    " + response.org);
    }, "jsonp")




    var hostUrlTwo = hostUrl + '/udp'
    var ipDataTwo = $('.test-box').val(); // Set data to send in GET request
    var sendObjTwo = {
        "ip": ipDataTwo,
    }
    //console.log('Debug |' + 'Request URL: ' + hostUrl);
    //console.log('Debug |' + 'Send data: ' + sendData);
    $('.trace-info').append("Tracing tracing tracing...")
    $('.trace-info').append("<br>")
    $.get( hostUrlTwo, sendObjTwo).done(function(data) {
        //console.log(data)
        $('.trace-info').append(data)


    })


}


function clearOut() {
  $( ".output" ).html('')
  $( ".fraud-output" ).text('')
  $(".test-box").val('')
  $( ".ip-info" ).html('')
  $(".links").html("")
  $(".trace-info").html("")
} // Clears out the output fields.
