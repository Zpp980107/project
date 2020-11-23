<template>
  <div>
    <el-table :data="specsList" stripe style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column  label="规格属性" width="180">
        <template slot-scope="item">
          <div>
            <el-tag v-for="attr in item.row.attrs" :key="attr">
              {{attr}}
            </el-tag>
          </div>
        </template>
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
            <el-button type="primary" size="small" @click="edit(item.row.id)"
              >编 辑</el-button
            >
            <el-button type="danger" size="small" @click="del(item.row.id)"
              >删 除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="specsSize"
      background
      layout="prev, pager, next"
      :total="specsCount"
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
import { getSpecsDelete, getSpecsList } from "../../util/axios";
export default {
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters({
      specsList: "specs/getSpecsList",
      specsCount: "specs/getSpecsCount",
      specsSize: "specs/getSpecsSize",
    }),
  },
  mounted() {
    //组件一加载
    //触发specs列表函数
    this.getSpecsListAction();
    //触发specs总条数函数
    this.getSpecsCount();
  },
  methods: {
    ...mapActions({
      getSpecsListAction: "specs/getSpecsListAction",
      getSpecsCount: "specs/getCountAction",
      changePage: "specs/getCurrentChange",
    }),
    //删除一条数据
    //封装一个删除事件
    del(id) {
      this.$confirm("确定要删除这一条数据吗？？？！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getSpecsDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新调取总条数
              this.getSpecsCount();
              //重新调取列表
              this.getSpecsListAction();
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
      console.log(id,'ididi');
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
