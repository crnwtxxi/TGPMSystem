<template>
    <div class="Tstuinfo_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>学生列表</b></div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="stuName" label="姓名" min-width="150"></el-table-column>
                <el-table-column prop="stuSno" label="学号" min-width="150"></el-table-column>
                <el-table-column prop="stuSex" label="性别" min-width="100"></el-table-column>
                <el-table-column prop="stuProfess" label="专业" min-width="200"></el-table-column>
                <el-table-column prop="stuDirection" label="方向" min-width="200"></el-table-column>
                <el-table-column prop="stuType" label="学位性质" min-width="200"></el-table-column>
                <el-table-column prop="stuEmail" label="邮箱" min-width="200"></el-table-column>
                <el-table-column label="操作" min-width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleView(scope.$index, scope.row)">查看</el-button>
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
        handleView(index, row) {
            sessionStorage.setItem("userId",row.stuId);
            sessionStorage.setItem("userType","student");
            this.$router.push('/user/InfoDetail');
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
            this.axios.get('/teacher/getAllSelfStu/'+pageNum+'/'+pageSize)
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

<style scoped>
.page {
    /* border: 1px solid red; */
    margin-top: 20px;
}
.page2 {
    text-align: right;
}
.basic_info {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
}
.avatar {
    border: 1px solid rgb(153, 151, 151, .2);
    border-radius: 4px;
    width: 110px;
    height: 150px;
    background-image: url(~@/assets/bg10.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    /* box-shadow: 0 2px 5px 0 rgba(0,0,0,.1); */
    flex-shrink: 0;
}
.msg {
    /* border: 1px solid rgb(153, 151, 151, .2); */
    /* flex: 1; */
    text-align: left;
    margin-left: 50px;
    line-height: 30px;
    flex-shrink: 0;
}
</style>