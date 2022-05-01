<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "BarCharts",
  mounted() {
    // dom挂载成功能够获取
    let charts = this.$refs.charts;
    // 初始化echarts
    const myEcharts = echarts.init(charts);
    // 配置属性
    myEcharts.setOption({
      xAxis: {
        min: 0,
        max: 100,
        show: false,
      },
      yAxis: {
        type: "category",
        show: false,
      },
      series: {
        type: "bar",
        data: [78],
        barWidth: 10,
        color: "yellowgreen",
        showBackground: true,
        label: {
          show: true,
          formatter: "|",
          color: "greenyellow",
          position: "right",
        },
      },
      grid: {
        left: 0,
        top: -10,
        bottom: 0,
        right: 0,
      },
    });
  },
};
</script>

<style>
</style>