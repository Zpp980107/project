<template>
  <div id="app">
    <van-nav-bar
      @click-left="$router.back()"
      :title="$route.meta.name"
      left-text="返回"
      left-arrow
    >
    </van-nav-bar>
    <div v-if="cartList.length > 0 && userInfo">
      <div class="card" v-for="item in cartList" :key="item.id">
        <van-checkbox
          v-model="item.status"
          checked-color="red"
          @click="changeOne"
        ></van-checkbox>
        <van-swipe-cell>
          <van-card
            :price="item.price.toFixed(2)"
            desc="描述信息"
            :title="item.goodsname"
            class="goods-card"
            :thumb="$imgUrl + item.img"
          >
            <template #footer>
              <div>
                <van-stepper v-model="item.num" />
              </div>
            </template>
          </van-card>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="del(item.id)"
            />
          </template>
        </van-swipe-cell>
      </div>
      <van-submit-bar
        :price="allPrice"
        button-text="提交订单"
        @submit="onSubmit"
      >
        <van-checkbox v-model="checked" @click="changeAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
    <div v-else-if="cartList.length == 0 && userInfo">
      <van-empty description="暂无商品" />
    </div>
    <div v-else>
      <van-button @click="$router.push('/login')" type="warning"
        >请先登录，再查看</van-button
      >
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
//引入封装好的接口
import { getCartList, getCartDelete } from "../util/axios";
export default {
  data() {
    return {
      checked: false,
      userInfo: "",
      cartList: [],
    };
  },
  mounted() {
    this.userInfo = sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : "";
    this.cartListInfo();
  },
  methods: {
    onSubmit() {},
    //封装获取列表接口
    cartListInfo() {
      getCartList({
        uid: this.userInfo.uid,
      }).then((res) => {
        console.log(res, "购物车列表");
        if (res.code == 200) {
          this.cartList = res.list;
          this.cartList.map((item) => {
            item.status = false;
          });
          console.log(this.cartList);
        }
      });
    },
    //封装删除的接口
    del(id) {
      console.log(id, "1111");
      getCartDelete({ id }).then((res) => {
        if (res.code == 200) {
          Toast.success(res.msg);
        } else {
          Toast.fail(res.msg);
        }
      });
      this.cartListInfo();
    },
    //单选控制全选
    changeOne() {
      this.checked = this.cartList.every((item) => item.status);
    },
    changeAll() {
      this.cartList.map((item) => (item.status = this.checked));
    },
  },
  computed: {
    allPrice() {
      let allPrice=0;
      this.cartList.map((item) => {
        if (item.status == true) {
          allPrice += item.num * item.price;
        }
      });
      return allPrice*100
    },
  },
};
</script>

<style lang="" scoped>
@import url("../assets/css/shopping.css");
.van-nav-bar {
  background-color: orange;
}
.goodsImg {
  width: 100%;
  height: 4rem;
}
.goods p {
  font-size: 18px;
}
.van-stepper {
  display: inline;
}
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
.van-stepper {
  margin-top: -20px;
}
.card {
  display: flex;
}
.van-swipe-cell {
  flex: 1;
}
.van-checkbox {
  padding-left: 15px;
  margin-top: -10px;
  width: 20px;
}
.van-submit-bar {
  position: fixed;
  bottom: 1.2rem;
}
</style>
