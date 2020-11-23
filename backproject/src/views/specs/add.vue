<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加规格' : '修改规格'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="specsname"
          label="规格名称:"
          :label-width="formLabelWidth"
        >
          <!-- 下拉框循环我的菜单列表 -->
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性:"
          :label-width="formLabelWidth"
          v-for="(item, index) in arrAttr"
          :key="index"
        >
          <el-input
            v-model="item.value"
            autocomplete="off"
            class="aa"
          ></el-input>
          <el-button v-if="index == 0" @click="addAttr" type="primary"
            >新增规格属性</el-button
          >
          <el-button v-else @click="delAttr(index)" type="danger"
            >删除</el-button
          >
        </el-form-item>
        <el-form-item label="状态:" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addInfo.isAdd" @click="add" type="primary"
          >添 加</el-button
        >
        <el-button v-else @click="update" type="primary">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入辅助性函数
import { mapGetters, mapActions } from "vuex";
//引入封装好的接口
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../util/axios";
export default {
  data() {
    return {
      arrAttr: [
        {
          value: "",
        },
      ],
      //表单对象
      form: {
        specsname: "", // 规格名称
        attrs: "", //规格属性
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  props: ["addInfo"],

  methods: {
    //动态删除表单事件
    delAttr(i) {
      this.arrAttr.splice(i, 1);
    },
    //动态添加表单事件
    addAttr() {
      //最多让用户添加6个
      if (this.arrAttr.length <= 6) {
        //往数组中添加数据
        this.arrAttr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多只能添加6项！！！");
      }
    },
    //调取行动
    ...mapActions({
      getSpecsList: "specs/getSpecsListAction",
      getCountAction: "specs/getCountAction",
    }),
    //封装重置事件
    reset() {
      this.form = {
        rolename: "",
        status: 1,
      };
      this.arrAttr = [
        {
          value: "",
        },
      ];
      this.$refs["formDialog"].resetFields();
    },
    //取消事件
    cancel() {
      //调用重置事件
      this.reset();
      //给父组件传值是弹框消失
      this.$emit("cancel", false);
    },
    //添加事件
    add() {
      this.form.attrs = this.arrAttr.map((item) => item.value).join(",");
      //调取添加接口
      getSpecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口
          this.getSpecsList();
          //重新调取总条数
          this.getCountAction();
          //关闭弹框
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //查看一条数据
    look(id) {
      getSpecsInfo({id}).then(res=>{
      //对数据进行二次修改
      let data=res.data.list[0];
      this.form=data
      data.attrs.map((item,index)=>{
        if(index==0){
          this.arrAttr[0].value=item
        }else{
          this.arrAttr.push({
            value:item
          })
        }
      })
      })
    },

    //修改数据
    update() {
      //调取修改数据的接口
       this.form.attrs = this.arrAttr.map((item) => item.value).join(",");
      //调取添加接口
      getSpecsEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //重新调取接口
          this.getSpecsList();
          //重新调取总条数
          this.getCountAction();
          //关闭弹框
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
.aa {
  width: 60%;
}
</style>
