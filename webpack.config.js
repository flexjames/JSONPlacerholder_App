const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    context: path.join(__dirname, "src"),
    entry: ['babel-polyfill', './js/index.js','./css/index.css'],
    module: {
        rules: [
            {   
                // All JS files are run through babel-loader for backward compatability to IE8
                // Except for files in node_modules
                test: /\.js?$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader",
                    query: {
                        presets: ['react', 'es2015', 'stage-0'],
                        plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
                    }
                },
            },
          {
            test: /\.css$/,
            use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader']
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
                'url-loader?limit=10000',
                'img-loader'
            ]  
          }
        ]
    },
    output: {
        path: __dirname + "/src/",
        filename: "index.min.js"
    },
    plugins: [ 
        new MiniCssExtractPlugin({filename: 'style.css'}),
        new UglifyJsPlugin({
            test: /\.js?$/,
            exclude: /node_modules/
        })
    ]
};