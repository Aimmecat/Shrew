/*
 * @文件描述: 通用方法
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2020-05-21 15:55:23
 * @LastEditors: 朱子涛
 * @LastEditTime: 2020-08-11 20:14:51
 */

// 获取input上传图片的base64数据
export const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const removeEmptyFromObj = (obj: object) => {
  let newObj = {};
  for (let key in obj) {
    let item = obj[key];
    if (item === '' || item === null || item === undefined || item.length === 0)
      continue;
    newObj[key] = item;
  }
  return newObj;
};
export const gaodeAmapkey = '83f748fb2dce8adb8bafeb1e92d2247f';
