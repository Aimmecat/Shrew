/*
 * @Author: your name
 * @Date: 2021-11-06 01:00:04
 * @LastEditTime: 2021-11-08 12:09:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \frontend\src\pages\base\Map\baiduMap\index.tsx
 */

import React from 'react';

import {
  Map,
  MapApiLoaderHOC,
  MapTypeControl,
  Marker,
  Label,
  } from 'react-bmapgl';

export interface EquipmentLocation {
  longitude: number;
  latitude: number;
}

export interface MapConfig {
  height: number;
  longitude: number;
  latitude: number;
  zoom: number;
  tilt: number;
}

const App: React.FC<{
  config: MapConfig;
  equipmentlocation: EquipmentLocation;
}> = (info: any) => {
 
  return (
    <Map
      style={{ height: info.mapconfig.height }}
      center={
        new BMapGL.Point(info.mapconfig.longitude, info.mapconfig.latitude)
      }
      zoom={info.mapconfig.zoom}
      tilt={info.mapconfig.tilt}
      enableScrollWheelZoom
    >
      <MapTypeControl />
      {
        info?.iotDataLocation?.map(item=>{
          return(
              <><Marker position={new BMapGL.Point(item.longitude, item.latitude)} />
              <Label position={new BMapGL.Point(item.longitude, item.latitude)} text={item.equipment_id} /></>
          )})
      }
    </Map>
  );
};

export default MapApiLoaderHOC({ ak: '6hT7YeGk8F6y5BffHw2lBDMoCH0urEl6' })(App);
