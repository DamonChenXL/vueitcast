<template>
    <div>
        <div class="title">
            <h4 v-text="info.title"></h4>
            <p>{{info.add_time | datefmt('YYYY-MM-DD')}} {{info.click}}次浏览</p>
        </div>
        <div id="content" v-html="info.content">
        </div>
        <comment :id="id"></comment>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import common from '../../kits/common.js';
//导入评论组件
import comment from '../subcom/comment.vue';
export default {
    components:{
        comment
    },
    data() {
        return {
            id: 0,
            info: {
                // "id": 13,
                // "title": "1季度多家房企利润跌幅超50% 去库存促销战打响",
                // "click": 1,
                // "add_time": "2015-04-16T03:50:28.000Z",
                // "content":'aaaa'
            }
        }
    },
    created() {
        //获取url传递的参数值
        this.id = this.$route.params.id;

        //请求服务器获取数据
        this.getinfo();
    },
    methods: {
        getinfo() {
            var url = common.apidomain + "/api/getnew/" + this.id;

            this.$http.get(url).then(function(res) {
                var data = res.body;
                if (data.status != 0) {
                    Toast(data.message);
                    return;
                }
                this.info = data.message[0];
            })
        }
    }
}
</script>
<style scoped>
.title h4 {
    color: #0094ff;
}

.title p {
    color: rgba(0, 0, 0, 0.5);
}

.title,
#content {
    padding: 5px;
}
</style>

