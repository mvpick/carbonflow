<template>
    <div>
        <button @click="drawMarker">마커하나찍기</button>
        <button @click="onClickCompany">참여기업수</button>
        <div id="map" style="width: 1000px; height: 800px"></div>
    </div>
  </template>

  <script>
  import sigungu from '~/json/sigungu.json'
  export default {
    data() {
        return {
            map: null,
            sigungu: null,
            coordinates: [],

            markers: [],

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
        onClickCompany() {
            
        },

        // 마커를 생성하고 지도위에 표시하는 함수입니다
        addMarker(position) {
            
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                position: position
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);
            
            // 생성된 마커를 배열에 추가합니다
            markers.push(marker);
        },
        
        drawMarker() {
            let geocoder = new kakao.maps.services.Geocoder()
            let _this = this
            geocoder.addressSearch(
                "제주특별자치도 제주시 첨단로 242", // 주소
                function (result, status) {
                    if (status === kakao.maps.services.Status.OK) { // 검색완료

                        var position = new kakao.maps.LatLng(result[0].y, result[0].x) // 위치 생성

                        var marker = new kakao.maps.Marker({ // 마커 객체 생성
                            position: position,
                            clickable: true
                        })

                        marker.setMap(_this.map) // 마커 찍기

                        var iwContent = '<div style="padding:5px;">데이터</div>', // 인포윈도우에 내용
                        iwRemoveable = true // x 버튼

                        var infowindow = new kakao.maps.InfoWindow({
                            content : iwContent,
                            removable : iwRemoveable
                        })

                        kakao.maps.event.addListener(marker, 'click', function() { // 인포윈도우 이벤트
                            infowindow.open(_this.map, marker)
                        })

                        _this.map.setCenter(position) // 지도 중심 마커로 이동
                    }

                }
            )
        },
        initMap() {
            const container = document.getElementById("map") // DOM 레퍼런스
            const options = {
                center: new kakao.maps.LatLng(38.072648233869785, 127.60472638427933), // 중심좌표
                level: 12, // 확대, 축소
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

        },
    },
  }
  </script>
