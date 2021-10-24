package cn.edu.sdu.ise.labs.controller;

import cn.edu.sdu.ise.labs.annotation.NeedNoToken;
import cn.edu.sdu.ise.labs.model.Token;
import cn.edu.sdu.ise.labs.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author 李洪文
 * @description 系统控制器，包含登录
 * @date 2019/11/14 10:45
 */
@RestController
@RequestMapping("system")
public class SystemController {
    @Autowired
    private TokenService tokenService;

    @NeedNoToken
    @GetMapping("login")
    public Token login(String userId, String password) {
        return tokenService.login(userId, password);
    }

    @GetMapping("ping")
    public Boolean ping() {
        return true;
    }
}
