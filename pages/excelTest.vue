<template>
  <div>
    <input type="file" @change="uploadFile" />
    <div>file: {{file}}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        file: null
      }
    },
    methods: {
      uploadFile(e) {
        const file = e.target.files[0];
        console.log(file);

        const formData = new FormData();
        formData.append('file', file)

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
