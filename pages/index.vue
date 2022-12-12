<template>
<div id="index">
    <div class="mobile_menubox">
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

    <div class="pc_menubox">
        <div class="option_box">
            <div class="button_box">
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
            <div class="button_box">
                <button class="mainBtn1" @click="chart_modal=true">
                    <img src="~assets/img/icon/pc_chart2.png" alt="">
                </button>
                <button class="mainBtn1" @click="table_modal=true">
                    <img src="~assets/img/icon/pc_table.png" alt="">
                </button>
            </div>
        </div>
    </div>

    <v-dialog v-model="chart_modal" max-width="600px">
        <div class="chart_modal_box">
            <section class="tab_section">
                <div class="flex_box">
                    <button @click="on_tab=0" 
                    :class="{ 'on_tab' : on_tab === 0 }">산업별 탄소배출량</button>
                    <button @click="on_tab=1"
                    :class="{ 'on_tab' : on_tab === 1 }">연도별 탄소배출량</button>
                </div>
            </section>

            <div class="industry" v-if="on_tab==0">

            </div>

            <div class="year" v-if="on_tab==1">
                
            </div>

            <button class="mainBtn1" @click="chart_modal=false">닫기</button>
        </div>
    </v-dialog>

    <v-dialog v-model="table_modal" max-width="600px">
        <div class="table_modal_box">
            <section class="tab_section">
                <div class="flex_box">
                    <button @click="on_tab=0" 
                    :class="{ 'on_tab' : on_tab === 0 }">목표 관리제</button>
                    <button @click="on_tab=1"
                    :class="{ 'on_tab' : on_tab === 1 }">배출권 거래제</button>
                </div>
            </section>

            <div class="input">
                <input type="text" class="search" placeholder="업체명을 입력해 주세요">
            </div>

            <div class="target" v-if="on_tab==0">
                <Table/>
            </div>
            <div class="carbon_trading" v-if="on_tab==1">
                <Table/>
            </div>
            <button class="mainBtn1" @click="table_modal=false">닫기</button>
        </div>
    </v-dialog>
</div>

</template>

<script>
export default {
  data() {
    return {
        button_box:false,
        chart_modal:false,
        table_modal:false,
        on_tab:0,
    }
  }
}
</script>

<style lang="scss" scoped>
#index{
    .mobile_menubox{
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
        }
    }
    .pc_menubox{
        display: none;
        @include desktop{
            display: block;
        }
        .option_box{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            width: 100%;
            margin: 0 auto;
            padding: 20px 16px;
            .button_box{
                display: flex;
                align-items: center;
                width: 65%;
                .input{
                    margin-bottom: 0;
                    margin-right: 10px;
                    width: 17%;
                }
                .button{
                    display: flex;
                    width: 80%;
                    button{
                        margin-right: 10px;
                    }
                }
                &:nth-child(2){
                    width: 35%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    button{
                        width: 100px;
                        margin-bottom: 10px;
                        &:last-child{
                            margin-bottom: 0;
                        }
                    }
                }
            }
        }
    }
}
.chart_modal_box{
    background-color: #fff;
    padding: 40px 16px;
    .industry,
    .year{
        padding: 16px;
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }

}
</style>

