package cn.edu.sdu.ise.labs.service.impl;

import cn.edu.sdu.ise.labs.dao.DepartmentMapper;
import cn.edu.sdu.ise.labs.dto.DepartmentDTO;
import cn.edu.sdu.ise.labs.dto.query.DepartmentQueryDTO;
import cn.edu.sdu.ise.labs.model.Department;
import cn.edu.sdu.ise.labs.model.Page;
import cn.edu.sdu.ise.labs.model.Token;
import cn.edu.sdu.ise.labs.service.DepartmentService;
import cn.edu.sdu.ise.labs.service.utils.DepartmentUtils;
import cn.edu.sdu.ise.labs.utils.FormatUtils;
import cn.edu.sdu.ise.labs.utils.PageUtils;
import cn.edu.sdu.ise.labs.utils.TokenContextHolder;
import cn.edu.sdu.ise.labs.vo.DepartmentVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;

/**
 * @author 李洪文
 * @description
 * @date 2019/12/3 9:33
 */
@Service
public class DepartmentServiceImpl implements DepartmentService {
    @Autowired
    private DepartmentMapper departmentMapper;

    @Override
    public Page<DepartmentVO> listByPage(DepartmentQueryDTO queryDTO) {
        if (queryDTO == null) {
            queryDTO = new DepartmentQueryDTO();
        }

        queryDTO.setDepartmentName(FormatUtils.makeFuzzySearchTerm(queryDTO.getDepartmentName()));
        Token token = TokenContextHolder.getToken();

        Integer size = departmentMapper.count(queryDTO);
        PageUtils pageUtils = new PageUtils(queryDTO.getPage(), queryDTO.getPageSize(), size);
        Page<DepartmentVO> pageData = new Page<>(pageUtils.getPage(), pageUtils.getPageSize(), pageUtils.getTotal(), new ArrayList<>());
        if (size == 0) {
            // 没有命中，则返回空数据。
            return pageData;
        }

        List<Department> list = departmentMapper.list(queryDTO, pageUtils.getOffset(), pageUtils.getLimit());
        for (Department department : list) {
            pageData.getList().add(DepartmentUtils.convertToVO(department));
        }

        return pageData;
    }


    /**
     * 新建部门
     *
     * @param departmentDTO 部门输入对象
     * @return 部门编码
     */
    @Override
    public Integer addDepartment(DepartmentDTO departmentDTO) {
        // 校验输入数据正确性
        DepartmentUtils.validateDepartment(departmentDTO);
        // 创建实体对象，用以保存到数据库
        Department department = new Department();
        // 将输入的字段全部复制到实体对象中
        BeanUtils.copyProperties(departmentDTO, department);
        // 调用DAO方法保存到数据库表
        departmentMapper.insert(department);
        return department.getId();
    }

    /**
     * 更新部门数据
     *
     * @param departmentDTO 部门输入对象
     * @return 部门编码
     */
    @Override
    public Integer updateDepartment(DepartmentDTO departmentDTO) {
        // 校验输入数据正确性
        Token token = TokenContextHolder.getToken();
        DepartmentUtils.validateDepartment(departmentDTO);
        Assert.notNull(departmentDTO.getId(), "部门id不能为空");
        Department department = departmentMapper.selectByPrimaryKey(departmentDTO.getId());
        Assert.notNull(department, "没有找到部门，Id为：" + departmentDTO.getId());

        BeanUtils.copyProperties(departmentDTO, department);
        department.setUpdatedBy(token.getUserCode());
        departmentMapper.updateByPrimaryKey(department);
        return department.getId();
    }

    /**
     * 根据编码列表，批量删除部门
     *
     * @param ids 编码列表
     */
    @Override
    public String deleteByCodes(List<Integer> ids) {
        Assert.notEmpty(ids, "部门id列表不能为空");
        departmentMapper.deleteByCodes(ids);
        return "Hello world";
    }
}
