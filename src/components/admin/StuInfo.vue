<template>
    <div class="stuinfo_container">
        <!-- 学生信息管理 -->
        <el-card>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="stuSno" label="学号" min-width="150"></el-table-column>
                <el-table-column prop="stuName" label="姓名" min-width="150"></el-table-column>
                <el-table-column prop="stuSex" label="性别" min-width="120"></el-table-column>
                <el-table-column prop="stuCollege" label="学院" min-width="200"></el-table-column>
                <el-table-column prop="stuProfess" label="专业" min-width="150"></el-table-column>
                <el-table-column prop="stuType" label="研究生类型" min-width="150"></el-table-column>
                <el-table-column prop="stuDirection" label="方向" min-width="150"></el-table-column>
                <el-table-column label="操作" min-width="300">
                    <template slot-scope="scope">
                        <el-button size="mini"
                            @click="handleView(scope.$index, scope.row)">详情</el-button>
                        <el-button size="mini" type="primary"
                            @click="handleDelete(scope.$index, scope.row)">重置密码</el-button>
                        <el-button size="mini" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
            infoList: {
                identify: 'student',
                info: {}
            },
            //分页      
            currentPage: 1,
            pageSize: 10,
            tableData: [],
            total: 0,
        }
    },
    methods: {
        handleView(index, row) {
            console.log('click');
            sessionStorage.setItem("userId",row.stuId);
            sessionStorage.setItem("userType","student");
            this.$router.push('/admin/InfoDetail');
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            this.$confirm('此操作将删除该用户不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.get('/admin/deleteOneStu/'+row.stuId)
                .then(res => {
                    if (res.data.success) {
                        this.$notify({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getAllStuMsg(this.currentPage, this.pageSize);
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: res.data.message
                        })
                    }
                }).catch(error => {
                    console.log(error);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getAllStuMsg(this.currentPage, this.pageSize);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getAllStuMsg(this.currentPage, this.pageSize);
        },
        getAllStuMsg(pageNum, pageSize) {
            this.axios.get('/admin/getAllStuInfo/'+pageNum+'/'+pageSize)
            .then(res => {
                this.tableData = res.data.data.list;
                this.total = res.data.data.total;
            }).catch(error => {
                console.log(error);
            })
        }
    },
    mounted() {
        this.getAllStuMsg(this.currentPage, this.pageSize);
    }
}
</script>

<style>
.page {
    /* border: 1px solid red; */
    margin-top: 20px;
}
</style>