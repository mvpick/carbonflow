<template>
    <div id="test">
        <div class="com_contain">

            <div class="input">
                <h1 class="inputName">안녕하세요</h1>
                <input type="text" placeholder="하이하이">
            </div>

            <div class="input">
                <h1 class="inputName ft_Bl">이메일</h1>
                <div class="input2Box">
                    <input type="text" placeholder="하이하이">
                    <button class="mainBtn1 inputBtn">ㅇㅇ</button>
                </div>
            </div>

            <div class="input">
                <h1 class="inputName">안녕하세요</h1>
                <input type="text" placeholder="하이하이" disabled>
            </div>

            <div class="input">
                <select name="" id="">
                    <option value="">선택해주세요</option>
                </select>
            </div>

            <div class="input">
                <input type="text" class="search">
            </div>

            <div>

            </div>

            <div class="input">
                <div class="checkbox_contain">
                    <label for="check1">체크박스</label>
                    <input id="check1" type="checkbox">
                </div>
                <div class="checkbox_contain">
                    <label for="check2">체크된거</label>
                    <input id="check2" type="checkbox" checked>
                </div>
                <div class="checkbox_contain">
                    <label>disabled</label>
                    <input type="checkbox" disabled>
                </div>
            </div>

            <div class="entry_input">
                <div class="checkbox_contain">
                    <label for="check1">체크박스</label>
                    <input id="check1" type="checkbox">
                </div>
                <div class="checkbox_contain">
                    <label for="check2">체크된거</label>
                    <input id="check2" type="checkbox" checked>
                </div>
                <div class="checkbox_contain">
                    <label>disabled</label>
                    <input type="checkbox" disabled>
                </div>
            </div>

            <div class="input">
                <div class="checkbox_contain">
                    <label for="radio1">라디오 체크된거</label>
                    <input id="radio1" type="radio" checked>
                </div>
                <div class="checkbox_contain">
                    <label for="radio2">라디오 노체크</label>
                    <input id="radio2" type="radio">
                </div>
                <div class="checkbox_contain">
                    <label>라디오 disabled</label>
                    <input type="radio" disabled>
                </div>
            </div>

            <div class="input">

            </div>
            <div class="blank_space"></div>
            <div class="blank_space"></div>
            <div class="blank_space"></div>
            <div class="blank_space"></div>

            <h1 class="main_title">버튼 모음</h1>
            <button class="xBtn" @click="$moveTo('/')"></button>
            <button class="heart"></button>
            <button class="emheart"></button>
            <button class="more"></button>
            <button class="back"></button>
            <button class="mainBtn1">메인버튼</button>
            <button class="mainBtn">메인버튼</button>
            <button class="mainBtn2">취소</button>
            <button class="mini_mainBtn1">취소</button>
            <button class="mini_mainBtn2">팔로우</button>
            <button class="mini_mainBtn3">성별</button>
            <div class="btnBox">
                <button class="mainBtn2">ds</button>
                <button class="mainBtn1">ds</button>
            </div>
            <img src="~/assets/img/icon/coin_img.png" alt="">
            <div class="blank_space"></div>
            <button class="mainBtn1" disabled>border</button>
        </div>

    </div>
</template>

<script>


export default {
    data() {
        return {
            swiperOptions: {},
        }
    }
}
</script>
<style lang="scss" scoped>
#test {
    .com_contain {
        .main_tit {
            font-size: 24px;
            font-weight: 600;
        }
    }

    .mySwiper {
        .swiper-slide {
            background-color: aqua;
        }
    }

}
</style>
