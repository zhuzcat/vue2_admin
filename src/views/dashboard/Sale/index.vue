<template>
  <div style="margin-top: 10px">
    <el-card>
      <div class="header">
        <el-tabs v-model="tabAttribute">
          <el-tab-pane label="销售量" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visit"></el-tab-pane>
        </el-tabs>
        <div class="right">
          <span @click="getDay"> 今日 </span>
          <span @click="getWeek"> 本周 </span>
          <span @click="getMonth">本月</span>
          <span @click="getYear">本年</span>
          <el-date-picker
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            style="width: 250px"
            v-model="date"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="body">
        <el-row>
          <el-col :span="18">
            <div ref="charts" class="charts"></div>
          </el-col>
          <el-col :span="6">
            <div class="row">
              <div>门店{{ title }}排名</div>
              <ul>
                <li>
                  <span class="left-row black">1</span>
                  <span>肯德基</span>
                  <span class="right-row">123,445</span>
                </li>
                <li>
                  <span class="left-row black">2</span>
                  <span>肯德基</span>
                  <span class="right-row">123,445</span>
                </li>
                <li>
                  <span class="left-row black">3</span>
                  <span>肯德基</span>
                  <span class="right-row">123,445</span>
                </li>
                <li>
                  <span class="left-row">4</span>
                  <span>肯德基</span>
                  <span class="right-row">123,445</span>
                </li>
                <li>
                  <span class="left-row">5</span>
                  <span>肯德基</span>
                  <span class="right-row">123,445</span>
                </li>
                <li>
                  <span class="left-row">6</span>
                  <span>肯德基</span>
                  <span class="right-row">123,445</span>
                </li>
                <li>
                  <span class="left-row">7</span>
                  <span>肯德基</span>
                  <span class="right-row">123,445</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
import * as echarts from "echarts";
export default {
  name: "Sale",
  data() {
    return {
      // tab栏选项
      tabAttribute: "sale",
      // 用来保存echarts实例
      mycharts: null,
      // 用来保存date piker的日期
      date: [],
      // 假数据
      saleData: [10, 52, 200, 334, 390, 330, 220, 450, 200, 440, 301, 150],
      visitData: [50, 20, 150, 300, 120, 150, 240, 120, 80, 130, 200, 240],
    };
  },
  mounted() {
    //在dom形成之后建立图标
    const charts = this.$refs.charts;
    // 初始化echarts
    this.mycharts = echarts.init(charts);
    // 配置对象
    this.mycharts.setOption({
      title: {
        text: this.title + "趋势",
        top: 20,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        top: "20%",
        left: "3%",
        right: "10%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: this.saleData,
        },
      ],
    });
  },
  computed: {
    // 右侧标题
    title() {
      return this.tabAttribute == "sale" ? "销售额" : "访问量";
    },
  },
  watch: {
    // 监控title的改变来改变echarts的标题
    title() {
      this.mycharts.setOption({
        title: {
          text: this.title + "趋势",
          top: 20,
        },
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: this.tabAttribute == "sale" ? this.saleData : this.visitData,
          },
        ],
      });
    },
  },
  methods: {
    //获取今天
    getDay() {
      const start = dayjs().format("YYYY-MM-DD");
      this.date = [start, start];
    },
    // 获取本周
    getWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    // 获取本月
    getMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    // 获取本年
    getYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>

<style scoped>
.header {
  position: relative;
}

.right {
  position: absolute;
  right: 0;
  top: 0;
}

.right span {
  margin-right: 20px;
  font-size: 12px;
}

.body {
  height: 350px;
}

.charts {
  width: 100%;
  height: 350px;
}

.body .row {
  height: 100%;
  margin-top: 10px;
  font-size: 14px;
}

.row ul {
  padding: 0;
  list-style: none;
}

.row ul li {
  margin-top: 8%;
}

.row li span {
  margin-right: 25px;
}

.left-row {
  float: left;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
}

.right-row {
  float: right;
}

.black {
  background-color: #000;
  color: white;
}
</style>