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
      <div class="common_title">房源图片</div>
      <div class="image_wrap clearfix mb140">
        <div class="upload_btn mr10 fl">
            <input @change='add_img' id="file_add" tag="fy" type="file">
        </div>
        <div class="img_demo fl pr" v-for='(item,index) in imgList' v-if="item.isdelete==0">
          <img class="upload_demo_img" :src="item.url" alt="" />
          <i class="delete_icon" tag="fy" @click='delete_img(index, item.id, $event)'></i>
        </div>
      </div>
      <div class="common_title">户型图片</div>
      <div class="image_wrap clearfix mb140">
        <div class="upload_btn mr10 fl">
            <input @change='add_img' id="file_add" tag="hx" type="file">
        </div>
        <div class="img_demo fl pr" v-for='(item,index) in hxList' v-if="item.isdelete==0">
          <img class="upload_demo_img" :src="item.url" alt="" />
          <i class="delete_icon" tag="hx" @click='delete_img(index, item.id, $event)'></i>
        </div>
      </div>
      <div class="common_title">格局图片</div>
      <div class="image_wrap clearfix mb140">
        <div class="upload_btn mr10 fl">
            <input @change='add_img' id="file_add" tag="gj" type="file">
        </div>
        <div class="img_demo fl pr" v-for='(item,index) in gjList' v-if="item.isdelete==0">
          <img class="upload_demo_img" :src="item.url" alt="" />
          <i class="delete_icon" tag="gj" @click='delete_img(index, item.id, $event)'></i>
        </div>
      </div>
      <div class="common_title">封面图片</div>
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
        fyid: "",
        imgList:[],
        hxList:[],
        gjList:[],
        fmList:[],
      }
    },
    methods:{
      delete_img(index, id, event){
        const tag = $(event.target).attr("tag"), which = {"fy":"imgList", "hx":"hxList", "gj":"gjList", "fm":"fmList"}[tag];
        if(id !== 'xxx'){
            this[which][index].isdelete = "1";
        }
        else{
            this[which].splice(index,1);
        }
      },
      add_img(event){
        var reader = new FileReader();
        const tag = $(event.target).attr("tag"), which = {"fy":"imgList", "hx":"hxList", "gj":"gjList", "fm":"fmList"}[tag];
        var img1=event.target.files[0];
        if (!/\/(?:jpeg|jpg|png)/i.test(img1.type)){
          MessageBox('提示', '请选择图片文件!');
          return
        }
        var that=this;
        reader.onloadend = () => {
          const img = reader.result, obj = {
              id: "xxx",
              fyid: that.fyid,
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
          const fyid = this.$route.params.fyid;
          this.fyid = fyid;
          Indicator.open({
             text: '',
             spinnerType: 'fading-circle'
          });
          const url = this.$api + "/yhcms/web/lpjbxx/getLpTp.do";
          let that = this;
          this.$http.post(url, {"parameters":{"fyid":fyid},"foreEndType":2,"code":"300000059"}).then((res)=>{
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
          let fp = [], fm = [], hx = [], gj = [];
          const cb = (img, obj) => {
             if(img.id === "xxx"){
                 const [_, data] = img.url.split(","), [prefix, t] = img.suffix.split('/');
                 that.saveImages(data, t, function(path){obj.push({"id":"", "isdelete":"0", "url":path})});
             }
             else{
                 obj.push({"id": img.id, "isdelete": img.isdelete, "url": img.url});
             }
          };
          this.imgList.forEach((img,idx)=> {cb(img, fp)});
          this.imgList = fp;

          this.hxList.forEach((img,idx)=> {cb(img, hx)});
          this.hxList = hx;

          this.gjList.forEach((img,idx)=> {cb(img, gj)});
          this.gjList = gj;

          this.fmList.forEach((img, idx)=>{cb(img,fm)});
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

        let fp = this.imgList.map((item, idx)=>{
            return {"id": item.id, "isdelete": item.isdelete, "url": item.url};
        });
        let hx = this.hxList.map((item, idx)=>{
            return {"id": item.id, "isdelete": item.isdelete, "url": item.url};
        });
        let gj = this.gjList.map((item, idx)=>{
            return {"id": item.id, "isdelete": item.isdelete, "url": item.url};
        });
        let fm = this.fmList.map((item, idx)=>{
            return {"id": item.id, "isdelete": item.isdelete, "url": item.url};
        });

        const data = {"parameters":{"fyid":this.fyid,"fytp":fp,"hxt":hx,"gjt":gj,"fmtp":fm},"foreEndType":2,"code":"300000082"};
        this.$http.post(
           this.$api + "/yhcms/web/zdfyxx/saveZdFyTp.do", data).then((res)=>{
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
