<template>
    <div class="stuupload_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>文件格式</b></div>
            <el-table :data="tableDataForm" border style="width: 100%;">
                <el-table-column prop="stuno" label="学号" min-width="150"></el-table-column>
                <el-table-column prop="name" label="姓名" min-width="150"></el-table-column>
                <el-table-column prop="sex" label="性别" min-width="150"></el-table-column>
                <el-table-column prop="profess" label="专业" min-width="150"></el-table-column>
                <el-table-column prop="type" label="研究生类别" min-width="150"></el-table-column>
                <el-table-column prop="direction" label="研究方向" min-width="150"></el-table-column>
                <el-table-column prop="email" label="邮箱地址" min-width="200"></el-table-column>
            </el-table>
        </el-card>
        <el-card style="margin-top: 20px;text-align: left;">
            <div slot="header" style="text-align: left;"><b>上传入口</b></div>
            <div class="upload">
                <el-upload
                    class="upload-demo"
                    drag
                    ref="upload"
                    accept=".xlsx, .xls"
                    :action="uploadUrl()"
                    :auto-upload="false"
                    :limit="limitNum"
                    :file-list="fileList"
                    :before-upload="beforeUploadFile"
                    :on-change="fileChange"
                    :on-exceed="exceedFile"
                    :on-success="handleSuccess"
                    :on-error="handleError">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传excel文件，且不超过10M</div>
                </el-upload>
            </div>
            <div style="margin-top: 20px;">
                <el-button size="small" type="primary" @click="uploadFile" class="isjs-ac">立即上传</el-button>
                <el-button size="small" @click="cancelUpload" class="isjs-ac">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            limitNum: 1,
            fileList: [],
            tableDataForm: [{
                name: '陈香伶',
                stuno: '2017110206',
                sex: '女',
                profess: '电子信息',
                type: '专业型硕士',
                direction: '不区分方向',
                email: '1252005708@qq.com',
                college: '计算机科学学院'
            }]
        }
    },
    methods: {
        // 文件超出个数限制时的钩子
        exceedFile(files, fileList) {
            this.$notify({
                title: '文件超出个数限制',
                message: `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`,
                offset: 100,
                type: 'warning',
                showClose: false,
                duration: 1500
            });
        },
        // 文件状态改变时的钩子
        fileChange(file, fileList) {
            this.fileList.push(file.raw) ;
        },
        // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
        beforeUploadFile(file) {
            let extension = file.name.substring(file.name.lastIndexOf('.')+1);
            let size = file.size / 1024 / 1024;
            if(extension !== 'xlsx' || extension !== 'xls') {
                this.$message.warning('只能上传后缀是.xlsx或.xls的文件');
            }
            if(size > 10) {
                this.$message.warning('文件大小不得超过10M');
            }
        },
        // 文件上传成功时的钩子
        handleSuccess(res, file, fileList) {
            this.$notify({
                title: '文件上传成功',
                offset: 100,
                type: 'success',
                showClose: false,
                duration: 1500
            });
        },
        // 文件上传失败时的钩子
        handleError(err, file, fileList) {
            this.$notify({
                title: '文件上传失败',
                offset: 100,
                type: 'error',
                showClose: false,
                duration: 1500
            });
        },
        uploadUrl:function() {
            return ""
        },
        //取消上传请求
        cancelUpload() {
            this.$refs.upload.abort();
        },
        //
        uploadFile() {
            if (this.fileList.length == 0) {
                this.$notify({
                    title: '请选择文件',
                    message: '还未选择文件',
                    type: 'warning'
                });
            } else {
                let form = new FormData();
                form.append('file',this.fileList[0]);
                this.axios.post('/admin/student-upload',form,{
                    "Content-Type":"multipart/form-data"
                }).then (res => {
                    this.$router.push('/admin/StuInfo');
                    this.$notify({
                        title: '文件上传成功',
                        offset: 100,
                        type: 'success',
                        showClose: false,
                        duration: 1500
                    });
                }).catch (error => {
                    console.log(error);
                    this.$notify({
                        title: '文件上传失败',
                        offset: 100,
                        type: 'error',
                        showClose: false,
                        duration: 1500
                    });
                })
            }
        }
    }
}
</script>

<style scoped>

</style>