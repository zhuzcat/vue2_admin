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
        type: "category",
        show: false,
      },
      yAxis: {
        show: false,
      },
      series: {
        type: "bar",
        data: [75, 99, 75, 65, 57, 80, 120, 105, 77, 65, 77, 99, 50, 96],
      },
      grid: {
        left: 0,
        top: 10,
        bottom: 0,
        right: 0,
      },
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>