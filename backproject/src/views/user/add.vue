<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加管理员' : '修改管理员'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="roleid"
          label="所属角色:"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.roleid" placeholder="请选择">
            <!-- 下拉框循环我的菜单列表 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="username"
          label="用户名称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:" :label-width="formLabelWidth">
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
import { getUserAdd, getUserInfo, getUserEdit } from "../../util/axios";
export default {
  data() {
    return {
      //表单对象
      form: {
        roleid: "", //角色编号
        username: "", // 管理员名称
        password: "", //密码
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
      },
    };
  },
  props: ["addInfo"],
  computed: {
    //获取菜单列表
    ...mapGetters({
      roleList: "role/getRoleList",
    }),
  },
  mounted() {
    //减少对服务器的交互
    if (this.roleList.length == 0) {
      this.getRoleList();
    }
  },
  methods: {
    //调取行动
    ...mapActions({
      getRoleList: "role/getRoleListAction",
      getUserList:'user/getUserListAction',
      getCountAction: "user/getCountAction",
    }),
    //封装重置事件
    reset() {
      this.form = {
        rolename: "",
        status: 1,
      };
      this.$refs["formDialog"].resetFields();
    },
    //取消事件
    cancel() {
      //调用重置事件
      this.reset();
      //给父组件传值是弹框消失
      this.$emit("cancel", false);
    },
    //添加事件
    add() {
      //调取添加接口
      getUserAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口
          this.getUserList();
          //重新调取总条数
          this.getCountAction();
          //关闭弹框
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //查看一条数据
    look(uid) {
      //调取接口
      getUserInfo({ uid }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.uid = uid;
        }
      });
    },
    
    //修改数据
    update() {
      //调取修改数据的接口
      getUserEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getUserList();
          //重新调取总条数
          this.getCountAction();
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
