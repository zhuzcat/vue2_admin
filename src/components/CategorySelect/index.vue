<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级菜单">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="getCategory2List"
          :disabled="show"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="(c1, index) in list1"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级菜单">
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="getCategory3List"
          :disabled="show"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="(c2, index) in list2"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级菜单">
        <el-select
          placeholder="请选择"
          v-model="cForm.category3Id"
          @change="handler3"
          :disabled="show"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="(c3, index) in list3"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
      //存储各级分类的列表
      list1: [],
      list2: [],
      list3: [],
      // 存储各级选中的id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  // 收集父组件的props
  props: ["show"],
  mounted() {
    //挂载后获取一级分类列表
    this.getCategory1List();
  },
  methods: {
    //   获取一级分类的方法
    async getCategory1List() {
      // 发送请求获取列表
      let result = await this.$API.attr.reqCategory1List();
      if (result.code == 200) {
        // 将数据存进data中
        this.list1 = result.data;
      }
    },
    // 获取二级分类的方法
    async getCategory2List() {
      this.list2 = [];
      this.list3 = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      // 获取category1Id
      const { category1Id } = this.cForm;
      // 发送请求获取二级分类
      let result = await this.$API.attr.reqCategory2List(category1Id);
      if (result.code == 200) {
        this.list2 = result.data;
      }
      this.$emit("getCategoryId", this.cForm);
    },
    // 获取三级分类的方法
    async getCategory3List() {
      this.list3 = [];
      this.cForm.category3Id = "";
      // 获取category2id
      const { category2Id } = this.cForm;
      // 发送请求
      let result = await this.$API.attr.reqCategory3List(category2Id);
      if (result.code == 200) {
        this.list3 = result.data;
      }
      this.$emit("getCategoryId", this.cForm);
    },
    // 三级分类的事件回调
    handler3() {
      // 触发自定义事件,将三级分类的id传给父组件
      this.$emit("getCategoryId", this.cForm);
    },
  },
};
</script>

<style>
</style>