<template>
  <div class="uploadWrapper">
    <div class="uploadItem">
      <div class="uploadItemTitle">연도별/산업별 배출량</div>
      <input type="file" @change="uploadFile" /> <button @click="upload('uploadYearIndustryEmissions')">업로드</button>
    </div>
    <div class="uploadItem">
      <div class="uploadItemTitle">지역별 배출량</div>
      <input type="file" @change="uploadFile" /> <button @click="upload('uploadRegionEmissions')">업로드</button>
    </div>
    <div class="uploadItem">
      <div class="uploadItemTitle">참여기업 배출량</div>
      <input type="file" @change="uploadFile" /> <button @click="upload('uploadEnterpriseEmissions')">업로드</button>
    </div>
    <div class="uploadItem">
      <div class="uploadItemTitle">목표관리제 / 배출권거래제</div>
      <input type="file" @change="uploadFile" /> <button @click="upload('uploadTargetTradeEmissions')">업로드</button>
    </div>
    <div class="uploadItem">
      <div class="uploadItemTitle">국제 배출량</div>
      <input type="file" @change="uploadFile" /> <button @click="upload('uploadTnternationalEmissions')">업로드</button>
    </div>

    <div class="loadingWrapper" v-if="!!loadingState">
      <div class="loadingSpinner">
        <v-progress-circular indeterminate />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loadingState: false,
        file: null,
      }
    },
    created(){
    },
    methods: {
      uploadFile(e) {
        this.file = e.target.files[0];
      },
      upload(type) {
        if(!this.file)  return alert('파일을 선택해주세요');

        this.loadingState = true;

        const formData = new FormData();

        formData.append('file', this.file)

        this.$axios.post(`/excelUpload/${ type }`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data;',
          }
        }).then(res => {
          console.log(res);
          this.file = null;
        }).catch(err => {
          console.log(err);
          alert(err.response.data.message)
          this.file = null;
        }).finally(() => {
          this.loadingState = false;
        })
      }
    }
  }
</script>
<style lang="scss">
.uploadWrapper{
  padding: 24px;
}
.uploadItem{
  margin-bottom: 32px;

  .uploadItemTitle{
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 16px;
  }
}

.loadingWrapper{
  width: 100%;
  height: 100vh;
  position :fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);

  .loadingSpinner{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
}
</style>
