<style scoped lang="less">
  @import "../resources/css/reset.css";
  @import "../resources/css/website/login.less";

  .page-infinite-loading {
    text-align: center;
    background-color: #FFF;
    & > span {
      display: inline-block;
    }
  }

  .mt5rem {
    margin-top: .5rem;
  }

</style>
<template>
  <div class="all_elements" id="ys_user">
    <div class="all_wrap">
      <div class="login_wrap">
        <div class="login_box" >
          <div class="inp_item">
            <div class="inp_bg"></div>
            <i class="ys_icon user"></i>
            <input type="text" id="userName"
                   class="mt5rem" value=""
                   v-model="username" placeholder="请输入用户名">
          </div>
          <div class="inp_item">
            <div class="inp_bg"></div>
            <i class="ys_icon pass"></i>
            <input type="text" value="" class="mt5rem" v-model="password" placeholder="请输入密码">
          </div>
          <div class="inp_item login">
            <a href="javascript:;" style="line-height: 1.4rem;margin-top: .14rem" class="ys_btn" @click="login">登 录</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui'; //toast
  import {Indicator} from 'mint-ui';
  import {MessageBox} from 'mint-ui'; //弹窗

  export default {
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login(){
        var _this = this;
        if (this.username == 'admin' && this.password == 'admin') {
          Indicator.open({
            text: '',
            spinnerType: 'fading-circle'
          });
          setTimeout(function () {
            Indicator.close();
            Toast({
              message: '恭喜您！登陆成功',
              position: 'bottom',
              duration: 3000
            });
            setTimeout(function () {
              _this.$router.push({path: '/index'});
            }, 1000);
          }, 1000);

        } else if (this.username == '' || this.password == '') {
          MessageBox('提示', '请输入用户名和密码');
        } else {
          MessageBox('提示', '用户名或密码错误，请重新输入！');
        }
      }
    },
    mounted(){

    },
  }
</script>
