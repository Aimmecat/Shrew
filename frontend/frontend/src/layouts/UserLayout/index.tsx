/*
 * @文件描述: 用户登陆
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2019-05-31 10:35:10
 * @LastEditors: 李洪文
 * @LastEditTime: 2020-04-09 17:38:30
 */

import * as React from 'react';
import { PageBasicPropsModel } from '@/data-type/node_modules/@/interfaces/component';
import styles from './index.less';

function BasicLayout(props: PageBasicPropsModel) {
  return <div className={styles.login}>{props.children}</div>;
}

export default BasicLayout;
