<template>
    <div class="stuhome_container">
        <div class="anno">
            <el-card>
                <div class="content">
                    <el-table 
                        :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))" 
                        style="width: 100%">
                        <el-table-column prop="title" label="院内公告" min-width="50%"></el-table-column>
                        <el-table-column prop="date" label="日期" min-width="20%"></el-table-column>
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
                                @click="handleViewPlan(scope.$index, scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    title: '计算机科学学院研究生选导师通知',
                    date: '2021-01-12'
                },
                {
                    title: '计算机科学学院研究生入学信息核对通知',
                    date: '2021-01-11'
                },
                {
                    title: '计算机科学学院导师联系方式列表',
                    date: '2021-01-02'
                }
            ],
            search: '',
            currentPage: 4
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleViewPlan(index, row) {
            // this.$router.push('/user/Anno');
            this.$router.push({
                name: 'Anno',
                params: {anno: row}
            });
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    }
}
</script>

<style scoped>
.anno {
    /* border: 1px solid green; */
    display: flex;
    flex-direction: column;
}
.page {
    /* border: 1px solid red; */
    margin-top: 20px;
}
</style>