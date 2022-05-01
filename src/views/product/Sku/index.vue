<template>
  <div>
    <el-card>
      <el-table style="width: 100%" border :data="records" v-loading="loading">
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="skuName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="skuDesc" label="描述" width="width">
        </el-table-column>
        <el-table-column
          prop="prop"
          label="默认图片"
          width="110"
          align="center"
        >
          <template v-slot="{ row, $index }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 80px; height: 80px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="80">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="80">
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
          <template v-slot="{ row, $index }">
            <el-button
              type="success"
              size="mini"
              icon="el-icon-bottom"
              v-if="row.isSale === 1"
              @click="cancelSale(row)"
            ></el-button>
            <el-button
              type="info"
              size="mini"
              icon="el-icon-top"
              v-else
              @click="sale(row)"
            ></el-button>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="updateButton"
            ></el-button>
            <el-button
              type="info"
              size="mini"
              icon="el-icon-info"
              @click="getSkuInfo(row)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align: center"
        :total="total"
        :page-size="limit"
        :page-sizes="[10, 15, 20]"
        :pager-count="7"
        :current-page="page"
        layout="prev, pager, next, jumper,->,sizes, total"
        @current-change="getSkuList"
        @size-change="changeLimit"
      ></el-pagination>
    </el-card>
    <el-drawer
      :visible.sync="drawer"
      :before-close="handleClose"
      :show-close="false"
      size="50%"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }} 元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            style="margin-bottom: 10px"
            type="success"
            v-for="(item, index) in skuInfo.skuAttrValueList"
            :key="item.id"
            >{{ item.attrId }}-{{ item.valueId }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="350px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img
                :src="item.imgUrl"
                alt=""
                style="width: 350px; height: 350px"
              />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      // 当前页
      page: 1,
      // 每页限制
      limit: 10,
      // 总条数
      total: 0,
      // 获取的sku列表数据
      records: [],
      // 加载
      loading: false,
      // sku详情信息
      skuInfo: {},
      // 抽屉的显示与隐藏
      drawer: false,
    };
  },
  methods: {
    // 获取sku列表的方法
    async getSkuList(pager = 1) {
      this.loading = true;
      // 将pager赋值给this上的page
      this.page = pager;
      const { page, limit } = this;
      // 发送请求获取数据
      let result = await this.$API.sku.reqSkuInfoList(page, limit);
      // 判断请求结果
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
        this.loading = false;
      }
    },
    // 页面限制改变
    changeLimit(limit) {
      // 重新发送请求
      this.limit = limit;
      this.getSkuList();
    },
    // 上架商品
    async sale(row) {
      let result = await this.$API.sku.reqSale(row.id);
      // 判断结果
      if (result.code == 200) {
        // 将isSale置为1
        row.isSale = 1;
        // 提示信息
        this.$message({
          type: "success",
          message: "上架成功",
        });
      }
    },
    // 下架商品
    async cancelSale(row) {
      let result = await this.$API.sku.reqCancelSale(row.id);
      // 判断结果
      if (result.code == 200) {
        row.isSale = 0;
        this.$message({
          type: "success",
          message: "下架成功",
        });
      }
    },
    updateButton() {
      this.$message("该功能待开发中");
    },
    // 获取sku的详情信息
    async getSkuInfo(row) {
      // 显示抽屉
      this.drawer = true;
      // 获取详情信息
      let result = await this.$API.sku.reqSkuInfo(row.id);
      // 判断结果
      if (result.code == 200) {
        this.skuInfo = result.data;
      }
    },
    // 关闭抽屉的回调
    handleClose(done) {
      // 清空sku详情信息的数据
      this.skuInfo = {};
      done();
    },
  },
  // 挂载成功发请求
  mounted() {
    this.getSkuList();
  },
};
</script>

<style>
</style>

<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-carousel {
  width: 350px;
}

.el-row .el-col-5 {
  text-align: right;
  font-weight: 700;
}

.el-col {
  margin: 20px 10px;
  font-size: 18px;
}

>>> .el-carousel__button {
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
}
</style>