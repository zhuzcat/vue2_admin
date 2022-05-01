<template>
  <div>
    <el-form label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          :rows="4"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="imageList"
          :on-success="uploadSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectAttr.length}项未选择`"
          v-model="attrIdAndName"
        >
          <el-option
            :label="unselect.name"
            :value="`${unselect.id}:${unselect.name}`"
            v-for="(unselect, index) in unSelectAttr"
            :key="unselect.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-left: 10px"
          :disabled="!attrIdAndName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="spu.spuSaleAttrList"
        >
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column label="属性名称列表" width="width">
            <template v-slot="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                style="margin-right: 5px"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                ref="saveTagInput"
                size="mini"
                v-model="row.inputValue"
                @keyup.native.enter="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template v-slot="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // spu的详情信息
      spu: {
        spuName: "",
        category3Id: "",
        description: "",
        tmId: "",
        spuImageList: [],
        spuSaleAttrList: [],
      },
      // 品牌信息列表
      tradeMarkList: [],
      // spu图片列表
      imageList: [],
      // 销售属性列表
      saleAttrList: [],
      // 新增的销售属性id
      attrIdAndName: null,
    };
  },
  methods: {
    // 删除图片的回调
    handleRemove(file, fileList) {
      // 删除图片的两个参数 file为当前删除的图片 fileList为删除后的图片列表
      this.imageList = fileList;
    },
    // 预览图片的回调
    handlePictureCardPreview(file) {
      // 设置要展示的图片的url
      this.dialogImageUrl = file.url;
      // 展示预览图片组件
      this.dialogVisible = true;
    },
    // 上传图片成功的回调
    uploadSuccess(response, file, fileList) {
      // response为上传的结果，file为当前上传的文件，fileList为上传成功后的文件列表
      if (response.code == 200) {
        // 如果上传成功 将图片列表更新
        this.imageList = fileList;
      }
    },
    // 更新时初始化时获取请求
    async initSpu(row) {
      try {
        // 发送请求获取spu信息
        let spuResult = await this.$API.spu.reqSpu(row.id);
        if (spuResult.code == 200) {
          this.spu = spuResult.data;
        }
        // 发送请求获取品牌列表
        let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
        if (tradeMarkResult.code == 200) {
          this.tradeMarkList = tradeMarkResult.data;
        }
        // 发请求获取spu图片列表
        let imageResult = await this.$API.spu.reqImageList(row.id);
        if (imageResult.code == 200) {
          // 获取图片列表
          let arrList = imageResult.data;
          // 整理列表
          arrList.forEach((item) => {
            item.name = item.imgName;
            item.url = item.imgUrl;
          });
          // 将整理后的数组赋值给data中的数组
          this.imageList = arrList;
        }
        // 发送请求获取销售属性
        let attrResult = await this.$API.spu.reqSaleAttrList();
        if (attrResult.code == 200) {
          this.saleAttrList = attrResult.data;
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    // 添加销售属性
    addSaleAttr() {
      // 解构出baseSaleAttrId和saleAttrName
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(":");
      // 将数据存储进一个新的对象当中去
      const newAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      // 将新的销售属性插入到spu的spuSaleAttrList中去
      this.spu.spuSaleAttrList.push(newAttr);
    },
    // 添加销售属性值的按钮
    addSaleAttrValue(row) {
      // 为row中加入inputVisible用于浏览与编辑模式的切换
      this.$set(row, "inputVisible", true);
      // 为row中加入inputValue用于获取用户输入的数据
      this.$set(row, "inputValue", "");
    },
    // 输入框失去焦点和按下回车的事件
    handleInputConfirm(row) {
      // 解构出baseSaleAttrId和inputValue
      const { baseSaleAttrId, inputValue } = row;
      // 判断是否为空串
      if (inputValue.trim() == "") {
        this.$message("请输入格式正确的属性值");
        return;
      }
      // 判断是否有重复的属性值
      if (
        row.spuSaleAttrValueList.some(
          (item) => item.saleAttrValueName == inputValue
        )
      ) {
        this.$message("请不要输入重复的属性值");
        return;
      }
      // 整理数据到新的属性值对象中
      const newAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      // 将数据保存到row的spuSaleAttrValueList中去
      row.spuSaleAttrValueList.push(newAttrValue);
      // 切换为按键
      row.inputVisible = false;
    },
    // 保存按钮发送请求
    async addOrUpdateSpu() {
      // 整理图片列表的数据
      this.spu.spuImageList = this.imageList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.imgUrl,
        };
      });
      // 发送请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
      // 判断是否发送请求成功
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "保存成功",
        });
        this.$emit("changeScence", {
          flag: 1,
          msg: this.spu.id ? "修改" : "成功",
        });
        Object.assign(this._data, this.$options.data());
      }
    },
    // 添加时初始化获取请求
    async addInit(category3Id) {
      // 将获取的category3Id存储到data的spu中
      this.spu.category3Id = category3Id;
      // 发送请求获取数据
      try {
        // 发送请求获取品牌列表
        let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
        if (tradeMarkResult.code == 200) {
          this.tradeMarkList = tradeMarkResult.data;
        }
        // 发送请求获取销售属性
        let attrResult = await this.$API.spu.reqSaleAttrList();
        if (attrResult.code == 200) {
          this.saleAttrList = attrResult.data;
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    // 取消按钮的回调
    cancel() {
      // 触发自定义事件
      this.$emit("changeScence", { flag: 1, msg: "" });
      // 初始化数据
      Object.assign(this._data, this.$options.data());
    },
  },
  computed: {
    // 用于得到还剩几个销售属性未选择
    unSelectAttr() {
      let result = this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item1.saleAttrName != item.name;
        });
      });
      return result;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>