const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
module.exports = (env, argv) => {
    return {
        // 実行の入り口となるファイルを指定
        entry: './src/ts/script.ts',
        // 出力ファイル
        output: {
            // OSに依存しない絶対パス指定
            path: path.resolve(__dirname, 'dist/js'),
            filename: 'script.js'
        },
        // ソースマップ出力
        devtool: (argv.mode == 'production') ? false : 'source-map',
        // import時の拡張子の表記を省略する拡張子を指定
        resolve: {
            extensions: ['.ts']
        },
        module: {
            rules: [
                {
                    // 拡張子 .ts の場合
                    test: /\.ts$/,
                    // TypeScript をコンパイルする
                    use: 'ts-loader'
                },
                {
                    //正規表現で該当するファイルを指定
                    test: /\.scss$/,
                    use: [
                        {
                            // CSSファイルを書き出すオプションを有効にする
                            loader: MiniCssExtractPlugin.loader
                        },
                        
                        {
                            //CSSをJavaScriptにバンドル
                            loader: 'css-loader',
                            options: {
                                url: false,
                                sourceMap: true,
                            }
                        },
                        {
                            //ベンダープレフィックスを毎度記述
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        require('autoprefixer')({ grid: true })
                                    ],
                                },
                            },
                        },
                        {
                            //SassをCSSに変換
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                // 出力先の設定
                filename: '../css/style.css'
            }),
            //不要なファイルを削除
            new FixStyleOnlyEntriesPlugin(),
            new TerserPlugin({
                terserOptions: {
                    //productionモードのときにconsole.logを削除
                    compress: { drop_console: (argv.mode == 'production') ? true : false }
                }
            })
        ]
    }
}