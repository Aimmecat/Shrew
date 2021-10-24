/*
 * @文件描述: 用户操作封装
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2019-05-31 10:35:10
 * @LastEditors: 李洪文
 * @LastEditTime: 2020-06-20 11:04:35
 */

import lscache from 'lscache';
import { history } from 'umi';

/**
 * 保存和操作用户登录信息
 * @class User
 */
class User {
  /**
   * 保存token 到cookie中
   * @param accessToken
   */
  public saveToken(accessToken: string) {
    lscache.set('accessToken', accessToken);
  }

  /**
   * 保存登录接口返回的姓名和手机号
   * @param name
   * @param phone
   */
  public saveUserInfo(userInfo: any) {
    lscache.set('userInfo', userInfo);
  }

  /**
   * 从cookie中获取姓名
   */
  public getUserInfo() {
    return lscache.get('userInfo') || {};
  }

  /**
   * 判断用户是否登录
   *
   * @memberof User
   */
  public isLogin() {
    return !!lscache.get('accessToken');
  }

  /** 获取token */
  public getToken() {
    return lscache.get('accessToken');
  }
  /**
   * 用户退出登录
   *
   * @memberof User
   */
  public logout() {
    lscache.remove('accessToken');
    lscache.remove('userInfo');
    history.push('/user/login');
  }
}
export default new User();
