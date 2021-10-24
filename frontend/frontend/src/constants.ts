/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 李洪文
 * @Date: 2020-09-02 12:39:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-03 16:02:17
 */
// 山大联调地址
import { ButtonType } from 'antd/lib/button';

export const BACKEND_URL = 'http://localhost:8081';
// export const BACKEND_URL = '';

/**
 * 通用默认值
 */
export const PAGE_SIZE = 10;
export const DEFAULT_PAGE_DATA = {
  page: 1,
  pageSize: PAGE_SIZE,
  total: 0,
  list: [],
};

export const DEFAULT_SEARCH_PROPS = {
  page: 1,
  pageSize: PAGE_SIZE,
};

export function getPageAfterDelete(pageData: any, deleteCount: number) {
  const totalPages = Math.trunc(
    (pageData.total + PAGE_SIZE - 1 - deleteCount) / PAGE_SIZE,
  );
  if (totalPages <= 0) {
    return 1;
  }

  return pageData.page > totalPages ? totalPages : pageData.page;
}


export interface OptionItem {
  label: string;
  value: string | number;
}

export interface ButtonItem {
  text: string;
  icon?: any;
  disabled?: boolean;
  loading?: boolean;
  type?: ButtonType;
  onClick: () => void;
}
