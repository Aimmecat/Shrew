/*
 * @文件描述: 详情
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2020-05-29 15:56:40
 * @LastEditors: 李洪文
 * @LastEditTime: 2020-06-03 14:59:57
 */

import React from 'react';
import { Row, Col } from 'antd';
import Card from '@/components/Card';
import Zmage from '@/components/Zmage';
import styles from './index.less';

export interface ITableCol {
  title: string;
  dataIndex?: string;
  dataDesc?: string; // 中文描述
  value?: string;
  type?: string;
}

interface Iprops {
  title: string;
  columns: ITableCol[];
  data?: any;
}

function Detail({ title, columns, data }: Iprops) {
  const list = columns
    .filter(item => item.dataIndex)
    .map((item: ITableCol) => {
      item.value = data && data[item.dataDesc || item.dataIndex || ''];
      return item;
    });

  return (
    <Card title={title}>
      {list.map(({ title, dataIndex, value, type }) => (
        <Row key={dataIndex} className={styles.listItem}>
          <Col span={3} className={styles.label}>{`${title}：`}</Col>
          {type === 'img' ? (
            <Zmage src={value || ''} className={styles.img} />
          ) : (
            <Col span={8}>{value}</Col>
          )}
        </Row>
      ))}
    </Card>
  );
}

export default Detail;
