#!/usr/bin/env node
const path = require('path');
const traverse = require('traverse');
const yargs = require('yargs');
const waterfall = require('async/waterfall');
const webpack = require('webpack');
const pbjs = require('protobufjs/cli/pbjs');
const webpackConfiguration = require('./webpack.config.js');
const tmp = require('tmp');
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

tmp.setGracefulCleanup();

waterfall([
    callback => tmp.file({
        dir: path.join(__dirname, 'tmp'),
        prefix: 'protobufjs-',
        postfix: '.js'
    }, callback),
    (tmpFilePath, fd, cleanupCallback, callback) => pbjs.main([
        '--target', 'static-module',
        '--wrap', 'commonjs',
        '--no-create',
        '--no-delimited',
        '--no-comments',
        '--out', tmpFilePath,
        argv.protoFile
    ], (err) => callback(err, tmpFilePath)),
    (tmpFilePath, callback) => {
        const proto = require(tmpFilePath);
        const traversed = traverse(proto);
        if (!traversed.has(argv.message.split('.'))) {
            const availablePaths = traversed.reduce(function(acc) {
                if (this.isLeaf) acc.push(this.path.join('.'));
                return acc;
            }, []).join(', ');
            callback(new Error(`Specified message path "${argv.message}" does not exist. Available paths: ${availablePaths}`));
            return;
        }
        callback(null, tmpFilePath);
    },
    (tmpFilePath, callback) => {
        try {
        const compiler = webpack(webpackConfiguration({
            outDir: path.resolve(argv.outputDirectory),
            protoFile: tmpFilePath,
            messagePath: argv.message,
        }));
        compiler.apply(new webpack.ProgressPlugin());
        compiler.run(function(err, stats) {
            console.log(stats);
            callback(err);
        });
        } catch(e) {
            console.error(e);
        }
    }
], (err, result) => {
    if (err) {
        console.error(err.message);
        process.exit(1);
    }
});




  
  

