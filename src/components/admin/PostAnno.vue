<template>
    <div class="postanno_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>发布公告</b></div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="公告标题" prop="annoTitle">
                    <el-input v-model="ruleForm.annoTitle" type="text" maxlength="50" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="公告内容" prop="annoContent">
                    <mavon-editor
                        :toolbars="toolbars"
                        style="height:600px"
                        :autofocus="false"
                        v-model="ruleForm.annoContent"
                        @change="change"
                        ref="md"/>
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
            ruleForm: {
                annoTitle: '',
                annoContent: ''
            },
            rules: {
                annoTitle: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
                ],
                annoContent: [
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
                this.axios.post('/admin/postAnnounce',{
                    annoTitle: this.ruleForm.annoTitle,
                    annoContent: this.ruleForm.annoContent
                }).then(res => {
                    //console.log(res);
                    if (res.data.success) {
                        this.$notify({
                            title: '公告发布成功，待审核',
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
        }
    }
}
</script>

<style scoped>

</style>