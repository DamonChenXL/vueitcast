<template>
    <div>
        <!-- 轮播图 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbo">
                <a :href="item.url">
                    <img v-bind:src="item.img">
                </a>

            </mt-swipe-item>
        </mt-swipe>
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
export default {
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
            var url = 'http://182.254.146.100:8899/api/getlunbo';

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
.mint-swipe {
    height: 250px;
}

.mint-swipe-item img {
    width: 100%;
    height: 100%;
}

.mint-swipe-item {
    width: 100%;
    height: 100%;
}

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


