<template>
  <div style="width:100%;height:100%">
    
    <div class="text0">
      <img class="img" src="@/assets/image/3.png">
    </div>
    <div class="text">
      <span>查询信息前确定绑定手机微信哦！</span>
    </div>
    <div class="button" @click="submit">
      <span class="span2">绑定手机号</span>
    </div>
    <!-- <div class="bottom">
      <div class="button1" @click="submit">
        <span class="span1">稍后再说</span>
      </div>
      <div class="button2" style="float:right" @click="submit">
        <span class="span2">现在绑定</span>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return{

    }
  },
  methods: {
    submit() {
      console.log('submit')
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdc6dff3d3c765341&redirect_uri=https://club.lelunhua.com/query&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    }
  }
}
</script>
<style scoped>
.img{
  width: 100%;
  text-align: center !important;
  
  /* width: 100%;
  height: 100%; */
  margin-top: 100px;
}
.text0{
  width: 53.73%;
  padding-top: 2.85%;
  /* padding-bottom: 5.92%; */
  margin: 0 auto;
  text-align: center;

  font-size:14px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(102,102,102,1);
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
.text{
  width: 35.6%;
  padding-top: 2.85%;
  padding-bottom: 5.92%;
  margin: 0 auto;
  text-align: center;

  font-size:14px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(102,102,102,1);
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
.bottom{
  margin: 0 13.6% auto;
}
.button{
  width: 38.4%;
  height: 45px;
  margin: 0 auto;

  background:linear-gradient(90deg,rgba(159,197,255,1),rgba(126,177,254,1));
  border-radius:23px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.button1{
  width: 121px;
  height: 45px;
  float: left;

  background:rgba(248,248,248,1);
  border-radius:23px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.button2{
  width: 121px;
  height: 45px;
  float: right;

  background:linear-gradient(90deg,rgba(159,197,255,1),rgba(126,177,254,1));
  border-radius:23px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.span1{
  font-size:14px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(102,102,102,1);
}
.span2{
  font-size:14px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(255,255,255,1);
}
</style>