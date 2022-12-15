<template>
<div id="chart">
    <div class="com_contain">
        <select name="" id="" v-model="selected_year_id" style="background-color:red">
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
      

      // barChartData: {
      //   labels: ["2019-06", "2019-07", "2019-08", "2019-09", "2019-10", "2019-11"],
      //   datasets: [
      //     {
      //       label: "Visualizaciones",
      //       data: [2, 1, 16, 3, 4, 5],
      //       backgroundColor: "rgba(20, 255, 0, 0.3)",
      //       borderColor: "rgba(100, 255, 0, 1)",
      //       borderWidth: 2,
      //     },
      //   ],
      // },
      // barChartOptions: {
      //   responsive: true,
      //   legend: {
      //     display: false,
      //   },
      //   title: {
      //     display: false
      //   },
      //   tooltips: {
      //     backgroundColor: "#17BF62",
      //   },
      //   scales: {
      //     xAxes: [
      //       {
      //         gridLines: {
      //           display: true,
      //         },
      //       },
      //     ],
      //     yAxes: [
      //       {
      //         ticks: {
      //           beginAtZero: true,
      //           max: 7,
      //           min: 0,
      //           stepSize: 1,
      //         },
      //         gridLines: {
      //           display: true,
      //         },
      //       },
      //     ],
      //   },
      // },
    }
  },
  mounted(){
    this.show_table('pieChartData', 0);
    this.getDatas();
  },
  watch:{
    "selected_year_id"(){
      
      // 부문별 탄소 배출량
      if(this.on_tab === 0 && !!this.selected_year_id){
        console.log('부문별 탄소 배출량 실행')
        this.industry_info = this.industry_info.filter(item=>{
          return item.id === this.selected_year_id;
        });
        console.log(this.industry_info,'this.industry_info')

        this.pieChartData = {
          labels: ['에너지', '산업공정', '농업', 'LULUCF', '폐기물'],
          datasets: [
            {
              label: 'Dataset 1',
              data: [this.industry_info.energy ,this.industry_info.process , this.industry_info.agriculture , this.industry_info.lulucf, this.industry_info.waste],
              backgroundColor: ['red', 'blue', 'green', 'black', 'yellow'],
            }
          ]
        };
        console.log(this.pieChartData,'this.pieChartData')
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

      // 연도별 탄소 배출량
      if(this.on_tab === 1 && !!this.selected_year_id){
        this.year_info = this.year_info.filter(item=>{
          return item.id === this.selected_year_id;
        });
      }


    }
  },
  methods:{
    getDatas(){
      this.$axios.get('/allData/getAllData')
      .then(res => {
        this.year_select = res.data.data[2];

        // 부문별 탄소 배출량
        for(let one of res.data.data[0]){
          let [__] = res.data.data[2].filter(item=>{
            return one.year_id === item.id;
          })
          one.year = __
          this.industry_info.push(one)
        }

        // 연도별 탄소 배출량
        for(let one of res.data.data[1]){
          let [__] = res.data.data[2].filter(item=>{
            return one.year_id === item.id;
          })
          one.year = __
          this.year_info.push(one)
        }

      }).catch(err => {
        console.log(err);
      })
    },
    show_table(type, index){
      console.log(type,' <<< type ??')
      console.log(index,'<<< index??')


      this.on_tab = index;
      if(type==='pieChartData' && index === 0){
        console.log(this.industry_info,'선택된 부문별 탄소 배출량')

        this.pieChartData = {
          labels: ['에너지', '산업공정', '농업', 'LULUCF', '폐기물'],
          datasets: [
            {
              // label: 'Dataset 1',
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
      
      if(type==='barChartOptions'){
        console.log(this.industry_info,'선택된 연도별 탄소 배출량')
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
