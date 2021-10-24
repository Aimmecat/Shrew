/*
 * @文件描述: 省市区PCD组件的Form校验函数
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2020-07-17 09:00:12
 * @LastEditors: 李洪文
 * @LastEditTime: 2020-07-17 12:04:22
 */

/**
 * 省市区的自定义校验
 */
export function requirePCDAValidator(_: any, value: number[]) {
  if (!value) {
    return Promise.reject('请选择省市区');
  }
  const [province, city, district, address] = value;
  if (!province) {
    return Promise.reject('请选择省');
  } else if (!city) {
    return Promise.reject('请选择市');
  } else if (!district) {
    return Promise.reject('请选择区县');
  } else if (!address) {
    return Promise.reject('请填写详细地址');
  } else {
    return Promise.resolve();
  }
}

/**
 * 省市区的自定义校验
 */
export function requirePCDValidator(_: any, value: number[]) {
  if (!value) {
    return Promise.reject('请选择省市区');
  }
  const [province, city, district] = value;
  if (!province) {
    return Promise.reject('请选择省');
  } else if (!city) {
    return Promise.reject('请选择市');
  } else if (!district) {
    return Promise.reject('请选择区县');
  } else {
    return Promise.resolve();
  }
}

/**
 * 省市的自定义校验
 */
export function requirePCValidator(_: any, value: number[]) {
  if (!value) {
    return Promise.reject('请选择省市');
  }
  const [province, city] = value;
  if (!province) {
    return Promise.reject('请选择省');
  } else if (!city) {
    return Promise.reject('请选择市');
  } else {
    return Promise.resolve();
  }
}
