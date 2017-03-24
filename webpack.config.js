const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = ({
    outDir,
    messagePath,
    minify
}) => ({
    entry: ['Encoder', 'Converter', 'Decoder', 'Validator'].reduce((obj, item) => {
        obj[item] = path.join(__dirname, 'src', `${item.toLowerCase()}.js`);
        return obj;
    }, {}),
    output: {
        path: outDir,
        filename: '[name].js',
        libraryTarget: 'umd',
        library: '[name]'
    },
    plugins: [   
        new webpack.DefinePlugin({
            MESSAGE_PATH: `proto.${messagePath}`,
        }),
        minify && new UglifyJSPlugin()
    ].filter(Boolean)
});