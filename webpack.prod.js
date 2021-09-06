//Requerimosle paquete "html-webpack-plugin" en la app y se lo asignamos a la 
//constante HtmlWebPackPlugin
const HtmlWebPackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const CopyWpPlugin = require("copy-webpack-plugin");

const TerserPlugin = require("terser-webpack-plugin");

//Esto es una destructuraión, con la cual decimos que lo único que queremos del 
//paquete es la clase o función CleanWebpackPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');

module.exports = {
    mode: "production",
    //devtool: false, //Para que no use devtool en el archivo main.js
    output: { //Nombre del archivo de salida
        filename: "main.[contenthash].js",
        environment: {
            arrowFunction: false,
            const: false
        },
        //Se removerán los archivos de la carpet dist
        path: path.resolve(process.cwd(), 'dist')
    },
    module: {
        rules: [ //Que hacer con ciertos archivos y en ciertas ocaciones
            {
                test: /\.html$/i, //Le decimos a webpack que aplique esta regla si es un archivo con extensión .html
                loader: "html-loader", //Que para eso utilice el paquete html-loader
                options: {
                    attributes: false,
                    //Minimiza el archivo html
                    //true: genera el código en una sola línea sin espacios, ni comentarios, etc.
                    //false: genera el código tal y como uno lo ha escrito (con comentarios, indentación, etc.)
                    minimize: true
                }
            },
            {
                test: /\.css$/i, //Archivos css que serán cargados de forma dinámica junto con archivos js
                exclude: /styles\.css$/i, //Excluyendo el archivo css que será global en la app 
                use: ["style-loader", "css-loader"]
            },
            {
                test: /styles\.css$/, //Archivo css que será global para la aplicación
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.m?js$/, //Aplica esta regla solo a archivos js
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: { //presets utilizados por babel
                        presets: ["@babel/preset-env", "minify"]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html", //Le decimos a Webpack que archivo es el que quiero tomar
            filename: "./index.html" //Con que nombre se moverá a la carpeta dist
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css", //El archivo que vamos a manejar
            ignoreOrder: false //Para que no nos lance warnings
        }),
        new CopyWpPlugin({
            patterns: [
                //from: carpeta a copiar, to: a donde vamos a copiar (por defecto dist)
                { from: "src/assets", to: "assets/" }
            ]
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: "./dist"
    },
    optimization: {
        minimize: true,
        minimizer: [ 
            new OptimizeCssAssetsPlugin(), //Plugin para minimizar main.css
            new TerserPlugin() //plugin para minimizar main.js
        ]
    }
};