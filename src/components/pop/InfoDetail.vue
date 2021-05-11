<template>
    <div class="infodetail_container">
        <el-card>
            <div slot="header" style="text-align: left;">
                <el-page-header @back="goBack" content="基本信息"></el-page-header>
            </div>
            <div class="info">
                <div class="avatar"></div>
                <div class="msg" v-if="isTea">
                    <li>姓名：{{teaInfo.teaName}}</li>
                    <li>工号：{{teaInfo.teaTno}}</li>
                    <li>性别：{{teaInfo.teaSex}}</li>
                    <li>职称：{{teaInfo.teaRank}}</li>
                    <li>研究方向：{{teaInfo.teaDirection}}</li>
                    <li>邮箱地址：{{teaInfo.teaEmail}}</li>
                    <li>工作单位：{{teaInfo.teaCollege}}</li>
                </div>
                <div class="msg" v-if="!isTea">
                    <li>姓名：{{stuInfo.stuName}}</li>
                    <li>学号：{{stuInfo.stuSno}}</li>
                    <li>性别：{{stuInfo.stuSex}}</li>
                    <li>专业：{{stuInfo.stuProfess}}</li>
                    <li>学位性质：{{stuInfo.stuType}}</li>
                    <li>学习方向：{{stuInfo.stuDirection}}</li>
                    <li>邮箱地址：{{stuInfo.stuEmail}}</li>
                    <li>所属学院：{{stuInfo.stuCollege}}</li>
                </div>
            </div>
        </el-card>
        <el-card class="next-card">
            <div slot="header" style="text-align: left;"><b>学术活动信息</b></div>
            <el-table :data="tableActiData" stripe style="width: 100%">
                <el-table-column prop="actiTitle" label="活动名称" min-width="300"></el-table-column>
                <el-table-column prop="actiDate" label="活动时间" min-width="200"></el-table-column>
                <el-table-column label="操作" min-width="200">
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
                    :page-sizes="[5, 10, 20]"
                    :page-size="pageSizeActi"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalActi">
                </el-pagination>
            </div>
        </el-card>
        <el-card class="next-card">
            <div slot="header" style="text-align: left;"><b>科研项目信息</b></div>
            <el-table :data="tableProjData" stripe style="width: 100%">
                <el-table-column prop="projTitle" label="项目名称" min-width="300"></el-table-column>
                <el-table-column prop="projOffdate" label="结题时间" min-width="200"></el-table-column>
                <el-table-column label="操作" min-width="200">
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
                    :page-sizes="[5, 10, 20]"
                    :page-size="pageSizeProj"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalProj">
                </el-pagination>
            </div>
        </el-card>
        <el-card class="next-card">
            <div slot="header" style="text-align: left;"><b>学术论文信息</b></div>
            <el-table :data="tableThesisData" stripe style="width: 100%">
                <el-table-column prop="thesisTitle" label="论文题目" min-width="300"></el-table-column>
                <el-table-column prop="thesisDate" label="发表时间" min-width="200"></el-table-column>
                <el-table-column label="操作" min-width="200">
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
                    :page-sizes="[5, 10, 20]"
                    :page-size="pageSizeThesis"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalthesis">
                </el-pagination>
            </div>
        </el-card>
        <el-card class="next-card">
            <div slot="header" style="text-align: left;"><b>其他成果、专利、软件著作权、比赛获奖信息</b></div>
            暂无数据
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isTea: true,
            //活动分页
            currentPageActi: 1,
            pageSizeActi: 5,
            tableActiData: [],
            totalActi: 0,
            //项目分页
            currentPageProj: 1,
            pageSizeProj: 5,
            tableProjData: [],
            totalProj: 0,
            //论文分页
            currentPageThesis: 1,
            pageSizeThesis: 5,
            tableThesisData: [],
            totalthesis: 0,
            //学生信息
            stuInfo:{},
            //老师信息
            teaInfo:{},
            //当前用户角色
            userRole: '',
            userType: '',
            userId:''
        }
    },
    methods: {
        goBack() {
            //清空session中的TaskType和TaskId
            sessionStorage.removeItem('userType');
            sessionStorage.removeItem('userId');
            this.$router.go(-1);
        },
        //活动的相关方法----------------------------------
        handleSizeChangeActi(val) {
            this.pageSizeActi = val;
            this.getMyActiList(this.currentPageActi, this.pageSizeActi);
        },
        handleCurrentChangeActi(val) {
            this.currentPageActi = val;
            this.getMyActiList(this.currentPageActi, this.pageSizeActi);
        },
        handleViewActi(index, row) {
            sessionStorage.setItem("TaskType","activity");
            sessionStorage.setItem("TaskId",row.actiId);
            if (this.userRole == '院级管理员') {
                this.$router.push('/admin/TaskDetail');
            } else {
                this.$router.push('/user/TaskDetail');
            }
        },
        getMyActiList(pageNum, pageSize) {
            this.axios.get('/common/getMyActiList/'+this.userId+"/"+pageNum+"/"+pageSize)
            .then(res => {
                //console.log(res.data.data);
                this.tableActiData = res.data.data.list;
                this.totalActi = res.data.data.total;
            }).catch(error => {
                console.log(error);
            })
        },
        //项目的相关方法----------------------------------
        handleSizeChangeProj(val) {
            this.pageSizeProj = val;
            this.getMyProjList(this.currentPageProj, this.pageSizeProj);
        },
        handleCurrentChangeProj(val) {
            trhis.currentPageProj = val;
            this.getMyProjList(this.currentPageProj, this.pageSizeProj);
        },
        handleViewProj(index, row) {
            sessionStorage.setItem("TaskType","project");
            sessionStorage.setItem("TaskId",row.projId);
            if (this.userRole == '院级管理员') {
                this.$router.push('/admin/TaskDetail');
            } else {
                this.$router.push('/user/TaskDetail');
            }
        },
        getMyProjList(pageNum, pageSize) {
            if (this.userType == 'student') {
                this.axios.get('/common/getMyProjListS/'+this.userId+"/"+pageNum+"/"+pageSize)
                .then(res => {
                    //console.log(res.data.data);
                    this.tableProjData = res.data.data.list;
                    this.totalProj = res.data.data.total;
                }).catch(error => {
                    console.log(error);
                })
            } else {
                this.axios.get('/common/getMyProjListT/'+this.userId+"/"+pageNum+"/"+pageSize)
                .then(res => {
                    //console.log(res.data.data);
                    this.tableProjData = res.data.data.list;
                    this.totalProj = res.data.data.total;
                }).catch(error => {
                    console.log(error);
                })
            }
        },
        //论文的相关方法----------------------------------
        handleSizeChangeThesis(val) {
            this.pageSizeThesis = val;
            this.getMyThesisList(this.currentPageThesis, this.pageSizeThesis);
        },
        handleCurrentChangeThesis(val) {
            this.currentPageThesis = val;
            this.getMyThesisList(this.currentPageThesis, this.pageSizeThesis);
        },
        handleViewThesis(index, row) {
            sessionStorage.setItem("TaskType","thesis");
            sessionStorage.setItem("TaskId",row.thesisId);
            if (this.userRole == '院级管理员') {
                this.$router.push('/admin/TaskDetail');
            } else {
                this.$router.push('/user/TaskDetail');
            }
        },
        getMyThesisList(pageNum, pageSize) {
            this.axios.get('/common/getMyThesisList/'+this.userId+"/"+pageNum+"/"+pageSize)
            .then(res => {
                //console.log(res.data.data);
                this.tableThesisData = res.data.data.list;
                this.totalthesis = res.data.data.total;
            }).catch(error => {
                console.log(error);
            })
        },
        //-----------------------------------------------
        getInit() {
            var self = this;
            var lists = {};
        },
        //获取基础信息
        getUserInfo() {
            this.userRole = sessionStorage.getItem("role");
            this.userId = sessionStorage.getItem("userId");
            this.userType = sessionStorage.getItem("userType");
            if (this.userType == 'student') {
                this.isTea = false;
                this.axios.get('/common/viewStuInfo/'+this.userId)
                .then(res => {
                    if (res.data.success) {
                        //console.log(res.data.data);
                        this.stuInfo = res.data.data;
                        // this.$notify({
                        //     type: 'success',
                        //     message: '获取成功!'
                        // });
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: res.data.message
                        })
                    }
                }).catch(error => {
                    console.log(error);
                })
            } else {
                this.isTea = true;
                this.axios.get('/common/viewTeaInfo/'+this.userId)
                .then(res => {
                    if (res.data.success) {
                        console.log(res.data.data);
                        this.teaInfo = res.data.data;
                        // this.$notify({
                        //     type: 'success',
                        //     message: '获取成功!'
                        // });
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: res.data.message
                        })
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    },
    mounted() {
        this.getUserInfo();
        this.getMyActiList(this.currentPageActi, this.pageSizeActi);
        this.getMyProjList(this.currentPageProj, this.pageSizeProj);
        this.getMyThesisList(this.currentPageThesis, this.pageSizeThesis);
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