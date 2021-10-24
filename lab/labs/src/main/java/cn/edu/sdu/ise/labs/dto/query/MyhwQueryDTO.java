package cn.edu.sdu.ise.labs.dto.query;

import lombok.Data;


@Data
public class MyhwQueryDTO extends PageQueryDTO{


    private String equipmentName;

    private String equipmentValue;

    private String userPeople;

    private String homeId;

}
