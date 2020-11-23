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
          prop="rolename"
          label="角色名称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限:" :label-width="formLabelWidth">
          <!-- el-tree 属性
            data	展示数据	array
            default-expand-all	是否默认展开所有节点
            node-key	每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
            props	配置选项，具体看下表	object
            show-checkbox	节点是否可被选择
            default-checked-keys	默认勾选的节点的 key 的数组	
             -->
          <el-tree
            :data="menuList"
            default-expand-all
            node-key="id"
            ref="tree"
            :props="{
              children: 'children',
              label: 'title',
            }"
            show-checkbox
            check-strictly
          >
          </el-tree>
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
import { getRoleAdd, getRoleInfo, getRoleEdit } from "../../util/axios";
export default {
  data() {
    return {
      form: {
        rolename: "", //角色名称
        menus: "", //角色权限
        status: 1, //状态
      },
      formLabelWidth: "120px",
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  props: ["addInfo"],
  computed: {
    //获取菜单列表
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  mounted() {
    //减少对服务器的交互
    if (this.menuList.length == 0) {
      this.getMenuList();
    }
  },
  methods: {
    //调取行动
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
      getRoleList: "role/getRoleListAction",
    }),
    //封装重置事件
    reset() {
      this.form = {
        rolename: "",
        status: 1,
      };
      //清空tree结构
      this.$refs.tree.setCheckedKeys([]);
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
    add() {
      //转化menu的数据类型
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      //调取接口
      getRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //重新调取列表接口
          this.$message.success(res.data.msg);
          this.getRoleList();
          //关闭弹窗
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //查看一条数据
    look(id) {
      //调取接口
      getRoleInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.menus = this.$refs.tree.setCheckedKeys(
            this.form.menus.split(',')
          );
          this.form.id = id;
        }
      });
    },
    //修改数据
    update() {
      //转化menu的数据类型
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      //调取修改数据的接口
      getRoleEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getRoleList();
          //关闭弹窗
          this.cancel();
        }else{
            this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
