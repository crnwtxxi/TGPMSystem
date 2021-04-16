<template>
    <div class="adminhome_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>系统检索</b></div>
            <div class="search">
                <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="餐厅名" value="1"></el-option>
                        <el-option label="订单号" value="2"></el-option>
                        <el-option label="用户电话" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            select: ''
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.search {
    padding: 0 50px 0 50px;
    /* width: 500px; */
}
</style>