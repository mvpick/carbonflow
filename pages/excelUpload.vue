<template>
  <div class="uploadWrapper">
    <div class="uploadItem">
      <div class="uploadItemTitle">연도별/산업별 배출량</div>
      <input type="file" @change="uploadFile" /> <button @click="upload('yearIndustry')">업로드</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
          this.file = null;
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
</style>
