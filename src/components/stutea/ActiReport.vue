<template>
    <div class="actireport_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>活动填报</b></div>
            <div class="write">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="活动名称" prop="actiTitle">
                        <el-input v-model="ruleForm.actiTitle" type="text" maxlength="50" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="举办方" prop="actiHost">
                        <el-input v-model="ruleForm.actiHost"></el-input>
                    </el-form-item>
                    <el-form-item label="活动时间" prop="actiDate">
                        <el-date-picker
                            v-model="ruleForm.actiDate"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动性质" prop="actiType">
                        <el-checkbox-group v-model="ruleForm.actiType">
                        <el-checkbox label="专家讲座" name="type"></el-checkbox>
                        <el-checkbox label="学术沙龙" name="type"></el-checkbox>
                        <el-checkbox label="论文研讨会" name="type"></el-checkbox>
                        <el-checkbox label="学术比赛" name="type"></el-checkbox>
                        <el-checkbox label="跨学科学术交流会" name="type"></el-checkbox>
                        <el-checkbox label="其他" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="活动形式" prop="actiForm">
                        <el-radio-group v-model="ruleForm.actiForm">
                            <el-radio label="线上"></el-radio>
                            <el-radio label="线下"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="活动概述" prop="actiDesc">
                        <el-input type="textarea" placeholder="请输入内容" v-model="ruleForm.actiDesc"
                            maxlength="200" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: '0',
            ifTea: '',
            ruleForm: {
                actiTitle: '',
                actiHost: '',
                actiDate: '',
                actiType: [],
                actiForm: '',
                actiDesc: ''
            },
            rules: {
                actiTitle: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在 3 到 50 个字符', trigger: 'blur' }
                ],
                actiHost: [
                    { required: true, message: '请输入活动举办方', trigger: 'blur' }
                ],
                actiDate: [
                    { type: 'date', required: true, message: '请选择活动日期', trigger: 'change' }
                ],
                actiType: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                actiForm: [
                    { required: true, message: '请选择活动形式', trigger: 'change' }
                ],
                actiDesc: [
                    { required: true, message: '请填写活动概述', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.axios.post('/common/reportActivity',{
                    actiTitle: this.ruleForm.actiTitle,
                    actiHost: this.ruleForm.actiHost,
                    actiDate: this.ruleForm.actiDate,
                    actiType: this.ruleForm.actiType.toString(),
                    actiForm: this.ruleForm.actiForm,
                    actiDesc: this.ruleForm.actiDesc
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
        }
    },
    props: [
        'userRole'
    ],
    mounted() {
        if (this.userRole == 'teacher') {
            this.ifTea = true;
        } else {
            this.ifTea = false;
        }
    }
}
</script>

<style scoped>
.write {
    text-align: left;
}
.el-col-2 {
    text-align: center;
    width: 30px;
}
</style>