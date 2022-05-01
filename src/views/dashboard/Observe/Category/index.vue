<template>
  <div>
    <el-card>
      <div slot="header" class="header">
        <span>销售额类别占比</span>
        <el-radio-group size="mini">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="charts" ref="charts"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Category",
  mounted() {
    // 获取dom
    const charts = this.$refs.charts;
    // 初始化echarts
    const myChart = echarts.init(charts);
    // 配置
    myChart.setOption({
      tooltip: {
        trigger: "item",
      },
      title: {
        text: "",
        subtext: "",
        left: "center",
        top: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["45%", "80%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "outside",
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "搜索引擎" },
            { value: 735, name: "直接访问" },
            { value: 580, name: "邮件营销" },
            { value: 484, name: "联盟广告" },
            { value: 300, name: "视频广告" },
          ],
        },
      ],
    });
    myChart.on("mouseover", (params) => {
      myChart.setOption({
        title: {
          text: params.data.name,
          subtext: params.data.value,
        },
      });
    });
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
>>> .el-card__header {
  padding: 14px 20px;
}
.charts {
  width: 100%;
  height: 275px;
}
</style>