<template>
    <div class="Stutorchoose_container">
        <el-card style="text-align:left;">
            <div slot="header" style="text-align: left;"><b>关于选择导师</b></div>
            <span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;界面内会展示出所有可选的导师，学生可以在系统选择导师
                提交申请，导师端可以收到学生的申请，老师可以通过学生的申请，也可以退回学生的申请，只有老师通过学生的申请，
                老师和学生才算绑定成功，被退回的学生可以再次进入选导师的界面重新选择。<b>注意，每个学生只能选择一名导师。</b>
            </span>
        </el-card>
        <div class="result">
            <el-card class="box-card">
                <div slot="header" style="text-align: left;"><b>已选导师</b></div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="name" label="姓名" min-width="13%"></el-table-column>
                    <el-table-column prop="sex" label="性别" min-width="12%"></el-table-column>
                    <el-table-column prop="job" label="职称" min-width="12%"></el-table-column>
                    <el-table-column prop="direction" label="研究方向" min-width="23%"></el-table-column>
                    <el-table-column prop="state" label="状态" min-width="17%"></el-table-column>
                    <el-table-column prop="quota" label="名额" min-width="13%"></el-table-column>
                    <el-table-column label="操作" min-width="12%">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger"
                            @click="handleEdit(scope.$index, scope.row)">取消</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
        <div class="list">
            <el-card>
                <div slot="header" style="text-align: left;"><b>可选导师</b></div>
                <el-table :data="TutorData" style="width: 100%">
                    <el-table-column prop="name" label="姓名" min-width="15%"></el-table-column>
                    <el-table-column prop="sex" label="性别" min-width="14%"></el-table-column>
                    <el-table-column prop="job" label="职称" min-width="14%"></el-table-column>
                    <el-table-column prop="direction" label="研究方向" min-width="27%"></el-table-column>
                    <el-table-column prop="quota" label="名额" min-width="13%"></el-table-column>
                    <el-table-column label="操作" min-width="10%">
                        <template slot-scope="scope">
                            <el-button size="mini"
                            @click="handleEdit(scope.$index, scope.row)">选择</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {name: '李知恩', sex: '女', job: '教授', direction: '数据挖掘、人工智能', state: '待老师审核', quota: '5 / 8'}
            ],
            TutorData: [
                {name: '李知恩', sex: '女', job: '教授', direction: '数据挖掘、人工智能', quota: '5 / 8'},
                {name: '权志龙', sex: '男', job: '副教授', direction: '嵌入式、物联网', quota: '3 / 6'},
            ]
        }
    },
    methods: {
        handleEdit(index, row) {
            console.log(index, row);
        }
    }
}
</script>

<style scoped>
.Stutorchoose_container {
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
}
.result {
    /* border: 1px solid green; */
    /* height: 150px; */
    margin-top: 20px;
}
.list {
    /* border: 1px solid purple; */
    margin-top: 20px;
}
</style>