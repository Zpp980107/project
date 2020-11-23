<template>
  <div>
    <!-- 面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" size="small" @click="isAdd">添加</el-button>
    <!-- 表格列表渲染 -->
    <v-table @edit="edit"></v-table>
    <!-- 弹框表单 -->
    <v-dialog @cancel="cancel" :addInfo="addInfo" ref="dialog"></v-dialog>
  </div>
</template>

<script>
import elBread from "../../components/el-bread";
import vTable from "./list";
import vDialog from "./add";
export default {
  data() {
    return {
      addInfo: {
        //用于打开弹框（控制弹框）
        isShow: false,
        //用于区分是添加还是编辑
        isAdd: true,
      },
    };
  },
  components: {
    elBread,
    vTable,
    vDialog,
  },
  methods: {
    //打开弹框事件
    isAdd() {
      this.addInfo.isShow = true;
      this.addInfo.isAdd = true;
    },
    //cancel事件去改变弹框的属性
    cancel(e) {
      this.addInfo.isShow = e;
    },
    edit(e) {
      //打开弹窗
      this.addInfo.isShow = true;
      //告诉弹窗修改为编辑的页面
      this.addInfo.isAdd = false;
      //调用查看一条数据的函数
      this.$refs.dialog.look(e);
    },
  },
};
</script>

<style lang="" scoped></style>
