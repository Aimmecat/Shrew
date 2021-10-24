/*
 * @文件描述: umi配置文件
 * @公司: 山东大学
 * @作者: liuweis
 * @Date: 2020-04-09 17:15:49
 * @LastEditors: liuweis
 * @LastEditTime: 2020-12-16 12:48:14
 */
import { defineConfig } from 'umi';
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';
import { routes } from './routes';

export default defineConfig({
  hash: true,
  history: {
    type: 'hash',
  },
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
  devServer: {
    https: false,
  },
  routes,
  ignoreMomentLocale: true,
  title: '易文远程访问系统后台管理',
  chainWebpack(config) {
    config.plugin('dayjs').use(AntdDayjsWebpackPlugin);
  },
});
