<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineCharts",
  mounted() {
    // dom挂载成功能够获取
    let charts = this.$refs.charts;
    // 初始化echarts
    const myEcharts = echarts.init(charts);
    // 配置属性
    myEcharts.setOption({
      xAxis: {
        type: "category",
        show: false,
      },
      yAxis: {
        show: false,
      },
      series: {
        type: "line",
        data: [
          70, 40, 50, 80, 99, 75, 65, 57, 80, 120, 105, 77, 65, 77, 99, 50, 33,
        ],
        itemStyle: {
          opacity: 0,
        },
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "purple", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#fff", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      grid: {
        left: -7,
        top: 10,
        bottom: 0,
        right: -7,
      },
    });
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>