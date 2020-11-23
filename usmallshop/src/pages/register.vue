<template>
  <div>
    <van-nav-bar
      @click-left="$router.back()"
      :title="$route.meta.name"
      left-text="返回"
      left-arrow
      right-text="登录"
      @click-right="$router.push('/login')"
    >
    </van-nav-bar>
    <van-form @submit="register">
      <van-field
        v-model="regInfo.phone"
        name="手机号"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="regInfo.nickname"
        name="昵称"
        label="昵称"
        placeholder="请输入昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
        v-model="regInfo.password"
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
import { Toast } from "vant";
//引入封装好的接口
import { getRegister } from "../util/axios";
export default {
  data() {
    return {
      regInfo: {
        phone: "",
        nickname: "",
        password: "",
      },
    };
  },
  methods: {
    register() {
      getRegister(this.regInfo).then((res) => {
        if (res.code == 200) {
          Toast.success(res.msg);
          this.$router.push("/login");
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
.van-button {
  background-color: orange;
  border: 1px solid orange;
}
.van-field {
  margin: 40px 0px;
}
</style>
