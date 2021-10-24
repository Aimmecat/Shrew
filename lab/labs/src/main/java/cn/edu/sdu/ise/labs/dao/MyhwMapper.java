package cn.edu.sdu.ise.labs.dao;

import cn.edu.sdu.ise.labs.dto.query.MyhwQueryDTO;
import cn.edu.sdu.ise.labs.model.Myhw;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface MyhwMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Myhw record);

    Myhw selectByPrimaryKey(Integer id);

    int updateByPrimaryKey(Myhw record);

    void deleteByCodes(@Param("codeList") List<Integer> ids);

    Integer count(MyhwQueryDTO myhwQueryDTO);

    List<Myhw> list(MyhwQueryDTO queryDTO, Integer offset, Integer limit);

    Integer SumEquipmentValue(@Param("userPeople")String userPeople);

    Integer CountEquipmentNum(@Param("userPeople")String userPeople);

    List<Map> TotalEquipmentValue();

    List<Map> TotalEquipmentNum();

}