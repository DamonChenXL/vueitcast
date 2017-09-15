<template>
    <div>
        <div class="cate">
            <ul v-bind="{style:'width:'+ulWidth+'px'}">
                <li ref="mycate" @click="getimages(0)">全部</li>
                <li v-for="item in cates" @click="getimages(item.id)">{{item.title}}</li>
            </ul>
        </div>
        <div class="imglist">
            <ul>
                <li v-for="item in list">
                    <router-link v-bind="{to:'/photo/photoinfo/'+item.id}">
                        <img v-lazy="item.img_url">
                        <div class="desc">
                            <h5 v-text="item.title"></h5>
                            <p v-text="item.zhaiyao"></p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import common from '../../kits/common.js';
import { Toast } from 'mint-ui';

export default {
    data() {
        return {
            cates: [],
            ulWidth: 320,
            list: []
        }
    },
    created() {
        this.getcates();

        var all = 0;//获取所有数据
        this.getimages(all);
    },
    methods: {
        getimages(cateid) {
            cateid = cateid || 0;
            var url = common.apidomain + '/api/getimages/' + cateid;
            this.$http.get(url).then(function(res) {
                var data = res.body;

                if (data.status != 0) {
                    Toast(data.message);
                    return;
                }
                this.list = data.message;
            })
        },
        getcates() {
            var url = common.apidomain + '/api/getimgcategory';

            this.$http.get(url).then(function(res) {
                var data = res.body;
                if (data.status != 0) {
                    Toast(data.message);
                    return;
                }

                this.cates = data.message;

                var w = this.$refs.mycate.offsetWidth * 2 - 6;
                var count = data.message.length + 1;
                var totalwidth = w * count;

                this.ulWidth = totalwidth;
            })
        }
    }
}
</script>
<style scoped>
image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
}

.cate {
    width: 375px;
    max-width: 375px;
    overflow-x: auto;
}

.cate ul {
    width: 1000px;
    padding-left: 10px;
    margin: 0px;
}

.cate li {
    list-style: none;
    display: inline-block;
    color: #0094ff;
    font-size: 14px;
    padding-left: 6px;
    cursor: pointer;
}

.imglist {}

.imglist ul {
    padding-left: 0px;
}

.imglist li {
    list-style: none;
    position: relative;
}

.imglist img {
    width: 100%;
    height: 300px;
}

.desc {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    bottom: 2px;
    left: 0px;
}

.desc h5 {
    color: #fff;
    font-weight: bold;
}

.desc p {
    color: #fff;
}
</style>



