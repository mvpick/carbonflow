<template>
<div id="index">
    
    <div class="map-wrapper">

        <!-- 지도 -->
        <div id="map"></div>

        <!-- 모바일메뉴 -->
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
                        <option value="">2017년</option>
                        <option value="">2016년</option>
                        <option value="">2015년</option>
                        <option value="">2014년</option>
                        <option value="">2013년</option>
                        <option value="">2012년</option>
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

        <!-- PC메뉴 -->
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
                            <option value="">2017년</option>
                            <option value="">2016년</option>
                            <option value="">2015년</option>
                            <option value="">2014년</option>
                            <option value="">2013년</option>
                            <option value="">2012년</option>
                        </select>
                    </div>
                    <div class="button">
                        <button class="mainBtn2" @click="onRegionEmission()">지역배출량</button>
                        <button class="mainBtn2" @click="onRegionVariation()">증감량</button>
                        <button class="mainBtn2" @click="onCompanyNumber()">참여기업수</button>
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
import sido from '~/json/sido.json' // 지역 위경도
export default {
    data() {
        return {
            button_box: false,
            chart_modal: true,
            table_modal: true,
            on_tab:0,

            map: null,
            polygons: [],
            polygonStatus: 0, // 0: 빈화면, 1: 지역배출량, 2: 증감량
            markers: [], // 마커 표현 데이터
            markerStatus: 0, // 0: 빈화면, 1: 마커표시
            infowindows: [],

            region: [
                { name: '서울특별시', value: 12324706 },
                { name: '부산광역시', value: 6787007 },
                { name: '대구광역시', value: 3697602 },
                { name: '인천광역시', value: 45126832 },
                { name: '광주광역시', value: 1443049 },
                { name: '대전광역시', value: 3867799 },
                { name: '울산광역시', value: 47203695 },
                { name: '세종특별자치시', value: 2245895 },
                { name: '경기도', value: 62896149 },
                { name: '강원도', value: 44206196 },
                { name: '충청북도', value: 21256076 },
                { name: '충청남도', value: 141911607 },
                { name: '전라북도', value: 13578538 },
                { name: '전라남도', value: 93199097 },
                { name: '경상북도', value: 50697916 },
                { name: '경상남도', value: 35581389 },
                { name: '제주특별자치도', value: 1584366 },
            ],

            variation: [
                { name: '서울특별시', value: true },
                { name: '부산광역시', value: false },
                { name: '대구광역시', value: true },
                { name: '인천광역시', value: false },
                { name: '광주광역시', value: true },
                { name: '대전광역시', value: false },
                { name: '울산광역시', value: true },
                { name: '세종특별자치시', value: false },
                { name: '경기도', value: true },
                { name: '강원도', value: false },
                { name: '충청북도', value: true },
                { name: '충청남도', value: false },
                { name: '전라북도', value: true },
                { name: '전라남도', value: false },
                { name: '경상북도', value: true },
                { name: '경상남도', value: false },
                { name: '제주특별자치도', value: true },
            ],

            company: [
                { name: '(유)에스케이씨에보닉페록사이드코리아', address: '울산광역시 남구 상개로 99(상개동)', value: 57349, year: 2021, },
                { name: '(주)HJ매그놀리아용평호텔앤리조트', address: '강원도 평창군 대관령면 올림픽로 715', value: 33424, year: 2021, },
                { name: '(주)MSC', address: '경상남도 양산시 소주회야로 45-73', value: 29558, year: 2021, },
            ],

            
        }
    },
    mounted() {
        kakao.maps.load(this.initMap())
    },
    methods: {

        initMap() { // 맵 세팅
            const container = document.getElementById("map") // DOM 레퍼런스
            const options = {
                center: new kakao.maps.LatLng(36.4895, 127.7295), // 중심좌표
                level: 12, // 확대, 축소
            }
            let map = new kakao.maps.Map(container, options) // 지도 생성
            this.map = map
        },

        drawMarker() {
            console.log('call on company')
            let geocoder = new kakao.maps.services.Geocoder()
            const _this = this

            this.company.map(company => {
                geocoder.addressSearch(company.address, function(result, status) {
                    if (status === kakao.maps.services.Status.OK) { // 정상적으로 검색이 완료됐으면 


                        let position = new kakao.maps.LatLng(result[0].y, result[0].x)

                        let markerImageSrc = "images/markerCo2.png"
                        let imageSize = new kakao.maps.Size(18, 24)
                        let imageOptions = {}
                        let markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize, imageOptions)

                        let marker = new kakao.maps.Marker({
                            position: position,
                            image: markerImage
                        })

                        marker.setMap(_this.map)

                        // let marker = new kakao.maps.Marker({ // 결과값으로 받은 위치를 마커로 표시합니다
                        //     map: _this.map,
                        //     position: coords
                        // })
                        let infowindow = new kakao.maps.InfoWindow({ // 인포윈도우로 장소에 대한 설명을 표시합니다
                            content: `
                                <div style="width:150px;text-align:center;padding:6px 0;">
                                    ${company.name}  / ${company.value} / ${company.year}
                                </div>
                            `
                        })
                        _this.infowindows.push(infowindow)
                        infowindow.open(_this.map, marker)
                        _this.markers.push(marker)
                        _this.markerStatus = 1
                    } 
                })  
            })
            
        },

        eraseMarker() {
            this.markers.map(marker => { marker.setMap(null) })
            this.markerStatus = 0
            this.markers = []

            this.infowindows.map(infowindow => { infowindow.close() })
            this.infowindows = []
        },

        onCompanyNumber() {
            if(this.markerStatus === 0) {
                this.drawMarker()
            } else if(this.markerStatus === 1) {
                this.eraseMarker()
            }
        },

        onRegionEmission() {
            if(this.polygonStatus === 0) {
                this.drawPolygon(1)
            } else if(this.polygonStatus === 1) {
                this.erasePolygon()
            } else if (this.polygonStatus === 2) {
                this.erasePolygon()
                this.drawPolygon(1)
            }
        },
        onRegionVariation() {
            if(this.polygonStatus === 0) {
                this.drawPolygon(2)
            } else if(this.polygonStatus === 1) {
                this.erasePolygon()
                this.drawPolygon(2)
            } else if (this.polygonStatus === 2) {
                this.erasePolygon()
            }
        },

        drawPolygon(type) { // type = 1 : 지역배출량, 2: 증감량

            const sido_array = sido.features // 시도 데이터 배열 생성
            let regionPolygonData = []
            sido_array.map(item => {
                let value 
                if(type === 1) {
                    value = this.region.filter(region => region.name === item.properties.CTP_KOR_NM)[0].value
                } else if (type === 2) {
                    value = this.variation.filter(region => region.name === item.properties.CTP_KOR_NM)[0].value
                }
                regionPolygonData.push({
                    regionName: item.properties.CTP_KOR_NM,
                    coordinates: item.geometry.coordinates,
                    value,
                })
            })

            regionPolygonData.map((region) => { // 폴리곤 생성 및 배열에 담기
                region.coordinates.map((polygonCoordinates) => {
                    let polygonPath = []
                    polygonCoordinates.map(coordinate => { // 덩어리 하나 만들기
                        const latLng = new kakao.maps.LatLng(coordinate[1], coordinate[0])
                        polygonPath.push(latLng)
                    })
                    let polygon = new kakao.maps.Polygon({
                        path:polygonPath, // 그려질 다각형의 좌표 배열입니다
                        strokeWeight: 3, // 선의 두께입니다
                        strokeColor: type === 1 ? this.getColorFromEmission(region.value) : this.getColorFromVariation(region.value), // 선의 색깔입니다
                        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                        strokeStyle: 'longdash', // 선의 스타일입니다
                        fillColor: type === 1 ? this.getColorFromEmission(region.value) : this.getColorFromVariation(region.value), // 채우기 색깔입니다
                        fillOpacity: 0.4 // 채우기 불투명도 입니다
                    })
                    this.polygons.push(polygon)
                })
            })

            // 지도에 표시
            this.polygons.map(polygon => { polygon.setMap(this.map) })
            this.polygonStatus = type
        },

        getColorFromEmission(value) { // 색깔 생성기
            let emissions = []
            this.region.map(region => { emissions.push(region.value) })
            const maxValue = Math.max.apply(null, emissions)
            const unit = Math.ceil(maxValue / 4) 

            const lv1_min = 0
            const lv2_min = unit
            const lv3_min = unit * 2
            const lv4_min = unit * 3
            const lv4_max = unit * 4

            if (value >= lv1_min && value < lv2_min) {
                return '#27D1BD'
            } else if (value >= lv2_min && value < lv3_min) {
                return '#FFD600'
            } else if (value >= lv3_min && value < lv4_min) {
                return '#FF9900'
            } else if (value >= lv4_min && value < lv4_max) {
                return '#FF4D00'
            }
        },

        getColorFromVariation(value) { // 색깔 생성기
            if (value) {
                return '#FF5C00'
            } else if (!value) {
                return '#3091EB'
            }
        },

        erasePolygon() {
            this.polygons.map(polygon => { polygon.setMap(null) })
            this.polygonStatus = 0
            this.polygons = []
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

