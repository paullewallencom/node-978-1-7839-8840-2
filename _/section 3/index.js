var program = require('commander');
var colors = require('colors');
var BombTicking = require('./bombticking.js');

var bombTicking = new BombTicking();

program
  .version('0.0.1')
  .option('-i, --info', 'Add more info')

program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ events -h');
  console.log('    $ events tick');
  console.log('');
  console.log('Events is a program to show the viewer how cli programs and events work in node');
});

program.on('error', function(err, command){
    console.log('');
    console.log(colors.red('  Error:', err.message));
    command.outputUsage();
    command.outputCommands();
    command.outputOptions();
    console.log();
    process.exit(1);
});

program
    .command('fire [msg]')
    .description('this fires an event')
    .action(function(msg, options) {
         process.emit('gunfire', msg);
    });

program
    .command('react')
    .description('react fast')
    .action(function(options) {
        bombTicking.start();

        bombTicking.on("time", function(total_sec) {
            console.log("You have " + total_sec + " left!");
        })

        bombTicking.on("end", function() {
            console.log("We came to an end!");
        })
    })

process.on('gunfire', function(msg) {
    console.log("GUNFIRE : " + msg)
});

program.parse(process.argv);