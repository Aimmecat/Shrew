/*
 * @Author: your name
 * @Date: 2021-04-17 20:59:28
 * @LastEditTime: 2021-04-18 16:42:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \frontend\src\pages\base\myhw\InputAxis\index.tsx
 */
import { DualAxes } from '@ant-design/charts';

const MyhwDualAxes: React.FC = () => {
  var data_value = new Array();
  var data_num = new Array();

  data_value.push({userPeople:'jxy',equipmentValue:13})
  data_value.push({userPeople:'cby',equipmentValue:19})

  data_num.push({userPeople:'jxy',equipmentNum:3})
  data_num.push({userPeople:'cby',equipmentNum:2})

  
  var config = {
    data: [data_value, data_num],
    xField: 'userPeople',
    yField: ['equipmentValue', 'equipmentNum'],
    geometryOptions: [
      { 
        geometry: 'column' 
      },
      {
        geometry: 'line',
        lineStyle: { lineWidth: 3 },
      },
    ],
  };
  return <DualAxes {...config} />;
};

export default MyhwDualAxes;