<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加角色' : '修改角色'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="phone"
          label="手机号:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="nickname"
          label="昵称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
        <el-button v-if="addInfo.isAdd" @click="add" type="primary"
          >添 加</el-button
        >
        <el-button v-else @click="update" type="primary">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入辅助性函数
import { mapGetters, mapActions } from "vuex";
//引入封装好的接口
import {getMemberInfo, getMemberEdit } from "../../util/axios";
export default {
  data() {
    return {
      form: {
        nickname: "", //昵称
        phone: "", //手机号
        status: 1, //状态
      },
      formLabelWidth: "120px",
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度为 11个字符", trigger: "blur" },
        ],
         nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
        ],
      },
    };
  },
  props: ["addInfo"],
  computed: {
    //获取菜单列表
    ...mapGetters({
      memberList: "member/getMemberList",
    }),
  },
  mounted() {
      this.getMemberList();
  },
  methods: {
    //调取行动
    ...mapActions({
      getMemberList: "member/getMemberListAction",
    }),
    //取消事件
    cancel() {
      //调用重置事件
      //给父组件传值是弹框消失
      this.$emit("cancel", false);
    },
    //添加一条数据
    add() {
      //调取接口
      getMemberAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //重新调取列表接口
          this.$message.success(res.data.msg);
          this.getMemberList();
          //关闭弹窗
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //查看一条数据
    look(uid) {
      //调取接口
      getMemberInfo({ uid }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // this.form.menus = this.$refs.tree.setCheckedKeys(
          //   this.form.menus.split(",")
          // );
        }
      });
    },
    //修改数据
    update() {
      //转化menu的数据类型
      // this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      // //调取修改数据的接口
      getMemberEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getMemberList();
          //关闭弹窗
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
