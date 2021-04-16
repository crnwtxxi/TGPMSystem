<template>
    <div class="planveri_container">
        <!-- 培养计划审核 -->
        <el-card>
            <div slot="header" style="text-align: left;"><b>学术活动待审核</b></div>
            <el-table :data="tablePlanData" stripe style="width: 100%">
                <el-table-column prop="name" label="导师姓名" min-width="20%"></el-table-column>
                <el-table-column prop="title" label="计划标题" min-width="50%"></el-table-column>
                <el-table-column label="操作" min-width="30%">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewPlan(scope.$index, scope.row)">详情</el-button>
                        <el-button size="mini" type="success" @click="handlePassPlan(scope.$index, scope.row)">通过</el-button>
                        <el-button size="mini" type="danger" @click="handleBackPlan(scope.$index, scope.row)">退回</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChangePlan"
                    @current-change="handleCurrentChangePlan"
                    :current-page.sync="currentPagePlan"
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
            currentPagePlan: 1,
            tablePlanData: [{
                name: '陈香伶',
                title: '2020年华为四川赛区鲲鹏应用大赛',
                date: '2020-01-23'
            }],
        }
    },
    methods: {
        handleSizeChangePlan(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChangePlan(val) {
            console.log(`当前页: ${val}`);
        },
        handleViewPlan(index, row) {
            this.$router.push('/admin/TaskDetail');
        },
        handlePassPlan(index, row) {
            console.log('通过');
        },
        handleBackPlan(index, row) {
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