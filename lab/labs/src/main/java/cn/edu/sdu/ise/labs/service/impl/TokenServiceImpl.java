package cn.edu.sdu.ise.labs.service.impl;

import cn.edu.sdu.ise.labs.dao.UserMapper;
import cn.edu.sdu.ise.labs.model.Token;
import cn.edu.sdu.ise.labs.model.User;
import cn.edu.sdu.ise.labs.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author 李洪文
 * @date 2019/11/14 10:44
 */
@Service
@EnableScheduling
public class TokenServiceImpl implements TokenService {
    private static final int TIMEOUT = 20;
    @Autowired
    private UserMapper userMapper;

    private Map<String, Token> tokenMap = new ConcurrentHashMap<>(1 << 8);

    /**
     * 用户登录，返回令牌信息
     *
     * @param userCode 用户id
     * @param password 密码
     * @return 令牌信息
     */
    @Override
    public Token login(String userCode, String password) {
        User user = userMapper.login(userCode, password);
        Assert.notNull(user,"用户名或者密码错误");
        Token token = new Token();
        token.setAccessToken(makeToken());
        token.setUserCode(user.getUserCode());
        token.setUserName(user.getName());
        token.setLastAction(new Date());
        tokenMap.put(token.getAccessToken(), token);
        return token;
    }

    /**
     * 根据token获取令牌信息
     *
     * @param accessToken token
     * @return 令牌信息
     */
    @Override
    public Token getToken(String accessToken) {
        return tokenMap.get(accessToken);
    }

    /**
     * 登出系统
     *
     * @param accessToken 令牌token
     */
    @Override
    public void logout(String accessToken) {

    }

    private String makeToken() { // checkException
        return UUID.randomUUID().toString().replaceAll("-", "") + "";
    }

    @Scheduled(cron = "*/20 * *  * * * ")
    public void scheduled() {
        Iterator<Map.Entry<String, Token>> iterator = tokenMap.entrySet().iterator();
        Date now = new Date();
        while (iterator.hasNext()) {
            Map.Entry<String, Token> entry = iterator.next();
            if (now.getTime() - entry.getValue().getLastAction().getTime() > 60 * TIMEOUT * 1000) {
                iterator.remove();
            }
        }
    }
}
