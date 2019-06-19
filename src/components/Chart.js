import moment from 'moment';
import React, { useContext } from 'react';
import ReactEcharts from 'echarts-for-react';

import { DataContext } from './DataSubscriber';

export const mockData = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60]];

const dateList = (data) => data && data.map((item) => {
  return item[0];
});

const valueList = (data) => data && data.map((item) => {
  return item[1];
});

const getOptions = ({ temperature, humidity }) => ({

  // Make gradient line here
  visualMap: [{
    show: false,
    type: 'continuous',
    seriesIndex: 0,
    min: 0,
    max: 100
  }, {
    show: false,
    type: 'continuous',
    seriesIndex: 1,
    min: 0,
    max: 100,
    inRange: {
      colorHue: [140, 230],
      colorLightness: 0.6,
      colorSaturation: 1
    },
  }],

  title: [{
    top: '10%',
    left: 'center',
    text: 'Temperature (ºC)',
    textStyle: {
      color: '#fff'
    }
  }, {
    top: '50%',
    left: 'center',
    text: 'Humidity (%)',
    textStyle: {
      color: '#fff'
    }
  }],
  tooltip: {
    trigger: 'axis'
  },
  xAxis: [{
    boundaryGap: false,
    data: dateList(temperature),
    axisLabel: {
      formatter: value => moment(value).format('LTS')
    },
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    },
    nameTextStyle: {
      color: '#fff'
    }
  }, {
    boundaryGap: false,
    data: dateList(humidity),
    gridIndex: 1,
    axisLabel: {
      formatter: value => moment(value).format('LTS')
    },
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    },
    nameTextStyle: {
      color: '#fff'
    }
  }],
  yAxis: [{
    splitLine: {show: false},
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    },
    nameTextStyle: {
      color: '#fff'
    }
  }, {
    splitLine: {show: false},
    inverse: true,
    gridIndex: 1,
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    },
    nameTextStyle: {
      color: '#fff'
    }
  }],
  grid: [{
    bottom: '60%'
  }, {
    top: '60%'
  }],
  series: [{
    data: valueList(temperature),
    type: 'line',
    showSymbol: false,
    lineStyle: {
      width: 4
    },
  }, {
    data: valueList(humidity),
    type: 'line',
    showSymbol: false,
    lineStyle: {
      width: 4
    },
    xAxisIndex: 1,
    yAxisIndex: 1
  }]
});

const LineChart = () => {
  const { temperature, humidity } = useContext(DataContext);

  return (
    <ReactEcharts
      notMerge={true}
      lazyUpdate={true}
      option={getOptions({ temperature, humidity })}
    />
  );
};

export default LineChart;

