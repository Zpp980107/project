<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加轮播图' : '修改轮播图'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item prop="title" label="标题:" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态:" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          v-if="addInfo.isAdd"
          @click="add('formDialog')"
          type="primary"
          >添 加</el-button
        >
        <el-button v-else @click="update('formDialog')" type="primary"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入辅助性函数
import { mapGetters, mapActions } from "vuex";
//引入封装好的接口
import { getBannerAdd, getBannerInfo, getBannerEdit } from "../../util/axios";
export default {
  data() {
    return {
      //表单对象
      form: {
        title: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览图片的弹框
      imgUrl: "", //用来接收图片信息
      fileList: [], //文件上传列表
      rules: {
        bannername: [
          { required: true, message: "请输入轮包图名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  props: ["addInfo"],
  computed: {
    //获取菜单列表
    ...mapGetters({
      bannerList: "banner/getBannerList",
    }),
  },
  methods: {
    //调取行动
    ...mapActions({
      getBannerList: "banner/getBannerListAction",
    }),
    //图片移除
    onRemove(file, fileList) {},
    //图片浏览
    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片上传的时候触发的事件
    onChange(file) {
      console.log(file, "wenjian");
      this.imgUrl = file.raw;
    },
    //文件上传的个数的限制
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //封装重置事件
    reset() {
      this.form = {
        title: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1, //状态1正常2禁用
      };
      this.fileList = []; //文件上传列表
      this.$refs["formDialog"].resetFields();
    },
    //取消事件
    cancel() {
      //调用重置事件
      this.reset();
      //给父组件传值是弹框消失
      this.$emit("cancel", false);
    },
    //添加一条数据
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.form;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          file.append("img", this.imgUrl);
          getBannerAdd(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getBannerList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //查看一条数据
    look(id) {
      //调取接口
      getBannerInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          //将图片进行转化
          this.fileList = this.form.img
            ? [{ url: `${this.$imgUrl}${this.form.img}` }]
            : [];
        }
      });
    },
    //修改数据
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.form;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;
          file.append("img", this.imgUrl);
          getBannerEdit(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getBannerList();
              //关闭弹窗
              this.cancel();
            } else {
              this.$message.error(res.data.msg);
            }
          });
          //调取修改数据的接口
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
