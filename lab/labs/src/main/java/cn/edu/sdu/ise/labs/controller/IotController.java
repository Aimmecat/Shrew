package cn.edu.sdu.ise.labs.controller;

import cn.edu.sdu.ise.labs.annotation.NeedNoToken;
import cn.edu.sdu.ise.labs.dto.Iot_dataDTO;
import cn.edu.sdu.ise.labs.dto.MyhwDTO;
import cn.edu.sdu.ise.labs.service.IotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Aimmecat
 */
@RestController
@RequestMapping("iot")
public class IotController {

    @Autowired
    private IotService iotService;

    @NeedNoToken

    @PostMapping("add")
    public String add(@RequestBody Iot_dataDTO iotDataDTO) {
        return iotService.addIotInfo(iotDataDTO);
    }
    
}
