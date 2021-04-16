<template>
    <div class="thesisveri_container">
        <!-- 学术论文审核 -->
        <el-card>
            <div slot="header" style="text-align: left;"><b>学术论文待审核</b></div>
            <el-table :data="tableThesisData" stripe style="width: 100%">
                <el-table-column prop="name" label="姓名" min-width="15%"></el-table-column>
                <el-table-column prop="title" label="论文题目" min-width="40%"></el-table-column>
                <el-table-column prop="date" label="发表时间" min-width="15%"></el-table-column>
                <el-table-column label="操作" min-width="30%">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewThesis(scope.$index, scope.row)">详情</el-button>
                        <el-button size="mini" type="success" @click="handlePassThesis(scope.$index, scope.row)">通过</el-button>
                        <el-button size="mini" type="danger" @click="handleBackThesis(scope.$index, scope.row)">退回</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChangeThesis"
                    @current-change="handleCurrentChangeThesis"
                    :current-page.sync="currentPageThesis"
                    :page-size="10"
                    layout="prev, pager, next, jumper"
                    :total="50">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentPageThesis: 1,
            tableThesisData: [{
                name: '陈香伶',
                title: '2020年华为四川赛区鲲鹏应用大赛',
                date: '2020-01-23'
            }]
        }
    },
    methods: {
        handleSizeChangeThesis(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChangeThesis(val) {
            console.log(`当前页: ${val}`);
        },
        handleViewThesis(index, row) {
            this.$router.push('/admin/TaskDetail');
        },
        handlePassThesis(index, row) {
            console.log('通过');
        },
        handleBackThesis(index, row) {
            console.log('退回');
        },
    }
}
</script>

<style scoped>
.page {
    margin-top: 20px;
}
</style>