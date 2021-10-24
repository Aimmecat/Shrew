package cn.edu.sdu.ise.labs.controller;

import cn.edu.sdu.ise.labs.annotation.NeedNoToken;
import cn.edu.sdu.ise.labs.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class MyController {

    @Autowired
    private TestService testService;

    @NeedNoToken
    @GetMapping("add")
    public String add(String username, String persId){
        return testService.add(username,persId);
    }
}
