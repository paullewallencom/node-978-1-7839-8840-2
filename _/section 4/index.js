var program = require('commander');
var through = require('through2');
var split = require('split2');
var request = require('request');
var Readable = require('stream').Readable;

program
  .version('0.0.1')
  .option('-i, --info', 'Add more info')

program
    .command('streams')
    .description('starting a streaming data pipe')
    .action(function(options) {
        var tr = through(function(buf, _, next) {
            this.push(buf.toString().toUpperCase());
            next();
        });
        process.stdin.pipe(tr).pipe(process.stdout);
    });

program
    .command('objstream')
    .description('start explanation about object streams')
    .action(function(options) {
        var stream = through({objectMode: true},function(chunk, enc, next) {
            var string = chunk.toString();
            var result = string.replace(/\n/, '').toUpperCase().split(/[ \t]/);

            this.push(result);
            next();
        });

        stream.on('data', function(data) {
            var toString = Object.prototype.toString.call(data);
            console.log('type of data:', toString);
            console.log('data:', data, '\n');
        });

        process.stdin.pipe(split()).pipe(stream);
    });

program
    .command('post [sentence]')
    .description('do an http client post')
    .action(function(sentence, options) {
        var r = request.post('http://localhost:8080');

        var s = new Readable();
        s._read = function noop() {}; 
        s.push(sentence);

        s.pipe(r).pipe(process.stdout);
    });

program.parse(process.argv);