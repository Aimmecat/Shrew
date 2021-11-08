package cn.edu.sdu.ise.labs.service.impl;

import cn.edu.sdu.ise.labs.dao.Iot_dataMapper;
import cn.edu.sdu.ise.labs.dto.Iot_dataDTO;
import cn.edu.sdu.ise.labs.dto.query.Iot_dataQueryDTO;
import cn.edu.sdu.ise.labs.model.Iot_data;
import cn.edu.sdu.ise.labs.model.Page;
import cn.edu.sdu.ise.labs.model.Token;
import cn.edu.sdu.ise.labs.service.IotService;
import cn.edu.sdu.ise.labs.service.utils.Iot_dataUtils;
import cn.edu.sdu.ise.labs.utils.FormatUtils;
import cn.edu.sdu.ise.labs.utils.PageUtils;
import cn.edu.sdu.ise.labs.utils.TokenContextHolder;
import cn.edu.sdu.ise.labs.vo.Iot_dataVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author Aimmecat
 */
@Service
public class IotServiceImpl implements IotService {

    @Autowired
    private Iot_dataMapper iotDataMapper;

    @Override
    public String addIotInfo(Iot_dataDTO iotDataDto) {
        // 校验输入数据正确性
        Iot_dataUtils.validateDepartment(iotDataDto);
        // 创建实体对象，用以保存到数据库
        Iot_data iotData = new Iot_data();
        // 将输入的字段全部复制到实体对象中
        BeanUtils.copyProperties(iotDataDto, iotData);
        // 调用DAO方法保存到数据库表
        iotDataMapper.insert(iotData);
        return "Insert Success!";
    }

    @Override
    public Page<Iot_dataVO> listByPage(Iot_dataQueryDTO queryDTO) {
        if (queryDTO == null) {
            queryDTO = new Iot_dataQueryDTO();
        }

        queryDTO.setEquipmentId(FormatUtils.makeFuzzySearchTerm(queryDTO.getEquipmentId()));
        queryDTO.setLocation(FormatUtils.makeFuzzySearchTerm(queryDTO.getLocation()));

        Token token = TokenContextHolder.getToken();
        Integer size = iotDataMapper.count(queryDTO);
        PageUtils pageUtils = new PageUtils(queryDTO.getPage(), queryDTO.getPageSize(), size);
        Page<Iot_dataVO> pageData = new Page<>(pageUtils.getPage(), pageUtils.getPageSize(), pageUtils.getTotal(), new ArrayList<>());
        if (size == 0) {
            // 没有命中，则返回空数据。
            return pageData;
        }

        List<Iot_data> list = iotDataMapper.list(queryDTO, pageUtils.getOffset(), pageUtils.getLimit());
        for (Iot_data iotData : list) {
            pageData.getList().add(Iot_dataUtils.convertToVO(iotData));
        }

        return pageData;
    }

    @Override
    public void deleteByCodes(List<Integer> ids) {
        iotDataMapper.deleteByCodes(ids);
    }

    @Override
    public Integer updateIotInfo(Iot_dataDTO iotDataDTO) {
        // 校验输入数据正确性
        Token token = TokenContextHolder.getToken();
        Iot_dataUtils.validateDepartment(iotDataDTO);
        Assert.notNull(iotDataDTO.getId(), "设备id不能为空");
        Iot_data iotData = iotDataMapper.selectByPrimaryKey(iotDataDTO.getId());
        Iot_data oldIotData =iotDataMapper.selectByPrimaryKey(iotDataDTO.getId());
        Assert.notNull(iotData, "没有找到设备，Id为：" + iotDataDTO.getId());
        BeanUtils.copyProperties(iotDataDTO, iotData);
        iotData.setCo2(oldIotData.getCo2());
        iotData.setCh2o(oldIotData.getCh2o());
        iotData.setTvoc(oldIotData.getTvoc());
        iotData.setPm25(oldIotData.getPm25());
        iotData.setPm10(oldIotData.getPm10());
        iotData.setTemperature(oldIotData.getTemperature());
        iotData.setHumidity(oldIotData.getHumidity());
        iotData.setTime(oldIotData.getTime());
        iotDataMapper.updateByPrimaryKey(iotData);
        return iotData.getId();
    }

    @Override
    public List<Map> GetIotData() {
        return iotDataMapper.getLocationData();
    }


}
