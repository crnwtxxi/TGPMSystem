<template>
    <div class="viewplan_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>全部培养计划</b></div>
            <el-table :data="tablePlanData" style="width: 100%">
                <el-table-column prop="title" label="计划标题" min-width="50%"></el-table-column>
                <el-table-column prop="date" label="发布时间" min-width="30%"></el-table-column>
                <el-table-column label="操作" min-width="20%">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewPlan(scope.$index, scope.row)">查看计划</el-button>
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
            currentPagePlan: 2,
            tablePlanData: [{
                title: '计算机科学学院电子信息专业第一学期培养计划',
                date: '2020-03-23'
            }]
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
            this.$router.push('/user/TaskDetail');
        },
    }
}
</script>

<style scoped>
.main {
    text-align: left;
}
.text {
    text-align: left;
}
.page {
    margin-top: 20px;
}
</style>