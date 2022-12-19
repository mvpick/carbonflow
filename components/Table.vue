<template>
    <div id="Table">
        <div class="table_box">
            <div class="content" v-for="(item, index) in contents" :key="index">
                <div class="no">
                    <span v-if="sub_tab === 0">{{item.id}}</span>
                    <p>{{item.company_name}}</p>
                </div>
                <p v-if="sub_tab === 1">
                    {{item.address}}
                </p>
                <div class="info">
                    <dl>
                        <dt>배출량</dt>
                        <dd>{{item.value}}</dd>
                    </dl>
                    <dl>
                        <dt>업종</dt>
                        <dd>{{item.category}}</dd>
                    </dl>
                    <dl v-if="sub_tab === 0">
                        <dt>배출순위</dt>
                        <dd>{{item.rank}}</dd>
                    </dl>
                    <dl v-if="sub_tab === 1">
                        <dt>적용기준</dt>
                        <dd>{{item.standard}}</dd>
                    </dl>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default{
  props: {
    sub_tab: Number,
    contents: Array
  },
data() {
    return{
        // nomal: 일반현황 테이블에서만 노출되는 내용
    }
  },
}
</script>

<style lang="scss" scoped>
#Table{
    .table_box{
        .content{
            padding: 12px 0;
            border-bottom: 1px solid #F4F4F6;
            .no{
                display: flex;
                span{
                    color: #0064FF;
                    font-weight: bold;
                    margin-right: 8px;
                }
                P{
                    color: #3D414F;
                    font-weight: 500;
                }
            }
            >p{
                font-size: 14px;
                color: #5B6071;
                padding-top: 8px;
            }
            .info{
                display: flex;
                dl{
                    display: flex;
                    margin-top: 8px;
                    margin-right: 8px;

                    dt{
                        margin-right: 4px;
                        color: #969AA6;
                        font-size: 14px;
                    }
                    dd{
                        font-size: 14px;
                        color: #3D414F;
                    }
                    &:last-child{
                        margin-right: 0px;

                    }
                }
            }
        }
    }

    // .table_box{
    //     ul{
    //         display: flex;
    //         justify-content: space-between;
    //         flex-wrap: nowrap;
    //         border-bottom: 1px solid #D4D4D4;
    //         width: 100%;
    //         margin: 0;
    //         li{
    //             text-align: center;
    //             min-width: 56px;
    //             &:first-child{
    //                 width: 30px;
    //                 min-width: 30px;
    //                 // padding-top: 28px;
    //             }
    //             &:last-child{
    //                 border-right: none;
    //             }
    //         }
    //     }
    //     .first_row{
    //         background-color: #E1E9F9;
    //         border-radius: 4px 4px 0px 0px;
    //         li{
    //             padding: 12px 0;
    //             width: 32%;
    //             &:first-child{
    //                 width: 12%;
    //                 padding-left: 4px;
    //             }
    //             &:nth-child(2){
    //                 width: 40%;
    //             }
    //         }
    //     }
    //     .row{
    //         align-items: center;
    //         li{
    //             width: 32%;
    //             padding: 12px 0;
    //             &:first-child{
    //                 width: 12%;
    //             }
    //             &:nth-child(2){
    //                 width: 40%;
    //             }
    //         }

    //     }
    // }
}
</style>
