package cn.edu.sdu.ise.labs.vo;

import lombok.Data;

import java.util.Date;

/**
 * @author Aimmecat
 */
@Data
public class Iot_dataVO {
    private Integer id;

    private String equipmentId;

    private String location;

    private Integer co2;

    private Integer ch2o;

    private Integer tvoc;

    private Integer pm25;

    private Integer pm10;

    private Integer temperature;

    private Integer humidity;

    private Date time;

    private Double longitude;

    private Double latitude;
}
