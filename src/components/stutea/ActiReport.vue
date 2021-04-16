<template>
    <div class="actireport_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>活动填报</b></div>
            <div class="write">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="活动名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="举办方" prop="organizer">
                        <el-input v-model="ruleForm.organizer"></el-input>
                    </el-form-item>
                    <el-form-item label="活动时间" required>
                        <el-col :span="11">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2">—</el-col>
                        <el-col :span="11">
                        <el-form-item prop="date2">
                            <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                        </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="活动性质" prop="type">
                        <el-checkbox-group v-model="ruleForm.type">
                        <el-checkbox label="专家讲座" name="type"></el-checkbox>
                        <el-checkbox label="学术沙龙" name="type"></el-checkbox>
                        <el-checkbox label="论文研讨会" name="type"></el-checkbox>
                        <el-checkbox label="学术比赛" name="type"></el-checkbox>
                        <el-checkbox label="跨学科学术交流会" name="type"></el-checkbox>
                        <el-checkbox label="其他" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="活动形式" prop="form">
                        <el-radio-group v-model="ruleForm.resource">
                        <el-radio label="线上"></el-radio>
                        <el-radio label="线下"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="活动举办方" v-if="ifTea">
                        <el-switch v-model="ruleForm.host"></el-switch>
                    </el-form-item>
                    <el-form-item label="活动概述" prop="desc">
                        <el-input 
                            type="textarea" 
                            v-model="ruleForm.desc" 
                            placeholder="关于此次活动说些什么..." 
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
        return {
            count: '0',
            ifTea: '',
            ruleForm: {
                name: '',
                organizer: '',
                date1: '',
                date2: '',
                type: [],
                form: '',
                host: '',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                organizer: [
                    { required: true, message: '请输入活动举办方', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                form: [
                    { required: true, message: '请选择活动形式', trigger: 'change' }
                ],
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