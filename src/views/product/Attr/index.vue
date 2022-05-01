<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="!isShowTable"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 属性展示 -->
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttr"
          :disabled="!category.category3Id"
          >添加属性</el-button
        >
        <el-table :data="attrList" style="width: 100%; margin-top: 10px" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column label="属性值列表" width="width">
            <template v-slot="{ row }">
              <el-tag
                type="success"
                v-for="value in row.attrValueList"
                :key="value.id"
                style="margin-right: 5px"
              >
                {{ value.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template v-slot="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="deleteAttr(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加或修改属性 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column label="属性名称" width="width">
            <template v-slot="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值"
                size="mini"
                v-if="row.flag"
                :ref="$index"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template v-slot="{ row, $index }">
              <el-popconfirm
                :title="`你确定要删除${row.valueName}吗`"
                @onConfirm="deleteValue($index)"
              >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="addOrUpdateAttr"
          :disabled="attrInfo.attrValueList.length < 1"
          >保存</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      // 存储三级分类的id
      category: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      // 平台属性列表
      attrList: [],
      // 是否展示表格
      isShowTable: true,
      // 即将添加的属性列表
      attrInfo: {
        attrName: "", //属性名称
        attrValueList: [
          //属性值列表
        ],
        categoryId: 0, // 三级分类id
        categoryLevel: 3, // 三级分类
      },
    };
  },
  methods: {
    // 自定义方法,获取子组件三级分类中的分类id
    getCategoryId({ category1Id, category2Id, category3Id }) {
      this.category.category1Id = category1Id;
      this.category.category2Id = category2Id;
      this.category.category3Id = category3Id;
      // 发请求获取数据
      if (this.category.category3Id) {
        this.getAttrList();
      }
    },
    // 发送请求,获取属性数据
    async getAttrList() {
      // 获取平台属性数据
      let result = await this.$API.attr.reqAttrList(this.category);
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 新增属性值
    addAttrValue() {
      // 判断上一个是否为空
      if (this.attrInfo.attrValueList[this.attrInfo.attrValueList.length - 1]) {
        if (
          this.attrInfo.attrValueList[
            this.attrInfo.attrValueList.length - 1
          ].valueName.trim() == ""
        ) {
          return;
        }
      }
      // 向属性值列表中加入新的数据
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        // 用于切换模式显示的标识
        flag: true,
      });
      // 添加属性值的时候聚焦
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 添加属性
    addAttr() {
      // 显示添加卡片
      this.isShowTable = false;
      // 在点击按钮进入添加卡片时初始化数据
      this.attrInfo = {
        attrName: "", //属性名称
        attrValueList: [
          //属性值列表
        ],
        categoryId: this.category.category3Id, // 三级分类id
        categoryLevel: 3, // 三级分类
      };
    },
    // 更新属性
    updateAttr(row) {
      // 先展示更新卡片
      this.isShowTable = false;
      // 深拷贝row到attrInfo上
      this.attrInfo = cloneDeep(row);
      // 拷贝成功后向每一个attrValue上加入flag=false属性
      this.attrInfo.attrValueList.forEach((item) => {
        // 通过vm.$set向对象中插入响应式的属性
        this.$set(item, "flag", false);
      });
    },
    // 由编辑模式切换到查看模式
    toLook(row) {
      // 首先判断用户输入的是否为纯空的字符串
      if (row.valueName.trim() == "") {
        this.$message("请输入正常的属性值");
        return;
      }
      // 判断是否有重复的属性名
      let result = this.attrInfo.attrValueList.some((item) => {
        // 自己本身不参与判断
        if (row != item) {
          if (item.valueName == row.valueName) {
            return true;
          }
        }
      });
      if (result) {
        // 如果存在与之前的属性相同的值
        this.$message("不要输入相同的属性名");
        return;
      }
      row.flag = false;
    },
    // 切换到编辑模式
    toEdit(row, index) {
      // 切换到编辑模式
      row.flag = true;
      // 聚焦
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 删除属性值
    deleteValue(index) {
      // 将数组中的index项删除掉
      this.attrInfo.attrValueList.splice(index, 1);
    },
    // 添加或者更新属性的保存
    async addOrUpdateAttr() {
      // 先整理数组
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          // 只留下不是空的属性名
          if (item.valueName.trim() != "") {
            // 删除flag属性
            delete item.flag;
            // 返回真
            return true;
          }
        }
      );
      // 发送请求
      try {
        // 发送修改或者新增的请求
        let result = await this.$API.attr.reqSaveAttr(this.attrInfo);
        // 提示信息
        if (result.code == 200) {
          this.$message({
            type: "success",
            message: "保存成功",
          });
          // 将页面切换至浏览页面
          this.isShowTable = true;
          // 重新获取数据
          this.getAttrList();
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    // 删除属性
    async deleteAttr(row) {
      try {
        // 发送请求删除属性数据
        let result = await this.$API.attr.reqDeleteAttr(row.id);
        // 判断是否删除成功
        if (result.code == 200) {
          // 如果删除成功了，提示信息
          this.$message({
            type: "success",
            message: "删除成功",
          });
          // 重新获取数据
          this.getAttrList();
        }
      } catch (error) {}
    },
  },
};
</script>

<style>
</style>