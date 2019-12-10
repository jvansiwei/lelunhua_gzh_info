<template>
<div class="main">
  <div style="width:100%;text-align: center;margin-top:25%">
    <img class="img" src="@/assets/image/0.png">
    <div class="text">
      <span>您还没有报名不能查询信息哦~ </span><br>
      <span>可以下载APP进行报名</span>
    </div>
    <div class="button" @click="submit">
      <span class="span">下载APP</span>
    </div>
  </div>
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
      window.location.href = 'http://url.cn/51xZIVL'
    }
  }
}
</script>
<style scoped>
.main{
  width: 100%;
  height: 100%;
}
.img{
  width: 53.73%;
  text-align: center;
}
.text{
  width: 55%;
  padding-top: 3.45%;
  padding-bottom: 6.75%;
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
.span{
  font-size:14px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(255,255,255,1);
}
</style>