package cn.edu.sdu.ise.labs.dto;

import cn.edu.sdu.ise.labs.dto.query.PageQueryDTO;
import lombok.Data;

@Data
public class MyhwDTO {
    private Integer id;

    /**
     * 设备名称
     */
    private String equipmentName;

    /**
     * 设备价格区间
     */
    private String equipmentValue;

    /**
     * 使用人员
     */
    private String userPeople;

    /**
     * 房间号
     */
    private String homeId;

}
