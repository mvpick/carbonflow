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
        <div class="input">
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
        on_tab:0,
    }
  }
}
</script>

<style lang="scss" scoped>
#table{
    .tab_section{
        margin-bottom: 20px;
    }
    
}
</style>
