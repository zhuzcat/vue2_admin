<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        :show="show"
        @getCategoryId="getCategoryId"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scence === 1">
        <el-button
          type="primary"
          icon="el-cio-plus"
          :disabled="!category.category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table border :data="list" style="width: 100%; margin: 20px 0">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template v-slot="{ row }">
              <el-button
                title="添加sku"
                type="success"
                icon="el-icon-plus"
                size="mini"
                @click="addSku(row)"
              ></el-button>
              <el-button
                title="修改spu"
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                title="查看当前spu下的sku列表"
                type="info"
                icon="el-icon-info"
                size="mini"
                @click="handler(row)"
              ></el-button>
              <el-popconfirm
                title="确定删除当前内容吗"
                @onConfirm="deleteSpu(row)"
                ><el-button
                  style="margin-left: 10px"
                  title="删除spu"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button
              ></el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          :total="total"
          :page-size="limit"
          :page-sizes="[3, 5, 10]"
          :pager-count="7"
          :current-page="page"
          layout="prev, pager, next, jumper,->,sizes, total"
          @current-change="getSpuList"
          @size-change="limitChange"
        ></el-pagination>
      </div>
      <SkuForm
        v-show="scence === 2"
        ref="sku"
        @changeScences="changeScences"
      ></SkuForm>
      <SpuForm
        v-show="scence === 3"
        @changeScence="changeScence"
        ref="spu"
      ></SpuForm>
    </el-card>
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <el-table :data="skuList" v-loading="loading">
        <el-table-column
          label="名称"
          width="width"
          prop="skuName"
        ></el-table-column>
        <el-table-column
          label="价格"
          width="width"
          prop="price"
        ></el-table-column>
        <el-table-column
          label="重量"
          width="width"
          prop="weight"
        ></el-table-column>
        <el-table-column label="默认图片" width="width">
          <template v-slot="{ row }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SkuForm from "./SkuForm";
import SpuForm from "./SpuForm";
export default {
  name: "Spu",
  components: { SkuForm, SpuForm },
  data() {
    return {
      // 存储三级分类id
      category: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      // 存储spu列表
      list: [],
      // 当前页码
      page: 1,
      // 每页限制个数
      limit: 3,
      // 总条数
      total: 0,
      // 用于切换浏览与编辑模式 1代表浏览列表 2代表添加sku 3代表添加和修改spu
      scence: 1,
      // 用于列表详情的展示
      dialogTableVisible: false,
      // 用于存放选中的spu
      spu: {},
      // 用于展示spu下的sku列表
      skuList: [],
      // 用于加载中的展示
      loading: true,
    };
  },
  methods: {
    // 存储三级分类的id
    getCategoryId({ category1Id, category2Id, category3Id }) {
      this.category.category1Id = category1Id;
      this.category.category2Id = category2Id;
      this.category.category3Id = category3Id;
      // 发请求获取数据
      if (this.category.category3Id) {
        this.getSpuList();
      }
    },
    // 发送请求获取spu列表
    async getSpuList(pager = 1) {
      // pager默认为1
      this.page = pager;
      // 发送请求
      try {
        let result = await this.$API.spu.reqSpuList(
          this.page,
          this.limit,
          this.category.category3Id
        );
        // 将数据放入到data当中去
        if (result.code == 200) {
          this.list = result.data.records;
          this.total = result.data.total;
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    // 在limit变化时发送请求
    limitChange(limit) {
      this.limit = limit;
      // 重新发送请求
      this.getSpuList();
    },
    // 自定义事件，用于在子组件中点击取消按钮回到浏览界面使用
    changeScence({ flag, msg }) {
      // 切换展示
      this.scence = flag;
      // 发送请求重新获取数据
      if (msg == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    // 更新Spu
    updateSpu(row) {
      // 切换到SpuForm组件展示
      this.scence = 3;
      // 触发子组件中的initSpu函数发送请求获取数据
      this.$refs.spu.initSpu(row);
    },
    // 新增spu
    addSpu() {
      // 切换到SpuForm组件展示
      this.scence = 3;
      // 触发子组件中的initSpu函数发送请求获取数据
      this.$refs.spu.addInit(this.category.category3Id);
    },
    // 删除Spu
    async deleteSpu(row) {
      //发送请求删除数据
      try {
        let result = await this.$API.spu.reqDeleteSpu(row.id);
        // 判断结果
        if (result.code == 200) {
          // 提示信息
          this.$message({ type: "success", message: "删除成功" });
          // 重新获取数据
          this.getSpuList(this.list.length > 1 ? this.page : this.page - 1);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    // 添加Sku
    addSku(row) {
      this.scence = 2;
      // 触发SkuForm的初始化请求数据函数 发送请求获取数据
      this.$refs.sku.initGetData(
        this.category.category1Id,
        this.category.category2Id,
        row
      );
    },
    // 设置自定义事件跳转页面
    changeScences(scence) {
      this.scence = scence;
    },
    // 展示选中的spu下的sku列表
    async handler(spu) {
      // 展示详情页
      this.dialogTableVisible = true;
      // 存储选中的spu
      this.spu = spu;
      // 发送给请求获取数据
      let result = await this.$API.sku.reqSkuList(spu.id);
      if (result.code == 200) {
        this.skuList = result.data;
        // 数据返回时停止加载中
        this.loading = false;
      }
    },
    // 关闭对话框的回调
    close(done) {
      // 将加载中设为运行状态
      this.loading = true;
      // 初始化数据
      this.skuList = [];
      // 关闭对话框
      done();
    },
  },
  computed: {
    show() {
      return this.scence !== 1;
    },
  },
};
</script>

<style>
</style>