<template>
    <div>
        <!-- 利用mui图文列表 -->
        <div class="mui-content" style="background-color:#fff">

            <ul class="mui-table-view mui-grid-view">
                <li v-for="item in list" class="mui-table-view-cell mui-media mui-col-xs-6">
                    <router-link v-bind="{to:'/goods/goodsinfo/'+item.id}">
                        <img class="mui-media-object" :src="item.img_url">
                        <div class="mui-media-body" v-text="item.title"></div>
                        <div class="desc">
                            <p>
                                <span>￥{{item.sell_price}}</span>
                                <s>￥{{item.market_price}}</s>
                            </p>
                            <p>
                                <h6 class="left">热卖中</h6>
                                <h6 class="right">剩余{{item.stock_quantity}}件</h6>
                            </p>
                        </div>
                    </router-link>
                </li>

            </ul>
        </div>
        <mt-button type="danger" size="large" plain @click="getmore" v-show="isNoLoadOver">加载更多</mt-button>
        <p class="tip" v-show="isLoadOver">未有更多的商品</p>
    </div>
</template>
<script>
import common from '../../kits/common.js';
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            list: [],
            isNoLoadOver: true,
            isLoadOver: false,
            pageindex: 1
        }
    },
    created() {
        this.getlist(this.pageindex);
    },
    methods: {
        getlist(pageindex) {
            pageindex = pageindex || 1
            var url = common.apidomain + '/api/getgoods?pageindex=' + pageindex;

            this.$http.get(url).then(function(res) {
                var data = res.body;
                if (data.status != 0) {
                    Toast(data.message);
                    return;
                }
                if (data.message.length == 0) {
                    this.isLoadOver = true;
                    this.isNoLoadOver = false;
                }
                this.list = this.list.concat(data.message);
            });

        },
        getmore() {
            this.pageindex++;
            this.getlist(this.pageindex);
        }
    }
}
</script>
<style scoped>
.tip {
    text-align: center;
    font-size: 20px;
    padding: 5px 0;
    letter-spacing: 5px;
    color: rgba(0, 0, 0, 0.5);
}

.mui-content li {
    border: 1px solid rgba(0, 0, 0, 0.4);
    margin-left: 1px;
    box-shadow: 0 0 4px #000;
    -moz-box-shadow: 0 0 4px #000;
    -webkit-box-shadow: 0 0 4px #000;
    margin-left: 4px;
}

.mui-content .mui-media-body {
    color: #0094ff!important;
}

.mui-content .desc {
    height: 70px;
    background-color: rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    padding: 5px;
    text-align: left;
}

.mui-content .desc span {
    color: red;
    margin-right: 15px;
}

.mui-content .desc .left {
    position: absolute;
    left: 10px;
    bottom: 0px;
}

.mui-content .desc .right {
    position: absolute;
    right: 10px;
    bottom: 0px;
}

.mui-content a {
    padding-left: 0px!important;
    margin-left: 0px
}
</style>

