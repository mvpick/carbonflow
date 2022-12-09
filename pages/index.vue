<template>
<div id="index">
    <div class="menubox">
        <button class="menu" @click="button_box=true">
            <img src="~assets/img/icon/menu.png" alt="">
        </button>

        <div class="button_box" v-if="button_box">
            <button class="x_btn" @click="button_box=false"></button>
            <div class="input">
                <select name="" id="">
                    <option value="">2022년</option>
                    <option value="">2021년</option>
                    <option value="">2020년</option>
                    <option value="">2019년</option>
                    <option value="">2018년</option>
                </select>
            </div>
            <div class="button">
                <button class="mainBtn2">현재배출량</button>
                <button class="mainBtn2">증감량</button>
                <button class="mainBtn2">참여기업수</button>
                <button class="mainBtn1">국제배출량 순위</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>
export default {
  data() {
    return {
        button_box:false,
    }
  }
}
</script>

<style lang="scss" scoped>
#index{
    .menubox{
        display: block;
        
        @include desktop{
            display: none;
        }
        button.menu{
            padding: 8px;
            display: block;
            margin-left: auto;
            border: 1px solid $color_main;
            margin-top: 12px;
            margin-right: 16px;
            border-radius: 100%;
            box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
            @include desktop{
                display: none;
            }
        }
        .button_box{
            background-color: #fff;
            padding: 16px;
            position: fixed;
            width: 100%;
            top: 60px;
            box-shadow: 0px 4px 16px rgb(0 0 0 / 10%);
            .x_btn{
                margin-left: auto;
            }
            .input{
                margin: 12px 0;
            }
            .button{
                display: flex;
                // flex-wrap: wrap;
                button{
                    margin-right: 4px;
                    margin-bottom: 8px;
                }
                .mainBtn2{
                    max-width: 300px;
                }
            }
            .mainBtn1{
                max-width: 110px;
            }
            
            
        }
    }
}
</style>

