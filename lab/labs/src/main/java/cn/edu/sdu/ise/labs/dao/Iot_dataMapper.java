package cn.edu.sdu.ise.labs.dao;

import cn.edu.sdu.ise.labs.dto.query.Iot_dataQueryDTO;
import cn.edu.sdu.ise.labs.dto.query.MyhwQueryDTO;
import cn.edu.sdu.ise.labs.model.Iot_data;
import cn.edu.sdu.ise.labs.model.Myhw;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface Iot_dataMapper {
    Iot_data selectByPrimaryKey(Integer id);

    int deleteByPrimaryKey(Integer id);

    int insert(Iot_data record);

    int updateByPrimaryKey(Iot_data record);

    Integer count(Iot_dataQueryDTO iotDataDTO);

    void deleteByCodes(@Param("codeList") List<Integer> ids);

    List<Iot_data> list(Iot_dataQueryDTO queryDTO, Integer offset, Integer limit);
}