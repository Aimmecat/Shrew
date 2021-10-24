package cn.edu.sdu.ise.labs.controller;


import cn.edu.sdu.ise.labs.annotation.NeedNoToken;
import cn.edu.sdu.ise.labs.dto.MyhwDTO;
import cn.edu.sdu.ise.labs.dto.query.MyhwQueryDTO;
import cn.edu.sdu.ise.labs.model.Myhw;
import cn.edu.sdu.ise.labs.model.Page;
import cn.edu.sdu.ise.labs.service.MyhwService;
import cn.edu.sdu.ise.labs.vo.MyhwVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("Myhw")
public class MyhwController {

    @Autowired
    private MyhwService myhwService;

    @NeedNoToken

    @PostMapping("add")
    public Integer add(@RequestBody MyhwDTO myhwDTO) {
        return myhwService.addMyhw(myhwDTO);
    }

    @PostMapping("update")
    public Integer update(@RequestBody MyhwDTO myhwDTO) {
        return myhwService.updateMyhw(myhwDTO);
    }

    @PostMapping("delete")
    public String delete(@RequestBody List<Integer> ids) {
        myhwService.deleteByCodes(ids);
        return "hello world";
    }

    @PostMapping("list")
    public Page<MyhwVO> list(@RequestBody MyhwQueryDTO queryDTO) {
        return myhwService.listByPage(queryDTO);
    }

    @PostMapping("SumEquipmentValue")
    public Integer SumEquipmentValue(String userPeople){
        return myhwService.MyhwSumEquipmentValue(userPeople);
    }

    @PostMapping("CountNum")
    public Integer CountNum(String userPeople){
        return myhwService.MyhwCountEquipmentNum(userPeople);
    }

    @PostMapping("TotalValue")
    public List<Map> TotalValue(){
        return myhwService.TotalEquipmentValue();
    }

    @PostMapping("TotalNum")
    public List<Map> TotalNum(){
        return myhwService.TotalEquipmentNum();
    }
}
