<template>
    <div class="updatequota_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>修改导师名额</b></div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="teaName" label="姓名" min-width="180"></el-table-column>
                <el-table-column prop="teaTno" label="工号" min-width="180"></el-table-column>
                <el-table-column prop="amount" label="名额" min-width="180"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page" >
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

        <el-dialog title="修改名额" :visible.sync="dialogFormVisible" width="300px">
            <el-input-number size="mini" v-model="newQuota"></el-input-number>
            <div slot="footer" class="dialog-footer" style="text-align: center;">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateQuota()">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogFormVisible: false,
            formLabelWidth: '0px',
            newQuota: 4,
            //分页         
            currentPage: 1,
            pageSize: 10,
            tableData: [],
            total: 0,
            //
            quotaId: '',
        }
    },
    methods: {
        handleEdit(index, row) {
            this.dialogFormVisible = true;
            this.quotaId = row.quotaId;
        },
        updateQuota() {
            //console.log(this.quotaId+ 'hh '+this.newQuota);
            this.axios.get('/tutor/updateTeaQuota/'+this.quotaId+'/'+this.newQuota)
            .then(res => {
                //console.log(res.data.data);
                this.getTeaQuota(this.currentPage, this.pageSize);
                this.dialogFormVisible = false;
            }).catch(error => {
                console.log(error);
            })
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getTeaQuota(this.currentPage, this.pageSize);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTeaQuota(this.currentPage, this.pageSize);
        },
        getTeaQuota(pageNum, pageSize) {
            this.axios.get('/tutor/getTeaQuota/'+pageNum+'/'+pageSize)
            .then(res => {
                this.tableData = res.data.data.list;
                this.total = res.data.data.total;
            }).catch(error => {
                console.log(error);
            })
        }
    },
    mounted() {
        this.getTeaQuota(this.currentPage, this.pageSize);
    }
}
</script>

<style scoped>
.page {
    margin-top: 20px;
}
</style>