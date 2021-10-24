/*
 * @文件描述: 加载组件
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2019-05-31 10:35:10
 * @LastEditors: 李洪文
 * @LastEditTime: 2020-05-25 11:14:23
 */

import React from 'react';
import Zmage from 'react-zmage';
import styles from './index.less';

interface Iprops {
  src: string;
  className?: any;
}

export default function CZmage({ src, className }: Iprops) {
  return (
    <Zmage
      src={src}
      className={`${styles.img} ${className}`}
      backdrop="rgba(0,0,0,0.2)"
    />
  );
}
