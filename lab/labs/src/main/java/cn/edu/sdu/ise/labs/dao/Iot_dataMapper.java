package cn.edu.sdu.ise.labs.dao;

import cn.edu.sdu.ise.labs.model.Iot_data;

public interface Iot_dataMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Iot_data record);

    Iot_data selectByPrimaryKey(Integer id);

    int updateByPrimaryKey(Iot_data record);
}