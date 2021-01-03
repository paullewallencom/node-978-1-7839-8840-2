var prompt = require("prompt"),
    util = require("util");

var BombTicking = function() {}

var EventEmitter = require('events').EventEmitter;
util.inherits(AnimalGuess, EventEmitter);

BombTicking.start = function() {
    var total_sec = 5;
    var self = this;
    var showTime = setInterval(function() {
        total_sec -= 1;
        console.log("Still " + total_sec + "seconds left!");
        self.emit("time", total_sec);
    }, 1000);

    var self = this;
    setTimeout(function() {
        self.emit("end");
        prompt.stop();
        clearInterval(showTime);
    }, total_sec * 1000);

    prompt.start();
    prompt.get(['answer'], function (err, result) {
        self.emit("end");
        clearInterval(showTime);
    })
}

module.exports = BombTicking;