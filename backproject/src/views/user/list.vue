<template>
  <div>
    <el-table :data="userList" stripe style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
      <el-table-column prop="roleid" label="所属角色" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="small" @click="edit(item.row.uid)"
              >编 辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item.row.uid)"
              >删 除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="userSize"
      background
      layout="prev, pager, next"
      :total="userCount"
      @current-change="currentChange"
    >
      >
    </el-pagination>
  </div>
</template>

<script>
//引入辅助性函数
import { mapGetters, mapActions } from "vuex";
//引入封装好的接口
import { getUserDelete, getUserList } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userList: "user/getUserList",
      userCount: "user/getUserCount",
      userSize: "user/getUserSize",
    }),
  },
  mounted() {
    //组件一加载
    //触发user列表函数
    this.getUserListAction();
    //触发user总条数函数
    this.getUserCount();
  },
  methods: {
    ...mapActions({
      getUserListAction: "user/getUserListAction",
      getUserCount: "user/getCountAction",
      changePage: "user/getCurrentChange",
    }),
    //删除一条数据
    //封装一个删除事件
    del(uid) {
      this.$confirm("确定要删除这一条数据吗？？？！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getUserDelete({ uid }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新调取总条数
              this.getUserCount();
              //重新调取列表
              this.getUserListAction();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //封装一个修改数据的事件
    edit(id) {
      this.$emit("edit", id);
    },
    //封装一个切换页码的事件
    currentChange(e) {
      this.changePage(e);
    },
  },
};
</script>

<style lang="" scoped>
.el-pagination {
  margin: 20px 20px 0px 0px;
  float: right;
}
</style>
