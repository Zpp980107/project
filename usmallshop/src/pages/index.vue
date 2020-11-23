<template>
  <div>
    <!-- //定义二级路由出口 -->
    <router-view></router-view>

    <!-- 底部导航，部分 -->
    <van-tabbar route v-model="active" active-color="orange" inactive-color="#666">
      <van-tabbar-item to='/home' icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to='/sort' icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to='/cart' icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to='/mine' icon="friends-o">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active:0
    };
  },
};
</script>

<style lang="" scoped>
</style>
