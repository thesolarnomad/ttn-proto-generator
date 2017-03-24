#!/usr/bin/env node
const path = require('path');
const traverse = require('traverse');
const yargs = require('yargs');
const waterfall = require('async/waterfall');
const webpack = require('webpack');
const pbjs = require('protobufjs/cli/pbjs');
const webpackConfiguration = require('./webpack.config.js');
const argv = yargs
    .usage('Usage: $0 -p [string] -m [string] -o [string]')
    .describe('p', 'The proto definition file')
    .describe('m', 'The message path')
    .describe('o', 'The output directory')
    .demandOption(['p', 'm'], 'Please provide both a proto file as well as the fully qualified path to the message to use')
    .help('h')
    .alias('h', 'help')
    .alias('m', 'message')
    .alias('o', 'output-directory')
    .alias('p', 'proto-file')
    .default('o', '.')
    .version()
    .alias('v', 'version')
    .example('$0 \\\n  -p ./my/message.proto \\\n  -m com.example.MyMessage')
    .argv;

const tmpFile = path.join(__dirname, 'tmp', 'proto.js');
waterfall([
    callback => pbjs.main([
        '--target', 'static-module',
        '--wrap', 'commonjs',
        '--no-delimited',
        '--no-comments',
        '--out', tmpFile,
        argv.protoFile
    ], (err) => callback(err)),
    callback => {
        const proto = require(tmpFile);
        const traversed = traverse(proto);
        if (!traversed.has(argv.message.split('.'))) {
            const availablePaths = traversed.reduce(function(acc) {
                if (this.isLeaf) acc.push(this.path.join('.'));
                return acc;
            }, []).join(', ');
            callback(new Error(`Specified message path "${argv.message}" does not exist. Available paths: ${availablePaths}`));
            return;
        }
        callback(null);
    },
    callback => {
        const compiler = webpack(webpackConfiguration({
            outDir: path.resolve(argv.outputDirectory),
            messagePath: argv.message,
            minify: true,
        }));
        compiler.apply(new webpack.ProgressPlugin());
        compiler.run(function(err, stats) {
            process.stdout.write(stats.toString({
                chunks: false, // Makes the build much quieter
                colors: true
            }));
            callback(err);
        });
    }
], (err, result) => {
    if (err) {
        console.error(err.message);
        process.exit(1);
    }
});




  
  

