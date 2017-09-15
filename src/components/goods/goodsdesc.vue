<template>
    <div class="desc">
        <h4 v-text="info.title"></h4>
        <p class="line"></p>
        <p v-html="info.content"></p>
    </div>
</template>
<script>
import common from '../../kits/common.js';
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            id: 0,
            info: {}
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.getinfo();
    },
    methods: {
        getinfo(){
            var url = common.apidomain + '/api/goods/getdesc/' + this.id;
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

.desc{
    padding: 5px;
}
.desc h4{
    color: #0094ff;

}
.desc .line{
    height: 1px;
    border: 1px solid rgba(0,0,0,0.3);
}
</style>
