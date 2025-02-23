import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import webpack, { ModuleOptions, RuleSetRule } from "webpack";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CompressionPlugin from "compression-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

type ConfigMode = webpack.Configuration["mode"];

type EnvironmentVariables = {
  mode: ConfigMode;
  port: DevServerConfiguration["port"];
  showAnalyzer?: boolean;
};

interface ConfigPaths {
  entry: string;
  output: string;
  indexHtml: string;
  public: string;
  src: string;
  favicon: string;
  outputPublicPath: string;
}

interface ConfigOptions extends EnvironmentVariables {
  isDev: boolean;
  isProd: boolean;
  paths: ConfigPaths;
}

const DEFAULT_PORT = "3012";

export default (env: EnvironmentVariables): webpack.Configuration => {
  const mode = env.mode || "development";
  const isDev = mode === "development";
  const isProd = mode === "production";
  const showAnalyzer = Boolean(env.showAnalyzer);
  const port = env.port ?? DEFAULT_PORT;

  const configPaths: ConfigPaths = {
    public: path.resolve(),
    indexHtml: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
    entry: path.resolve(__dirname, "src", "index.ts"),
    output: path.resolve(__dirname, "build"),
    favicon: path.resolve(__dirname, "public", "Favicon.ico"),
    outputPublicPath: "/",
  };

  const configOptions: ConfigOptions = {
    showAnalyzer,
    port,
    mode,
    paths: configPaths,
    isDev,
    isProd,
  };

  const webpackConfig: webpack.Configuration = {
    entry: configOptions.paths.entry,
    mode: configOptions.mode,
    devServer: getDevServer(configOptions),
    module: {
      rules: getRules(),
    },
    plugins: getPlugins(configOptions),
    optimization: {
      runtimeChunk: false,
      splitChunks: false,
      minimize: configOptions.isProd,
      usedExports: configOptions.isProd,
    },
    devtool: !configOptions.isProd && "eval-cheap-source-map",
    output: {
      path: configOptions.paths.output,
      publicPath: configOptions.paths.outputPublicPath,
      filename: "[name].[contenthash].js",
      chunkFilename: "[name].[contenthash].js",
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".css"],
      plugins: [new TsconfigPathsPlugin({ configFile: "tsconfig.json" })],
      fallback: {
        path: false,
      },
      alias: {
        "@app": path.resolve(__dirname, "./src/app/"),
        "@pages": path.resolve(__dirname, "./src/pages/"),
        "@entities": path.resolve(__dirname, "./src/entities/"),
        "@features": path.resolve(__dirname, "./src/features/"),
        "@widgets": path.resolve(__dirname, "./src/widgets/"),
        "@shared": path.resolve(__dirname, "./src/shared/"),
      },
    },
  };

  return webpackConfig;
};

function getPlugins(
  configOptions: ConfigOptions
): webpack.WebpackPluginInstance[] {
  const plugins: webpack.WebpackPluginInstance[] = [];

  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: "./public/index.html",
    favicon: "./public/favicon.ico",
  });
  plugins.push(htmlWebpackPlugin);

  const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin({
    async: false,
    typescript: {
      diagnosticOptions: {
        syntactic: true,
        semantic: true,
      },
    },
  });
  plugins.push(forkTsCheckerWebpackPlugin);

  if (configOptions.showAnalyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  if (configOptions.isProd) {
    plugins.push(new CompressionPlugin());
  }

  return plugins;
}

function getRules(): ModuleOptions["rules"] {
  const babelLoader: RuleSetRule = {
    test: /\.tsx?$/,
    loader: "babel-loader",
    exclude: /node_modules/,
    options: {
      plugins: ["lodash"],
      presets: [
        ["@babel/preset-react", { runtime: "automatic" }],
        "@babel/preset-typescript",
      ],
      sourceMaps: true,
    },
  };

  const cssLoader: RuleSetRule = {
    test: /\.css$/,
    use: ["style-loader", "css-loader"],
  };

  const fileLoader: RuleSetRule = {
    test: /\.(png|jpe?g|gif|pdf)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
  };

  return [babelLoader, cssLoader, fileLoader];
}

function getDevServer(configOptions: ConfigOptions): DevServerConfiguration {
  const devServerConfig: DevServerConfiguration = {
    historyApiFallback: true,
    port: configOptions.port,
    open: true,
    client: {
      overlay: {
        runtimeErrors: true,
        errors: true,
        warnings: true,
      },
    },
  };

  return devServerConfig;
}
