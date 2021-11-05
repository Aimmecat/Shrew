/*
 * @Author: your name
 * @Date: 2021-11-06 00:59:44
 * @LastEditTime: 2021-11-06 02:23:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \frontend\src\pages\base\Map\index.tsx
 */

import { DEFAULT_EQUIPMENT_LOCATION, DEFAULT_MAP_LOCATION } from '@/constants';
import { useEffect, useState } from 'react'
import MapApiLoaderHOC, { EquipmentLocation, MapConfig } from './baiduMap'

export default function MyhwPage(){

    const [mapconfig, setMapConfig] = useState<MapConfig>({
        ...DEFAULT_MAP_LOCATION
    });

    const [equipmentLocation, setEquipmentLocation] = useState<EquipmentLocation>({
        ...DEFAULT_EQUIPMENT_LOCATION
    });

    return(
        <div>
            <MapApiLoaderHOC {...{mapconfig, equipmentLocation}}/>
        </div>
    )
}