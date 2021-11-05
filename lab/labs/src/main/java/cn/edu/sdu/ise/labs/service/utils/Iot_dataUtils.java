package cn.edu.sdu.ise.labs.service.utils;

import cn.edu.sdu.ise.labs.dto.Iot_dataDTO;
import cn.edu.sdu.ise.labs.model.Iot_data;
import cn.edu.sdu.ise.labs.utils.FormatUtils;
import cn.edu.sdu.ise.labs.vo.Iot_dataVO;
import org.springframework.beans.BeanUtils;
import org.springframework.util.Assert;

public class Iot_dataUtils {

    public static void validateDepartment(Iot_dataDTO iotDataDTO) {
        FormatUtils.trimFieldToNull(iotDataDTO);
        Assert.notNull(iotDataDTO, "输入数据不能为空");
        Assert.hasText(iotDataDTO.getEquipmentId(), "设备编号不能为空");
        Assert.hasText(iotDataDTO.getLocation(),"设备安装地点不能为空！");
    }

        public static Iot_dataVO convertToVO(Iot_data iotData) {
        Iot_dataVO iotDataVO = new Iot_dataVO();
        BeanUtils.copyProperties(iotData, iotDataVO);
        return iotDataVO;
    }
}
