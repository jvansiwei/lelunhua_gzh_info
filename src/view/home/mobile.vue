<template>
  <div>
    <div class="title">
      绑定手机
    </div>
    <div class="input">
      <van-cell-group style="border: 0">
        <van-field
          v-model="form.mobile"
          center
          clearable
          placeholder="手机号"
        >
          <van-button slot="button" size="small" type="primary" class="button_yz" :disabled="time!=60" @click="yanzheng">
            <span v-if="time==60">验证</span>
            <span v-else>{{ time }}秒后重新发送</span>
          </van-button>
        </van-field>
        <van-field v-model="form.code" placeholder="验证码" />
      </van-cell-group>
    </div>
    <div class="button" @click="submit">
      <span class="span">确定</span>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
import {bangding_wx, yanzheng} from '@/api/all'
export default {
  props: ['panduans'],
  data() {
    return {
      time: 60,
      form: {
        openId: '',
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    yanzheng() {
      console.log('yanzheng')
      if (this.form.mobile.length < 11) {
        Toast('请输入11位手机号')
        return
      }
      this.huidiao()
      let query = {
        mobile: this.form.mobile
      }
      yanzheng(query).then(res => {
        console.log(res)
      }).catch(err => { console.log(err) })
    },
    submit() {
      console.log('submit')
      if (this.form.mobile.length < 11) {
        Toast('请输入11位手机号')
        return
      }
      if (this.form.code.length < 1) {
        Toast('请输入验证码')
        return
      }
      this.form.openId = localStorage.getItem('openId')
      bangding_wx(this.form).then(res => {
        if (res.code === 0) {
          if (res.data.stus.length) {
            localStorage.setItem('studata', JSON.stringify(res.data))
            this.$router.push('/info')
          } else {
            this.$router.push('/down')
          }
        }
      }).catch(err => { console.log(err) })
    },
    huidiao() {
      if (this.time * 1 === 0) {
        this.time = 60
        return
      } else {
        this.time--
        setTimeout(() => {
          this.huidiao()
        }, 1000)
      }
    }
  }
}
</script>
<style scoped>
.title {
  /* width: 31.87%; */
  /* padding-bottom: 5.6%; */
  height: 4.2%;
  font-size:30px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(0,0,0,1);
  line-height:15px;
  position:absolute;
  left:26px;
  top:49px;
}
.input{
  position:absolute;
  left:33px;
  top:150px;
  width: 85%
}
.button_yz {
  /* width:23%; */
  height:5.25%;
  /* height:50px; */
  background:rgba(135,152,173,1);
  box-shadow:0px 2px 2px 0px rgba(112,131,154,0.75);
  opacity:0.5;
  border: 1px solid rgba(135,152,173,1);
  border-radius:18px;
  cursor: pointer;
}
.button{
  width: 85.6%;
  /* height: 7.35%; */
  height: 50px;
  position:absolute;
  left:7.2%;
  top:300px;
  background:linear-gradient(90deg,rgba(112,169,252,1),rgba(165,202,253,1));
  box-shadow:0px 2px 2px 0px rgba(158,198,253,0.75);
  border-radius:24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.span{
  font-size:15px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(255,255,255,1);
}
</style>
<style>
.van-cell::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 16px;
    border-bottom: 1px solid #ebedf0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
}
[class*=van-hairline]::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border: 0 solid #ebedf0;
    -webkit-transform: scale(.5);
    transform: scale(.5);
}
</style>