<template>
    <div class="projveri_container">
        <!-- 科研项目审核 -->
        <el-card>
            <div slot="header" style="text-align: left;"><b>科研项目待审核</b></div>
            <el-table :data="tableProjData" stripe style="width: 100%">
                <el-table-column prop="teaInfo.teaName" label="姓名" min-width="200"></el-table-column>
                <el-table-column prop="projInfo.projTitle" label="项目名称" min-width="300"></el-table-column>
                <el-table-column prop="projInfo.projOffdate" label="结题时间" min-width="200"></el-table-column>
                <el-table-column label="操作" min-width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewProj(scope.$index, scope.row)">详情</el-button>
                        <el-button size="mini" type="success" @click="handlePassProj(scope.$index, scope.row)">通过</el-button>
                        <el-button size="mini" type="danger" @click="handleBackProj(scope.$index, scope.row)">退回</el-button>
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
                <el-button type="danger" @click="ensuerBackProj">确定退回</el-button>
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
            tableProjData: [],
            total: 0,
            //退回原因对话框
            dialogFormVisible: false,
            formLabelWidth: '0',
            reason: '',
            reasonList: [],
            returnProjId: ''
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.getAllUnverifyProject(this.currentPage, this.pageSize);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getAllUnverifyProject(this.currentPage, this.pageSize);
        },
        getAllUnverifyProject(pageNum, pageSize) {
            this.axios.get('/admin/getAllUnVerifyProject/'+pageNum+'/'+pageSize)
            .then(res => {
                //console.log(res);
                this.tableProjData = res.data.data.list;
                this.total = res.data.data.total;
            }).catch(error => {
                console.log(error);
            })
        },
        handleViewProj(index, row) {
            sessionStorage.setItem("TaskType","project");
            sessionStorage.setItem("TaskId",row.projInfo.projId);
            this.$router.push('/admin/TaskDetail');
        },
        handlePassProj(index, row) {
            this.axios.get('/common/passProject/'+row.projInfo.projId)
            .then(res => {
                //console.log(res);
                this.$notify({
                    title: '审核通过成功',
                    message: res.data.message,
                    type: 'success'
                })
                this.getAllUnverifyProject(this.currentPage, this.pageSize);
            }).catch(error => {
                console.log(error);
            })
        },
        handleBackProj(index, row) {
            this.dialogFormVisible = true;
            this.returnProjId = row.projInfo.projId;
        },
        ensuerBackProj() {
            this.axios.post('/common/failProject',{
                id: this.returnProjId,
                reason: this.reason
            }).then(res => {
                //console.log(res.data);
                this.dialogFormVisible = false;
                this.getAllUnverifyProject(this.currentPage, this.pageSize);
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
        this.getAllUnverifyProject(this.currentPage, this.pageSize);
        this.reasonList = this.loadAll();
    }
}
</script>

<style scoped>
.page {
    margin-top: 20px;
}
</style>