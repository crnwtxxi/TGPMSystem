<template>
    <div class="Tprojappli_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>项目申报</b></div>
            <div class="write">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="项目名称" prop="title">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="项目性质" prop="nature">
                        <el-input v-model="ruleForm.nature"></el-input>
                    </el-form-item>
                    <el-form-item label="开展形式" prop="form">
                        <el-input v-model="ruleForm.form"></el-input>
                    </el-form-item>
                    <el-form-item label="项目成员" prop="member">
                        <el-input v-model="ruleForm.member"></el-input>
                    </el-form-item>
                    <el-form-item label="项目概述" prop="desc">
                        <el-input 
                            type="textarea" 
                            v-model="ruleForm.desc" 
                            placeholder="关于项目具体要求说些什么..." 
                            class="desc"
                            maxlength="500"
                            @input="descInput"></el-input>
                        <span class="limit">{{count}}/500</span>
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
        var validateQuota = (rule, value, callback) => {
            var inputPattern = /^[0-9]*$/;
            if (!value) {
                return callback(new Error('名额不能为空'));
            }
            setTimeout(() => {
                if (!inputPattern.test(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value == 0) {
                        callback(new Error('名额必须大于0'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        return {
            count: '0',
            ruleForm: {
                title: '',
                nature: '',
                form: '',
                member: '',
                desc: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入项目名称', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                nature: [
                    { required: true, message: '请输入项目性质', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                form: [
                    { required: true, message: '请输入开展形式', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                member: [ { required: true, message: '请输入项目成员', trigger: 'blur' },],
                desc: [
                    { required: true, message: '请填写活动概述', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        descInput(){
            this.count = this.ruleForm.desc.length;
        }
    }
}
</script>

<style scoped>
.el-col-2 {
    text-align: center;
    width: 30px;
}
.write {
    text-align: left;
}
</style>