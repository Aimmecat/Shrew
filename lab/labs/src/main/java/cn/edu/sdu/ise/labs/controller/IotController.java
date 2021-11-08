package cn.edu.sdu.ise.labs.controller;

import cn.edu.sdu.ise.labs.annotation.NeedNoToken;
import cn.edu.sdu.ise.labs.dto.Iot_dataDTO;
import cn.edu.sdu.ise.labs.dto.MyhwDTO;
import cn.edu.sdu.ise.labs.dto.query.Iot_dataQueryDTO;
import cn.edu.sdu.ise.labs.dto.query.MyhwQueryDTO;
import cn.edu.sdu.ise.labs.model.Page;
import cn.edu.sdu.ise.labs.service.IotService;
import cn.edu.sdu.ise.labs.vo.Iot_dataVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

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

    @PostMapping("delete")
    public String delete(@RequestBody List<Integer> ids) {
        iotService.deleteByCodes(ids);
        return "Delete Success!";
    }

    @PostMapping("update")
    public Integer update(@RequestBody Iot_dataDTO iotDataDTO) {
        return iotService.updateIotInfo(iotDataDTO);
    }

    @PostMapping("list")
    public Page<Iot_dataVO> list(@RequestBody Iot_dataQueryDTO queryDTO) {
        return iotService.listByPage(queryDTO);
    }

    @PostMapping("getIotData")
    public List<Map> getIotData() {
        return iotService.GetIotData();
    }
}
