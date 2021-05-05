<template>
    <div class="activeri_container">
        <!-- 学术活动审核 -->
        <el-card>
            <div slot="header" style="text-align: left;"><b>学术活动待审核</b></div>
            <el-table :data="tableActiData" stripe style="width: 100%">
                <el-table-column prop="userInfo.teaName" label="姓名" min-width="200" v-if="ifShowTea"></el-table-column>
                <el-table-column prop="userInfo.stuName" label="姓名" min-width="200" v-if="!ifShowTea"></el-table-column>
                <el-table-column prop="actiInfo.actiTitle" label="活动名称" min-width="300"></el-table-column>
                <el-table-column prop="actiInfo.actiDate" label="活动时间" min-width="200"></el-table-column>
                <el-table-column label="操作" min-width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewActi(scope.$index, scope.row)">详情</el-button>
                        <el-button size="mini" type="success" @click="handlePassActi(scope.$index, scope.row)">通过</el-button>
                        <el-button size="mini" type="danger" @click="handleBackActi(scope.$index, scope.row)">退回</el-button>
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
                <el-button type="danger" @click="ensuerBackActi">确定退回</el-button>
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
            tableActiData: [],
            total: 0,
            //切换师生
            ifShowTea: false,
            //角色
            role: '',
            //退回原因对话框
            dialogFormVisible: false,
            formLabelWidth: '0',
            reason: '',
            reasonList: [],
            returnActiId: ''
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.getAllUnverifyActivity(this.currentPage, this.pageSize);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getAllUnverifyActivity(this.currentPage, this.pageSize);
        },
        getAllUnverifyActivity(pageNum, pageSize) {
            this.axios.get('/common/getAllUnVerifyActivity/'+pageNum+'/'+pageSize)
            .then(res => {
                //console.log(res);
                this.tableActiData = res.data.data.list;
                this.total = res.data.data.total;
            }).catch(error => {
                console.log(error);
            })
        },
        handleViewActi(index, row) {
            sessionStorage.setItem("TaskType","activity");
            sessionStorage.setItem("TaskId",row.actiInfo.actiId);
            if (this.role == '院级管理员') {
                this.$router.push('/admin/TaskDetail');
            } else {
                this.$router.push('/user/TaskDetail');
            }
        },
        handlePassActi(index, row) {
            this.axios.get('/common/passActivity/'+row.actiInfo.actiId)
            .then(res => {
                //console.log(res);
                this.$notify({
                    title: '审核通过成功',
                    message: res.data.message,
                    type: 'success'
                })
                this.getAllUnverifyActivity(this.currentPage, this.pageSize);
            }).catch(error => {
                console.log(error);
            })
        },
        handleBackActi(index, row) {
            this.dialogFormVisible = true;
            this.returnActiId = row.actiInfo.actiId;
        },
        ensuerBackActi() {
            this.axios.post('/common/failActivity',{
                id: this.returnActiId,
                reason: this.reason
            }).then(res => {
                //console.log(res.data);
                this.dialogFormVisible = false;
                this.getAllUnverifyActivity(this.currentPage, this.pageSize);
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
        getRole() {
            this.role = sessionStorage.getItem('role');
            if (this.role == '院级管理员') {
                this.ifShowTea = true;
            } else {
                this.ifShowTea = false;
            }
        }
    },
    mounted() {
        this.getAllUnverifyActivity(this.currentPage, this.pageSize);
        this.getRole();
        this.reasonList = this.loadAll();
    }
}
</script>

<style scoped>
.page {
    margin-top: 20px;
}
</style>