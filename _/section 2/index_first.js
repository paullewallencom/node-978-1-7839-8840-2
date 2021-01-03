var greetings = ["hi", "hey", "hallo", "nice to meet you"];

process.argv.slice(2).forEach(function (val, index, array) {
  if (greetings.indexOf(val) > -1) {
      console.log("Hi, I am angelica, what can I do for you?");
  } else if (val.indexOf("help") > -1) {
      console.log("You can type \n hi, to great me \n ...");
  } else if (val.indexOf("input") > -1) {
      process.stdin.resume();
      process.stdin.setEncoding('utf8');
      var util = require('util');

      process.stdin.on('data', function (text) {
            console.log('received data:', util.inspect(text));
            if (text === 'quit\r\n') {
            done();
            }
      });

      function done() {
            console.log('Now that process.stdin is paused, there is nothing more to do.');
            process.exit();
      }
  } else {
      console.log("I can't help you, should I provide you with options?");
  }
});

