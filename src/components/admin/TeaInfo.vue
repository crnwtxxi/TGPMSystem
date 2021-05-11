<template>
    <div class="teainfo_container">
        <el-card>
            <el-table :data="tableData" style="width: 100%">
                <!-- <el-table-column prop="teaId" label="编号" min-width="200"></el-table-column> -->
                <el-table-column prop="teaTno" label="工号" min-width="150"></el-table-column>
                <el-table-column prop="teaName" label="姓名" min-width="150"></el-table-column>
                <el-table-column prop="teaSex" label="性别" min-width="120"></el-table-column>
                <el-table-column prop="teaCollege" label="所属学院" min-width="200"></el-table-column>
                <el-table-column prop="teaDirection" label="研究方向" min-width="200"></el-table-column>
                <el-table-column prop="teaRank" label="职称" min-width="150"></el-table-column>
                <el-table-column prop="teaEmail" label="邮箱" min-width="200"></el-table-column>
                <el-table-column label="操作" min-width="300">
                    <template slot-scope="scope">
                        <el-button size="mini"
                            @click="handleView(scope.$index, scope.row)">详情</el-button>
                        <el-button size="mini" type="primary"
                            @click="handleView(scope.$index, scope.row)">重置密码</el-button>
                        <el-button size="mini" type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>-
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
                identify: 'teacher',
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
            sessionStorage.setItem("userId",row.teaId);
            sessionStorage.setItem("userType","teacher");
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
                this.axios.get('/admin/deleteOneTea/'+row.teaId)
                .then(res => {
                    if (res.data.success) {
                        this.$notify({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getAllTeaMsg(this.currentPage, this.pageSize);
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
            this.getAllTeaMsg(this.currentPage, this.pageSize);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getAllTeaMsg(this.currentPage, this.pageSize);
        },
        getAllTeaMsg(pageNum, pageSize) {
            this.axios.get('/admin/getAllTeaInfo/'+pageNum+'/'+pageSize)
            .then(res => {
                this.tableData = res.data.data.list;
                this.total = res.data.data.total;
            }).catch(error => {
                console.log(error);
            })
        }
    },
    mounted() {
        this.getAllTeaMsg(this.currentPage, this.pageSize);
    }
}
</script>

<style scoped>
.page {
    /* border: 1px solid red; */
    margin-top: 20px;
}
</style>