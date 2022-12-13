<template>
<div id="index">
    
    <div class="map-wrapper">
        <div id="map"></div>

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
                    <button class="mainBtn2">지역배출량</button>
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
                        <button class="mainBtn2">지역배출량</button>
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
</div>

</template>

<script>
import sido from '~/json/sido.json'
export default {
    data() {
        return {
            button_box:false,
            chart_modal:false,
            table_modal:false,
            on_tab:0,

            region: {
                '서울특별시': 12324706,
                '부산광역시': 6787007,
                '대구광역시': 3697602,
                '인천광역시': 45126832,
                '광주광역시': 1443049,
                '대전광역시': 3867799,
                '울산광역시': 47203695,
                '세종특별자치시': 2245895,
                '경기도': 62896149,
                '강원도': 44206196,
                '충청북도': 21256076,
                '충청남도':	141911607,
                '전라북도':	13578538,
                '전라남도':	93199097,
                '경상북도':	50697916,
                '경상남도':	35581389,
                '제주특별자치도': 1584366
            },

            map: null,
            sigungu: null,
            sido: null,
            coordinates: [],

            markers: [],

            regionEmission: []
        }
    },
    mounted() {
        kakao.maps.load(this.initMap)
        this.createRegionEmission()
        this.drawRegionEmission()
    },
    methods: {

        createRegionEmission() { // 지역배출량 배열 생성
            const sido_array = sido.features
            sido_array.map(item => {
                console.log(item)
                this.regionEmission.push({
                    regionName: item.properties.CTP_KOR_NM,
                    emission: this.region[item.properties.CTP_KOR_NM],
                    coordinates: item.geometry.coordinates
                })
            })
            console.log(this.regionEmission)
        },

        drawRegionEmission() { // 지역배출량 지도 표시
            this.regionEmission.map((region, index) => {
                region.coordinates.map((polygonCoordinates) => {
                    let polygonPath = []
                    polygonCoordinates.map(coordinate => { // 덩어리 하나 만들기
                        const latLng = new kakao.maps.LatLng(coordinate[1], coordinate[0])
                        polygonPath.push(latLng)
                    })
                    let polygon = new kakao.maps.Polygon({
                        path:polygonPath, // 그려질 다각형의 좌표 배열입니다
                        strokeWeight: 3, // 선의 두께입니다
                        strokeColor: '#ff0000', // 선의 색깔입니다
                        strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                        strokeStyle: 'longdash', // 선의 스타일입니다
                        fillColor: '#ff0000', // 채우기 색깔입니다
                        fillOpacity: 0.2 + ( 0.5 * (index + 1) / 17 ) // 채우기 불투명도 입니다
                    })
                    polygon.setMap(this.map)
                })
             
            })
        },

        initMap() {
            const container = document.getElementById("map") // DOM 레퍼런스
            const options = {
                center: new kakao.maps.LatLng(38.072648233869785, 127.60472638427933), // 중심좌표
                level: 12, // 확대, 축소
            }
            let map = new kakao.maps.Map(container, options) // 지도 생성
            this.map = map
        },
    }
}
</script>

<style lang="scss" scoped>
#index{

    .map-wrapper {
        border: 1px solid red;
        height: calc(100vh - 64px);
        width: 100vw;
        position: relative;

        #map {
            height: calc(100vh - 64px);
            width: 100vw;
        }

        .mobile_menubox{
            position: absolute;
            top: 0;
            z-index: 1000;
            width: 100%;

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
            position: absolute;
            top: 0;
            z-index: 1000;
            width: 100%;

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
    }
    

    
}

</style>

