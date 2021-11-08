package cn.edu.sdu.ise.labs.dto;

import lombok.Data;

import java.util.Date;

@Data
public class Iot_dataDTO {
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
