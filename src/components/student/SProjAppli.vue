<template>
    <div class="Sprojappli_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>正在开展的项目</b></div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="项目编号">
                                <span class="info">{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="项目名称">
                                <span class="info">{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="项目性质">
                                <span class="info">{{ props.row.type }}</span>
                            </el-form-item>
                            <el-form-item label="项目形式">
                                <span class="info">{{ props.row.form }}</span>
                            </el-form-item>
                            <el-form-item label="开题时间">
                                <span class="info">{{ props.row.date }}</span>
                            </el-form-item>
                            <el-form-item label="结题时间">
                                <span class="info">{{ props.row.submit }}</span>
                            </el-form-item>
                            <el-form-item label="项目概述" style="width: 100%;">
                                <span class="info">{{ props.row.desc }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="项目编号" prop="id" min-width="15%"></el-table-column>
                <el-table-column label="项目名称" prop="name" min-width="40%"></el-table-column>
                <el-table-column label="负责导师" prop="tutor" min-width="20%"></el-table-column>
                <el-table-column label="名额" prop="quota" min-width="12.5%"></el-table-column>
                <el-table-column label="操作" min-width="12.5%">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" >申请</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="40">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: 
            [
                {
                    id: '12987122',
                    tutor: '廖雪花',
                    quota: '2 / 5',
                    name: '导师指导研究生管理系统',
                    type: '省级大学生创新项目',
                    form: '合作交流',
                    date: '2019-07-26',
                    submit: '2020-02-23',
                    desc: '界面内会展示出所有可选的导师（名额满了的导师不展示），学生可以在系统选择导师提交申请，导师端可以收到学生的申请，老师可以通过学生的申请，也可以退回学生的申请，只有老师通过学生的申请，老师和学生才算绑定成功，被退回的学生可以再次进入选导师的界面重新选择。'
                }, {
                    id: '12987123',
                    tutor: '廖雪花',
                    quota: '3 / 4',
                    name: '公司档案管理系统',
                    type: '校级大学生创新项目',
                    form: '合作交流',
                    date: '2019-07-26',
                    submit: '2020-02-23',
                    desc: '会在学生端和老师端对应的培养计划的板块展示，均可查看。3、学术活动：①学生参加学术活动的情况可以通过系统记录，学生在系统学术活动填报板块填报参加的学术活动的相关情况，提交的信息会到老师端，导师可以通过学生的填报记录也可以退回。②老师开展或参加相关学术活动也可通过系统记录，提交的记录在院内管理端看到，管理员可以通过或退回。4、科研项目：老师开展的科研项目，通过系统申报项目，项目申报记录会提交到院内管理端，管理员通过该项目的申报之后，院内所有研究生都可以看到所有导师的科研项目，然后学生参加了该科研项目的话'
                }, {
                    id: '12987124',
                    tutor: '张三',
                    quota: '4 / 7',
                    name: '小学生线上数学教学系统',
                    type: '校级大学生创新项目',
                    form: '合作交流',
                    date: '2019-07-26',
                    submit: '2020-02-23',
                    desc: '上海市普陀区真北路'
                }
            ]
        }
    },
    methods: {
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
}
</script>

<style scoped>
.info {
    color: #99a9bf;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 190px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.page {
    /* border: 1px solid red; */
    margin-top: 20px;
}
</style>