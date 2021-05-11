<template>
    <div class="openingtutor_container">
        <el-card>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column
                    prop="alloCollege"
                    label="学院"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="alloGrade"
                    label="年级"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="alloOndate"
                    label="开始日期">
                </el-table-column>
                <el-table-column
                    prop="alloOffdate"
                    label="结束日期">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-card style="margin-top:20px;">
            <div slot="header" style="text-align: left;"><b>设置选导师模块开放信息</b></div>
            <div style="text-align: right; margin-bottom: 20px;">当前模块特定开放于 <b>{{ this.nowYear }}</b> 级的新生.</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"  style="text-align: left;" :disabled="ifCanSet">
                <!-- <el-form-item label="开始时间" style="width: 400px;" required>
                    <el-form-item prop="ondate">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.ondate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="结束时间" style="width: 400px;" required>
                    <el-form-item prop="offdate">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.offdate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-form-item> -->
                <el-form-item label="始末时间">
                   <el-form-item prop="date">
                        <el-date-picker
                            v-model="ruleForm.date"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                   </el-form-item>
                </el-form-item>
                <el-form-item  label="导师默认名额" style="text-align: left;">
                    <el-input-number size="small" v-model="ruleForm.quota" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-dialog title="修改时间范围" :visible.sync="dialogVisible" width="500px">
            <el-form :model="dateForm" ref="dateForm" label-width="0px">
                <el-form-item>
                   <el-form-item prop="date">
                        <el-date-picker
                            v-model="dateForm.date"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                   </el-form-item>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateDate()">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            dateForm: {
                date: ''
            },
            alloId: '',
            nowYear: '',
            ruleForm: {
                // ondate: '',
                // offdate: '',
                date: '',
                quota: ''
            },
            rules: {
                // ondate: [
                //     { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
                // ],
                // offdate: [
                //     { type: 'date', required: true, message: '请选择结束日期', trigger: 'change' }
                // ],
                date: [
                    {  required: true, message: '请选择日期' }
                ]
            },
            tableData: [],
            ifCanSet: true,
        }
    },
    methods: {
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                //console.log('jjjj');
                this.axios.post('/tutor/setOpenTutor',{
                    alloOndate: this.ruleForm.date[0],
                    alloOffdate: this.ruleForm.date[1],
                    alloGrade: this.nowYear,
                    quotaAmount: this.ruleForm.quota
                }).then(res => {
                    if (res.data.success) {
                        this.$notify({
                            title: '成功',
                            message: res.data.message,
                            type: 'success'
                        });
                        this.resetForm('ruleForm');
                    } else {
                        this.$notify.error({message: res.data.message});
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getOpenTutor() {
            this.axios.get('/tutor/getOpenTutor/')
            .then(res => {
                console.log(res.data.data);
                let info = res.data.data;
                this.tableData = [];
                this.tableData.push(info);
            }).catch(error => {
                console.log(error);
            })
        },
        allowSetOpenTutor() {
            if(this.tableData.length > 0) {
                this.ifCanSet = false;
            }
        },
        handleEdit(index, row) {
            // console.log(row);
            this.dialogVisible = true;
            this.alloId = row.alloId;
        },
        updateDate() {
            // console.log(this.dateForm.date);
            this.axios.post('/tutor/updateOpenTutor',{
                alloId: this.alloId,
                alloOndate: this.dateForm.date[0],
                alloOffdate: this.dateForm.date[1]
            }).then(res => {
                if (res.data.success) {
                    this.$notify({
                        title: '成功',
                        message: res.data.message,
                        type: 'success'
                    });
                    this.resetForm('dateForm');
                    this.dialogVisible = false;
                    this.getOpenTutor();
                } else {
                    this.$notify.error({message: res.data.message});
                }
            }).catch(error => {
                console.log("faile");
                console.log(error);
            })
        }
    },
    mounted() {
        this.nowYear = new Date().getFullYear();
        this.getOpenTutor();
        this.allowSetOpenTutor();
    }
}
</script>

<style scoped>

</style>