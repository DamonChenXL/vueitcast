<template>
    <div>
        <div id="postcomment">
            <h3>提交评论</h3>
            <p class="line"></p>
            <textarea placeholder="请输入您要评论的内容..." v-model="postcontent"></textarea>
            <mt-button type="primary" size="large" @click="postcomment">发表</mt-button>
        </div>
        <div id="list">
            <h3>评论列表</h3>
            <p class="line"></p>
            <div v-for="(item,index) in list">
                <div class="title">
                    <span>第{{index+1}}楼：</span>
                    <span>用户：{{item.user_name}}</span>
                    <span>发表时间：{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                </div>
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell" v-text="item.content"></li>
                </ul>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getmore" v-show="isNoLoadOver">加载更多</mt-button>
        <p class="tip" v-show="isLoadOver">未有更多的评论</p>
    </div>
</template>
<script>
import common from '../../kits/common.js';
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            pageindex: 1, //代表获取第几页数据
            postcontent: '', //用户评论内容
            list: [],
            isLoadOver: false,
            isNoLoadOver: true
        }
    },
    props: ['id'],//用来接受父组件传过来的id 
    created() {
        this.getcommentlist(this.pageindex);
    },
    methods: {
        //实现获取当前数据评论数据
        getcommentlist(pageindex) {
            pageindex = pageindex || 1;
            var url = common.apidomain + '/api/getcomments/' + this.id + '?pageindex=' + pageindex;
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
            })
        },
        postcomment() {
            if (this.postcontent.trim().length <= 0) {
                Toast('您提交的评论内容不能为空');
                return;
            }
            var url = common.apidomain + '/api/postcomment/' + this.id;
            this.$http.post(url, { content: this.postcontent }, { emulateJSON: true }).then(function(res) {
                var data = res.body;
                Toast(data.message);
                
                this.list=[{
                    "user_name": "匿名用户",
                    "add_time": new Date(),
                    "content": this.postcontent
                }].concat(this.list);
                this.postcontent = '';
            })
        },
        getmore() {
            this.pageindex++;
            this.getcommentlist(this.pageindex);
        }
    }
}
</script>
<style scoped>
#postcomment {
    padding: 5px;
}

.line {
    height: 1px;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3)
}

#list {
    padding: 5px;
}

.title {
    padding: 5px;
    color: #6d6d72;
    font-size: 15px;
    background-color: rgba(0, 0, 0, 0.1)
}

.tip {
    text-align: center;
    font-size: 20px;
    padding: 5px 0;
    letter-spacing: 5px;
    color: rgba(0, 0, 0, 0.5);
}
</style>

