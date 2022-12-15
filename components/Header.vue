<template>
    <header id="main_header">
        <div class="pc_header">
            <div class="menu_box">
                <img src="~assets/img/logo_white0.png" alt="" @click="$router.push('/')">
                <div class="menu">
                    <button @click="$router.push('/chart')">
                        <img src="~assets/img/icon/chart.png" alt="">
                        <p>차트</p>
                    </button>
                    <button @click="$router.push('/table')">
                        <img src="~assets/img/icon/table.png" alt="">
                        <p>통계</p>
                    </button>
                </div>
            </div>
        </div>
        <div class="mobile_header">
            <img src="~assets/img/logo_white0.png" alt="" @click="$router.push('/')">
        </div>
    </header>
</template>

<script>    
export default{
data() {
    return{
        
    }
  }
}
</script>

<style lang="scss" scoped>
#main_header{
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
    width: 100%;
    background-color: #fff;
    z-index: 1;
    .pc_header{
        display: none;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px 16px;
        .menu_box{
            display: flex;
            align-items: center;
            justify-content: space-between;
            >img{
                width: 150px;
                cursor: pointer;
                @include desktop{
                }
            }
            .menu{
                display: flex;
                width: 15%;
                button{
                    display: flex;
                    align-items: center;
                    width: 100%;
                    p{
                        margin-left: 8px;
                    }
                    
                }
            }
        }
        @include desktop{
            display: block;
        }
    }
    .mobile_header{
        padding: 16px;
        display: block;
        img{
            width: 120px;
            cursor: pointer;
        }
        @include desktop{
            display: none;
        }
    }
}
</style>
