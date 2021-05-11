<template>
    <div class="setadmin_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>添加管理员</b></div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="管理员账号" prop="adminAno" style="width:500px;">
                    <el-input v-model="ruleForm.adminAno"></el-input>
                </el-form-item>
                <el-form-item label="所属学院" prop="adminCollege" style="width:500px;">
                    <el-input v-model="ruleForm.adminCollege" placeholder="不填则为超管"></el-input>
                </el-form-item>
                <el-form-item style="text-align: left;">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin-top:20px;">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="adminInfo.adminAno" label="工号" min-width="200"></el-table-column>
                <el-table-column prop="adminInfo.adminCollege" label="姓名" min-width="200"></el-table-column>
                <el-table-column prop="tag" label="标签" min-width="150">
                    <template slot-scope="scope">
                        <el-tag
                        :type="scope.row.role === '超级管理员' ? 'success' : 'primary'"
                        disable-transitions>{{scope.row.role}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary"
                            @click="handleView(scope.$index, scope.row)">重置密码</el-button>
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
            ruleForm:{
                adminAno: '',
                adminCollege: ''
            },
            rules: {
                adminAno: [
                    { required: true, message: '请输入管理员账号', trigger: 'blur' },
                    { min: 10, max: 10, message: '长度在 10 个字符', trigger: 'blur' }
                ]
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
        },
        handleDelete(index, row) {
            // console.log(row);
            this.axios.get('/super/deleteAdmin/'+row.adminInfo.adminId)
            .then(res => {
                if (res.data.success) {
                    this.$notify({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getAdminList(this.currentPage, this.pageSize);
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
            this.getAdminList(this.currentPage, this.pageSize);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getAdminList(this.currentPage, this.pageSize);
        },
        getAdminList(pageNum, pageSize) {
            this.axios.get('/super/getAdminList/'+pageNum+'/'+pageSize)
            .then(res => {
                this.tableData = res.data.data.list;
                this.total = res.data.data.total;
            }).catch(error => {
                console.log(error);
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                //console.log('click');
                this.axios.post('/super/addAdmin',{
                    adminAno: this.ruleForm.adminAno,
                    adminCollege: this.ruleForm.adminCollege
                }).then(res => {
                    //console.log(res);
                    if (res.data.success) {
                        this.$notify({
                            title: '添加成功',
                            message: res.data.message,
                            type: 'success'
                        });
                        //清空
                        this.resetForm('ruleForm');
                        this.getAdminList(this.currentPage, this.pageSize);
                    } else {
                        this.$notify.error({
                            title: '失败，请重试',
                            message: res.data.message
                        })
                    }
                }).catch(error => {
                    console.log("faile");
                    console.log(error);
                })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
    },
    mounted() {
        this.getAdminList(this.currentPage, this.pageSize);
    }
}
</script>

<style scoped>

</style>