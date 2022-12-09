<template>
    <div>
        <div id="map" style="width: 1000px; height: 800px"></div>
    </div>
  </template>
  
  <script>
  import sigungu from '~/assets/data/sigungu.json'
  export default {
    name: 'TestPage',
    data() {
        return {
            map: null,
            sigungu: null,
            coordinates: []
        }
    },
    mounted() {
        this.sigungu = sigungu
        console.log('geo data')
        console.log(sigungu)
        console.log(sigungu.features[0].properties.SIG_ENG_NM) // 종로구 영어 이름
        console.log(sigungu.features[0].geometry.coordinates[0].length) // 종로구 좌표 개수
        console.log(sigungu.features[0].geometry.coordinates[0]) // 종로구 좌표 배열
        this.coordinates = sigungu.features[0].geometry.coordinates[0]

        kakao.maps.load(this.initMap)
    },
    methods: {
        initMap() {
            const container = document.getElementById("map") // DOM 레퍼런스

            const options = {
                center: new kakao.maps.LatLng(38.072648233869785, 127.60472638427933), // 중심좌표
                level: 5, // 확대, 축소
            }

            let map = new kakao.maps.Map(container, options) // 지도 생성
            this.map = map

            let polygonPath = []
            this.coordinates.map(item => {
                const latLng = new kakao.maps.LatLng(item[1], item[0])
                polygonPath.push(latLng)
            })

            var polygon = new kakao.maps.Polygon({
                path:polygonPath, // 그려질 다각형의 좌표 배열입니다
                strokeWeight: 3, // 선의 두께입니다
                strokeColor: '#39DE2A', // 선의 색깔입니다
                strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle: 'longdash', // 선의 스타일입니다
                fillColor: '#A2FF99', // 채우기 색깔입니다
                fillOpacity: 0.7 // 채우기 불투명도 입니다
            })

            polygon.setMap(map)

            // let geocoder = new kakao.maps.services.Geocoder()
            // console.log(geocoder)


            // geocoder.addressSearch(
            //     "제주특별자치도 제주시 첨단로 242", // 주소
            //     function (result, status) {
            //         // console.log(result)
            //         // console.log(status)
            //         if (status === kakao.maps.services.Status.OK) { // 정상적으로 검색이 완료됐으면
            //             var coords = new kakao.maps.LatLng(result[0].y, result[0].x)

            //             var marker = new kakao.maps.Marker({ // 정상적으로 검색이 완료됐으면
            //                 map: map,
            //                 position: coords,
            //             })

            //             var infowindow = new kakao.maps.InfoWindow({ // 인포윈도우로 장소에 대한 설명을 표시
            //                 content:
            //                     '<div style="width:150px;text-align:center;padding:6px 0;">Kakao</div>',
            //             })
            //             infowindow.open(map, marker)

            //             map.setCenter(coords) // 지도의 중심을 결과값으로 받은 위치로 이동
            //         }

            //     }
            // )


        },
    },
  }
  </script>
  