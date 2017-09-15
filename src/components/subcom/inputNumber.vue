<template>
    <div class="inputNum">
        <div class="inleft" @click="substrict">-</div>
        <div class="incenter" v-text="count"></div>
        <div class="inright" @click="add">+</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            count: 1 //代表商品的数量
        }
    },
    methods: {
        substrict() {
            this.count--;
            if (this.count < 1) {
                this.count = 1;
            }
            this.sendmessage();
        },
        add() {
            this.count++;
            this.sendmessage();
        },
        sendmessage(){
            this.$emit('dataobj',this.count);
        }
    }
}
</script>
<style scoped>
.inputNum {
    display: inline-block;
    margin-left:20px;
    
}
.inputNum div{
    display: inline-block;
    width: 40px;
    height: 25px;
    border: 1px solid #000; 
    text-align: center;
    line-height: 25px;
}
.inleft,.inright{
   cursor: pointer;
}
</style>
