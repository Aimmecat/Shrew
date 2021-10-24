package cn.edu.sdu.ise.labs.utils;

import cn.edu.sdu.ise.labs.model.Token;
import org.springframework.util.Assert;


/**
 * token 存取工具类
 *
 * @author 李洪文
 * @description
 * @date 2019/12/3 9:24
 */
public class TokenContextHolder {
    private static ThreadLocal<Token> tokenHolder = new ThreadLocal<>();

    public static void setToken(Token token) {
        tokenHolder.set(token);
    }

    public static Token getToken() {
        Token token = tokenHolder.get();
        Assert.notNull(token, "未找到访问令牌");
        return token;
    }
}
