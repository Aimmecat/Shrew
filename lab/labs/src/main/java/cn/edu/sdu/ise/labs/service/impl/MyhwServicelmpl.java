package cn.edu.sdu.ise.labs.service.impl;

import cn.edu.sdu.ise.labs.dao.MyhwMapper;
import cn.edu.sdu.ise.labs.dto.DepartmentDTO;
import cn.edu.sdu.ise.labs.dto.MyhwDTO;
import cn.edu.sdu.ise.labs.dto.query.DepartmentQueryDTO;
import cn.edu.sdu.ise.labs.dto.query.MyhwQueryDTO;
import cn.edu.sdu.ise.labs.model.Department;
import cn.edu.sdu.ise.labs.model.Myhw;
import cn.edu.sdu.ise.labs.model.Page;
import cn.edu.sdu.ise.labs.model.Token;
import cn.edu.sdu.ise.labs.service.MyhwService;
import cn.edu.sdu.ise.labs.service.utils.DepartmentUtils;
import cn.edu.sdu.ise.labs.service.utils.MyhwUtils;
import cn.edu.sdu.ise.labs.utils.FormatUtils;
import cn.edu.sdu.ise.labs.utils.PageUtils;
import cn.edu.sdu.ise.labs.utils.TokenContextHolder;
import cn.edu.sdu.ise.labs.vo.DepartmentVO;
import cn.edu.sdu.ise.labs.vo.MyhwVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class MyhwServicelmpl implements MyhwService {

    @Autowired
    private MyhwMapper myhwMapper;

    @Override
    public Page<MyhwVO> listByPage(MyhwQueryDTO queryDTO) {
        if (queryDTO == null) {
            queryDTO = new MyhwQueryDTO();
        }

        queryDTO.setEquipmentName(FormatUtils.makeFuzzySearchTerm(queryDTO.getEquipmentName()));

        queryDTO.setEquipmentValue(FormatUtils.makeFuzzySearchTerm(queryDTO.getEquipmentValue()));

        queryDTO.setUserPeople(FormatUtils.makeFuzzySearchTerm(queryDTO.getUserPeople()));

        queryDTO.setHomeId(FormatUtils.makeFuzzySearchTerm(queryDTO.getHomeId()));


        Token token = TokenContextHolder.getToken();
        Integer size = myhwMapper.count(queryDTO);
        PageUtils pageUtils = new PageUtils(queryDTO.getPage(), queryDTO.getPageSize(), size);
        Page<MyhwVO> pageData = new Page<>(pageUtils.getPage(), pageUtils.getPageSize(), pageUtils.getTotal(), new ArrayList<>());
        if (size == 0) {
            // 没有命中，则返回空数据。
            return pageData;
        }

        List<Myhw> list = myhwMapper.list(queryDTO, pageUtils.getOffset(), pageUtils.getLimit());
        for (Myhw myhw : list) {
            pageData.getList().add(MyhwUtils.convertToVO(myhw));
        }

        return pageData;
    }

    @Override
    public Integer addMyhw(MyhwDTO myhwDTO) {
        // 校验输入数据正确性
        MyhwUtils.validateDepartment(myhwDTO);
        // 创建实体对象，用以保存到数据库
        Myhw myhw = new Myhw();
        // 将输入的字段全部复制到实体对象中
        BeanUtils.copyProperties(myhwDTO, myhw);
        // 调用DAO方法保存到数据库表
        myhwMapper.insert(myhw);
        return myhwDTO.getId();
    }

    @Override
    public void deleteByCodes(List<Integer> ids) {
        Assert.notEmpty(ids, "部门id列表不能为空");
        myhwMapper.deleteByCodes(ids);
    }


    @Override
    public Integer updateMyhw(MyhwDTO myhwDTO) {
        // 校验输入数据正确性
        Token token = TokenContextHolder.getToken();
        MyhwUtils.validateDepartment(myhwDTO);
        Assert.notNull(myhwDTO.getId(), "部门id不能为空");
        Myhw myhw = myhwMapper.selectByPrimaryKey(myhwDTO.getId());
        Assert.notNull(myhw, "没有找到部门，Id为：" + myhwDTO.getId());
        BeanUtils.copyProperties(myhwDTO, myhw);
        myhwMapper.updateByPrimaryKey(myhw);
        return myhw.getId();
    }

    @Override
    public Integer MyhwSumEquipmentValue(String userPeople) {
        return myhwMapper.SumEquipmentValue(userPeople);
    }

    @Override
    public Integer MyhwCountEquipmentNum(String userPeople) {
        return myhwMapper.CountEquipmentNum(userPeople);
    }

    @Override
    public List<Map> TotalEquipmentValue() {
        return myhwMapper.TotalEquipmentValue();
    }

    @Override
    public List<Map> TotalEquipmentNum() {
        return myhwMapper.TotalEquipmentNum();
    }
}
