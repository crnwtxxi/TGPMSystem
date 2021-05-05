<template>
    <div class="thesisveri_container">
        <!-- 学术论文审核 -->
        <el-card>
            <div slot="header" style="text-align: left;"><b>学术论文待审核</b></div>
            <el-table :data="tableThesisData" stripe style="width: 100%">
                <el-table-column prop="userInfo.teaName" label="姓名" min-width="200" v-if="ifShowTea"></el-table-column>
                <el-table-column prop="userInfo.stuName" label="姓名" min-width="200" v-if="!ifShowTea"></el-table-column>
                <el-table-column prop="thesisInfo.thesisTitle" label="论文题目" min-width="300"></el-table-column>
                <el-table-column prop="thesisInfo.thesisDate" label="发表时间" min-width="200"></el-table-column>
                <el-table-column label="操作" min-width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewThesis(scope.$index, scope.row)">详情</el-button>
                        <el-button size="mini" type="success" @click="handlePassThesis(scope.$index, scope.row)">通过</el-button>
                        <el-button size="mini" type="danger" @click="handleBackThesis(scope.$index, scope.row)">退回</el-button>
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
                <el-button type="danger" @click="ensuerBackThesis">确定退回</el-button>
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
            tableThesisData: [],
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
            returnThesisId: ''
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.getAllUnVerifyThesis(this.currentPage, this.pageSize);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getAllUnVerifyThesis(this.currentPage, this.pageSize);
        },
        getAllUnVerifyThesis(pageNum, pageSize) {
            this.axios.get('/common/getAllUnVerifyThesis/'+pageNum+'/'+pageSize)
            .then(res => {
                //console.log(res);
                this.tableThesisData = res.data.data.list;
                this.total = res.data.data.total;
            }).catch(error => {
                console.log(error);
            })
        },
        handleViewThesis(index, row) {
            sessionStorage.setItem("TaskType","thesis");
            sessionStorage.setItem("TaskId",row.thesisInfo.thesisId);
            if (this.role == '院级管理员') {
                this.$router.push('/admin/TaskDetail');
            } else {
                this.$router.push('/user/TaskDetail');
            }
        },
        handlePassThesis(index, row) {
            this.axios.get('/common/passThesis/'+row.thesisInfo.thesisId)
            .then(res => {
                //console.log(res);
                this.$notify({
                    title: '审核通过成功',
                    message: res.data.message,
                    type: 'success'
                })
                this.getAllUnVerifyThesis(this.currentPage, this.pageSize);
            }).catch(error => {
                console.log(error);
            })
        },
        handleBackThesis(index, row) {
            this.dialogFormVisible = true;
            this.returnThesisId = row.thesisInfo.thesisId;
        },
        ensuerBackThesis() {
            this.axios.post('/common/failThesis',{
                id: this.returnThesisId,
                reason: this.reason
            }).then(res => {
                //console.log(res.data);
                this.dialogFormVisible = false;
                this.getAllUnVerifyThesis(this.currentPage, this.pageSize);
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
        this.getAllUnVerifyThesis(this.currentPage, this.pageSize);
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