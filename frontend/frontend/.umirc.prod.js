/*
 * @文件描述: umi配置文件
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2020-04-09 17:15:49
 * @LastEditors: liuweis
 * @LastEditTime: 2020-12-27 17:58:43
 */
import { defineConfig } from 'umi';
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';
import { routes } from './routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  base: '/manage/',
  publicPath: '/manage/',
  outputPath: './build',
  theme: require('./theme.ts'),
  define: {
    designWidth: 1920,
  },
  hash: true,
  history: {
    type: 'hash',
  },
  routes,
  ignoreMomentLocale: true,
  title: '易文远程访问系统后台管理',
  chunks: ['antd', 'vendors', 'umi'],
  chainWebpack(config) {
    config.plugin('dayjs').use(AntdDayjsWebpackPlugin);
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            antd: {
              name: 'antd',
              test({ resource }) {
                return /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/.test(
                  resource,
                );
              },
              priority: 10,
            },
            vendor: {
              name: 'vendors',
              test({ resource }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 9,
            },
          },
        },
      },
    });
  },
});
