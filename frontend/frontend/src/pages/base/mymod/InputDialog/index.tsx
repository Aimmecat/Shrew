
import { DualAxes } from '@ant-design/charts';

const DemoDualAxes: React.FC = () => {
  var data = [
    {
      userPeople: '2019-03',
      equipmentValue: 13,
    },
    {
      userPeople: '2019-04',
      equipmentValue: 19,
    },
  ];
  var data2 = [
    {
      userPeople: '2019-03',
      equipmentNum: 3,
    },
    {
      userPeople: '2019-04',
      equipmentNum: 2,
    },
  ]
  var config = {
    data: [data, data2],
    xField: 'userPeople',
    yField: ['equipmentValue', 'equipmentNum'],
    geometryOptions: [
      { geometry: 'column' },
      {
        geometry: 'line',
        lineStyle: { lineWidth: 2 },
      },
    ],
  };
  return <DualAxes {...config} />;
};

export default DemoDualAxes;