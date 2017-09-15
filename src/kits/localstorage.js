//负责操作localstorage帮助文件
export const KEY = 'goodsdata';
export const valueObj = { 'goodsid': 0, 'count': 0 };
//value是标准json格式
export function setItem(value) {
    var arr = getItem();
    arr.push(value);
    localStorage.setItem(KEY, JSON.stringify(arr));
}
export function getItem() {
    var jsonStr = localStorage.getItem(KEY);
    jsonStr = jsonStr || '[]';

    return JSON.parse(jsonStr);
}
export function removeItem(goodsid) {
   var arr = getItem();
   for (var i = arr.length-1; i >=0; i--) {
       var item = arr[i];
       if(item.goodsid = goodsid){
            arr.splice(i,1);
       }
   }
   localStorage.setItem(KEY, JSON.stringify(arr));
}

export function getgoodsObject() {
    var arr = getItem();
    //讲arr数组goodid相同对象合并成一个对象

    var resObj = {};
    for (var i = 0; i < arr.length; i++) {
        var ele = arr[i];
        if (resObj[ele.goodsid]) {
            var count = resObj[ele.goodsid];
            resObj[ele.goodsid] = count + ele.count;
        } else {
            resObj[ele.goodsid] = ele.count;
        }
    }
    return resObj;
}
//obj格式：{goodsid:87,type:'add'}
export function updateData(obj) {
    var count = 1;
    var arr = getItem();
    if (obj.type == 'add') {
        //加
        arr.push({ 'goodsid': obj.goodsid, 'count': count });

    } else {
        //减
        for (var i = 0; i < arr.length; i++) {
            var ele = arr[i];
            if (ele.goodsid == obj.goodsid) {
                if (ele.count > 1) {
                      ele.count = ele.count - 1;
                      break;
                }
                else{
                    arr.splice(i,1);
                    break;
                }
            }
        }
    }
    localStorage.setItem(KEY, JSON.stringify(arr));
}