<template>
  <div>
    <div class="outside">
      <div class="header">
        <div class="image">
          <img :src="header" alt="" />
        </div>
        <form action="">
          <input type="text" placeholder="寻找商品" />
        </form>
        <div class="right">
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
        </div>
      </div>
      <div class="nav">
        <div class="text" v-for="item in navList" :key="item.id">
          {{ item.title }}
        </div>

        <div class="image">
          <img :src="navUrl" alt="" />
        </div>
      </div>
      <div class="main">
        <div class="image">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red">
            <van-swipe-item v-for="item in bannerList" :key="item.id">
              <img :src="$imgUrl + item.img" alt="" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="header">
          <div class="box">
            <img src="@/assets/images/index_images/icon_1.jpg" alt="" />
            <div class="text">显示抢购</div>
          </div>
          <div class="box">
            <img src="@/assets/images/index_images/icon_2.jpg" alt="" />
            <div class="text">积分商城</div>
          </div>
          <div class="box">
            <img src="@/assets/images/index_images/icon_3.jpg" alt="" />
            <div class="text">联系我们</div>
          </div>
          <div class="box">
            <img src="@/assets/images/index_images/icon_4.jpg" alt="" />
            <div class="text">商品分类</div>
          </div>
        </div>
        <div class="miaosha">
          <div class="left">
            <div class="image">
              <img src="@/assets/images/index_images/timer.jpg" alt="" /><span
                >限时秒杀</span
              >
            </div>
            <div class="text">每天零点场 好货秒不停</div>
            <div class="time">
              <div class="box">02</div>
              :
              <div class="box">16</div>
              :
              <div class="box">45</div>
              <div class="box1">秒杀</div>
            </div>
            <img src="@/assets/images/index_images/shop_5.jpg" alt="" />
            <div class="pric">&yen;14.8</div>
          </div>
          <div class="right">
            <div class="top">
              <div class="top_left">
                <div class="text1">
                  品牌上新
                  <div class="box">折</div>
                </div>
                <div class="text2">每日9点 抢大牌</div>
                <img src="@/assets/images/index_images/brand.jpg" alt="" />
              </div>
              <div class="top_right">
                <img src="@/assets/images/index_images/shop_1.jpg" alt="" />
              </div>
            </div>
            <div class="footer">
              <div class="footer_left">
                <div class="text1">每日十件</div>
                <div class="text2">只为你选好货</div>
                <img src="@/assets/images/index_images/shop_2.jpg" alt="" />
              </div>
              <div class="footer_right">
                <div class="text1">拼啊</div>
                <div class="text2">超级好价拼团</div>
                <img src="@/assets/images/index_images/shop_3.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="banner">
          <img src="@/assets/images/index_images/bar.jpg" alt="" />
        </div>
        <div class="list">
          <van-tabs type="card">
            <van-tab title="发现新品">
              <!-- 商品卡片 -->
              <van-card
                @click="goDetail(item.id)"
                v-for="item in newsList"
                :key="item.id"
                :price="item.price.toFixed(2)"
                desc="描述信息"
                :title="item.goodsname"
                :thumb="
                  item.img
                    ? $imgUrl + item.img
                    : 'https://img.yzcdn.cn/vant/ipad.jpeg'
                "
              />
            </van-tab>
            <van-tab title="热门推荐">
              <!-- 商品卡片 -->
              <van-card
                @click="goDetail(item.id)"
                v-for="item in hotsList"
                :key="item.id"
                :price="item.price.toFixed(2)"
                desc="描述信息"
                :title="item.goodsname"
                :thumb="
                  item.img
                    ? $imgUrl + item.img
                    : 'https://img.yzcdn.cn/vant/ipad.jpeg'
                "
              />
            </van-tab>
            <van-tab title="所有商品">
              <!-- 商品卡片 -->
              <van-card
                @click="goDetail(item.id)"
                v-for="item in goodsList"
                :key="item.id"
                :price="item.price.toFixed(2)"
                :title="item.goodsname"
                :thumb="
                  item.img
                    ? $imgUrl + item.img
                    : 'https://img.yzcdn.cn/vant/ipad.jpeg'
                "
              />
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入封装好的接口
import { getBanner, getIndexGoods } from "../util/axios";
//单独调用axios
import axios from "axios";
//调用请提示
import { Toast } from "vant";
export default {
  data() {
    return {
      navList: [
        {
          id: 1,
          title: "推荐",
        },
        {
          id: 2,
          title: "女装",
        },
        {
          id: 3,
          title: "鞋包",
        },
        {
          id: 4,
          title: "居家",
        },
        {
          id: 5,
          title: "母婴儿童",
        },
        {
          id: 6,
          title: "美食",
        },
        {
          id: 7,
          title: "果蔬",
        },
      ],
      bannerList: [],
      goodsList: [],
      newsList: [],
      hotsList: [],
      navUrl: require("../assets/images/index_images/arrow.jpg"),
      header: require("../assets/images/index_images/logo.jpg"),
    };
  },
  methods: {
    //封装一个跳转详情事件
    goDetail(id) {
      this.$router.push({
        path: "/goodsDetail",
        query: {
          id,
        },
      });
    },
  },
  mounted() {
    axios.all([getBanner(), getIndexGoods()]).then(
      axios.spread((bannerList, indexGoods) => {
        if (bannerList.code == 200) {
          this.bannerList = bannerList.list;
        } else {
          Toast.fail(bannerList.msg);
        }
        if (indexGoods.code == 200) {
          this.newsList = indexGoods.list[0].content;
          this.hotsList = indexGoods.list[1].content;
          this.goodsList = indexGoods.list[2].content;
        } else {
          Toast.fail(indexGoods.msg);
        }
      })
    );
  },
};
</script>

<style lang="" scoped>
@import "../assets/css/index.css";
</style>
