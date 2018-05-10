const Promise = require("bluebird");
var Proxy =  Promise.promisifyAll(require('../index.js')).Proxy;

proxy =  new Proxy({ host: 'localhost', useHTTPS:true, port: 8080, username:"fred", password:"opensesame" });

var proxyPromise = proxy.startAsync()
	.then(function (data) {
        console.log("proxy created on port: " + JSON.stringify(data));
        proxy.doHAR('http://yahoo.com', function(err, data) {
            if (err) {
                console.error('ERROR: ' + err);
            } else {
                fs.writeFileSync('yahoo.com.har', data, 'utf8');
            }
        });
    })
    .catch(function(error){
        console.error("ERROR: " + error);
    });
