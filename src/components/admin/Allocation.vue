<template>
    <div class="allocation_container">
        <!-- 师生分配情况 -->
        <el-card style="text-align: left;">
            <div slot="header" style="text-align: left;"><b>学生导师双选板块操作</b></div>
            <!-- 开启学生导师双选板块 -->
            <el-switch 
                v-model="turnon" 
                active-color="#13ce66" 
                inactive-color="#dcdfe6"
                active-text="开启学生导师双选板块"
                inactive-text="关闭学生导师双选板块"
                style="margin-left: 20px;">
            </el-switch>
        </el-card>
        <el-card style="margin-top: 20px;" v-if="turnon">
            <div slot="header" class="clearfix">
                <b style="float: left; padding: 3px 0">导师名额</b>
                <el-button @click="handleEditQuota" size="mini" style="float: right;" v-if="!quotaInput">调整名额</el-button>
                <el-button @click="handleSubmitQuota" size="mini" style="float: right;" v-if="quotaInput">确定</el-button>
            </div>
            <el-table :data="tableQuotaData" style="width: 100%">
                <el-table-column prop="name" label="导师姓名" min-width="30%"></el-table-column>
                 <el-table-column prop="quota" label="名额" min-width="30%"></el-table-column>
                <el-table-column label="操作" min-width="40%" v-if="quotaInput">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.quota" controls-position="right" @change="handleChange" :min="1" :max="10" size="mini"></el-input-number>   
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChangeQuota"
                    @current-change="handleCurrentChangeQuota"
                    :current-page.sync="currentPageQuota"
                    :page-size="10"
                    layout="prev, pager, next, jumper"
                    :total="50">
                </el-pagination>
            </div>
        </el-card>
        <el-card style="margin-top: 20px;">
            <div slot="header" style="text-align: left;"><b>师生分配情况</b></div>
            <el-table :data="tableAlloData" style="width: 100%">
                <el-table-column prop="name" label="导师姓名" min-width="30%"></el-table-column>
                <el-table-column prop="member" label="学生" min-width="70%"></el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChangeAllo"
                    @current-change="handleCurrentChangeAllo"
                    :current-page.sync="currentPageAllo"
                    :page-size="10"
                    layout="prev, pager, next, jumper"
                    :total="50">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            turnon: true,
            quotaInput: false,
            currentPageQuota: 2,
            currentPageAllo: 2,
            tableQuotaData: [{
                name: '陈香伶',
                quota: 2
            },{
                name: '李知恩',
                quota: 6
            }],
            tableAlloData: [{
                name: '廖雪花',
                member: '陈香伶、李知恩、权志龙、陈死狗'
            }]
        }
    },
    methods: {
        handleChange(value) {
            console.log(value);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleEditQuota() {
            this.quotaInput = true;
        },
        handleSubmitQuota() {
            this.quotaInput = false;
        },
        onSubmit() {
            console.log('submit!');
        },
        handleSizeChangeQuota(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChangeQuota(val) {
            console.log(`当前页: ${val}`);
        },
        handleSizeChangeAllo(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChangeAllo(val) {
            console.log(`当前页: ${val}`);
        },
    }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.page {
    margin-top: 20px;
}
</style>