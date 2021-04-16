<template>
    <div class="annorecord_container">
        <el-card>
            <el-table
                :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
                <el-table-column prop="id" label="公告编号" min-width="15%"></el-table-column>
                <el-table-column prop="date" label="日期" min-width="15%"></el-table-column>
                <el-table-column prop="title" label="标题" min-width="50%"></el-table-column>
                <el-table-column align="right" min-width="20%">
                    <template slot="header" slot-scope="scope">
                        <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleView(scope.$index, scope.row)">查看</el-button>
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
export default {
    data() {
        return {
            currentPage: 4,
            search: '',
            tableData: [{
                id: '1221548',
                date: '2016-05-02',
                title: '上海市普陀区金沙江路 1518 弄'
            }]
        }
    },
    methods: {
        handleView(index, row) {
            // this.$router.push('/admin/Anno');
            this.$router.push({
                name: 'Anno',
                params: {anno: row}
            });
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

<style scoped>
.page {
    /* border: 1px solid red; */
    margin-top: 20px;
}
</style>