<style scoped lang="less">
  @import "../resources/css/reset.css";
  @import "../resources/css/base.less";

  .page-infinite-loading {
    text-align: center;
    background-color: #FFF;
    & > span {
      display: inline-block;
    }
  }
  .upload_btn{
    position: relative;
    input{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 99999;
      opacity: 0;
    }
  }
  .image_wrap {
    .img_demo{
      margin-right: .2rem;
    }
  }
</style>
<template>
  <div class="all_elements">
    <div class="build_top">
      <div class="common_title">楼盘照片</div>
      <div class="image_wrap clearfix mb140">
        <div class="upload_btn mr10 fl">
            <input @change='add_img' id="file_add" tag="lp" type="file">
        </div>
        <div class="img_demo fl pr" v-for='(item,index) in imgList' v-if="item.isdelete==0">
          <img class="upload_demo_img" :src="item.url" alt="" />
          <i class="delete_icon" tag="lp" @click='delete_img(index, item.id, $event)'></i>
        </div>
      </div>
      <div class="common_title">楼盘封面照片</div>
      <div class="image_wrap clearfix mb140">
        <div class="upload_btn mr10 fl">
            <input @change='add_img' id="file_add" tag="fm" type="file">
        </div>
        <div class="img_demo fl pr" v-for='(item,index) in fmList' v-if="item.isdelete==0">
          <img class="upload_demo_img" :src="item.url" alt="" />
          <i class="delete_icon" tag="fm" @click='delete_img(index, item.id, $event)'></i>
        </div>
      </div>
    </div>
    <a href="javascript:;" class="ys_default_btn mb80" @click.stop.prevent="saveToserver">保存</a>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui';
  import {Indicator} from 'mint-ui';
  import { MessageBox } from 'mint-ui'; //弹窗

  export default {
    data(){
      return{
        lpid: "",
        imgList:[],
        fmList:[],
      }
    },
    methods:{
      delete_img(index, id, event){
        const tag = $(event.target).attr("tag"), which = tag === "lp" ? "imgList":"fmList";
        if(id !== 'xxx'){
            this[which][index].isdelete = "1";
        }
        else{
            this[which].splice(index,1);
        }
      },
      add_img(event){
        var reader = new FileReader();
        const tag = $(event.target).attr("tag"), which = tag === "lp" ? "imgList":"fmList";
        var img1=event.target.files[0];
        if (!/\/(?:jpeg|jpg|png)/i.test(img1.type)){
          MessageBox('提示', '请选择图片文件!');
          return
        }
        var that=this;
        reader.onloadend = () => {
          const img = reader.result, obj = {
              id: "xxx",
              lpid: that.lpid,
              isdelete: 0,
              type: 2,
              suffix:img1.type,
              url: img
          };
          that[which].push(obj)
        }
        reader.readAsDataURL(img1);
      },
      getInitData(){
          const lpid = this.$route.params.lpid;
          this.lpid = lpid;
          Indicator.open({
             text: '',
             spinnerType: 'fading-circle'
          });
          const url = this.$api + "/yhcms/web/lpjbxx/getLpTp.do";
          let that = this;
          this.$http.post(url, {"parameters":{"lpid":lpid},"foreEndType":2,"code":"300000059"}).then((res)=>{
            Indicator.close()
            const data = JSON.parse(res.bodyText).data;
            that.imgList = data.lppic;
            that.fmList = data.fmpic;
          }, (res)=>{
            Indicator.close()
          });
      },
      saveToserver(){
          //开始上传图片
          const that = this;
          Indicator.open({
            text: '上传图片中...',
            spinnerType: 'fading-circle'
          });
          let fp = [], fm = [];
          const cb = (img, obj) => {
             if(img.id === "xxx"){
                 const [_, data] = img.url.split(","), [prefix, t] = img.suffix.split('/');
                 that.saveImages(data, t, function(path){obj.push({"id":"", "isdelete":"0", "url":path})});
             }
             else{
                 obj.push({"id": img.id, "isdelete": img.isdelete, "url": img.url});
             }
          };

          this.imgList.forEach((img)=>{cb(img,fp)});
          this.imgList = fp;

          this.fmList.forEach((img)=>{cb(img,fm)});
          this.fmList = fm;

          //保存信息
          setTimeout(function(){
              Indicator.close();
              that.saveImageData();
          }, 1000);
      },
      saveImages(pic, type, cb){
          const that = this;
          this.$http.post(
              this.$api + "/yhcms/web/jcsj/uploadPic.do",
              {"parameters":{ "smallPic":pic,"suffix": "." + type},"foreEndType":2,"code":"300000084"}
          ).then((res)=>{
              var result = JSON.parse(res.bodyText);
              if (result.success) {
                  cb && cb(result.data);
              }
              else{
              }
          }, (res)=>{});
      },
      saveImageData(){
        const that = this;
        Indicator.open({
          text: '保存中...',
          spinnerType: 'fading-circle'
        });
        let lp = this.imgList.map((item, idx)=>{
            return {"id": item.id, "isdelete": item.isdelete, "url": item.url};
        });

        let fm = this.fmList.map((item, idx)=>{
            return {"id": item.id, "isdelete": item.isdelete, "url": item.url};
        });
        this.$http.post(
           this.$api + "/yhcms/web/lpjbxx/saveLpTp.do",
           {"parameters":{"lpid":this.lpid,"lptp":lp,"fmtp":fm},"foreEndType":2,"code":"300000080"}).then((res)=>{
          Indicator.close();
          var result = JSON.parse(res.bodyText);
          if (result.success) {
            Toast({
                message: '保存成功',
                position: 'bottom',
                duration: 1000
            });

            setTimeout(function(){
                that.$router.push({path:'/index'});
            },1000);
          } else {
            Toast({
                message: '保存失败: ' + result.message,
                position: 'bottom'
            });
          }
        },(res)=>{
          Indicator.close();
          Toast({
              message: '保存失败! 请稍候再试',
              position: 'bottom'
          });
        });
      },
    },
    mounted(){
        this.getInitData();
    }
  }

</script>
