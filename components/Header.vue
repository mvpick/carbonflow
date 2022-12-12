<template>
    <header id="main_header">
        <div class="pc_header">
            <p @click="$router.push('/')">LOGO</p>
        </div>
        <div class="mobile_header">
            <p @click="$router.push('/')">LOGO</p>
        </div>
    </header>
</template>

<script>    
export default{
data() {
    return{
        
    }
  }
}
</script>

<style lang="scss" scoped>
#main_header{
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
    width: 100%;
    background-color: #fff;
    .pc_header{
        display: none;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px 16px;
        p{
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
        }
        @include desktop{
            display: block;
        }
    }
    .mobile_header{
        padding: 20px 16px;
        display: block;
        p{
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
        }
        @include desktop{
            display: none;
        }
    }
}
</style>
