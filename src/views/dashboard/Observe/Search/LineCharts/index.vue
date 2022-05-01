<template>
  <div>
    <div class="top">
      <span style="margin-right: 5px"> 搜索用户数 </span>
      <svg
        t="1649234661541"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2920"
        width="14"
        height="14"
      >
        <path
          d="M512 0C229.23 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0zM512 928c-229.75 0-416-186.25-416-416S282.25 96 512 96s416 186.25 416 416S741.75 928 512 928z"
          p-id="2921"
          fill="#8a8a8a"
        ></path>
        <path
          d="M537.64 343.452c47.074 0 83.266-37.528 83.266-78.072 0-32.46-20.832-60.878-62.496-60.878-54.816 0-82.178 44.618-82.178 77.11C475.144 320.132 498.152 343.452 537.64 343.452z"
          p-id="2922"
          fill="#8a8a8a"
        ></path>
        <path
          d="M533.162 728.934c-7.648 0-10.914-10.136-3.264-39.55l43.25-166.406c16.386-60.848 10.944-100.398-21.92-100.398-39.456 0-131.458 39.83-211.458 107.798l16.416 27.392c25.246-17.256 67.906-34.762 77.792-34.762 7.648 0 6.56 10.168 0 35.508l-37.746 158.292c-23.008 89.266 1.088 109.538 33.984 109.538 32.864 0 117.808-30.47 195.57-109.632l-18.656-25.34C575.354 716.714 543.05 728.934 533.162 728.934z"
          p-id="2923"
          fill="#8a8a8a"
        ></path>
      </svg>
    </div>
    <div class="main">
      <span style="font-size: 25px; margin-right: 20px">12321</span>
      <span style="font-size: 13px; color: rgba(0, 0, 0, 0.5)"
        >17.1
        <svg
          t="1649242922904"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4710"
          width="16"
          height="16"
        >
          <path
            d="M583.93 296.842l234.8 318.515a73.059 73.059 0 0 1-14.99 102.048l-2.62 1.806a78.116 78.116 0 0 1-44.612 13.908h-469.6a75.588 75.588 0 0 1-76.762-74.414 72.878 72.878 0 0 1 14.269-43.348l234.8-318.515a78.568 78.568 0 0 1 106.834-16.888 77.574 77.574 0 0 1 17.881 16.888z"
            p-id="4711"
            fill="#1afa29"
          ></path>
        </svg>
        <svg
          t="1649242964835"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6491"
          width="16"
          height="16"
        >
          <path
            d="M458.854 701.962l-234.8-318.605a73.059 73.059 0 0 1 15.262-102.048l2.619-1.806a78.026 78.026 0 0 1 44.612-13.817h469.6a75.588 75.588 0 0 1 76.762 74.413 72.246 72.246 0 0 1-14.269 43.258l-234.8 318.605a78.477 78.477 0 0 1-107.195 17.25 77.213 77.213 0 0 1-17.791-17.25z"
            p-id="6492"
            fill="#d81e06"
          ></path>
        </svg>
      </span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
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
                color: "skyblue", // 0% 处的颜色
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

<style scoped>
.charts {
  width: 100%;
  height: 50px;
}

.top {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  vertical-align: middle;
}

.main {
  margin-top: 15px;
}
</style>