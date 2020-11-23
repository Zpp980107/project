<template>
  <div>
    <el-container>
      <el-header
        >某某大型后台管理项目
        <div v-if="getUserInfo" class="back">
          欢迎使用{{ getUserInfo.username }}使用本系统
          <el-button @click="backLogin" type="danger" size="mini"
            >退出登录</el-button
          >
        </div>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <!-- //二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vNav from "../components/nav";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    vNav,
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    ...mapActions(["changeUserInfoAction"]),
    backLogin() {
      this.changeUserInfoAction(null);
      //退出之后强制跳转登录页
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-header {
  background: $secondBgColor;
  text-align: center;
  line-height: 60px;
  font-size: 30px;
  letter-spacing: 10px;
}

.back {
  font-size: 14px;
  letter-spacing: 0px;
  position absolute
  right 20px
  top 5px
}
</style>
