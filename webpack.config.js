const path = require('path');
const webpack = require('webpack');
const ClosureCompilerPlugin = require('webpack-closure-compiler');

module.exports = ({
    outDir,
    protoFile,
    messagePath
}) => ({
    entry: {
        'Converter': path.join(__dirname, 'src', 'converter.js'),
        'Decoder': path.join(__dirname, 'src', 'decoder.js'),
        'Validator': path.join(__dirname, 'src', 'validator.js'),
    },
    output: {
        path: outDir,
        filename: '[name].js',
        libraryTarget: 'var',
        library: '[name]'
    },
    plugins: [
        new webpack.DefinePlugin({
            PROTO_FILE: JSON.stringify(protoFile),
            MESSAGE_PATH: messagePath,
        }),
        new ClosureCompilerPlugin({
            compiler: {
                language_in: 'ECMASCRIPT5',
                language_out: 'ECMASCRIPT5',
                compilation_level: 'ADVANCED'
            },
            concurrency: 3,
        })
    ]
});