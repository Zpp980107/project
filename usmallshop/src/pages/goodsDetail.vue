<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      @click-left="$router.back()"
      :title="$route.meta.name"
      left-text="返回"
      left-arrow
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <!-- 商品详情渲染 -->
    <div class="goods" v-if="goodsInfo">
      <img
        class="goodsImg"
        :src="
          goodsInfo.img
            ? $imgUrl + goodsInfo.img
            : 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2813350528,1657210790&fm=11&gp=0.jpg'
        "
        alt=""
      />
      <p class="goodsName">商品名称：{{ goodsInfo.goodsname }}</p>
      <p class="goodsName">
        价格：<span class="price">￥{{ goodsInfo.price.toFixed(2) }}</span>
      </p>
      <p class="goodsName num">
        <!-- 计步器 -->
        购买数量：<van-stepper v-model="value" />
      </p>
      <p>商品属性</p>
      <p>
        <span>{{ goodsInfo.specsname }}：</span>
        <van-tag v-for="item in specsAttr" :key="item" type="success">{{
          item
        }}</van-tag>
      </p>
      <div>
        <p>商品详情</p>
        <p v-html="goodsInfo.description"></p>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button
        @click="goCart"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="onClickButton"
      />
    </van-goods-action>
  </div>
</template>

<script>
//引入封装好的接口
import { getGoodsInfo, getCartAdd } from "../util/axios";
//引入vant框架
import { Toast } from "vant";
export default {
  data() {
    return {
      goodsInfo: "",
      value: 1,
      specsAttr: [],
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      getGoodsInfo({
        id: this.$route.query.id,
      }).then((res) => {
        if (res.code == 200) {
          this.goodsInfo = res.list[0];
          this.specsAttr = this.goodsInfo.specsattr
            ? this.goodsInfo.specsattr.split(",")
            : [];
          console.log(this.goodsInfo, "hahah");
        }
      });
    },
    goCart() {
      if (sessionStorage.getItem("userInfo")) {
        getCartAdd({
          uid: JSON.parse(sessionStorage.getItem("userInfo")).uid,
          goodsid: this.goodsInfo.id,
          num: this.value,
        }).then((res) => {
          Toast.success(res.msg);
          this.$router.push({
            path: "/cart",
            query: {
              id: JSON.parse(sessionStorage.getItem("userInfo")).uid,
            },
          });
        })
      }else{
          Toast.fail('请先登录，在加入购物车')
          this.$router.push('/login')
      }
    },
  },
};
</script>

<style lang="" scoped>
.goodsImg {
  width: 100%;
  height: 6rem;
}
.goods p {
  font-size: 18px;
  margin: 20px;
}
.goods {
  margin-bottom: 1.1rem;
}
.van-stepper {
  display: inline;
}
.price {
  color: #e30808;
}
.goods .num {
  font-size: 12px;
  width: 200px;
}
.van-stepper {
  vertical-align: middle;
}
</style>
