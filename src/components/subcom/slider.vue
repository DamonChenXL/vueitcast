<template>
   <div>
       <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in imgs">
                <a :href="item.url">
                    <img v-bind:src="item.img">
                </a>

            </mt-swipe-item>
        </mt-swipe>
   </div>
</template>
<script>
export default {
   props: ['imgs']
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
</style>
