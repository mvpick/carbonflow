<template>
    <div>
        <Header />
        <Nuxt />
        <nav class="menu">
            <button @click="$router.push('/chart')">
                <img src="~assets/img/icon/chart.png" alt="">
                <p>차트</p>
            </button>
            <button @click="$router.push('/')">
                <img src="~assets/img/icon/map.png" alt="">
                <p>지도</p>
            </button>
            <button @click="$router.push('/table')">
                <img src="~assets/img/icon/table.png" alt="">
                <p>통계</p>
            </button>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
     
    }
  }
}
</script>

<style lang="scss" scoped>
.menu{
    padding: 10px 24px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    z-index: 10;
    border-top: 1px solid #e4e4e4;
    box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.1);
    background-color: white;
    z-index: 1002;
    @include desktop{
        display: none;
    }
    button{
        p{
            font-size: 14px;
            margin-top: 6px;
        }
    }
}
</style>

