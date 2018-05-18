# NMAP Web GUI
This tool allows you to have a NMAP webGUI on your network for people to utilize.

## Running
- Create a directory, /usr/server
- Create a directory named "storage" in `/var/www/html`
- Move "server.js" to `/usr/server`
- Ensure you have the other .js, .css., and .html files in `/var/www/html` (or whatever directory you are serving from) and have apache/httpd/generic_http_server running
- Run the node server after installing the dependencies (`npm install express body-parser method-override child_process`), "server.js"
- Navigate to the web directory you set up and proceed to use the tool. If you get an error, ensure you have the directory set correctly in the `new_tool.js` and `server.js`
