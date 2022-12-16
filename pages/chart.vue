<template>
<div id="chart">
    <div class="com_contain">
        <select :disabled="on_tab === 1" name="" id="" v-model="selected_year_id" style="background-color:red">
          <option :value="item.id" v-for="(item, index) in year_select" :key="index">
              {{item.name}}
          </option>
        </select>
        <section class="tab_section">
            <div class="flex_box">
                <button @click="on_tab=0; show_table('pieChartData', 0)"
                :class="{ 'on_tab' : on_tab === 0 }">부문별 탄소 배출량</button>
                <button @click="on_tab=1; show_table('barChartOptions', 1)"
                :class="{ 'on_tab' : on_tab === 1 }">연도별 탄소 배출량</button>
            </div>
        </section>

        <div class="industry" v-if="on_tab==0">
          <PieChart :data="pieChartData" :options="pieChartOptions" />
        </div>
        <div class="year" v-if="on_tab==1">
          <BarChart :data="barChartData" :options="barChartOptions" />
        </div>
    </div>
</div>
</template>

<script>
export default{
  data() {
  return{
      selected_year_id : null,
      on_tab: -1,
      pieChartData : null,
      pieChartOptions : null,
      year_info : [],
      industry_info : [],
      year_select : [],
      barChartData : null,
      barChartOptions : null,
      ticks_max : null,
    }
  },
  mounted(){
    this.getDatas();
    this.show_table('pieChartData', 0);
  },
  watch:{
    "selected_year_id"(){
      // 부문별 탄소 배출량
      if(this.on_tab === 0 && this.selected_year_id !== null){
        console.log('부문별 탄소 배출량 탭')
        this.industry_info = this.industry_info.filter(item=>{
          return this.selected_year_id === item.id;
        });
        console.log(this.industry_info,'this.industry_info 전체전체')
        this.show_table('pieChartData', 0, this.industry_info);
      }
     
    },
    "on_tab"(){
      // 연도별 탄소 배출량
      if(this.on_tab === 1){
        this.show_table('barChartOptions', 1, this.year_info);
      }
    }
  },
  methods:{
    getDatas(){
      this.$axios.get('/allData/getAllData')
      .then(res => {
        this.year_select = res.data.data.year;
        this.ticks_max = Math.round(res.data.data.year_info[0].value) ;

        // 부문별 탄소 배출량
        for(let one of res.data.data.industry_info){
          let [__] = res.data.data.year.filter(item=>{
            return one.year_id === item.id;
          })
          one.year = __
          this.industry_info.push(one)
        }

        // 연도별 탄소 배출량
        for(let one of res.data.data.year){
          let [__] = res.data.data.year_info.filter(item=>{
            return one.id === item.year_id;
          })

          if(!!__) { 
            one.year = __;
            this.year_info.push(one);
          };
          
        }

      }).catch(err => {
        console.log(err);
      })
    },
    show_table(type, index, data){
      this.on_tab = index;
      if(type==='pieChartData' && index === 0){
        console.log('선택된 부문별 탄소 배출량 : ' , data);
        if(!!data){
          this.pieChartData.datasets[0].data = [];  // 데이터 수치 리셋
          this.pieChartData.datasets[0].data = [data[0].energy ,data[0].process , data[0].agriculture , data[0].lulucf, data[0].waste];
        }
        else{
          this.pieChartData = {
            labels: ['에너지', '산업공정', '농업', 'LULUCF', '폐기물'],
            datasets: [
              {
                data: [100,200,-300,400, 500],
                backgroundColor: ['red', 'blue', 'green', 'black', 'yellow'],
              }
            ]
          };
          this.pieChartOptions = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: false
              }
            }
          }
        }
      }
      
      if(type==='barChartOptions' && index === 1){
        console.log('전체 연도별 탄소 배출량 : ' , data);

        if(!!data){
          let x_year = [];
          let y_data = [];
          for(let one of data){
            x_year.push(one.name);
            y_data.push(one.year.value);
          };

          this.barChartOptions.scales.yAxes[0].ticks.max = 0; // y축 최대값 수치 리셋
          this.barChartData.labels = [];  // 데이터 기간 리셋
          this.barChartData.datasets[0].data = [];  // 데이터 수치 리셋

          this.barChartOptions.scales.yAxes[0].ticks.max = this.ticks_max;
          this.barChartData.labels = x_year;
          this.barChartData.datasets[0].data = y_data;
        }else{
          this.barChartData = {
            labels: ["2019-06", "2019-07", "2019-08", "2019-09", "2019-10", "2019-11"], // x 축
            datasets: [
              {
                label: "Visualizaciones",
                data: [2, 1, 16, 3, 4, 5], // y축
                backgroundColor: "rgba(20, 255, 0, 0.3)",
                borderColor: "rgba(100, 255, 0, 1)",
                borderWidth: 2,
              },
            ],
          };
          this.barChartOptions = {
            responsive: true,
            legend: {
              display: false,
            },
            title: {
              display: false
            },
            tooltips: {
              backgroundColor: "#17BF62",
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: true,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    max: 7,
                    min: 0,
                    stepSize: 1,
                  },
                  gridLines: {
                    display: true,
                  },
                },
              ],
            },
          };
        }
        
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#chart{
 	padding-bottom: 100px;
    .tab_section{
        margin-bottom: 40px;
    }
    .industry,
    .year{
        padding: 16px;
    }
}
</style>
