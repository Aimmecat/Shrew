/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 李洪文
 * @Date: 2020-09-01 09:49:40
 * @LastEditors: liuweis
 * @LastEditTime: 2020-12-27 19:46:25
 */
import '@/api';
import { history } from 'umi';
API.system.ping.request({}, { hideError: true }).catch(() => {
  history.push('/user/login');
});
