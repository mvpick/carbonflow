<template>
    <div id="Table">
        <div class="table_box">
            <ul class="first_row">
                <li>순위</li>
                <li>업체명</li>
                <li>배출량</li>
                <li>업종</li>
            </ul>
            <ul class="row" v-for="(item, index) in row" :key="index">
                <li>{{item.No}}</li>
                <li>{{item.name}}</li>
                <li>{{item.emission}}</li>
                <li>{{item.industry}}</li>
            </ul>
        </div>

    </div>
</template>

<script>    
export default{
data() {
    return{
        row:[
            {
                No:'1',
                name:'현대제철',
                emission:'88',
                industry:'제철업',
            },
            {
                No:'2',
                name:'포스코',
                emission:'76',
                industry:'제철업',
            },
            {
                No:'3',
                name:'현대제철',
                emission:'60',
                industry:'제철업',
            },
        ]
    }
  }
}
</script>

<style lang="scss" scoped>
#Table{
    
    .table_box{
        ul{
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            border-bottom: 1px solid #D4D4D4;
            width: 100%;
            margin: 0;
            li{
                text-align: center;
                min-width: 56px;
                &:first-child{
                    width: 30px;
                    min-width: 30px;
                    // padding-top: 28px;
                }
                &:last-child{
                    border-right: none;
                }
            }
        }
        .first_row{
            background-color: #E1E9F9;
            border-radius: 4px 4px 0px 0px;
            li{
                padding: 12px 0;
                width: 32%;
                &:first-child{
                    width: 12%;
                    padding-left: 4px;
                }
                &:nth-child(2){
                    width: 40%;
                }
            }
        }
        .row{
            align-items: center;
            li{
                width: 32%;
                padding: 12px 0;
                &:first-child{
                    width: 12%;
                }
                &:nth-child(2){
                    width: 40%;
                }
            }
            
        }
    }
}
</style>