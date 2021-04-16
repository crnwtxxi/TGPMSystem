<template>
    <div class="stuinfo_container">
        <!-- 学生信息管理 -->
        <el-card>
            <el-table
                :data="tableData.filter(data => !search || data.teano.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
                <el-table-column prop="stuno" label="学号" min-width="20%"></el-table-column>
                <el-table-column prop="name" label="姓名" min-width="20%"></el-table-column>
                <el-table-column prop="sex" label="性别" min-width="15%"></el-table-column>
                <el-table-column prop="profess" label="方向" min-width="20%"></el-table-column>
                <el-table-column align="right" min-width="25%">
                    <template slot="header" slot-scope="scope">
                        <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入工号搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleView(scope.$index, scope.row)">查看所有信息</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="40">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import eventBus from '../../assets/eventBus';
export default {
    data() {
        return {
            infoList: {
                identify: 'student',
                info: {}
            },            
            currentPage: 4,
            search: '',
            tableData: [{
                name: '陈香伶',
                stuno: '2017110206',
                sex: '女',
                profess: '数据挖掘'
            }]
        }
    },
    methods: {
        handleView(index, row) {
            this.infoList.info = row;
            eventBus.$emit('info',this.infoList);
            this.$router.push('/admin/InfoDetail');
            // this.$router.push({
            //     name: 'InfoDetail',
            //     params: {identify: this.identify, info: row}
            // });
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
    }
}
</script>

<style>
.page {
    /* border: 1px solid red; */
    margin-top: 20px;
}
</style>