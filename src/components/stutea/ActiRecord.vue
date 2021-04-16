<template>
    <div class="actirecord_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>我参加的学术活动</b></div>
            <el-table :data="tableActi1Data" stripe style="width: 100%">
                <el-table-column prop="title" label="活动名称" min-width="40%"></el-table-column>
                <el-table-column prop="date" label="活动时间" min-width="20%"></el-table-column>
                <el-table-column label="操作" min-width="20%">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewActi1(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="状态"
                    min-width="20%"
                    :filters="[{ text: '通过', value: '通过' }, { text: '待审核', value: '待审核' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                        :type="scope.row.state === '通过' ? 'success' : 'warning'"
                        disable-transitions>{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="currentPage1"
                    :page-sizes="[5, 10, 20]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="40">
                </el-pagination>
            </div>
        </el-card>
        <el-card style="margin-top: 20px;" v-if="isTea">
            <div slot="header" style="text-align: left;"><b>我开展的学术活动</b></div>
            <el-table :data="tableActi2Data" stripe style="width: 100%">
                <el-table-column prop="title" label="活动名称" min-width="40%"></el-table-column>
                <el-table-column prop="date" label="活动时间" min-width="20%"></el-table-column>
                <el-table-column label="操作" min-width="20%">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewActi2(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="状态"
                    min-width="20%"
                    :filters="[{ text: '通过', value: '通过' }, { text: '待审核', value: '待审核' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                        :type="scope.row.state === '通过' ? 'success' : 'warning'"
                        disable-transitions>{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page="currentPage2"
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
            isTea: '',
            canDelete: '',
            currentPage1: 4,
            tableActi1Data: 
            [
                {
                    id: '12987122',
                    state: '通过',
                    title: '2020年华为四川赛区鲲鹏应用大赛',
                    organizer: '华为技术有限公司&讯方有限公司',
                    date: '2019-07-26',
                    type: '学术比赛',
                    form: '线下',
                    submit: '2020-02-23 19:25:32',
                    desc: '界面内会展示出所有可选的导师（名额满了的导师不展示），学生可以在系统选择导师提交申请，导师端可以收到学生的申请，老师可以通过学生的申请，也可以退回学生的申请，只有老师通过学生的申请，老师和学生才算绑定成功，被退回的学生可以再次进入选导师的界面重新选择。'
                }, {
                    id: '12987122',
                    state: '待审核',
                    title: '2020年第十二届全国数学竞赛（非数学类）',
                    organizer: '华为技术有限公司&讯方有限公司',
                    date: '2019-07-26',
                    type: '论文研讨会',
                    form: '线上',
                    submit: '2020-02-23 19:25:32',
                    desc: '会在学生端和老师端对应的培养计划的板块展示，均可查看。3、学术活动：①学生参加学术活动的情况可以通过系统记录，学生在系统学术活动填报板块填报参加的学术活动的相关情况，提交的信息会到老师端，导师可以通过学生的填报记录也可以退回。②老师开展或参加相关学术活动也可通过系统记录，提交的记录在院内管理端看到，管理员可以通过或退回。4、科研项目：老师开展的科研项目，通过系统申报项目，项目申报记录会提交到院内管理端，管理员通过该项目的申报之后，院内所有研究生都可以看到所有导师的科研项目，然后学生参加了该科研项目的话'
                }, {
                    id: '12987122',
                    state: '待审核',
                    title: '2019年第十一届全国数学竞赛（非数学类）',
                    organizer: '华为技术有限公司&讯方有限公司',
                    date: '2019-07-26',
                    type: '学术沙龙',
                    form: '线下',
                    submit: '2020-02-23 19:25:32',
                    desc: '上海市普陀区真北路'
                }
            ],
            currentPage2: 4,
            tableActi2Data: [{
                id: '12987122',
                state: '通过',
                title: '2020年华为四川赛区鲲鹏应用大赛',
                organizer: '华为技术有限公司&讯方有限公司',
                date: '2019-07-26',
                type: '学术比赛',
                form: '线下',
                submit: '2020-02-23 19:25:32',
                desc: '界面内会展示出所有可选的导师（名额满了的导师不展示），学生可以在系统选择导师提交申请，导师端可以收到学生的申请，老师可以通过学生的申请，也可以退回学生的申请，只有老师通过学生的申请，老师和学生才算绑定成功，被退回的学生可以再次进入选导师的界面重新选择。'
            }],
        }
    },
    methods: {
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSizeChange1(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange1(val) {
            console.log(`当前页: ${val}`);
        },
        handleViewActi1(index, row) {
            this.$router.push('/user/TaskDetail');
        },
        handleSizeChange2(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange2(val) {
            console.log(`当前页: ${val}`);
        },
        handleViewActi2(index, row) {
            this.$router.push('/user/TaskDetail');
        },
        filterTag(value, row) {
            return row.tag === value;
        }
    },
    props: [
        'userRole'
    ],
    mounted() {
        if (this.userRole == 'teacher') {
            this.isTea = true;
        } else {
            thius.isTea = false;
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