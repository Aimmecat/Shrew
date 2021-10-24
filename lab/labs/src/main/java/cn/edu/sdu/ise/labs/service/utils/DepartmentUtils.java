package cn.edu.sdu.ise.labs.service.utils;

import cn.edu.sdu.ise.labs.dto.DepartmentDTO;
import cn.edu.sdu.ise.labs.model.Department;
import cn.edu.sdu.ise.labs.utils.FormatUtils;
import cn.edu.sdu.ise.labs.vo.DepartmentVO;
import org.springframework.beans.BeanUtils;
import org.springframework.util.Assert;

/**
 * @author 李洪文
 * @description
 * @date 2019/12/3 9:35
 */
public class DepartmentUtils {
    /**
     * 规范并校验departmentDTO
     *
     * @param departmentDTO
     */
    public static void validateDepartment(DepartmentDTO departmentDTO) {
        FormatUtils.trimFieldToNull(departmentDTO);
        Assert.notNull(departmentDTO, "部门输入数据不能为空");
        Assert.hasText(departmentDTO.getDepartmentName(), "部门名称不能为空");
    }

    /**
     * 将实体对象转换为VO对象
     *
     * @param department 实体对象
     * @return VO对象
     */
    public static DepartmentVO convertToVO(Department department) {
        DepartmentVO departmentVO = new DepartmentVO();
        BeanUtils.copyProperties(department, departmentVO);
        departmentVO.setCreatedAt(FormatUtils.formatFullDate(department.getCreatedAt()));
        departmentVO.setUpdatedAt(FormatUtils.formatFullDate(department.getUpdatedAt()));
        return departmentVO;
    }
}
