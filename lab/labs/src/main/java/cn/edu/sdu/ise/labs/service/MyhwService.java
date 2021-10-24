package cn.edu.sdu.ise.labs.service;

import cn.edu.sdu.ise.labs.dto.MyhwDTO;
import cn.edu.sdu.ise.labs.dto.query.MyhwQueryDTO;
import cn.edu.sdu.ise.labs.model.Page;
import cn.edu.sdu.ise.labs.vo.MyhwVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface MyhwService {
    Page<MyhwVO> listByPage(MyhwQueryDTO queryDTO);

    Integer addMyhw(MyhwDTO myhwDTO);


    void deleteByCodes(@Param("codeList") List<Integer> ids);


    Integer updateMyhw(MyhwDTO myhwDTO);

    Integer MyhwSumEquipmentValue(@Param("userPeople")String userPeople);

    Integer MyhwCountEquipmentNum(@Param("userPeople")String userPeople);

    List<Map> TotalEquipmentValue();

    List<Map> TotalEquipmentNum();
}
