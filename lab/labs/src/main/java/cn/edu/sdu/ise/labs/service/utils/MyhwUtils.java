package cn.edu.sdu.ise.labs.service.utils;


import cn.edu.sdu.ise.labs.dto.MyhwDTO;
import cn.edu.sdu.ise.labs.model.Department;
import cn.edu.sdu.ise.labs.model.Myhw;
import cn.edu.sdu.ise.labs.utils.FormatUtils;
import cn.edu.sdu.ise.labs.vo.DepartmentVO;
import cn.edu.sdu.ise.labs.vo.MyhwVO;
import org.springframework.beans.BeanUtils;
import org.springframework.util.Assert;

public class MyhwUtils {
    /**
     * 规范并校验myhwDTO
     *
     * @param myhwDTO
     */
    public static void validateDepartment(MyhwDTO myhwDTO) {
        FormatUtils.trimFieldToNull(myhwDTO);
        Assert.notNull(myhwDTO, "输入数据不能为空");
        Assert.hasText(myhwDTO.getEquipmentName(), "设备名称不能为空");
    }


    public static MyhwVO convertToVO(Myhw myhw) {
        MyhwVO myhwVO = new MyhwVO();
        BeanUtils.copyProperties(myhw, myhwVO);
        return myhwVO;
    }


}
