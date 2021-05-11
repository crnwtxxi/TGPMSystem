<template>
    <div class="Tappliveri_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>选我的学生申请列表</b></div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="stuName" label="姓名" min-width="150"></el-table-column>
                <el-table-column prop="stuSno" label="学号" min-width="150"></el-table-column>
                <el-table-column prop="stuSex" label="性别" min-width="110"></el-table-column>
                <el-table-column prop="stuProfess" label="专业" min-width="200"></el-table-column>
                <el-table-column prop="stuType" label="学位性质" min-width="200"></el-table-column>
                <el-table-column prop="stuEmail" label="邮箱" min-width="200"></el-table-column>
                <el-table-column label="操作" min-width="200">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleAgree(scope.$index, scope.row)">同意</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleReturn(scope.$index, scope.row)">退回</el-button>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            //分页         
            currentPage: 1,
            pageSize: 10,
            tableData: [],
            total: 0,
            
        }
    },
    methods: {
        handleAgree(index, row) {
            this.axios.get('/tutor/passStu/'+row.stuId)
            .then(res => {
                if (res.data.success) {
                    // console.log(res.data);
                    this.$notify.success({
                        title: res.data.message
                    })
                    this.getUnverifyStu(this.currentPage, this.pageSize);
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: res.data.message
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        },
        handleReturn(index, row) {
            console.log(index, row);
            this.axios.get('/tutor/UnpassStu/'+row.stuId)
            .then(res => {
                if (res.data.success) {
                    // console.log(res.data);
                    this.$notify.success({
                        title: res.data.message
                    })
                    this.getUnverifyStu(this.currentPage, this.pageSize);
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: res.data.message
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getUnverifyStu(this.currentPage, this.pageSize);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getUnverifyStu(this.currentPage, this.pageSize);
        },
        getUnverifyStu(pageNum, pageSize) {
            this.axios.get('/tutor/getUnverifyStu/'+pageNum+'/'+pageSize)
            .then(res => {
                this.tableData = res.data.data.list;
                this.total = res.data.data.total;
            }).catch(error => {
                console.log(error);
            })
        }
    },
    mounted() {
        this.getUnverifyStu(this.currentPage, this.pageSize);
    }
}
</script>

<style scoped>
.page {
    /* border: 1px solid red; */
    margin-top: 20px;
}
</style>