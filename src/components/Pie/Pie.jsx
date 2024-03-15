import { useEffect } from "react";
import { useRef } from "react";
import * as echarts from 'echarts'

function Pie({data = [], title = "饼图"}) {
  const chartRef = useRef(null)

  // 把data设置在option中
  const option = {
    title: {
      // text: 'Referer of a Website',
      // subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        /* data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ], */
       
      }
    ]
  };

  useEffect(() => {
    let myChart = null
    if (chartRef.current) {
      // 生成echarts的实例对象 然后设置数据到option，包括title
      option.title.text = title
      option.series[0].data = data

      myChart = echarts.init(chartRef.current)
      myChart.setOption(option)
    }

    return () => {
      // 当组件被销毁时，销毁echarts实例
      myChart.dispose()
    }

  }, [chartRef.current, data])

  return (
    <div className="chart" style={{width: '100%', height: '100%'}} ref={chartRef}></div>
  );
}

export default Pie;