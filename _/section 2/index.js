#! /usr/bin/env node

var program = require('commander');
var prompt = require('prompt');
var colors = require('colors');

var greetings = ["hi", "hey", "hallo", "nice to meet you"];

var tree = {};

program
  .version('0.0.1')
  .option('-i, --info', 'Add more info')
  .option('-U --upper', 'Transform all the output in uppercase')

program
    .command('hi')
    .description('this is the greeting command')
    .action(function(options) {
         var greeting = "Hi, I am angelica, what can I do for you?";
         print(greeting);
    });

function print(text) {
    if (program.upper) {text=text.toUpperCase();}
    console.log(text);
}

program
  .command('input [save]')
  .description('run a questionary to find the animal you have in your head!')
  .option("-q, --question [mode]", "The question angelica needs to start with, overrides the default question.")
  .action(function(save, options){
    var question = options.question || "Is your animal a fish?";
    save = save || 'memory';
    if (save=='memory') {
        print(colors.green("We will start with saving in memory! \n"));
        print(question);

        prompt.start();
        prompt.get(['answer'], function (err, result) {
            print("result : " + result.answer);
            if (result.answer == "yes") {
                console.log("great we made it :)")
            } else if (result.answer == "no") {
                console.log('What was the question that we were supposed to ask instead');
                prompt.get(['question'], function (err, result) { 
                    tree.no = result;
                });
            }
        })
    } else {
        print('can not save it to ' + save);
    }
  });


program.parse(process.argv);