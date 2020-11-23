<template>
  <div>
    <el-table :data="memberList" stripe style="width: 100%">
      <el-table-column prop="id" label="会员编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180">
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
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//引入辅助性函数
import { mapGetters, mapActions } from "vuex";
//引入封装好的接口
import {  getMemberList } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      memberList:'member/getMemberList',
    }),
  },
  mounted() {
    this.getMemberListAction();
  },
  methods: {
    ...mapActions({
      getMemberListAction: "member/getMemberListAction",
    }),
    //封装一个修改数据的事件
    edit(uid) {
      this.$emit("edit", uid);
    },
  },
};
</script>

<style lang="" scoped>
</style>
