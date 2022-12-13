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
          <BarChart :data="barChartData" :options="barChartOptions" />
        </div>
    </div>
</div>
</template>

<script>
export default{
data() {
  return{
      on_tab:0,
      barChartData: {
        labels: [
          "2019-06",
          "2019-07",
          "2019-08",
          "2019-09",
          "2019-10",
          "2019-11",
          "2019-12",
          "2020-01",
          "2020-02",
          "2020-03",
        ],
        datasets: [
          {
            label: "Visualizaciones",
            data: [2, 1, 16, 3, 4, 5, 0, 0, 4, 12, 2],
            backgroundColor: "rgba(20, 255, 0, 0.3)",
            borderColor: "rgba(100, 255, 0, 1)",
            borderWidth: 2,
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Google analytics data",
          fontSize: 24,
          fontColor: "#6b7280",
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
      },
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
