<style scoped lang="less">
  @import "../resources/css/reset.css";
  @import "../resources/css/base.less";
  @import "../resources/css/website/list.less";

  .page-infinite-loading {
    text-align: center;
    background-color: #FFF;
    & > span {
      display: inline-block;
    }
  }

  //遮罩内容
  .float-part {
    position: fixed;
    left: 0;
    bottom: -100%;
    width: 100%;
    height: 6.6rem;
    z-index: 1000;
    background-color: @cl_white;
    .bulid_msg_item {
      float: left;
      width: 25%;
      text-align: center;
      height: 1.6rem;
      i {
        width: .65rem;
        height: .55rem;
        display: block;
        margin: .5rem auto .2rem;
        &.basic_01 {
          background: url("../resources/images/icons/basic_icon/basic01.png") no-repeat;
          background-size: .65rem .55rem;
        }
        &.basic_02 {
          background: url("../resources/images/icons/basic_icon/basic02.png") no-repeat;
          background-size: .65rem .55rem;
        }
        &.basic_03 {
          background: url("../resources/images/icons/basic_icon/basic03.png") no-repeat;
          background-size: .65rem .55rem;
        }
        &.basic_04 {
          background: url("../resources/images/icons/basic_icon/basic04.png") no-repeat;
          background-size: .65rem .55rem;
        }
        &.basic_05 {
          background: url("../resources/images/icons/basic_icon/basic05.png") no-repeat;
          background-size: .65rem .55rem;
        }
        &.basic_06 {
          background: url("../resources/images/icons/basic_icon/basic06.png") no-repeat;
          background-size: .65rem .55rem;
        }
        &.basic_07 {
          background: url("../resources/images/icons/basic_icon/basic07.png") no-repeat;
          background-size: .65rem .55rem;
        }
        &.basic_08 {
          background: url("../resources/images/icons/basic_icon/basic08.png") no-repeat;
          background-size: .65rem .55rem;
        }
      }
    }
  }

  .bulid_msg_last {
    display: block;
    width: 1.2rem;
    text-align: center;
    margin: 0 auto;
    i {
      width: .65rem;
      height: .55rem;
      display: block;
      margin: .5rem auto .2rem;
      background: url("../resources/images/icons/basic_icon/basic09.png") no-repeat;
      background-size: .65rem .55rem;
    }
  }

  .msg_progress_bar {
    position: relative;
    margin-top: .5rem;
    height: .34rem;
    line-height: .34rem;
    background-color: @bg_btn_gray;
    text-align: center;
    .finish_bar {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 50%;
      background-color: @bg_mid_blue;
    }
    .progress_text {
      position: absolute;
      right: .25rem;
      top: 0;

    }
  }

  .close {
    font-size: @font54;
    width: .54rem;
    display: block;
    margin: .1rem auto;
  }

  //遮罩
  .shadow {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: @cl_000;
    opacity: .7;
    z-index: 999;
    display: none;
  }


</style>
<template>
  <div>
    <!--header-->
    <section id="header">
      <header1></header1>
    </section>
    <a href="javascript:;" class="detail-search" style="position: fixed;left: 0; top: 0">
      <input type="text" id="keyword" placeholder="请输入关键字搜索" maxlength="50">
    </a>
    <router-view></router-view>
    <section class="section">
      <div class="option">
        <div class="filtate-outter">
          <div class="list-filtrate">

            <!--筛选条件标题开始-->
            <section class="filtrate-nav">
              <ul @click="chooseFilter($event)">
                <li data-role="filterItem" data-type="district"
                    :class="{'active-filter':this.currentFilterTab=='district'}">
                  <a href="javascript:void(0);">
                    <h2 class="ellipsis district-h">区域</h2>
                    <i class="filt-arrow"></i>
                  </a>
                </li>
                <li data-role="filterItem" data-type="price" :class="{'active-filter':this.currentFilterTab=='price'}">
                  <a href="javascript:void(0);">
                    <h2 class="ellipsis price-h">价格</h2>
                    <i class="filt-arrow"></i>
                  </a>
                </li>
                <li data-role="filterItem" data-type="area" :class="{'active-filter':this.currentFilterTab=='area'}">
                  <a href="javascript:void(0);">
                    <h2 class="ellipsis area-h">面积</h2>
                    <i class="filt-arrow"></i>
                  </a>
                </li>
                <li data-role="filterItem" data-type="features"
                    :class="{'active-filter':this.currentFilterTab=='features'}">
                  <a href="javascript:void(0);">
                    <h2 class="ellipsis feature-h">特色</h2>
                    <i class="filt-arrow"></i>
                  </a>
                </li>
              </ul>
            </section>
            <!--筛选条件标题结束-->

            <!--筛选条件内容start-->
            <div class="filt-container">
              <div class="filt-open" id="filter-district" :class="{show:this.currentFilterTab=='district'}">
                <div class="warpper box-flex1">
                  <ul class="box-flex1 bg-white cut-height">
                    <li v-for="item in districtArray" data-type="district"
                        @click="searchChoose(item.id, '', item.name, $event)"><a href="javascript:;">{{item.name}}</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="filt-open" id="filter-price" :class="{show:this.currentFilterTab=='price'}">
                <div class="warpper box-flex1 grey-bg price-height">
                  <ul>
                    <li class="price-sub" :class="{act:this.priceFilterTab=='p'}" @click="priceFilterTab='p'">
                      <a href="javascript:void(0);" style="color: #302F35;">单价</a>
                    </li>
                    <li class="price-sub" :class="{act:this.priceFilterTab=='t'}" @click="priceFilterTab='t'">
                      <a href="javascript:void(0);" style="color: #302F35;">总价</a>
                    </li>

                    <div id="price_filter" class="warpper2 box-flex1 bg-white">
                      <ul class="price-ul cut-height" :class="{show:this.priceFilterTab=='p'}">
                        <li v-for="item in pricePArray" data-type="priceP"
                            @click="searchChoose(item.code,item.minnum+'-'+item.maxnum, item.minnum+'-'+item.maxnum+'元', $event)">
                          <a href="javascript:;">{{item.minnum}}-{{item.maxnum}}元</a></li>
                      </ul>
                      <ul class="price-ul cut-height" :class="{show:this.priceFilterTab=='t'}">
                        <li v-for="item in priceTArray" data-type="priceT"
                            @click="searchChoose(item.code,item.minnum+'-'+item.maxnum, item.minnum+'-'+item.maxnum+'万元', $event)">
                          <a href="javascript:;">{{item.minnum}}-{{item.maxnum}}万元</a></li>
                      </ul>
                    </div>
                  </ul>
                  <div class="price-bottom">
                    <div class="price-bot price-div">自定义区间
                      <input id="startprice" type="tel" :placeholder="unitword" v-model="price1"><i>----</i>
                      <input id="endprice" type="tel" :placeholder="unitword" v-model="price2">
                      <button >确定</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="filt-open" id="filter-area" :class="{show:this.currentFilterTab=='area'}">
                <div class="warpper box-flex1  bg-white" data-key="huxing_shi">
                  <ul class="">
                    <li v-for="item in sizeArray" data-type="size"
                        @click="searchChoose(item.code, item.minnum+'-'+item.maxnum,  item.minnum+'-'+item.maxnum+'m²', $event)">
                      <a href="javascript:;">{{item.minnum}}-{{item.maxnum}}m²</a></li>
                  </ul>
                  <div class="price-bottom">
                    <div class="price-bot">自定义区间
                      <input type="tel" id="beginArea" value="" maxlength="5" placeholder="平米"
                             v-model="size1"><i>----</i>
                      <input type="tel" id="endArea" value="" maxlength="5" placeholder="平米" v-model="size2">
                      <button>确定</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="filt-open" id="filter-features" :class="{show:this.currentFilterTab=='features'}">
                <div class="warpper box-flex1">
                  <ul class="box-flex1 bg-white cut-height">
                    <li v-for="item in featureArray" data-type="feature"><a href="javascript:;">{{item.name}}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!--筛选条件内容end-->

          </div>
        </div>

        <!--筛选框fixed时替代div-->
        <div id="pos_block"></div>

        <!--筛选结果start-->
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="20"
          infinite-scroll-immediate-check="checked">
          <li class="ys_listcon pv15" v-for="item in resultData">
            <a href="javascript:;" class="supply_box" :zdid="item.id" @click="shadowShow">
              <div class="supply_price">
                <span>{{item.price}}</span> 元/㎡·天
                <i style="display: block">{{item.max_areas}}㎡</i>
              </div>
              <dl class="supply">
                <dt>
                  <img :src="item.img_path" alt="大楼图片">
                  <span class="icon720"><img src="../resources/images/icons/y720-icon.png"></span>
                </dt>
                <dd class="supply_msg_box">
                  <dl>
                    <dd class="supply_house">{{item.building_name}}</dd>
                    <dd class="supply_color ellipsis">{{item.address}}</dd>
                    <dd class="supply_color ellipsis">{{item.lease_nums}}套房源可租</dd>
                    <dd>
                      <dl class="supply_tag clearfix" v-if="item.label !=null">
                        <dd v-for="item in item.label.split(',')" class="tagClass">{{item}}</dd>
                      </dl>
                    </dd>
                  </dl>
                </dd>
              </dl>
            </a>
          </li>
        </ul>
        <p v-if="loading" class="page-infinite-loading">
          <mt-spinner type="fading-circle"></mt-spinner>
        </p>
      </div>
      <div class="mask" id="maskEl"
           :class="{show:this.currentFilterTab=='district'||this.currentFilterTab=='price'||this.currentFilterTab=='area'||this.currentFilterTab=='features'}">
      </div>
    </section>
    <!--context end-->

    <!--遮罩和底部筛选-->
    <div class="shadow"></div>
    <div class="float-part" id="msg_super_wrap">
      <div class="line-one clearfix">
        <router-link class="bulid_msg_item" :to="{path:'/zuodong_basic/'+ this.lpid + '/' + zdid}" >
          <i class="basic_01"></i>
          <span>基本信息</span>
        </router-link>
        <router-link class="bulid_msg_item" :to="{path:'/zuodong_elevator/'+zdid}">
          <i class="basic_02"></i>
          <span>电梯信息</span>
        </router-link>
        <router-link class="bulid_msg_item" :to="{path:'/zuodong_area/'+zdid}">
          <i class="basic_03"></i>
          <span>面积信息</span>
        </router-link>
        <router-link class="bulid_msg_item" :to="{path:'/zuodong_households/'+zdid}">
          <i class="basic_04"></i>
          <span>户数信息</span>
        </router-link>
        <router-link class="bulid_msg_item" :to="{path:'/zuodong_price/'+zdid}">
          <i class="basic_05"></i>
          <span>价格信息</span>
        </router-link>
        <router-link class="bulid_msg_item" :to="{path:'/zuodong_image/'+zdid}">
          <i class="basic_06"></i>
          <span>图片信息</span>
        </router-link>
        <router-link class="bulid_msg_item" :to="{path:'/zuodong_rent/'+zdid}">
          <i class="basic_07"></i>
          <span>租赁部信息</span>
        </router-link>
        <router-link class="bulid_msg_item" :to="{path:'/zuodong_property/'+zdid}">
          <i class="basic_08"></i>
          <span>物业信息</span>
        </router-link>
      </div>
      <div class="build_bot_msg">
        <router-link class="bulid_msg_last" :to="{path:'/fang_list/'+ this.lpid + '/' + zdid}">
          <i></i>
          <span>房源信息</span>
        </router-link>
      </div>
      <div class="msg_progress_bar">
        <div class="finish_bar"></div>
        <span class="pr">信息完成比例</span>
        <span class="progress_text">{{progress}}</span>
      </div>
      <div class="close" id="close_msg">&times;</div>
    </div>

  </div>
</template>
<script>
  import header1 from '../components/header.vue';
  import footer1 from '../components/footer.vue';
  import {Indicator} from 'mint-ui';
  import {InfiniteScroll} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import {Actionsheet} from 'mint-ui';
  import {Search} from 'mint-ui';
  import axios from 'axios';
  import qs from 'qs';
  export default {
    components: {
      header1,
      footer1,
      InfiniteScroll,
      Toast,
      Actionsheet,
      Search
    },

    data () {
      return {
        lpid: "",
        zdid:"",
        loading: false,
        loadMore: false,
        price1: '',
        price2: '',
        size1: '',
        size2: '',
        currentFilterTab: 'nth',
        priceFilterTab: 'p',
        resultData: [],
        districtArray: [],
        pricePArray: [],
        priceTArray: [],
        sizeArray: [],
        featureArray: [],
        progress: ""
      }
    },
    mounted(){

      this.init();

      $('#close_msg,.shadow').click(function (e) {
        e.stopPropagation();
        $('#msg_super_wrap').animate({
          bottom: '-100%'
        });
        $('.shadow').hide();
      });

    },
    created: function () {

    },
    computed: {
      unitword(){
        if (this.priceFilterTab === 'p') {
          return "元/天";
        } else {
          return "万元/月";
        }
      }
    },
    methods: {
      init(){

        const lpid = this.$route.params.lpid;
        this.lpid = lpid;

        axios.defaults.baseURL = this.$api;
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

        this.getData();
      },
      getProgress(){
          Indicator.open({
             text: '',
             spinnerType: 'fading-circle'
          });
          const url = this.$api + "/yhcms/web/zdfyxx/getZdwcblxx.do";
          let that = this;
          this.$http.post(url, {"parameters":{ "id":this.zdid},"foreEndType":2,"code":"300000087"}).then((res)=>{
            Indicator.close()
            const data = JSON.parse(res.bodyText).data;
            that.progress = data.wcbl + "%";
          }, (res)=>{
            Indicator.close()
            that.progress = "10%";
          });
      },
      getData(){
          Indicator.open({
             text: '',
             spinnerType: 'fading-circle'
          });
        var paraObj = {
          "parameters": {
            "lpid": this.lpid,
            "price_dj": "",
            "area": "",
            "district": "",
            "business": ""
          },
          "foreEndType": 2,
          "code": "300000060"
        }, that = this;
        
        axios.post("/yhcms/web/lpzdxx/getLpZd.do", paraObj)
          .then(function (response) {
            Indicator.close()
            const data = response.data.data;
            that.resultData = data;  
          }).catch(function (error) {
            Indicator.close();
            Toast({
                message: '抱歉,暂无符合条件的房源!',
                position: 'middle',
                duration: 3000
          });
        });
      },
      shadowShow(event){
        $('.shadow').show();
        const evt = (event || window.event), target = (evt.target || evt.srcElement), href = $(target).parents("a"), zdid=$(href).attr("zdid");
        this.zdid = zdid;
        this.getProgress();
        $('#msg_super_wrap').animate({
          bottom: 0
        });
      }
    }
  }
</script>
