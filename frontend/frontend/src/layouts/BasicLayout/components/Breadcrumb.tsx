/*
 * @文件描述: 面包屑
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2019-05-31 10:35:10
 * @LastEditors: shangximing
 * @LastEditTime: 2020-06-15 14:26:06
 */

import { Breadcrumb } from 'antd';
import { history, Link } from 'umi';
import { routes } from '../config/breadcrumbConfig';

export default function MyBreadcrumb() {
  const pathname = history.location.pathname;

  const breadcrumbList: { path: string; breadcrumbName: string }[] = [];
  let path = '';
  function getBreadcrumbList(url: string, routes: any) {
    const route = routes.find(
      (item: any) => `/${url.split('/')[1]}` === item.path,
    );
    routes = route && route.children;
    url = url.replace(route?.path, '');
    path = `${path}${route?.path}`;
    breadcrumbList.push({
      path,
      breadcrumbName: route?.breadcrumbName,
    });
    if (url && routes) {
      getBreadcrumbList(url, routes);
    }
  }
  getBreadcrumbList(pathname, routes);

  return (
    <Breadcrumb>
      {breadcrumbList &&
        breadcrumbList.length >= 1 &&
        breadcrumbList.map((item, index) => {
          if (index === 0 || index === breadcrumbList.length - 1) {
            return (
              <Breadcrumb.Item key={item.path}>
                {item.breadcrumbName}
              </Breadcrumb.Item>
            );
          }
          return (
            <Breadcrumb.Item key={item.path}>
              <Link to={item.path}>{item.breadcrumbName}</Link>
            </Breadcrumb.Item>
          );
        })}
    </Breadcrumb>
  );
}
