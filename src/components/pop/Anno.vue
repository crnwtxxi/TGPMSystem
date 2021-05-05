<template>
    <div class="anno_container">
        <el-card>
            <el-page-header @back="goBack" :content="anno.title"></el-page-header>
            <div class="detail">
                <div class="content" v-html="this.anno.content"></div>
                <div class="date">{{this.anno.date}}</div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            content: '',
            date: '',
            anno: {}
        }
    },
    methods: {
        goBack() {
            // this.$router.push('/admin/AnnoRecord');
            this.$router.go(-1);
        },
        getAnno() {
            
        }
    },
    mounted() {
       
    }
}
</script>

<style scoped>
.detail {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}
.content {
    text-align: left;
    font-size: 17px;
}
.date {
    text-align: right;
    margin-top: 20px;
}
</style>