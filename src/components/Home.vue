<template>
    <div>
        <!-- 轮播图 -->
        <slider :imgs="lunbo"></slider>
        <!-- 九宫格 -->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/news/newslist">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻资讯</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/photo/photolist">
                        <span class="mui-icon mui-icon-email">
                            <!-- <span class="mui-badge">5</span> -->
                        </span>
                        <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/goods/goodslist">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/feedback">
                        <span class="mui-icon mui-icon-location"></span>
                        <div class="mui-media-body">留言反馈</div>
                    </router-link>
                </li>

            </ul>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import common from '../kits/common.js';
import slider from './subcom/slider.vue';
export default {
    components: {
        slider
    },
    data() {
        return {
            lunbo: []
        }
    },
    created() {
        this.getimgs();
    },
    methods: {
        getimgs() {
            //实现轮播组件的数据请求
            var url = common.apidomain + '/api/getlunbo';

            this.$http.get(url).then(function(response) {
                var data = response.body;
                if (data.status != 0) {
                    Toast(data.message);
                    return;
                }
                this.lunbo = data.message;
            });
        }
    }
}
</script>
<style scoped>


.mui-content,
.mui-content ul {
    background-color: #fff;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: none;
}

.mui-grid-view.mui-grid-9 {
    border: none;
}

.mui-icon-home:before,
.mui-icon-email:before,
.mui-icon-chatbubble:before,
.mui-icon-location:before {
    content: "";
    display: inline-block;
    width: 50px;
    height: 50px;
    background-repeat: round;
}

.mui-icon-home:before {
    background-image: url('../../statics/imgs/1.png');
}

.mui-icon-email:before {
    background-image: url('../../statics/imgs/2.png');
}

.mui-icon-chatbubble:before {
    background-image: url('../../statics/imgs/3.png');
}

.mui-icon-location:before {
    background-image: url('../../statics/imgs/4.png');
}
</style>


