/*
 * @文件描述: iconfont图标组件
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2019-05-31 10:35:10
 * @LastEditors: 李洪文
 * @LastEditTime: 2019-07-04 14:05:40
 */

import * as React from 'react';

interface IconfontProps {
  name: string;
  classname?: string;
  onClick?: () => void;
}
/**自定义图标 */
const Iconfont: React.SFC<IconfontProps> = (props: IconfontProps) => {
  return (
    <i
      onClick={props.onClick}
      className={`iconfont ${props.name || ''} ${props.classname || ''}`}
    />
  );
};

export default Iconfont;
