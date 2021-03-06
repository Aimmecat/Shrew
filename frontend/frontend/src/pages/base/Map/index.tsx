/*
 * @Author: your name
 * @Date: 2021-11-06 00:59:44
 * @LastEditTime: 2021-11-08 12:10:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \frontend\src\pages\base\Map\index.tsx
 */

import {
  DEFAULT_EQUIPMENT_LOCATION,
  DEFAULT_MAP_LOCATION,
  DEFAULT_PAGE_DATA,
  DEFAULT_SEARCH_PROPS,
} from '@/constants';
import { Button } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import MapApiLoaderHOC, { EquipmentLocation, MapConfig } from './baiduMap';

export default function MyhwPage() {
  const [loading, setLoading] = useState(false);

  const [iotDataLocation, setIotDataLocation] = useState<Array<ObjectMap>>();

  const [searchProps, changeSearchProps] = useState<defs.Iot_dataQueryDTO>({
    ...DEFAULT_SEARCH_PROPS,
  });

  const [mapconfig, setMapConfig] = useState<MapConfig>({
    ...DEFAULT_MAP_LOCATION,
  });

  const getIotData = async()=>{
    const result = await API.iot.getIotData.request({},{});
    setIotDataLocation(result);
  };

  function Get_Data(){
    getIotData();
  }

  setTimeout(Get_Data, 5000);

  return (
    <div>
      <MapApiLoaderHOC {...{ mapconfig, iotDataLocation }} />
    </div>
  )
}
