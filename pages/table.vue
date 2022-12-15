<template>
<div id="table">
    <div class="com_contain">
        <section class="tab_section">
            <div class="flex_box">
                <button @click="on_tab=0" 
                :class="{ 'on_tab' : on_tab === 0 }">목표 관리제</button>
                <button @click="on_tab=1"
                :class="{ 'on_tab' : on_tab === 1 }">배출권 거래제</button>
            </div>
        </section>
        <div class="top_box">
            <div class="button_box">
                <button class="tab_btn" @click="sub_tab=0" 
                    :class="{ 'sub_tab' : sub_tab === 0 }">일반현황</button>
                    <button class="tab_btn" @click="sub_tab=1"
                    :class="{ 'sub_tab' : sub_tab === 1 }">개별 기업 배출량 정보</button>
            </div>
            <div class="" v-if="sub_tab==0">
                <p>*2021년 기준</p>
            </div>
        </div>


        <div class="input" v-if="sub_tab==1">
            <input type="text" class="search" placeholder="업체명을 입력해 주세요">
        </div>
        
        <div class="target" v-if="on_tab==0">
            <Table/>
        </div>
        <div class="carbon_trading" v-if="on_tab==1">
            <Table/>
        </div>
    </div>
</div>
</template>

<script>    
export default{
data() {
    return{
        // 0:목표 관리제, 1:배출권 거래제
        on_tab:0,
        // 0:일반현황, 1:개별 기업 배출량 정보
        sub_tab:0,
    }
  }
}
</script>

<style lang="scss" scoped>
#table{
 	padding-bottom: 100px;

    .tab_section{
        margin-bottom: 20px;
    }
    p{
        margin: 32px 0 16px;
        color: #5B6071;
    }
    .input{
        margin-bottom: 16px;
    }

    .button_box{
        display: flex;
        margin-bottom: 16px;
        button{
			margin-right: 12px;
			// font-weight: bold;
			// padding: 8px 12px;
			// width: 100%;
            border-radius: 4px;
			
			&:nth-child(2){
				// margin-left: 12px;
			}
			&.sub_tab{
				color: #fff;
				background-color: $color_main;
				// font-weight: bold;
			}
		}
    }
    
}
</style>
