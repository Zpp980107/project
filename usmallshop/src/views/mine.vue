<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      @click-left="$router.back()"
      :title="$route.meta.name"
      left-text="返回"
      left-arrow
    >
    </van-nav-bar>
    <div class="outside" v-if="userInfo">
      <div class="mine">
        <div class="mine_left">
          <div class="image">
            <img src="@/assets/images/mine_images/head.jpg" alt="" />
          </div>
          <div class="text">
            <div class="textt">悠溯</div>
            <div class="textb">v1</div>
          </div>
        </div>
        <div class="mine_right" @click="quit">退出登录</div>
      </div>
      <div class="nav">
        <div class="nav_left">
          <img src="@/assets/images/mine_images/icon_1.jpg" alt="" />全部订单
        </div>
        <div class="nav_conter">
          <img src="@/assets/images/mine_images/icon_2.jpg" alt="" />待付款
        </div>
        <div class="nav_right">
          <img src="@/assets/images/mine_images/icon_3.jpg" alt="" />待收货
        </div>
      </div>
      <div class="jiange"></div>
      <div class="list">
        <div class="list_left">
          <img
            src="@/assets/images/mine_images/icon_4.jpg"
            alt=""
            class="img1"
          /><span>地址管理</span>
        </div>
        <div class="list_right">
          <img src="@/assets/images/public/right.jpg" alt="" />
        </div>
      </div>
      <div class="list">
        <div class="list_left">
          <img
            src="@/assets/images/mine_images/icon_5.jpg"
            alt=""
            class="img2"
          /><span>我的钱包</span>
        </div>
        <div class="list_right">
          <span>200余额</span
          ><img src="@/assets/images/public/right.jpg" alt="" />
        </div>
      </div>
      <div class="list">
        <div class="list_left">
          <img
            src="@/assets/images/mine_images/icon_6.jpg"
            alt=""
            class="img3"
          /><span>我的优惠券</span>
        </div>
        <div class="list_right">
          <img src="@/assets/images/public/right.jpg" alt="" />
        </div>
      </div>
      <div class="list">
        <div class="list_left">
          <img
            src="@/assets/images/mine_images/icon_7.jpg"
            alt=""
            class="img4"
          /><span>我的二维码</span>
        </div>
        <div class="list_right">
          <img src="@/assets/images/public/right.jpg" alt="" />
        </div>
      </div>
      <div class="list">
        <div class="list_left">
          <img
            src="@/assets/images/mine_images/icon_8.jpg"
            alt=""
            class="img5"
          /><span>我的小伙伴</span>
        </div>
        <div class="list_right">
          <img src="@/assets/images/public/right.jpg" alt="" />
        </div>
      </div>
    </div>
    <van-button @click="$router.push('/login')" type="info"
    round
        >请先登录</van-button
      >
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: "",
    };
  },
  methods: {
    quit(){
      sessionStorage.setItem('userInfo','')
      this.$router.push('/login')
    }
  },
  mounted() {
    this.userInfo = sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : "";
    console.log(this.userInfo, "哈哈哈哈");
  },
};
</script>

<style lang="" scoped>
@import url("../assets/css/mine.css");
.van-nav-bar {
  background: #f26b11;
  border: none;
}
.van-button--info{
  height: 1rem;
  font-size: 14px;
  background-color: #f26b11;
  border: 1px solid #f26b11;
  width: 3rem !important;
  letter-spacing: 10px;
  margin-left: 2rem !important;
  margin-top: 4rem;
}
</style>
