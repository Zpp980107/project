<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      @click-left="$router.back()"
      :title="$route.meta.name"
      left-text="返回"
      left-arrow
      right-text="注册"
      @click-right="$router.push('/register')"
    >
    </van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="loginInfo.phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="loginInfo.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getLogin } from "../util/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      loginInfo: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      getLogin(this.loginInfo).then((res) => {
        if (res.code == 200) {
          Toast.success(res.msg);
          sessionStorage.setItem("userInfo", JSON.stringify(res.list));
          this.$router.push("/mine");
        } else {
          Toast.fail(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
.van-nav-bar {
  background-color: orange;
}
.van-field {
  margin: 40px 0px;
}
.van-button {
  background-color: orange;
  border: 1px solid orange;
}
</style>
