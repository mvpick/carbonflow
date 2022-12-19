<template>
<div id="chart">
    <div class="com_contain">
        <select class="select_year" :disabled="on_tab === 1" name="" id="" v-model="selected_year_id">
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
  // 연도 순서대로 정렬
  // 연도 클릭시 변하도록
  mounted(){
    this.getDatas(0);
  },
  watch:{
    "selected_year_id"(){
      // 부문별 탄소 배출량
      if(this.selected_year_id !== this.year_select[0].id){

        let changed_data = this.industry_info.filter(item=>{
          return this.selected_year_id === item.year_id;
        });
        console.log(changed_data,'필터링된 연도')
        this.show_table('pieChartData', 0, changed_data);
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
    getDatas(index){
      this.$axios.get('/allData/getAllData')
      .then(res => {
        this.ticks_max = Math.round(res.data.data.year_info[0].value) ;

        // 부문별 탄소 배출량
        for(let one of res.data.data.industry_info){
          let [__] = res.data.data.year.filter(item=>{
            return one.year_id === item.id;
          })
          one.year = __;
          this.year_select.push(__);
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

        // 초기 연도 디폴트 setting..
        this.selected_year_id = this.year_select[0].id;

        let default_data = this.industry_info.filter(item=>{
          return this.selected_year_id === item.year_id;
        });
        this.on_tab = index;

        this.pieChartData = {
            labels: ['에너지', '산업공정', '농업', 'LULUCF', '폐기물'],
            datasets: [
              {
                data: [default_data[0].energy, default_data[0].process, default_data[0].agriculture , default_data[0].lulucf, default_data[0].waste],
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
        
        

      }).catch(err => {
        console.log(err);
      })
    },

    show_table(type, index, data){
      this.on_tab = index;
      if(type==='pieChartData' && index === 0){
        if(!!data){
          // console.log(data,'<< data 필터링 되어서 들어온 데이터')
          this.pieChartData.datasets[0].data = []; //  초기화

          this.pieChartData = {
            labels: ['에너지', '산업공정', '농업', 'LULUCF', '폐기물'],
            datasets: [
              {
                data: [data[0].energy ,data[0].process , data[0].agriculture , data[0].lulucf, data[0].waste],
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

          console.log(this.pieChartData,'this.pieChartData???')

        }
      }
      
      if(type==='barChartOptions' && index === 1){
        if(!!data){
          let x_year = [];
          let y_data = [];
          for(let one of data){
            x_year.push(one.name);
            y_data.push(one.year.value);
          };

          this.barChartData = {
            labels: x_year, // x 축
            datasets: [
              {
                label: "Visualizaciones",
                data: y_data, // y축
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
                    max: this.ticks_max,
                    min: 0,
                    stepSize: 10000,
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
  .select_year{
    border: 2px solid black;
    text-align: center;
    border-radius: 10px;
    height: 50px;
    width: 80px;
    margin-bottom: 10px;
  }
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
