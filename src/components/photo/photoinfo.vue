<template>
    <div>
        <div class="desc">
            <div class="title">
                <h4>{{photoinfo.title}}</h4>
                <p>{{photoinfo.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}} {{photoinfo.click}}次浏览</p>
                <p class="line"></p>
            </div>

            <div class="mui-content">
                <ul class="mui-table-view mui-grid-view mui-grid-9">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item, index) in list">
                        <a href="javascript:;">
                            <img class="preview-img" :src="item.src" height="100" @click="$preview.open(index, list)">
                        </a>
                    </li>
                </ul>
            </div>
            <p v-html="photoinfo.content"></p>
        </div>
        <div class="comment">
            <comment :id="id"></comment>
        </div>
    </div>
</template>
<script>
import common from '../../kits/common.js';
import { Toast } from 'mint-ui';
import comment from '../subcom/comment.vue';
export default {
    components: {
        comment
    },
    data() {
        return {
            id: 0,
            photoinfo: {},//图片详细描述数据
            list: []//负责存储缩略图的数据
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.getinfo();
        this.getimgs();
    },
    methods: {
        getinfo() {
            var url = common.apidomain + '/api/getimageinfo/' + this.id;
            this.$http.get(url).then(function(res) {
                var data = res.body;
                if (data.status != 0) {
                    Toast(data.message);
                    return;
                }
                this.photoinfo = data.message[0];
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
                data.message.forEach(function(element) {
                    // var img = document.createElement('img');
                    // img.src = element.src;
                    element.w = 300;
                    element.h = 300;
                }, this);
                this.list = data.message;
            })
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

.mui-content img {
    width: 100px;
    height: 100px;
}

.desc {
    padding: 10px;
}

.desc h4 {
    color: #0094ff;
}

.desc .title p {
    color: rgba(0, 0, 0, 0.4);
    margin-top: 10px;
}

.desc .title .line {
    height: 1px;
    widows: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.4);
}
</style>

