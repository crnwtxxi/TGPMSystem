<template>
    <div class="infodetail_container">
        <el-card>
            <div slot="header" style="text-align: left;">
                <el-page-header @back="goBack" content="导师基本信息"></el-page-header>
            </div>
            <div class="info">
                <div class="avatar"></div>
                <div class="msg" v-if="isTea">
                    <li>姓名：李知恩</li>
                    <li>性别：女</li>
                    <li>职称：教授</li>
                    <li>导师类别：硕导</li>
                    <li>邮箱地址：1252005708@qq.com</li>
                    <li>工作单位：计算机科学学院</li>
                </div>
                <div class="msg" v-if="!isTea">
                    <li>姓名：</li>
                    <li>学号：</li>
                    <li>性别：</li>
                    <li>导师：廖雪花</li>
                    <li>专业：</li>
                    <li>学位性质：</li>
                    <li>邮箱地址：1252005708@qq.com</li>
                    <li>所属学院：计算机科学学院</li>
                </div>
            </div>
        </el-card>
        <el-card class="next-card">
            <div slot="header" style="text-align: left;"><b>学术活动信息</b></div>
            <el-table :data="tableActiData" stripe style="width: 100%">
                <el-table-column prop="title" label="活动名称" min-width="50%"></el-table-column>
                <el-table-column prop="date" label="活动时间" min-width="30%"></el-table-column>
                <el-table-column label="操作" min-width="20%">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewActi(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChangeActi"
                    @current-change="handleCurrentChangeActi"
                    :current-page.sync="currentPageActi"
                    :page-size="10"
                    layout="prev, pager, next, jumper"
                    :total="50">
                </el-pagination>
            </div>
        </el-card>
        <el-card class="next-card">
            <div slot="header" style="text-align: left;"><b>科研项目信息</b></div>
            <el-table :data="tableProjData" stripe style="width: 100%">
                <el-table-column prop="title" label="项目名称" min-width="50%"></el-table-column>
                <el-table-column prop="date" label="结题时间" min-width="30%"></el-table-column>
                <el-table-column label="操作" min-width="20%">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewProj(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChangeProj"
                    @current-change="handleCurrentChangeProj"
                    :current-page.sync="currentPageProj"
                    :page-size="10"
                    layout="prev, pager, next, jumper"
                    :total="50">
                </el-pagination>
            </div>
        </el-card>
        <el-card class="next-card">
            <div slot="header" style="text-align: left;"><b>学术论文信息</b></div>
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
                    :current-page.sync="currentPageThesis"
                    :page-size="10"
                    layout="prev, pager, next, jumper"
                    :total="50">
                </el-pagination>
            </div>
        </el-card>
        <el-card class="next-card">
            <div slot="header" style="text-align: left;"><b>其他成果、专利、软件著作权、比赛获奖信息</b></div>
            暂无数据
        </el-card>
        <el-card class="next-card">
            <div slot="header" style="text-align: left;"><b>培养计划</b></div>
            <el-table :data="tablePlanData" style="width: 100%">
                <el-table-column prop="title" label="计划标题" min-width="50%"></el-table-column>
                <el-table-column prop="date" label="发布时间" min-width="30%"></el-table-column>
                <el-table-column label="操作" min-width="20%">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleViewPlan(scope.$index, scope.row)">查看计划</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChangePlan"
                    @current-change="handleCurrentChangePlan"
                    :current-page.sync="currentPagePlan"
                    :page-size="10"
                    layout="prev, pager, next, jumper"
                    :total="50">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import eventBus from '../../assets/eventBus';
export default {
    data() {
        return {
            isTea: true,
            infoList: {},
            currentPageActi: 1,
            tableActiData: [{
                title: '2020年华为四川赛区鲲鹏应用大赛',
                date: '2020-01-23'
            }],
            currentPageProj: 1,
            tableProjData: [{
                title: '2020年华为四川赛区鲲鹏应用大赛',
                date: '2020-01-23'
            }],
            currentPageThesis: 1,
            tableThesisData: [{
                title: '2020年华为四川赛区鲲鹏应用大赛',
                date: '2020-01-23'
            }],
            currentPagePlan: 2,
            tablePlanData: [{
                title: '计算机科学学院电子信息专业第一学期培养计划',
                date: '2020-03-23'
            }]
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        //活动的相关方法----------------------------------
        handleSizeChangeActi(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChangeActi(val) {
            console.log(`当前页: ${val}`);
        },
        handleViewActi(index, row) {
            this.$router.push('/admin/TaskDetail');
        },
        //项目的相关方法----------------------------------
        handleSizeChangeProj(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChangeProj(val) {
            console.log(`当前页: ${val}`);
        },
        handleViewProj(index, row) {
            this.$router.push('/admin/TaskDetail');
        },
        //论文的相关方法----------------------------------
        handleSizeChangeThesis(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChangeThesis(val) {
            console.log(`当前页: ${val}`);
        },
        handleViewThesis(index, row) {
            this.$router.push('/admin/TaskDetail');
        },
        //计划的相关方法----------------------------------
        handleSizeChangePlan(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChangePlan(val) {
            console.log(`当前页: ${val}`);
        },
        handleViewPlan(index, row) {
            this.$router.push('/admin/TaskDetail');
        },
        getInit() {
            var self = this;
            var lists = {};
            eventBus.$on('info',(message)=>{
                // console.log('打印message');
                // console.log(message);
                // console.log(message.identify);
                // console.log(message.info);
                // lists = message;
                // console.log(lists);
                // {self.infoList.identify, self.infoList.info} = message;
                // self.infoList = message;
                // console.log(self.infoList);
                // this.infoList.identify = message.identify;
                // this.infoList.info = message.info;
            })
            // console.log(lists);
            // this.infoList = lists;
            // console.log(this.infoList);
            // if (this.infoList.identify == 'teacher') {
            //     this.isTea = true;
            //     console.log(this.infoList.identify);
            // } else if (this.infoList.identify == 'student') {
            //     this.isTea = false;
            //     console.log(this.infoList.identify);
            // }
        }
    },
    mounted() {
        // this.getInit();
    }
}
</script>

<style scoped>
.info {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
}
.avatar {
    border: 1px solid rgb(153, 151, 151, .2);
    border-radius: 4px;
    width: 110px;
    height: 150px;
    background-image: url(~@/assets/bg10.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    /* box-shadow: 0 2px 5px 0 rgba(0,0,0,.1); */
    flex-shrink: 0;
}
.msg {
    /* border: 1px solid rgb(153, 151, 151, .2); */
    /* flex: 1; */
    text-align: left;
    margin-left: 50px;
    line-height: 30px;
    flex-shrink: 0;
}
.next-card {
    margin-top: 20px;
}
.page {
    margin-top: 20px;
}
</style>