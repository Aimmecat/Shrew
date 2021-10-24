/*
 * @文件描述: 权限控制页面
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2019-05-31 10:35:10
 * @LastEditors: 李洪文
 * @LastEditTime: 2020-09-16 08:44:40
 */

import React from 'react';
import History from 'history';
import user from '@/utils/user';
import { history } from 'umi';

/**
 * 判断有没有权限，如果没有，则跳转至登录页面
 */
interface AuthorizedProps {
  location: History.Location;
  children: React.ReactElement;
}
export default (props: AuthorizedProps) => {
  if (!user.getToken()) {
    const { pathname } = props.location;
    history.push(`/user/login?redirectUrl=${pathname}`);
  }
  return <>{props.children}</>;
};
