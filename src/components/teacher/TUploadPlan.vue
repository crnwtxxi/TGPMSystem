<template>
    <div class="Tuploadplan_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>进度查看</b></div>
            <el-table :data="planData" style="width: 100%">
                <el-table-column label="计划编号" prop="id" min-width="15%"></el-table-column>
                <el-table-column label="计划题目" prop="name" min-width="50%"></el-table-column>
                <el-table-column label="提交时间" prop="date" min-width="15%"></el-table-column>
                <el-table-column
                    prop="state"
                    label="状态"
                    min-width="20%"
                    :filters="[{ text: '通过', value: '通过' }, { text: '审核中', value: '审核中' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                        :type="scope.row.state === '通过' ? 'success' : 'warning'"
                        disable-transitions>{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-card style="margin-top: 20px;">
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
                <el-form-item>
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
                title: '',
                content: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '内容不能为空', trigger: 'blur' }
                ],
            },
            planData: [{
                id: '12987122',
                name: '全日制学术型硕士人工智能方向培养计划',
                date: '2019-07-26',
                state: '通过'
            }],
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
        filterTag(value, row) {
            return row.tag === value;
        },
    }
}
</script>

<style scoped>

</style>