<template>
  <div class="main">
    <van-loading size="24px" class="loading" v-if="panduan==0">加载中...</van-loading>
    <!-- <info v-if="panduan==0" :panduans="panduan" /> -->
    <mobile v-if="panduan==1" :panduans="panduan" />
    <error v-if="panduan==2" :panduans="panduan" />
    <!-- 绑定微信确认页面暂时用不上 -->
    <bangding_wx v-if="panduan==3" :panduans="panduan" />
  </div>
</template>
<script>
// import info from './info'
import error from './error'
import mobile from './mobile'
import bangding_wx from './bangding_wx'
import {infos} from '@/api/all'
export default {
  components: {mobile, error, bangding_wx},
  data() {
    return {
      panduan: 2
    }
  },
  created() {
    if (this.$route.query.panduan) {
      this.panduan = 3
    } else {
      if (this.$route.query.code) {
        let query = {
          jsCode: this.$route.query.code
        }
        infos(query).then(res => {
          if (res.code === 0) {
            console.log(res)
            if (res.state === 0) {
              localStorage.setItem('openId', res.openId)
              this.panduan = 1
            } else if (res.state === 1) {
              if (res.data.stus.length) {
                localStorage.setItem('studata', JSON.stringify(res.data))
                this.$router.push('/info')
              } else {
                this.$router.push('/down')
              }
            }
          } else {
            this.panduan = 1
          }
        })
        .catch(err => { 
          this.panduan = 2
          // window.history.go(-1)
          console.log(err)
        })
      } else {
        this.panduan = 2
        // window.history.go(-1)
      }
    }
   
  }
}
</script>

<style scoped>
.loading{
  position: absolute;
  left: 40%;
  top: 40%;
}
.main{
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>