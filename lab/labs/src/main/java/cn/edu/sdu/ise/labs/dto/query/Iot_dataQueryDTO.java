package cn.edu.sdu.ise.labs.dto.query;

import lombok.Data;

/**
 * @author Aimmecat
 */
@Data
public class Iot_dataQueryDTO extends PageQueryDTO{
    private String equipmentId;

    private String location;
}
