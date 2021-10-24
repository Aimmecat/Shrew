package cn.edu.sdu.ise.labs.service;

import cn.edu.sdu.ise.labs.model.Token;

/**
 * @author 李洪文
 * @date 2019/11/14 10:38
 */
public interface TokenService {
    /**
     * 用户登录，返回令牌信息
     *
     * @param workCode 工号
     * @param password 密码
     * @return 令牌信息
     */
    Token login(String workCode, String password);

    /**
     * 根据token获取令牌信息
     *
     * @param accessToken token
     * @return 令牌信息
     */
    Token getToken(String accessToken);

    /**
     * 登出系统
     *
     * @param accessToken 令牌token
     */
    void logout(String accessToken);
}
