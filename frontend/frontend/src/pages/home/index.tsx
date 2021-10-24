/*
 * @文件描述: 首页
 * @公司: superv
 * @作者: 李洪文
 * @LastEditors: 李洪文
 * @Date: 2019-05-09 15:40:17
 * @LastEditTime: 2020-09-20 19:14:05
 */
import { useEffect, useState } from 'react';
import styles from './index.less';
import Card from '@/components/Card';
export const interval = 5000;
export const MAX_MONITOR_RECORD_SIZE = 20;

export default function Component() {
  const [stats1, setStats1] = useState(0);
  const [stats2, setStats2] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStats1(stats1 + 1);
      setStats2(stats2 + 2);
    }, interval);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles.homeContainer}>
      <Card title="今日数据">
        <div className={styles.totalList}>
          <div className={[styles.totalItem, styles.item1].join(' ')}>
            <div className={styles.text}>
              <div className={styles.title}>在线</div>
              <div className={styles.value}>{stats1}</div>
            </div>
          </div>

          <div className={[styles.totalItem, styles.item2].join(' ')}>
            <div className={styles.text}>
              <div className={styles.title}>课程数量</div>
              <div className={styles.value}>{stats2}</div>
            </div>
          </div>

          <div className={[styles.totalItem, styles.item3].join(' ')}>
            <div className={styles.text}>
              <div className={styles.title}>其他护具</div>
              <div className={styles.value}>500</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
