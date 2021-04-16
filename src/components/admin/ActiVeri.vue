<template>
    <div class="activeri_container">
        <!-- 学术活动审核 -->
        <el-card>
            <div slot="header" style="text-align: left;"><b>学术活动待审核</b></div>
            <el-table :data="tableActiData" stripe style="width: 100%">
                <el-table-column prop="name" label="姓名" min-width="15%"></el-table-column>
                <el-table-column prop="title" label="活动名称" min-width="40%"></el-table-column>
                <el-table-column prop="date" label="活动时间" min-width="15%"></el-table-column>
                <el-table-column label="操作" min-width="30%">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewActi(scope.$index, scope.row)">详情</el-button>
                        <el-button size="mini" type="success" @click="handlePassActi(scope.$index, scope.row)">通过</el-button>
                        <el-button size="mini" type="danger" @click="handleBackActi(scope.$index, scope.row)">退回</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChangeActi"
                    @current-change="handleCurrentChangeActi"
                    :current-page.sync="currentPageActi"
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
            currentPageActi: 1,
            tableActiData: [{
                name: '陈香伶',
                title: '2020年华为四川赛区鲲鹏应用大赛',
                date: '2020-01-23'
            }],
        }
    },
    methods: {
        handleSizeChangeActi(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChangeActi(val) {
            console.log(`当前页: ${val}`);
        },
        handleViewActi(index, row) {
            this.$router.push('/admin/TaskDetail');
        },
        handlePassActi(index, row) {
            console.log('通过');
        },
        handleBackActi(index, row) {
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