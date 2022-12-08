<template>
    <div>
        <div id="map" style="width: 500px; height: 400px"></div>
    </div>
  </template>

  <script>
  export default {
    data() {
        return {
            map: null,
        }
    },
    mounted() {
        kakao.maps.load(this.initMap);
    },
    methods: {
        initMap() {
            const container = document.getElementById("map") // DOM 레퍼런스

            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 중심좌표
                level: 5, // 확대, 축소
            }

            let map = new kakao.maps.Map(container, options) // 지도 생성
            this.map = map

            let geocoder = new kakao.maps.services.Geocoder()
            console.log(geocoder)


            geocoder.addressSearch(
                "제주특별자치도 제주시 첨단로 242", // 주소
                function (result, status) {
                    console.log(result)
                    console.log(status)
                    if (status === kakao.maps.services.Status.OK) { // 정상적으로 검색이 완료됐으면
                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x)

                        var marker = new kakao.maps.Marker({ // 정상적으로 검색이 완료됐으면
                            map: map,
                            position: coords,
                        })

                        var infowindow = new kakao.maps.InfoWindow({ // 인포윈도우로 장소에 대한 설명을 표시
                            content:
                                '<div style="width:150px;text-align:center;padding:6px 0;">Kakao</div>',
                        })
                        infowindow.open(map, marker)

                        map.setCenter(coords) // 지도의 중심을 결과값으로 받은 위치로 이동
                    }

                }
            )
        },
    },
  }
  </script>
