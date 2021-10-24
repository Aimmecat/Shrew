/*
 * @文件描述: date处理方法
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2019-05-31 10:35:10
 * @LastEditors: 李洪文
 * @LastEditTime: 2020-09-15 06:42:18
 */

import dayjs from 'dayjs';
export const DATE_FORMAT_DAY_WITHOUT_HYPHEN = 'YYYYMMDD';
export const DATE_FORMAT_DAY_WITH_HYPHEN = 'YYYY-MM-DD';
export const DATE_FORMAT_WITH_SECONDS = 'YYYY-MM-DD HH:mm:ss';
export const DAY_FORMAT_WITH_SECONDS = 'HH:mm:ss';
export const DATE_FORMAT_MONTH_CN = 'YYYY年MM月';
export const DATE_FORMAT_MONTH_WITH_HYPHEN = 'YYYY-MM';
export const DATE_FORMAT_DAY_CN = 'YYYY年MM月DD日';

export const formatDate = (date: number | string | Date) => {
  if (!date) return undefined;
  return dayjs(date).format(DATE_FORMAT_DAY_WITH_HYPHEN);
};

export const formatDateTime = (date: number | string | Date) => {
  if (!date) return undefined;
  return dayjs(date).format(DATE_FORMAT_WITH_SECONDS);
};

export const parseDateTime = (date: string) => {
  if (!date) return undefined;
  return dayjs(date);
};
