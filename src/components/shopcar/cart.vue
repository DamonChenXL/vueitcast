<template>
    <div>
        <div class="row" v-for="(item,index) in datalist">
            <mt-switch class="switch" v-model="values[index]"></mt-switch>
            <img class="img" :src="item.thumb_path" alt="商品图片" height="75" width="75">
            <div class="inforight">
                <h4 v-text="item.title"></h4>
                <div class="bottom">
                    <ul>
                        <li>
                            ￥{{item.sell_price}}
                        </li>
                        <li>
                            <carinputnumber :initCount="item.cou" :goodsid="item.id" @cartdataobj="getInputNumber"></carinputnumber>
                        </li>
                        <li>
                            <a href="javascript:;" @click="delrow(index,item.id)">删除</a>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
        <div class="total">
            <div class="desc">
                <ul>
                    <li>总计（不含运费）</li>
                    <li>已经勾选商品{{totalcount}}件，总价：￥{{totalAmount}}</li>
                </ul>
            </div>
            <div class="button">
                <mt-button type="danger" size="small">去结算</mt-button>
            </div>
        </div>
        {{values}}
    </div>
</template>
<script>
import common from '../../kits/common.js';
import { Toast } from 'mint-ui';
import { getgoodsObject, updateData,removeItem } from '../../kits/localstorage.js';
import carinputnumber from '../subcom/cartinputNumber.vue';
export default {
    components: {
        carinputnumber
    },
    computed: {
        totalcount() {
            var trueArr = this.values.filter(function(item) {
                return item;
            })
            var amount = 0;
            this.values.forEach((item, index) => {
                if (item) {
                    var count = this.datalist[index].cou;
                    var price = this.datalist[index].sell_price;
                    var itemamount = count * price;
                    amount += itemamount;
                }
            });
            this.totalAmount = amount;
            return trueArr.length;
        }
    },
    data() {
        return {
            values: [],
            datalist: [],
            totalAmount: 0
        }
    },
    created() {
        this.getdatalist();
    },
    methods: {
        //删除商品
        delrow(index,goodsid){
             //this.values移除
             this.values.splice(index,1);
             //datalist移除
             this.datalist.splice(index,1);
             //localstorage移除
             removeItem(goodsid);
        },
        //获取数量组件中返回的内容
        getInputNumber(resObj) {
            //更新localstorage中的数据
            updateData(resObj);
            //更新datalist中的数据
            for (var i = 0; i < this.datalist.length; i++) {
                var ele = this.datalist[i];
                if (ele.id == resObj.goodsid) {
                    if (resObj.type == 'add') {
                        ele.cou = ele.cou + 1;
                    } else {
                        ele.cou = ele.cou - 1;
                    }
                    break;
                }
            }

        },
        getdatalist() {
            //从localstorage获取所有商品id值
            var obj = getgoodsObject();
            //讲id值拼接成api参数形式
            var idstr = '';
            for (var key in obj) {
                idstr += key + ',';
            }
            idstr = idstr.substring(0, idstr.lastIndexOf(','));
            if(idstr == ''){
                return;
            }
            var url = common.apidomain + '/api/goods/getshopcarlist/' + idstr;
            this.$http.get(url).then(function(res) {
                var data = res.body;
                if (data.status != 0) {
                    Toast(data.message);
                    return;
                }
                data.message.forEach(function(e, i) {
                    e.cou = obj[e.id];
                }, this);

                this.datalist = data.message;
            })
        }
    }
}
</script>
<style scoped>
.row {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    height: 102px;
    display: flex;
    padding: 5px;
}

.switch {
    flex: 0 0 52px;
}

.img {
    height: 75px;
    width: 75px;
    flex: 0 0 75px;
    margin-left: 5px;
}

.inforight {
    flex: 1;
    margin-left: 5px;
}

.inforight ul {
    padding-left: 0px;
}

.inforight li {
    list-style: none;
    display: inline-block;
}

.inforight h4 {
    color: #0094ff;
    font-size: 14px;
}

.bottom li:first-of-type {
    color: red;
    margin-right: 5px;
}

.bottom li:last-of-type {
    font-size: 14px;
    margin-left: 5px;
}

.total {
    height: 100px;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    padding: 5px;
}

.total ul {
    padding-left: 0px;
}

.total li {
    list-style: none;
    font-size: 14px;
}

.total .button {

    flex: 0 0 60px;
    margin: 30px 0 0;
}

.total .desc {
    flex: 1;
}
</style>


