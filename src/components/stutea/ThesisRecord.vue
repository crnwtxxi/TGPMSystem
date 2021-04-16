<template>
    <div class="thesisrecord_container">
        <el-card>
            <!-- <div slot="header" style="text-align: left;"><b>我的论文</b></div> -->
            <el-table :data="tableThesisData" stripe style="width: 100%">
                <el-table-column prop="title" label="论文题目" min-width="50%"></el-table-column>
                <el-table-column prop="date" label="发表时间" min-width="30%"></el-table-column>
                <el-table-column label="操作" min-width="20%">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewThesis(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChangeThesis"
                    @current-change="handleCurrentChangeThesis"
                    :current-page="currentPageThesis"
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
            currentPageThesis: 4,
            tableThesisData: 
            [
                {
                    id: '12987122',
                    title: '导师指导研究生管理系统',
                    period: '北京大学图书馆中文核心期刊',
                    number: 'CN62-1185/Z',
                    name: '陈香伶',
                    seque: '第一作者',
                    type: '信息文摘类',
                    level: '国家级期刊',
                    date: '2019-07-26',
                    state: '通过',
                    remark: '界面内会展示出所有可选的导师（名额满了的导师不展示），学生可以在系统选择导师提交申请，导师端可以收到学生的申请，老师可以通过学生的申请，也可以退回学生的申请，只有老师通过学生的申请，老师和学生才算绑定成功，被退回的学生可以再次进入选导师的界面重新选择。'
                }, {
                    id: '12987123',
                    title: '导师指导研究生管理系统',
                    period: '北京大学图书馆中文核心期刊',
                    number: 'CN62-1185/Z',
                    name: '陈香伶',
                    seque: '第一作者',
                    type: '信息文摘类',
                    level: '国家级期刊',
                    date: '2019-07-26',
                    state: '通过',
                    desc: '会在学生端和老师端对应的培养计划的板块展示，均可查看。3、学术活动：①学生参加学术活动的情况可以通过系统记录，学生在系统学术活动填报板块填报参加的学术活动的相关情况，提交的信息会到老师端，导师可以通过学生的填报记录也可以退回。②老师开展或参加相关学术活动也可通过系统记录，提交的记录在院内管理端看到，管理员可以通过或退回。4、科研项目：老师开展的科研项目，通过系统申报项目，项目申报记录会提交到院内管理端，管理员通过该项目的申报之后，院内所有研究生都可以看到所有导师的科研项目，然后学生参加了该科研项目的话'
                }, {
                    id: '12987124',
                    title: '导师指导研究生管理系统',
                    period: '北京大学图书馆中文核心期刊',
                    number: 'CN62-1185/Z',
                    name: '陈香伶',
                    seque: '第一作者',
                    type: '信息文摘类',
                    level: '国家级期刊',
                    date: '2019-07-26',
                    state: '审核中',
                    desc: '上海市普陀区真北路'
                }
            ]
        }
    },
    methods: {
        handleSizeChangeThesis(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChangeThesis(val) {
            console.log(`当前页: ${val}`);
        },
        handleViewThesis(index, row) {
            this.$router.push('/user/TaskDetail');
        },
        filterTag(value, row) {
            return row.tag === value;
        },
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