<template>
    <div>
        <!-- 商品轮播图 -->
        <div class="slider">
            <slider :imgs="imgs"></slider>
        </div>

        <!-- 商品购买区 -->
        <div class="buy">
            <h4 v-text="info.title"></h4>
            <p class="line"></p>
            <ul>
                <li class="price">
                    市场价：
                    <s>￥{{info.market_price}} </s>
                    销售价：
                    <span>￥{{info.sell_price}}</span>
                </li>
                <li class="count">
                    购买数量：
                    <inputnumber @dataobj="getcount"></inputnumber>
                    <transition name="show" @before-enter='beforeEnter' @enter="enter" @after-enter="afterEnter">
                        <div v-show="isshow" class="ball"></div>
                    </transition>

                </li>
                <li>
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="tocart">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <!-- 商品参数 -->
        <div class="params">
            <h6>商品参数</h6>
            <p class="line"></p>
            <ul>
                <li>商品货号：{{info.goods_no}}</li>
                <li>库存情况：{{info.stock_quantity}}</li>
                <li>上架时间：{{info.add_time | datefmt('YYYY-MM-DD')}}</li>
            </ul>
        </div>
        <!-- 商品评论 图文详情 -->
        <div class="other">
            <router-link v-bind="{to:'/goods/goodsdesc/'+id}">
                <mt-button class="imgdesc" plain type="primary" size="large">图文详情</mt-button>
            </router-link>
            <router-link v-bind="{to:'/goods/goodscomment/'+id}">
                <mt-button type="danger" plain size="large">商品评论</mt-button>
            </router-link>

        </div>
    </div>
</template>
<script>
import common from '../../kits/common.js';
import { Toast } from 'mint-ui';
import slider from '../subcom/slider.vue';
import inputnumber from '../subcom/inputNumber.vue';
import { vm, COUNT } from '../../kits/vm.js';
import { setItem, valueObj } from '../../kits/localstorage.js'
export default {
    components: {
        slider,
        inputnumber
    },
    data() {
        return {
            id: 0,
            imgs: [],
            info: {},
            inputNumbercount: 1,
            isshow: false //控制小球显示状态
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.getimgs();
        this.getinfo();
    },
    methods: {
        //定义动画三个方法
        beforeEnter(el) {
            //设定小球初始位置
            el.style.transform = 'translate(0px,0px)';

        },
        enter(el, done) {
            //
            el.offsetWidth;
            el.style.transform = 'translate(55px,356px)';

            done();
        },
        afterEnter(el) {
            //重置小球初始状态
            this.isshow = !this.isshow;
        },
        //获取inputNumber组件中传入的值
        getcount(count) {
            this.inputNumbercount = count;

        },
        getinfo() {
            var url = common.apidomain + '/api/goods/getinfo/' + this.id;
            this.$http.get(url).then(function(res) {
                var data = res.body;
                if (data.status != 0) {
                    Toast(data.message);
                    return;
                }
                this.info = data.message[0];
            })
        },
        getimgs() {
            var url = common.apidomain + '/api/getthumimages/' + this.id;
            this.$http.get(url).then(function(res) {
                var data = res.body;
                if (data.status != 0) {
                    Toast(data.message);
                    return;
                }
                this.imgs = data.message;
            })
        },
        //加入购物车
        tocart() {
            vm.$emit(COUNT, this.inputNumbercount);

            //将数据追加到localstorage中
            valueObj.goodsid = this.id;
            valueObj.count = this.inputNumbercount;
            setItem(valueObj);

            this.isshow = !this.isshow;
        }
    }
}
</script>
<style scoped>
.slider {
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    margin: 5px;
}

.buy,
.params,
.other {
    margin: 5px;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 5px;
}

.buy ul,
.params ul {
    padding-left: 0px;
}

.buy h4 {
    color: #0094ff;
    padding: 5px;
}

.buy li,
.params li {
    list-style: none;
    padding: 8px;
}

.buy .price span {
    color: red;
}

.line {
    height: 1px;
    border: 1px solid rgba(0, 0, 0, 0.2);
}

.other .imgdesc {
    margin-bottom: 20px;
}

.count {
    position: relative;
}

.ball {
    background-color: red;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    position: absolute;
    left: 170px;
    top: 10px;
    transition: all 0.4s ease;
    z-index: 100;
}
</style>

