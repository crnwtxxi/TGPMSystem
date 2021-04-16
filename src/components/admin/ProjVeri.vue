<template>
    <div class="projveri_container">
        <!-- 科研项目审核 -->
        <el-card>
            <div slot="header" style="text-align: left;"><b>科研项目待审核</b></div>
            <el-table :data="tableProjData" stripe style="width: 100%">
                <el-table-column prop="name" label="姓名" min-width="15%"></el-table-column>
                <el-table-column prop="title" label="项目名称" min-width="40%"></el-table-column>
                <el-table-column prop="date" label="结题时间" min-width="15%"></el-table-column>
                <el-table-column label="操作" min-width="30%">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewProj(scope.$index, scope.row)">详情</el-button>
                        <el-button size="mini" type="success" @click="handlePassProj(scope.$index, scope.row)">通过</el-button>
                        <el-button size="mini" type="danger" @click="handleBackProj(scope.$index, scope.row)">退回</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChangeProj"
                    @current-change="handleCurrentChangeProj"
                    :current-page.sync="currentPageProj"
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
            currentPageProj: 1,
            tableProjData: [{
                name: '陈香伶',
                title: '2020年华为四川赛区鲲鹏应用大赛',
                date: '2020-01-23'
            }],
        }
    },
    methods: {
        handleSizeChangeProj(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChangeProj(val) {
            console.log(`当前页: ${val}`);
        },
        handleViewProj(index, row) {
            this.$router.push('/admin/TaskDetail');
        },
        handlePassProj(index, row) {
            console.log('通过');
        },
        handleBackProj(index, row) {
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