/*
 * @Description: 大屏常规 柱状图
 * @Author: 朱子涛
 * @Date: 2020-09-01 20:09:28
 * @LastEditors: 李洪文
 * @LastEditTime: 2020-09-19 09:23:14
 */
import React, { useEffect, CSSProperties } from 'react';
import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';

interface PieData {
  name?: string;
  value?: number;
}
export interface BarProps {
  id: string;
  data: PieData[];
  color?: string;
  style?: CSSProperties;
  className?: string;
}

function Bar2D(props: BarProps) {
  const {
    id,
    data,
    color = '#6AA7FF',
    className,
    style = { width: '100%', height: 200 },
  } = props;
  useEffect(() => {
    const chart = echarts.init(
      document.getElementById(id) as HTMLCanvasElement,
    );
    chart.setOption({
      xAxis: { show: false },
      yAxis: { show: false },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      series: [
        {
          name: '观看人数',
          type: 'pie',
          //stack: '总量',
          data: data,
        },
      ],
    });

    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div id={id} style={{ ...style }} className={className}></div>;
}

export default Bar2D;
