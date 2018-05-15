var hostnameAddr = location.hostname // Gets originating hostname of the webserver

//var hostUrl = 'http://' + hostnameAddr + ':3000' // This needs to be active on the live server. Do not use the static version below in production

var hostUrl = "http://phonetools.net:3000" // STATIC VERSION

function clicker() {
    // console.log('Debug |Test') // Test function functionality
    // $('.output').append($('.test-box').val() + '\n') // Test function functionality
    var ipData = $('.test-box').val(); // Set data to send in GET request
    var typeData = $(".select-list-type").val();
    var sendObj = {
        "ip": ipData,
        "typeData": typeData
    }
    //console.log('Debug |' + 'Request URL: ' + hostUrl);
    //console.log('Debug |' + 'Send data: ' + sendData);
    $('.output').append("It is running...")

    $.get( hostUrl, sendObj).done(function(data) {
        //console.log(data)

        $('.output').append(data)
    })


}

function clearOut() {
  $( ".output" ).html('')
  $( ".fraud-output" ).text('')
  $(".test-box").val('')
} // Clears out the output fields.
