const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = ({
    outDir,
    protoFile,
    messagePath,
    minify
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
            MESSAGE_PATH: `proto.${messagePath}`,
        }),
        minify && new UglifyJSPlugin()
    ].filter(Boolean)
});