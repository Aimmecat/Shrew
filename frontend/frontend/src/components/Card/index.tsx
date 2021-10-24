/*
 * @文件描述: 卡片组件
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2019-05-31 10:35:10
 * @LastEditors: 朱子涛
 * @LastEditTime: 2020-08-04 18:41:14
 */

import React from 'react';
import styles from './index.less';

interface Iprops {
  title: any;
  children?: React.ReactNode;
  right?: React.ReactNode;
  style?: React.HTMLAttributes<HTMLDivElement>;
}

export default function Card(props: Iprops) {
  const { title = '', children, style = {}, right } = props;
  return (
    <div className={`${styles.card} ${style}`}>
      <div className={styles.title}>
        <div className={`${styles.titleLeft}`}>{title}</div>
        <div className={styles.titleRight}>{right}</div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
