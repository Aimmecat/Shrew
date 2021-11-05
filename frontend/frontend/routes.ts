/*
 * @文件描述: 路由
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2020-05-20 10:31:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-06 01:06:17
 */

export const routes = [
  {
    path: '/user',
    component: '@/layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './login' },
    ],
  },
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      {
        path: '/base',
        //wrappers: ['@/components/Authorized'],
        routes: [
          {
            path: '/base/department',
            component: './base/department',
          },
          {
            path: '/base/myhw',
            component: './base/myhw',
          },
          {
            path: '/base/IOT_Data',
            component: './base/IOT_Data',
          },
          {
            path: '/base/Map',
            component: './base/Map',
          },
        ],
      },
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        component: './home',
      },
    ],
  },
  {
    component: '404',
  },
];
