<template>
    <div class="actirecord_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>参加的学术活动</b></div>
            <el-table :data="tableDataPass" style="width: 100%">
                <el-table-column prop="actiTitle" label="活动名称" min-width="400"></el-table-column>
                <el-table-column prop="actiDate" label="活动时间" min-width="200"></el-table-column>
                <el-table-column prop="actiStatus" label="状态" min-width="150">
                    <el-tag type="success" disable-transitions>通过</el-tag>
                </el-table-column>
                <el-table-column label="操作" min-width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewActi(scope.$index, scope.row)">查看详情</el-button>
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
        <el-card style="margin-top: 20px;">
            <div slot="header" style="text-align: left;"><b>未通过的学术活动</b></div>
            <el-table :data="tableDataUnpass" style="width: 100%">
                <el-table-column prop="actiTitle" label="计划标题" min-width="400"></el-table-column>
                <el-table-column prop="actiDate" label="发布时间" min-width="200"></el-table-column>
                <el-table-column prop="actiStatus" label="状态" min-width="150"
                    :filters="[{ text: '不通过', value: '2' }, { text: '待审核', value: '0' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                        :type="scope.row.actiStatus === '2' ? 'info' : 'warning'"
                        disable-transitions>{{scope.row.actiStatus === '2' ? '不通过' : '待审核'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewActi(scope.$index, scope.row)">查看详情</el-button>
                        <!-- <el-button size="mini" @click="handleDeleteActi(scope.$index, scope.row)" type="danger">删除</el-button> -->
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
        }
    },
    methods: {
        //删除
        handleDeleteActi(index, row) {
            console.log(index, row);
        },
        //通过
        handleSizeChangePass(val) {
            this.pageSizePass = val;
            this.getAllPassActi(this.currentPage, this.pageSize);
        },
        handleCurrentChangePass(val) {
            this.currentPagePass = val;
            this.getAllPassActi(this.currentPage, this.pageSize);
        },
        //不通过
        handleSizeChangeUnpass(val) {
            this.pageSizeUnpass = val;
            this.getAllUpassActi(this.currentPage, this.pageSize);
        },
        handleCurrentChangeUnpass(val) {
            this.currentPageUnpass = val;
            this.getAllUpassActi(this.currentPage, this.pageSize);
        },
        //查看计划详情
        handleViewActi(index, row) {
            sessionStorage.setItem("TaskType","activity");
            sessionStorage.setItem("TaskId",row.actiId);
            this.$router.push('/user/TaskDetail');
        },
        //标签过滤
        filterTag(value, row) {
            return row.actiStatus === value;
        },
        //通过
        getAllPassActi(pageNum, pageSize) {
            this.axios.get('/common/getAllPassActi/'+pageNum+'/'+pageSize)
            .then(res => {
                this.tableDataPass = res.data.data.list;
                this.totalPass = res.data.data.total;
            }).catch(error => {
                console.log(error);
            })
        },
        //不通过
        getAllUpassActi(pageNum, pageSize) {
            this.axios.get('/common/getAllUnpassActi/'+pageNum+'/'+pageSize)
            .then(res => {
                this.tableDataUnpass = res.data.data.list;
                this.totalUnpass = res.data.data.total;
            }).catch(error => {
                console.log(error);
            })
        },
    },
    mounted() {
        this.getAllPassActi(this.currentPagePass, this.pageSizePass);
        this.getAllUpassActi(this.currentPageUnpass, this.pageSizeUnpass);
    }
}
</script>

<style scoped>
.info {
    color: #99a9bf;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 190px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.page {
    /* border: 1px solid red; */
    margin-top: 20px;
}
</style>