<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="addDialog"
      >添加</el-button
    >
    <!-- 表格展示 -->
    <el-table
      style="width: 100%"
      :border="true"
      :style="{ 'margin-top': '15px' }"
      :data="list"
    >
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column label="品牌LOGO" width="width">
        <template v-slot="{ row }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="width">
        <template v-slot:default="{ row }">
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="updateDialog(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="text-align: center; margin-top: 15px"
      :total="total"
      :page-size="limit"
      :page-sizes="[3, 5, 10]"
      :pager-count="7"
      :current-page="page"
      @current-change="getTradeList"
      @size-change="pageChange"
      layout="prev, pager, next, jumper,->,sizes, total"
    >
    </el-pagination>
    <!-- 添加和修改的对话框 -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="tmForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api//admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    // 自定义验证
    const validateName = (rule, value, callback) => {
      // 判断tmName长度
      if (value.length >= 2 && value.length <= 10) {
        // 通过
        callback();
      } else {
        callback(new Error("长度在 2 到 10 个字符"));
      }
    };
    return {
      // 当前页码
      page: 1,
      // 每页个数
      limit: 3,
      // 总条数
      total: 0,
      // 品牌列表
      list: [],
      // 展示对话框标识
      dialogFormVisible: false,
      // 新增或则更新品牌的参数
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      // 表单验证
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            validator: validateName,
            trigger: "change",
          },
        ],
        logoUrl: [
          { required: true, message: "请选择品牌logo", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 获取品牌列表的数据
    async getTradeList(pager = 1) {
      // pager默认值为1，如果传入pager的值，即为当前页改变，就修改data数据
      this.page = pager;
      // 获取当前页码和每页数量
      let { page, limit } = this;
      // 发送请求获取品牌列表
      let result = await this.$API.tradeMark.reqTradeMarkList(page, limit);
      // 判断是否获取数据成功
      if (result.code === 200) {
        // 赋值给本地内存
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    // 每页数据个数变化
    pageChange(limits) {
      // 整理data数据
      this.limit = limits;
      this.getTradeList();
    },
    // 新增品牌
    addDialog() {
      // 在每次打开对话框之前将tmForm中的数据置空
      this.tmForm = { tmName: "", logoUrl: "" };
      this.dialogFormVisible = true;
    },
    // 修改品牌
    updateDialog(row) {
      // 展示对话框
      this.dialogFormVisible = true;
      // 将row中的数据浅拷贝到tmForm中去
      this.tmForm = { ...row };
    },
    // 上传图片成功的函数
    handleAvatarSuccess(res, file) {
      // res为上传成功的返回值
      this.tmForm.logoUrl = res.data;
    },
    // 在上传图片之前的函数
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 确定上传或者更新
    addOrUpdateTradeMark() {
      // 判断表单验证是否成功
      this.$refs.tmForm.validate(async (success) => {
        if (success) {
          // 点击时将对话框关闭
          this.dialogFormVisible = false;
          // 发送请求
          let result = await this.$API.tradeMark.reqAddOrUpdateTradeMark(
            this.tmForm
          );
          // 判断结果
          if (result.code == 200) {
            // 提示信息
            this.$message({
              type: "success",
              message: this.tmForm.id ? "更新品牌成功" : "添加品牌成功",
            });
            // 发送请求获取数据加载页面 如果是更新就保持在当前页,如果是新增就回到第一页
            this.getTradeList(this.tmForm.id ? this.page : 1);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除品牌信息
    deleteTradeMark(row) {
      // 弹出对话框
      this.$confirm(`是否删除品牌${row.tmName}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 发送请求删除品牌
          let result = await this.$API.tradeMark.reqDeleteTradeMark(row.id);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // 判断删除页的数据个数,如果大于1就留在原初,如果小于1就回到上一页
            this.getTradeList(this.list.length > 1 ? this.page : this.page - 1);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.getTradeList();
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>