<template>
    <div class="Tprojappli_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>项目申报</b></div>
            <div class="write">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="项目名称" prop="projTitle">
                        <el-input v-model="ruleForm.projTitle" type="text" maxlength="50" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="开展时间" prop="projDate">
                        <el-date-picker
                            v-model="ruleForm.projDate"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="项目性质" prop="projType">
                        <el-input v-model="ruleForm.projType"></el-input>
                    </el-form-item>
                    <el-form-item label="开展形式" prop="projForm">
                        <el-input v-model="ruleForm.projForm"></el-input>
                    </el-form-item>
                    <el-form-item label="项目成员" prop="studentList">
                        <!-- <el-input v-model="ruleForm.member"></el-input> -->
                        <el-select v-model="ruleForm.studentList" multiple filterable
                            remote reserve-keyword placeholder="请输入关键词"
                            :remote-method="remoteMethod"
                            :loading="loading"
                            style="width: 100%;">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目概述" prop="projDesc">
                        <el-input type="textarea" placeholder="请输入内容" v-model="ruleForm.projDesc"
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
                projTitle: '',
                projDate: '',
                projType: '',
                projForm: '',
                projDesc: '',
                studentList: []
            },
            rules: {
                projTitle: [
                    { required: true, message: '请输入项目名称', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                projType: [
                    { required: true, message: '请输入项目性质', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                projForm: [
                    { required: true, message: '请输入开展形式', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                studentList: [ { required: true, message: '请输入项目成员', trigger: 'blur' },],
                projDesc: [
                    { required: true, message: '请填写活动概述', trigger: 'blur' }
                ]
            },
            //成员，连服务器搜索
            options: [],
            value: [],
            list: [],
            loading: false,
            states: ["Alabama", "Alaska", "Arizona",
            "Arkansas", "California", "Colorado",
            "Connecticut", "Delaware", "Florida",
            "Georgia", "Hawaii", "Idaho", "Illinois",
            "Indiana", "Iowa", "Kansas", "Kentucky",
            "Louisiana", "Maine", "Maryland",
            "Massachusetts", "Michigan", "Minnesota",
            "Mississippi", "Missouri", "Montana",
            "Nebraska", "Nevada", "New Hampshire",
            "New Jersey", "New Mexico", "New York",
            "North Carolina", "North Dakota", "Ohio",
            "Oklahoma", "Oregon", "Pennsylvania",
            "Rhode Island", "South Carolina",
            "South Dakota", "Tennessee", "Texas",
            "Utah", "Vermont", "Virginia",
            "Washington", "West Virginia", "Wisconsin",
            "Wyoming"],
            students: []
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.axios.post('/teacher/reportProject',{
                    projTitle: this.ruleForm.projTitle,
                    projOndate: this.ruleForm.projDate[0],
                    projOffdate: this.ruleForm.projDate[1],
                    projType: this.ruleForm.projType,
                    projForm: this.ruleForm.projForm,
                    projDesc: this.ruleForm.projDesc,
                    studentList: this.ruleForm.studentList
                }).then(res => {
                    console.log(res);
                    if (res.data.success) {
                        this.$notify({
                            title: '项目申报成功，待审核',
                            message: res.data.message,
                            type: 'success'
                        });
                        //清空
                        this.resetForm('ruleForm');
                    } else {
                        this.$notify.error({
                            title: '计划上传失败，请重试',
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //成员
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.options = this.list.filter(item => {
                    return item.label.toLowerCase()
                        .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.options = [];
            }
        },
        //获取全校学生
        getAllCampusStu() {
            this.axios.get('/teacher/getAllCampusStu')
            .then(res => {
                let studentsList = res.data.data;
                for(let i = 0; i < studentsList.length; i++) {
                    this.list.push({value: studentsList[i].stuId, label: studentsList[i].stuName+"("+studentsList[i].stuSno+","+studentsList[i].stuCollege+")"});
                }
            }).catch(error => {
                console.log(error);
            })
        },
    },
    mounted() {
        this.getAllCampusStu();
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