package cn.edu.sdu.ise.labs.service.impl;

import cn.edu.sdu.ise.labs.dao.Iot_dataMapper;
import cn.edu.sdu.ise.labs.dao.MyhwMapper;
import cn.edu.sdu.ise.labs.dto.Iot_dataDTO;
import cn.edu.sdu.ise.labs.model.Iot_data;
import cn.edu.sdu.ise.labs.model.Myhw;
import cn.edu.sdu.ise.labs.service.IotService;
import cn.edu.sdu.ise.labs.service.utils.Iot_dataUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Aimmecat
 */
@Service
public class IotServiceImpl implements IotService {

    @Autowired
    private Iot_dataMapper iotDataMapper;

    @Override
    public String addIotInfo(Iot_dataDTO iotDataDto) {
        // 校验输入数据正确性
        Iot_dataUtils.validateDepartment(iotDataDto);
        // 创建实体对象，用以保存到数据库
        Iot_data iotData = new Iot_data();
        // 将输入的字段全部复制到实体对象中
        BeanUtils.copyProperties(iotDataDto, iotData);
        // 调用DAO方法保存到数据库表
        iotDataMapper.insert(iotData);
        return "Insert Success!";
    }
}
