const glob = require('glob')
const path = require('path')

module.exports = {
    mode: "development",
    entry: glob.sync('./pages/*.ts').reduce((acc, path) => {
        console.log(path)
        const entry = path.replace('.ts', '').replace('/pages', '')
        acc[entry] = path
        return acc
    }, {}),
    output: {
        path: path.join(__dirname, 'server/build'),
        filename: "[name].js"
    },
    module: {
        rules:[
            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.scss'],
        alias : {
            images: path.join(__dirname, 'public/images'),
            styles: path.join(__dirname, 'sass')
        }
    },
    watch : true,
    watchOptions: {
        poll: true,
        ignored: /node_modules/
    },
}