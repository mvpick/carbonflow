<template>
<div id="chart">
    <div class="com_contain">
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
#chart{
    .tab_section{
        margin-bottom: 40px;
    }
    .industry,
    .year{
        padding: 16px;
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }
}
</style>
