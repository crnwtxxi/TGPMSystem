<template>
    <div class="viewplan_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>培养计划</b></div>
            <el-table :data="tableDataPass" style="width: 100%">
                <el-table-column prop="planTitle" label="计划标题" min-width="400"></el-table-column>
                <el-table-column prop="planDate" label="发布时间" min-width="200"></el-table-column>
                <el-table-column prop="planStatus" label="状态" min-width="150" v-if="ifShowUnpass">
                    <el-tag type="success" disable-transitions>通过</el-tag>
                </el-table-column>
                <el-table-column label="操作" min-width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewPlan(scope.$index, scope.row)">查看计划</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChangePass"
                    @current-change="handleCurrentChangePass"
                    :current-page="currentPagePass"
                    :page-sizes="[5, 10, 20]"
                    :page-size="pageSizePass"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalPass">
                </el-pagination>
            </div>
        </el-card>

        <el-card style="margin-top:20px;" v-if="ifShowUnpass">
            <div slot="header" style="text-align: left;"><b>未通过培养计划</b></div>
            <el-table :data="tableDataUnpass" style="width: 100%">
                <el-table-column prop="planTitle" label="计划标题" min-width="400"></el-table-column>
                <el-table-column prop="planDate" label="发布时间" min-width="200"></el-table-column>
                <el-table-column prop="planStatus" label="状态" min-width="150"
                    :filters="[{ text: '不通过', value: '2' }, { text: '待审核', value: '0' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                        :type="scope.row.planStatus === '2' ? 'info' : 'warning'"
                        disable-transitions>{{scope.row.planStatus === '2' ? '不通过' : '待审核'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewPlan(scope.$index, scope.row)">查看计划</el-button>
                        <el-button size="mini" @click="handleDeletePlan(scope.$index, scope.row)" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChangeUnpass"
                    @current-change="handleCurrentChangeUnpass"
                    :current-page="currentPageUnpass"
                    :page-sizes="[5, 10, 20]"
                    :page-size="pageSizeUnpass"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalUnpass">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //通过分页         
            currentPagePass: 1,
            pageSizePass: 10,
            tableDataPass: [],
            totalPass: 0,
            //未通过分页
            currentPageUnpass: 1,
            pageSizeUnpass: 10,
            tableDataUnpass: [],
            totalUnpass: 0,
            //是否显示未通过计划列表
            ifShowUnpass: false
        }
    },
    methods: {
        //删除
        handleDeletePlan(index, row) {
            console.log(index, row);
        },
        //通过
        handleSizeChangePass(val) {
            this.pageSizePass = val;
            this.getAllPlan(this.currentPage, this.pageSize);
        },
        handleCurrentChangePass(val) {
            this.currentPagePass = val;
            this.getAllPlan(this.currentPage, this.pageSize);
        },
        //不通过
        handleSizeChangeUnpass(val) {
            this.pageSizeUnpass = val;
            this.getAllPlan(this.currentPage, this.pageSize);
        },
        handleCurrentChangeUnpass(val) {
            this.currentPageUnpass = val;
            this.getAllPlan(this.currentPage, this.pageSize);
        },
        //查看计划详情
        handleViewPlan(index, row) {
            sessionStorage.setItem("TaskType","plan");
            sessionStorage.setItem("TaskId",row.planId);
            this.$router.push('/user/TaskDetail');
        },
        //通过
        getAllPassPlan(pageNum, pageSize) {
            this.axios.get('/teacher/getAllPassPlan/'+pageNum+'/'+pageSize)
            .then(res => {
                this.tableDataPass = res.data.data.list;
                this.totalPass = res.data.data.total;
            }).catch(error => {
                console.log(error);
            })
        },
        //不通过
        getAllUpassPlan(pageNum, pageSize) {
            this.axios.get('/teacher/getAllUnpassPlan/'+pageNum+'/'+pageSize)
            .then(res => {
                this.tableDataUnpass = res.data.data.list;
                this.totalUnpass = res.data.data.total;
            }).catch(error => {
                console.log(error);
            })
        },
        //学生获取通过审核的属于自己的计划
        getMyPlans(pageNum, pageSize) {
            this.axios.get('/student/getMyPlans/'+pageNum+'/'+pageSize)
            .then(res => {
                this.tableDataPass = res.data.data.list;
                this.totalPass = res.data.data.total;
            }).catch(error => {
                console.log(error);
            })
        },
        //标签过滤
        filterTag(value, row) {
            return row.planStatus === value;
        },
        //判断用户身份
        judgeUser() {
            let role = sessionStorage.getItem('role');
            if (role == '学生') {
                this.ifShowUnpass = false;
                this.getMyPlans(this.currentPagePass, this.pageSizePass);
            } else {
                this.ifShowUnpass = true;
                this.getAllPassPlan(this.currentPagePass, this.pageSizePass);
                this.getAllUpassPlan(this.currentPageUnpass, this.pageSizeUnpass);
            }
        }
    },
    mounted() {
        this.judgeUser();
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