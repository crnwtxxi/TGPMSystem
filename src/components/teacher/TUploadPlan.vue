<template>
    <div class="Tuploadplan_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>上传计划</b></div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="计划标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="计划内容" prop="content">
					<mavon-editor
                        :toolbars="toolbars"
                        style="height:600px"
                        :autofocus="false"
                        v-model="ruleForm.content"
                        @change="change"
                        ref="md"/>
				</el-form-item>
                <el-form-item label="发布范围" style="text-align: left;">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedStudents" @change="handleCheckedStudentsChange">
                        <el-checkbox v-for="student in stuednts" :label="student" :key="student.stuId">{{student.stuName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item style="text-align: left;">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            checkAll: false,
            checkedStudents: [],
            stuednts: [],
            isIndeterminate: true,
            ruleForm: {
                title: '',
                content: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '内容不能为空', trigger: 'blur' }
                ],
            },
            toolbars: {
				bold: true, // 粗体
				italic: true, // 斜体
				header: true, // 标题
				underline: true, // 下划线
				strikethrough: true, // 中划线
				mark: true, // 标记
				superscript: true, // 上角标
				subscript: true, // 下角标
				quote: true, // 引用
				ol: true, // 有序列表
				ul: true, // 无序列表
				link: true, // 链接
				code: false, // code
				table: true, // 表格
				fullscreen: true, // 全屏编辑
				readmodel: true, // 沉浸式阅读
				htmlcode: true, // 展示html源码
				help: true, // 帮助
				/* 1.3.5 */
				undo: true, // 上一步
				redo: true, // 下一步
				trash: true, // 清空
				save: true, // 保存（触发events中的save事件）
				/* 1.4.2 */
				navigation: true, // 导航目录
				/* 2.1.8 */
				alignleft: true, // 左对齐
				aligncenter: true, // 居中
				alignright: true, // 右对齐
				/* 2.2.1 */
				subfield: true, // 单双栏模式
				preview: true // 预览
			}
        }
    },
    methods: {
        change(value, render) {
			// render 为 markdown 解析后的结果[html]
			this.ruleForm.html = render;
		},
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.axios.post('/teacher/uploadPlan',{
                        planTitle: this.ruleForm.title,
                        planContent: this.ruleForm.content,
                        studentList: this.checkedStudents
                    }).then(res => {
                        console.log(res);
                        if (res.data.success) {
                            this.$notify({
                                title: '计划上传成功，待审核',
                                message: res.data.message,
                                type: 'success'
                            });
                            //清空
                            this.resetForm('ruleForm');
                            this.checkedStudents = [];
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
        filterTag(value, row) {
            return row.tag === value;
        },
        //获取自己的学生到发布范围内
        getAllSelfStu() {
            this.axios.get('/teacher/getAllSelfStu')
            .then(res => {
                if (res.data.success) {
                    this.stuednts = res.data.data;
                    //console.log(res.data);
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: res.data.message
                    })
                    //this.$router.push('/');
                }
            }).catch(error => {
                console.log(error);
            })
        },
        handleCheckAllChange(val) {
            this.checkedStudents = val ? this.stuednts : [];
            this.isIndeterminate = false;
        },
        handleCheckedStudentsChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.stuednts.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.stuednts.length;
        }
    }, 
    mounted() {
        this.getAllSelfStu();
    }
}
</script>

<style scoped>
.transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
}
</style>