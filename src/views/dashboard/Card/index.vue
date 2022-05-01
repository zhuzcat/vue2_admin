<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="销售量" count="￥126560">
            <template v-slot:charts>
              <div style="margin-top: 20px">
                <span style="font-size: 14px">
                  周同比&nbsp;&nbsp;&nbsp;&nbsp;56.67% </span
                ><svg
                  t="1649210248376"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3195"
                  width="20"
                  height="20"
                >
                  <path
                    d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z"
                    fill="#595BB3"
                    p-id="3196"
                  ></path>
                </svg>
                <span style="font-size: 14px"> 日同比&nbsp; 19.16%</span>
                <svg
                  t="1649210638604"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4515"
                  width="20"
                  height="20"
                >
                  <path
                    d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z"
                    fill="#1afa29"
                    p-id="4516"
                  ></path>
                </svg>
              </div>
            </template>
            <template v-slot:footer>
              <span>日销售量 ￥12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460">
            <template v-slot:charts>
              <LineCharts></LineCharts>
            </template>
            <template v-slot:footer>
              <span>日访问量 &nbsp;1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88460">
            <template v-slot:charts><BarCharts /></template>
            <template v-slot:footer>
              <span>转化率&nbsp;65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template v-slot:charts>
              <ProgressCharts/>
            </template>
            <template v-slot:footer>
              <span style="font-size: 14px">
                周同比&nbsp;&nbsp;&nbsp;&nbsp;56.67% </span
              ><svg
                t="1649210248376"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3195"
                width="20"
                height="20"
              >
                <path
                  d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z"
                  fill="#595BB3"
                  p-id="3196"
                ></path>
              </svg>
              <span style="font-size: 14px"> 日同比&nbsp; 19.16%</span>
              <svg
                t="1649210638604"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4515"
                width="20"
                height="20"
              >
                <path
                  d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z"
                  fill="#1afa29"
                  p-id="4516"
                ></path>
              </svg>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import LineCharts from "./LineCharts";
import BarCharts from "./BarCharts";
import ProgressCharts from "./ProgressCharts";
export default {
  name: "Card",
  components: { Detail, LineCharts, BarCharts, ProgressCharts },
};
</script>

<style>
.icon {
  vertical-align: middle;
}
</style>