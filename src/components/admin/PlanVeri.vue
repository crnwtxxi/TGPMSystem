<template>
    <div class="planveri_container">
        <!-- 培养计划审核 -->
        <el-card>
            <div slot="header" style="text-align: left;"><b>学术活动待审核</b></div>
            <el-table :data="tablePlanData" stripe style="width: 100%" lazy>
                <el-table-column prop="teaInfo.teaName" label="导师姓名" min-width="200"></el-table-column>
                <el-table-column prop="planInfo.planTitle" label="计划标题" min-width="400"></el-table-column>
                <el-table-column label="操作" min-width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewPlan(scope.$index, scope.row)">详情</el-button>
                        <el-button size="mini" type="success" @click="handlePassPlan(scope.$index, scope.row)">通过</el-button>
                        <el-button size="mini" type="danger" @click="handleBackPlan(scope.$index, scope.row)">退回</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </el-card>

        <!-- 审核不通过原因 -->
        <el-dialog title="退回理由" :visible.sync="dialogFormVisible" width="300px">
            <el-form>
                <el-form-item :label-width="formLabelWidth">
                    <!-- <el-input v-model="reason" autocomplete="off" placeholder="请输入理由" maxlength="20" show-word-limit></el-input> -->
                    <el-autocomplete class="inline-input" v-model="reason" :fetch-suggestions="querySearch"
                        placeholder="请输入内容"></el-autocomplete>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="danger" @click="ensuerBackPlan">确定退回</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
export default {
    data() {
        return {
            //分页         
            currentPage: 1,
            pageSize: 10,
            tablePlanData: [],
            total: 0,
            //退回原因对话框
            dialogFormVisible: false,
            formLabelWidth: '0',
            reason: '',
            reasonList: [],
            returnPlanId: ''
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.getAllUnverifyPlan(this.currentPage, this.pageSize);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getAllUnverifyPlan(this.currentPage, this.pageSize);
        },
        getAllUnverifyPlan(pageNum, pageSize) {
            this.axios.get('/admin/getAllUnVerifyPlan/'+pageNum+'/'+pageSize)
            .then(res => {
                //console.log(res);
                this.tablePlanData = res.data.data.list;
                this.total = res.data.data.total;
            }).catch(error => {
                console.log(error);
            })
        },
        handleViewPlan(index, row) {
            //跳转到TaskDetail页面，先将统一展示页面中要展示的类型和Id存在session里面
            sessionStorage.setItem("TaskType","plan");
            sessionStorage.setItem("TaskId",row.planInfo.planId);
            this.$router.push('/admin/TaskDetail');
        },
        handlePassPlan(index, row) {
            this.axios.get('/admin/passPlan/'+row.planInfo.planId)
            .then(res => {
                //console.log(res);
                this.$notify({
                    title: '审核通过成功',
                    message: res.data.message,
                    type: 'success'
                })
                this.getAllUnverifyPlan(this.currentPage, this.pageSize);
            }).catch(error => {
                console.log(error);
            })
        },
        handleBackPlan(index, row) {
            this.dialogFormVisible = true;
            this.returnPlanId = row.planInfo.planId;
        },
        ensuerBackPlan() {
            this.axios.post('/admin/failPlan',{
                id: this.returnPlanId,
                reason: this.reason
            }).then(res => {
                console.log(res.data);
                this.dialogFormVisible = false;
                this.getAllUnverifyPlan(this.currentPage, this.pageSize);
            }).catch(error => {
                console.log("faile");
                console.log(error);
            })
        },
        querySearch(queryString, cb) {
            var reasonList = this.reasonList;
            var results = queryString ? reasonList.filter(this.createFilter(queryString)) : reasonList;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll() {
            return [
                { "value": "格式不符合要求"},
                { "value": "未提供足够证明材料"},
                { "value": "未达到审核标准"},
                { "value": "请重新提交"}
            ];
        },
    },
    mounted() {
        this.getAllUnverifyPlan(this.currentPage, this.pageSize);
        this.reasonList = this.loadAll();
    }
}
</script>

<style scoped>
.page {
    margin-top: 20px;
}
</style>