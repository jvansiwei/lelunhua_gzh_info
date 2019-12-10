<template>
  <div class="body">
    <img class="image" src="@/assets/image/1-4.png">
    <div class="all">
      <div class="top">
        <img class="img fl" :src="form.avatarUrl">
        <div class="name0 fl">
          <div class="name1">
            {{form.nickName}}
          </div>
          <div class="name2">
            {{form.mobile}}
          </div>
        </div>
        <div class="button0 fr">
          <div class="button" @click="submit">
            <span class="span">解除绑定</span>
          </div>
        </div>
      </div>
      <div class="title">
          <img height="23px" style="margin: 0 12px -3px 0" src="@/assets/image/1-3.png">
          <span>学员信息</span>
          <img height="23px" style="margin: 0 0 -3px 12px" src="@/assets/image/1-2.png">
      </div>
      
      <div class="info" v-for="(item, index) in table" :key="index">
        <div style="padding: 34px 0 21px 0px;width:80%;margin:0 auto">
          <div class="infoclubname">{{item.clubName}}</div>
          <div class="infotext">学员姓名：{{item.stuName}}</div>
          <div class="infotext">教练姓名：{{item.coachName}}</div>
          <div class="infotext0">套餐名称：{{item.packageName}}</div>
          <div class="infotext0">套餐课时：{{item.totalClassTimes}}课时</div>
          <div class="infotext1">剩余课时：
            <span v-if="item.leftClassTimes">{{item.leftClassTimes}}</span>
            <span v-else>-</span>
          课时</div>
          <div class="infotext2">课时时间：
            <span v-if="item.startDate">{{item.startDate.slice(0, 10)}}</span>
            <span v-else>-</span>
            至
            <span v-if="item.finishDate">{{item.finishDate.slice(0, 10)}}</span>
            <span v-else>-</span>
            </div>
        </div>
      </div>




      <div style="width:100%;height:30px">
      </div>
    </div>
    <van-dialog
      v-model="show"
      title="解除绑定"
      confirmButtonText="现在解除"
      cancelButtonText="稍后再说"
      show-cancel-button
      @confirm="dialog_jiechu()"
    >
    <div class="dialog">
      <img width="48.44%" style="margin:0 auto;margin-bottom:17px" src="@/assets/image/2.png">
      <br>
      <span class="span1">您确定要解除微信绑定么~</span>
    </div>
    </van-dialog>

    <van-dialog
      v-model="dialog"
      title="解除绑定"
      show-cancel-button
     :beforeClose="beforeClose"
    >
    <div class="dialog">

      <van-cell-group style="border: 0">
        <van-field
          v-model="query.mobile"
          center
          clearable
          placeholder="手机号"
        >
          <van-button slot="button" size="small" type="primary" class="button_yz" :disabled="time!=60" @click="yanzheng">
            <span v-if="time==60">验证</span>
            <span v-else>{{ time }}秒后重新发送</span>
          </van-button>
        </van-field>
        <van-field v-model="query.mobileCode" placeholder="验证码" />
      </van-cell-group>
    </div>
    </van-dialog>
    
  </div>
</template>
<script>
import { Toast } from 'vant'
import {jiechu_bdwx, yanzheng} from '@/api/all'
export default {
  data() {
    return {
      time: 60,
      show: false,
      dialog: false,
      form: {
        userId: 33,
        nickName: '',
        avatarUrl: '',
        mobile: '',
      },
      table: [
      {
        stuName: '',
        clubName: '',
        packageName: '',
        coachName: '',
        totalClassTimes: '',
        leftClassTimes: '',
        startDate: null,
        finishDate: null
      }],
      query: {
        jsCode: '',
        mobile: '',
        mobileCode: ''
      }
    }
  },
  created() {
    let query = JSON.parse(localStorage.getItem('studata'))
    console.log(query)
    if (query.userId) {
      this.table = query.stus
      for (let i in this.form) {
        this.form[i] = query[i]
      }
    }
    if (this.$route.query.code) {
      this.show = true
    }
    
  },
  methods: {
    yanzheng() {
      console.log('yanzheng')
      if (this.query.mobile.length < 11) {
        Toast('请输入11位手机号')
        return
      }
      this.huidiao()
      let query = {
        mobile: this.query.mobile
      }
      yanzheng(query).then(res => {
        console.log(res)
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
    },
    submit() {
      // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdc6dff3d3c765341&redirect_uri=https%3A%2F%2Fclub.lelunhua.com%2Fquery%2Finfo&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      this.show = true
    },
    dialog_jiechu() {
      this.dialog = true
      this.query.mobile = ''
      this.query.mobileCode = ''
      // let query = {
      //   jscode: '123456'
      // }
      // jiechu_bdwx(query).then(res => {
      //   if (res.code === 0) {
      //     console.log(res)
      //   }
      // })
    },
    dialog_cancel() {
      this.dialog = false
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        done(false)
        this.jiechu()
      } else {
        done();
      }
    },
    jiechu() {
      if (this.query.mobile.length < 11) {
        Toast('请输入11位手机号')
        return
      }
      if (this.query.mobileCode.length < 1) {
        Toast('请输入验证码')
        return
      }
      this.query.jsCode = this.$route.query.code
      jiechu_bdwx(this.query).then(res => {
        if (res.code === 0) {
          this.dialog = false
          Toast('解除绑定成功')
          // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdc6dff3d3c765341&redirect_uri=https://club.lelunhua.com/query&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
          this.$router.push('/?panduan=3')
          console.log(res)
        } else {
          Toast('解除绑定失败')
          this.dialog = false
        }
      // eslint-disable-next-line no-unused-vars
      }).catch(error=>{
        console.log(error)
        Toast('解除绑定失败')
        this.dialog = false
      })
    }
  }
}
</script>

<style scoped>
.fl {
  float: left;
}
.fr {
  float: right;
}
.body{
  width: 100%;
  min-height: 100%;
  /* width: 100px;
  height: 200px; */
  background: url(../../assets/image/1-1.png);
  background-size: 100% 100%;
}
.all{
  width: 83.47%;
  margin: 0 auto;
  padding-top: 24px;
}
.top{
  width: 100%;
  height: 65px;
}
.title{
  width: 100%;
  height: 30px;
  margin-top: 47px;
  margin-bottom: 15px;
  text-align: center;
}
.title span{
  font-size:20px;
  font-family:RuixianTopHeiHeavyGB1.0;
  font-weight:700;
  color:rgba(255,255,255,1);
}
.img{
  width:65px;
  height:65px;
  border-radius:50%;
  border: 2px solid #10A2CC;
}
.image{
  width: 18.8%;
  position: absolute;
  top: 12.34%;
  right: 0;
}
.name0 {
  width: 40%;
  height: 65px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.name1 {
  font-size:16px;
  font-family:Arial;
  font-weight:500;
  color:#FFFFFF;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;/*Not working in FF*/
}
.name2 {
  font-size:12px;
  font-family:PingFang SC;
  font-weight:400;
  color:#FFFFFF;
}
.button0{
  width: 70px;
  height: 65px;
  display: flex;
  align-items: center;
}
.button{
  width:84px;
  height:33px;
  background:linear-gradient(90deg,rgba(121,227,200,1),rgba(43,183,241,1));
  border-radius:17px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.span{
  font-size:12px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(255,255,255,1);
}
.info{
  width: 100%;
  margin-top: 18px;
  /* height: 100px; */
  background:rgba(255,255,255,1);
  box-shadow:inset 0px 0px 9px 1px rgba(12,125,242,1);
  border-radius:10px;
}
.infoclubname{
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
  font-size:14px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:#333333;
}
.infotext{
  margin-bottom: 20px;
  width: 50%;
  float: left;
  font-size:14px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:#333333;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;/*Not working in FF*/
}
.infotext0{
  margin-bottom: 20px;
  width: 100%;
  float: left;
  font-size:14px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:#333333;
}
.infotext1{
  margin-bottom: 20px;
  width: 100%;
  font-size:17px;
  font-family:PingFang-SC-Bold;
  font-weight:600;
  color:#7EB1FE;
}
.infotext2{
  width: 100%;
  font-size:12px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:#333333;
}
.dialog{
  width: 100%;
  margin: 26px 0 52px 0;
  text-align: center;
}
.span1{
  font-size:14px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(102,102,102,1);
}
.van-dialog__header {
    padding-top: 24px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;

    font-size:19px;
    font-family:PingFang SC;
    color:rgba(0,0,0,1);
}
</style>