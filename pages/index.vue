<template>
<div id="index">
    
    <div class="map-wrapper">

        <!-- 지도 -->
        <div id="map"></div>

        <div class="menu_box">
            <div class="button_box">
                <button class="mainBtn2" @click="onRegionEmission" v-if="regionButtonStatus===false">
                    <img src="~assets/img/icon/index_btn1.png" alt="">
                    <p>지역배출량</p>
                </button>
                <button class="mainBtn1" @click="offRegionEmission" v-if="regionButtonStatus===true">
                    <img src="~assets/img/icon/index_btn1w.png" alt="">
                    <p>지역배출량</p>
                </button>


                <button class="mainBtn2" @click="onRegionVariation" v-if="variationButtonStatus===false">
                    <img src="~assets/img/icon/index_btn2.png" alt="">
                    <p>증감량</p>
                </button>
                <button class="mainBtn1" @click="offRegionVariation" v-if="variationButtonStatus===true">
                    <img src="~assets/img/icon/index_btn2.png" alt="">
                    <p>증감량</p>
                </button>

                <button class="mainBtn2" @click="onCompanyNumber()" v-if="companyButtonStatus==false">
                    <img src="~assets/img/icon/index_btn3.png" alt="">
                    <p>참여기업 수</p>
                </button>
                <button class="mainBtn1" @click="offCompanyNumber()" v-if="companyButtonStatus==true">
                    <img src="~assets/img/icon/index_btn3w.png" alt="">
                    <p>참여기업 수</p>
                </button>

                <button class="mainBtn2" @click="onNationalEmission()" v-if="nationalButtonStatus==false">
                    <img src="~assets/img/icon/index_btn4.png" alt="">
                    <p>국제 배출량 순위</p>
                </button>
                <button class="mainBtn1" @click="offNationalEmission()" v-if="nationalButtonStatus==true">
                    <img src="~assets/img/icon/index_btn4w.png" alt="">
                    <p>국제 배출량 순위</p>
                </button>
            </div>
            
            <div class="input" v-if="yearBarStatus">
                <select name="" id="" v-model="year" @change="onChangeYear()"> 
                    <option value="">기준연도를 선택하세요.</option>
                    <option v-for="(item, index) in years" :key="index" :value="item">
                        {{item}}년
                    </option>
                </select>
            </div>

            <div class="rank_chart" v-show="rankBarStatus">
                <canvas id="myChart"></canvas>
            </div>
        </div>

    </div>
</div>

</template>

<script>
import sido from '~/json/sido.json' // 지역 위경도
export default {
    data() {
        return {

            // 버튼 상태
            regionButtonStatus: false,
            variationButtonStatus: false,
            companyButtonStatus: false,
            yearBarStatus: false,
            nationalButtonStatus: false,
            rankBarStatus: false,

            // 데이터
            years: [],
            year: '',
            regionEmissions: [],
            variation: [],
            company: [],

            // 지도 데이터
            map: null,
            polygons: [],
            markers: [], // 마커 데이터 집합
            markerStatus: 0, // 0: 빈화면, 1: 마커표시
            infowindows: [], // 인포윈도 데이터 집합

            // 바 차트
            labels: [],
            barChartData : null,
            barChartOptions : null,

        }
    },
    mounted() {
        kakao.maps.load(this.initMap())
    },
    methods: {
        async onNationalEmission() {
            this.nationalButtonStatus = true
            this.rankBarStatus = true

            try {
                const res = await this.$axios.get('/allData/getInternationalEmission')
                const nationalData = res.data.data
                let labels = []
                let data = []

                nationalData.map(item => {
                    labels.push(item.country)
                    data.push(item.value)
                })

                var ctx = document.getElementById('myChart').getContext('2d');
                new Chart(ctx, {
                    type: 'horizontalBar', // 만들기 원하는 차트의 유형
                    data: { // 데이터 집합을 위한 데이터
                        labels, 
                        datasets: [{
                            label: '국제배출량 순위',
                            backgroundColor: '#A9D8B1',
                            borderColor: '#A9D8B1',
                            data,
                        }]
                    },
                    options: { // 설정
                        legend: { // 타이틀
                            labels: {
                                fontColor: "white",
                                fontSize: 14
                            }
                        },
                        scales: {
                            yAxes: [{ // y축 스타일
                                ticks: {
                                    beginAtZero: true,
                                    stepSize : 2,
                                    fontColor : "white",
                                    fontSize : 10,
                                },
                                gridLines:{
                                    lineWidth: 0
                                }
                            }],
                            xAxes: [{ // x축 스타일
                                ticks: {
                                    beginAtZero: true,
                                    stepSize : 2,
                                    fontColor : "white",
                                    fontSize : 10,
                                },
                                gridLines:{
                                    lineWidth: 0
                                },
                                ticks: {
                                    stepSize: 2000,
                                    fontColor : "white",
                                },
                            }],
                        }
                    }
                })
            } catch (err) {
                console.log(err)
            }
        },

        offNationalEmission() {
            this.nationalButtonStatus = false
            this.rankBarStatus = false
        },

        async onCompanyNumber() {
            this.companyButtonStatus = true
            try {
                const res = await this.$axios.get('/allData/getEnterpriseEmission')
                console.log(res.data.data)
                this.company = res.data.data
                this.drawMarker()
            } catch (err) {
                console.log(err)
            }
        },

        offCompanyNumber() {
            this.companyButtonStatus = false
            this.eraseMarker()
        },

        postLatLang() { // 주소 검색 후 위경도 주입 
            let geocoder = new kakao.maps.services.Geocoder()
            const _this = this
            this.company.map(company => {
                geocoder.addressSearch(company.address, async function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        const lat = result[0].y
                        const lng = result[0].x
                        const res = await _this.$axios.post('/allData/postLatLng', {
                            id: company.id,
                            lat,
                            lng
                        })
                        console.log(res)
                    } 
                })
            })
        },

        drawMarker() {
            this.company.map(company => {

                let position = new kakao.maps.LatLng(company.lat, company.lng)

                let markerImageSrc = "images/markerCo2.png"
                let imageSize = new kakao.maps.Size(18, 24)
                let imageOptions = {}
                let markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize, imageOptions)

                let marker = new kakao.maps.Marker({ // 마커 객체
                    position: position,
                    image: markerImage,
                    clickable: true
                })
                this.markers.push(marker)

                let iwContent = `<div style="width: 200px; text-align:center; padding:6px; margin: 0 auto; font-size: 14px;">
                                    <div>${company.companyName}</div>
                                    <div>${company.value}tC / ${company.year.name}년</div>
                                </div>`
                // let iwRemoveable = true

                let infowindow = new kakao.maps.InfoWindow({ // 인포윈도우 객체
                    content : iwContent,
                    // removable : iwRemoveable
                })
                this.infowindows.push(infowindow)

                // 마커에 클릭이벤트를 등록합니다
                const _this = this
                kakao.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(_this.map, marker)
                })

                marker.setMap(this.map)

            })
            
        },

        eraseMarker() {
            this.markers.map(marker => { marker.setMap(null) })
            this.markerStatus = 0
            this.markers = []
            this.infowindows.map(infowindow => { infowindow.close() })
            this.infowindows = []
        },


        // 지역배출량, 증감량 데이터 초기화
        data_reset() {
            this.erasePolygon()
            this.regionEmissions = []
            this.variation = []
            this.years = []
            this.year=''
        },
        // 증감량 on
        async onRegionVariation() {
            this.data_reset()
            this.variationButtonStatus = true
            this.yearBarStatus = true
            if(this.regionButtonStatus) { this.regionButtonStatus = false }
            try {
                const res = await this.$axios.get('/allData/getRegionVariationYear')
                console.log(res.data.data)
                this.years = res.data.data
            } catch (err) {
                console.log(err)
            }
        },
        // 증감량 off
        offRegionVariation() {
            this.variationButtonStatus = false
            this.yearBarStatus = false
            this.data_reset()
        },

        // 증감량 데이터 조회
        async getRegionVariation() {
            try {
                const res = await this.$axios.post('/allData/getRegionVariation', { year: this.year })
                console.log(res.data.data)
                this.variation = res.data.data
            } catch (err) {
                console.log(err)
            }
        },

        // 지역배출량 on
        async onRegionEmission() {
            this.data_reset()
            this.regionButtonStatus = true
            this.yearBarStatus = true
            if(this.variationButtonStatus) { this.variationButtonStatus = false }
            try {
                const res = await this.$axios.get('/allData/getRegionEmissionYear')
                console.log(res.data.data)
                this.years = res.data.data
            } catch (err) {
                console.log(err)
            }
        },
        // 지역배출량 연도 선택시 폴리곤 draw
        async onChangeYear() {
            this.erasePolygon()
            try {
                if(this.regionButtonStatus) {
                    await this.getRegionEmission()
                    this.drawPolygon(1)
                } else if(this.variationButtonStatus) {
                    await this.getRegionVariation()
                    this.drawPolygon(2)
                }
            } catch (err) {
                console.log(err)
            }
        },
        // 지역배출량 데이터 조회
        async getRegionEmission() {
            try {
                const res = await this.$axios.post('/allData/getRegionEmission', { year: this.year })
                console.log(res.data.data)
                this.regionEmissions = res.data.data
            } catch (err) {
                console.log(err)
            }
        },
        // 지역배출량 off
        offRegionEmission() {
            this.regionButtonStatus = false
            this.yearBarStatus = false
            this.data_reset()
        },

        drawPolygon(type) { // type = 1 : 지역배출량 그리기, 2: 증감량 그리기
            const sido_array = sido.features // 시도 데이터 배열 생성
            let regionPolygonData = []
            sido_array.map(item => {
                let value 
                if(type === 1) {
                    value = this.regionEmissions.filter(region => region.name === item.properties.CTP_KOR_NM)[0].value
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
        },

        

        erasePolygon() {
            this.polygons.map(polygon => { polygon.setMap(null) })
            this.polygons = []
        },


        initMap() { // 맵 세팅
            const container = document.getElementById("map") // DOM 레퍼런스
            const options = {
                center: new kakao.maps.LatLng(36.4895, 127.7295), // 중심좌표
                level: 12, // 확대, 축소
            }
            let map = new kakao.maps.Map(container, options) // 지도 생성
            this.map = map
        },

        getColorFromEmission(value) { // 색깔 생성기
            let emissions = []
            this.regionEmissions.map(region => { emissions.push(region.value) })
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

    }
}
</script>

<style lang="scss" scoped>
#index{
    .map-wrapper {
        height: calc(100vh - 64px);
        width: 100vw;
        position: relative;

        #map {
            height: calc(100vh - 64px);
            width: 100vw;
        }

        .menu_box{
            position: absolute;
            top: 0;
            z-index: 1000;
            width: 100%;
            padding-left: 16px;
            @include desktop{
                max-width: 600px;
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
                
            }
            .input{
                margin: 12px 16px 0 0;
            }
            .button_box{
                display: flex;
                margin: 12px 0;
                overflow-x: scroll;
                // flex-wrap: wrap;
                .button{
                    width: 100%;
                    margin-right: 4px;
                    @include desktop{
                        margin-right: 8px;
                    }
                    button{
                        display: flex;
                        justify-content:center;
                        margin-right: 4px;
                        padding: 8px 12px;
                        img{
                            margin-right: 4px;
                        }
                        p{
                            white-space: nowrap;
                        }
                        @include desktop{
                            margin-right: 8px;
                        }
                        // &:last-child{
                        //     color: #fff;
                        // }

                    }
                    .mainBtn1{
                        p{
                            color: #fff;
                        }
                    }
                }
                button{
                    display: flex;
                    justify-content:center;
                    margin-right: 4px;
                    padding: 8px 12px;
                    img{
                        margin-right: 4px;
                    }
                    p{
                        white-space: nowrap;
                    }
                    @include desktop{
                        margin-right: 8px;
                    }
                }
                .mainBtn1{
                    p{
                        color: #fff;
                    }
                }
                
            }
            .rank_chart{
                background-color: rgba(0, 0, 0, 0.4);
                padding: 8px;
                margin: 16px;
                border-radius: 12px;
                color: #fff;
                @include desktop{
                    padding: 16px;
                }
            }
        }
        // .pc_menubox{
        //     position: absolute;
        //     top: 0;
        //     z-index: 1000;
        //     width: 100%;

        //     display: none;
        //     @include desktop{
        //         display: block;
        //     }
        //     .option_box{
        //         display: flex;
        //         justify-content: space-between;
        //         align-items: flex-start;
        //         width: 100%;
        //         margin: 0 auto;
        //         padding: 20px 16px;
        //         .button_box{
        //             display: flex;
        //             align-items: center;
        //             width: 65%;
        //             .input{
        //                 margin-bottom: 0;
        //                 margin-right: 10px;
        //                 width: 17%;
        //             }
        //             .button{
        //                 display: flex;
        //                 width: 80%;
        //                 button{
        //                     margin-right: 10px;
        //                 }
        //             }
        //             &:nth-child(2){
        //                 width: 35%;
        //                 display: flex;
        //                 flex-direction: column;
        //                 align-items: flex-end;
        //                 button{
        //                     width: 100px;
        //                     margin-bottom: 10px;
        //                     &:last-child{
        //                         margin-bottom: 0;
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }


        // .chart_modal_box{
        //     background-color: #fff;
        //     padding: 40px 16px;
        //     .industry,
        //     .year{
        //         padding: 16px;
        //         box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
        //         border-radius: 4px;
        //     }

        // }
    }
    

    
}

</style>

