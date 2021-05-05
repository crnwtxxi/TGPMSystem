<template>
    <div class="annorecord_container">
        <el-card>
            <el-table
                :data="tableData.filter(data => !search || data.annoTitle.includes(search))"
                style="width: 100%">
                <el-table-column prop="annoTitle" label="标题" min-width="300"></el-table-column>
                <el-table-column prop="annoDate" label="日期" min-width="200"></el-table-column>
                <el-table-column align="left" min-width="200">
                    <template slot="header" slot-scope="scope">
                        <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleView(scope.$index, scope.row)">查看</el-button>
                        <el-button
                        size="mini"
                        type="danger"
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
            //分页         
            currentPage: 1,
            pageSize: 10,
            tableData: [],
            total: 0,
            //
            search: '',
        }
    },
    methods: {
        handleView(index, row) {
            sessionStorage.setItem("TaskType","announce");
            sessionStorage.setItem("TaskId",row.annoId);
            this.$router.push('/admin/TaskDetail');
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getAllAnnounce(this.currentPage, this.pageSize);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getAllAnnounce(this.currentPage, this.pageSize);
        },
        getAllAnnounce(pageNum, pageSize) {
            this.axios.get('/common/getAllAnnounce/'+pageNum+'/'+pageSize)
            .then(res => {
                //console.log(res);
                this.tableData = res.data.data.list;
                this.total = res.data.data.total;
            }).catch(error => {
                console.log(error);
            })
        }
    },
    mounted() {
        this.getAllAnnounce(this.currentPage, this.pageSize);
    }
}
</script>

<style scoped>
.page {
    /* border: 1px solid red; */
    margin-top: 20px;
}
</style>