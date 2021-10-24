package cn.edu.sdu.ise.labs.dao;

import cn.edu.sdu.ise.labs.model.Test;

public interface TestMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Test record);

    Test selectByPrimaryKey(Integer id);


    int updateByPrimaryKey(Test record);
}