<template>
  <div>
    <input type="file" @change="uploadFile" />
    <select v-model="selectedYear">
      <option selected value="null">연도 선택</option>
      <option v-for="item in yearList" :key="item" :value="item">{{ item }}</option>
    </select>
    <br>
    <br>
    <br>
    <div @click="upload">업로드
    </div>
    <br>
    <br>
    <br>
    <br>
    <div>file: {{file}}</div>
    <div>
      <div v-for="(item, index) in jsonData" :key="index">{{ item }}<br><br><br></div>
    </div>
  </div>
</template>

<script>
  import excelData from '/json/excel_data.json'
  export default {
    data() {
      return {
        file: null,
        jsonData: [],
        yearList: [],
        selectedYear: null,
      }
    },
    created(){
      const keyList = Object.keys(excelData);

      this.jsonData = keyList.map(item => {
        return {
          name: item,
          value: excelData[item]
        }
      })

      for(let i = 2010; i < 2040; i ++) {
        this.yearList.push(i);
      }
    },
    methods: {
      uploadFile(e) {
        this.file = e.target.files[0];
      },
      upload() {
        if(!this.file)  return alert('파일을 선택해주세요');
        if(!this.selectedYear) return alert('연도를 선택해주세요');

        const formData = new FormData();

        formData.append('file', this.file)
        formData.append('selectedYear', this.selectedYear)

        this.$axios.post('/excelTest/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data;',
          }
        }).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
