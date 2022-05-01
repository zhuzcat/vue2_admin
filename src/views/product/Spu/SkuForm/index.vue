<template>
  <div>
    <el-form ref="form" label-width="80px" :model="skuInfo">
      <el-form-item label="SPU名称"> {{ this.spu.spuName }} </el-form-item>
      <el-form-item label="SKU名称">
        <el-input
          placeholder="请输入SKU名称"
          v-model="skuInfo.skuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          placeholder="请输入价格"
          type="number"
          v-model="skuInfo.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input
          placeholder="请输入重量"
          type="number"
          v-model="skuInfo.weight"
        ></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          placeholder="规格描述"
          type="textarea"
          rows="4"
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>
      <!-- 平台属性的收集 -->
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item
            :label="attr.attrName"
            v-for="(attr, index) in attrInfoList"
            :key="attr.id"
            style="margin-bottom: 10px"
          >
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
                v-for="(attrValue, index) in attr.attrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- 销售属性的收集 -->
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item
            :label="attr.saleAttrName"
            v-for="(attr, index) in saleAttrList"
            :key="attr.id"
          >
            <el-select v-model="attr.attrIdAndValueId" placeholder="请选择">
              <el-option
                :label="saleValue.saleAttrValueName"
                :value="`${attr.id}:${saleValue.id}`"
                v-for="(saleValue, index) in attr.spuSaleAttrValueList"
                :key="saleValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- 图片列表 -->
      <el-form-item label="图片列表">
        <el-table
          ref="checkTable"
          style="width: 100%"
          border
          :data="imageList"
          @selection-change="selectChange"
        >
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column label="图片" width="width">
            <template v-slot="{ row, $index }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template v-slot="{ row, $index }">
              <el-button
                type="primary"
                size="mini"
                v-if="row.isDefault == 0"
                @click="setDefault(row)"
                >设为默认</el-button
              >
              <el-tag type="success" v-else>默认</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      // 图片列表
      imageList: [],
      // 销售属性列表
      saleAttrList: [],
      // 平台属性列表
      attrInfoList: [],
      // 需要提交的值
      skuInfo: {
        // 第一类数据，由父组件传递的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类通过v-model收集来的数据
        price: "",
        skuDesc: "",
        skuName: "",
        weight: "",
        // 第三类需要代码来收集的数据
        skuAttrValueList: [
          {
            // attrId: 0,
            // attrName: "string",
            // id: 0,
            // skuId: 0,
            // valueId: 0,
            // valueName: "string",
          },
        ],
        skuDefaultImg: "string",
        skuImageList: [
          {
            // id: 0,
            // imgName: "string",
            // imgUrl: "string",
            // isDefault: "string",
            // skuId: 0,
            // spuImgId: 0,
          },
        ],
        skuSaleAttrValueList: [
          {
            // id: 0,
            // saleAttrId: 0,
            // saleAttrName: "string",
            // saleAttrValueId: 0,
            // saleAttrValueName: "string",
            // skuId: 0,
            // spuId: 0,
          },
        ],
      },
      // 传入的spu
      spu: {},
    };
  },
  methods: {
    // 初始化获取请求数据
    async initGetData(category1Id, category2Id, spu) {
      // 初始化第一类数据
      this.spu = spu;
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.tmId = spu.tmId;
      this.skuInfo.spuId = spu.id;
      // 获取图片列表
      let result = await this.$API.sku.reqSpuImageList(spu.id);
      // 将数据保存
      if (result.code == 200) {
        let list = result.data;
        list.forEach((item) => {
          item.isDefault = 0;
        });
        this.imageList = list;
      }
      // 获取销售属性列表
      let result1 = await this.$API.sku.reqSaleAttrList(spu.id);
      if (result1.code == 200) {
        this.saleAttrList = result1.data;
      }
      // 获取平台属性列表
      let result2 = await this.$API.sku.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (result2.code == 200) {
        this.attrInfoList = result2.data;
      }
    },
    // 表格中选中图片的回调
    selectChange(selection) {
      // 将选中的图片列表存储到skuInfo中去
      this.skuInfo.skuImageList = selection;
    },
    // 通过排他设置默认图
    setDefault(row) {
      // 排他
      this.imageList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      // 将默认图片存储到skuInfo中
      this.skuInfo.skuDefaultImg = row.imgUrl;
      // 将默认图片设置为选中状态
      this.$refs.checkTable.toggleRowSelection(row, true);
    },
    // 取消保存
    cancel() {
      // 触发自定义事件,跳转到浏览页面
      this.$emit("changeScences", 1);
      // 清除数据
      Object.assign(this._data, this.$options.data());
    },
    // 保存按钮
    async save() {
      // 整理数据发送请求
      const { saleAttrList, attrInfoList, skuInfo } = this;
      // 整理saleAttrList然后存储到skuInfo的skuSaleAttrValueList中
      skuInfo.skuSaleAttrValueList = saleAttrList.reduce((prev, item) => {
        // 判断该属性是否被选中
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.attrIdAndValueId.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
      }, []);
      // 整理attrInfoList然后存储到skuInfo的skuAttrValueList中
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        // 判断该属性是否被选中
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(":");
          prev.push({ attrId, valueId });
        }
        return prev;
      }, []);
      // 发送请求保存数据
      let result = await this.$API.sku.reqSavaSpu(skuInfo);
      // 判断请求
      if (result.code == 200) {
        this.$message({ type: "success", message: "保存成功" });
        this.$emit("changeScences", 1);
        // 清除数据
        Object.assign(this._data, this.$options.data());
      }
    },
  },
};
</script>

<style>
</style>