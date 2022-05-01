<template>
  <el-card>
    <div slot="header" class="search-header">
      <span>线上热门搜索</span>
      <el-dropdown>
        <i class="el-icon-more" style="cursor: pointer"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="main">
      <el-row :gutter="10">
        <el-col :span="12">
          <LineCharts></LineCharts>
        </el-col>
        <el-col :span="12">
          <LineCharts></LineCharts>
        </el-col>
      </el-row>
    </div>
    <div class="footer" style="height: 125px">
      <el-table style="width: 100%" border size="mini" :data="data">
        <el-table-column label="排名" width="80" type="index">
        </el-table-column>
        <el-table-column label="搜索关键词" width="width"> </el-table-column>
        <el-table-column sortable label="用户数" width="width">
        </el-table-column>
        <el-table-column sortable label="周涨幅" width="width">
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
        style="margin-top: 15px; float: right"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import LineCharts from "./LineCharts";
export default {
  name: "Search",
  data() {
    return {
      data: [[]],
    };
  },
  components: { LineCharts },
};
</script>

<style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
}

.footer {
  margin-top: 10px;
}
</style>