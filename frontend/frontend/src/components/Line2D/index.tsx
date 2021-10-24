/*
 * @Description: 大屏常规 柱状图
 * @Author: 朱子涛
 * @Date: 2020-09-01 20:09:28
 * @LastEditors: 李洪文
 * @LastEditTime: 2020-09-19 09:22:46
 */
import React, { CSSProperties, useEffect } from 'react';
import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';

export interface BarProps {
  id: string;
  xData: string[];
  yData: number[];
  color?: string;
  style?: CSSProperties;
  className?: string;
}

function Line2D(props: BarProps) {
  const {
    id,
    xData,
    yData,
    className,
    color = '#6AA7FF',
    style = { width: '100%', height: 200 },
  } = props;
  useEffect(() => {
    const chart = echarts.init(
      document.getElementById(id) as HTMLCanvasElement,
    );
    chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: 40,
        right: 10,
        bottom: 30,
        top: 10,
        containLabel: false,
      },
      xAxis: [
        {
          type: 'category',
          data: xData,
          axisTick: {
            alignWithLabel: false,
          },

          axisLabel: {
            show: true,
            color: '#666666',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            color: '#666666',
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#F0F0F0',
              opacity: 0.8,
            },
          },
        },
      ],
      series: [
        {
          name: 'test',
          type: 'line',
          barWidth: '70%',
          data: yData,
          itemStyle: {
            color,
          },
        },
      ],
    });

    return () => {
      chart.dispose();
    };
  }, [xData, yData]);

  return <div id={id} style={{ ...style }} className={className}></div>;
}

export default Line2D;
