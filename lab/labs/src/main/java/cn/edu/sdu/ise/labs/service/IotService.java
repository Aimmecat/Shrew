package cn.edu.sdu.ise.labs.service;

import cn.edu.sdu.ise.labs.dto.Iot_dataDTO;
import cn.edu.sdu.ise.labs.dto.query.Iot_dataQueryDTO;
import cn.edu.sdu.ise.labs.model.Page;
import cn.edu.sdu.ise.labs.vo.Iot_dataVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface IotService {

    String addIotInfo(Iot_dataDTO queryDTO);

    Page<Iot_dataVO>  listByPage(Iot_dataQueryDTO iotDataDto);

    void deleteByCodes(@Param("codeList") List<Integer> ids);
}
