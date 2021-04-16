<template>
    <div class="taskdeatil_container">
        <!-- 活动详情、项目详情、论文详情、其他成果  专利  软件著作权 比赛获奖详情 -->
        <el-card>
            <div slot="header" style="text-align: left;">
                <el-page-header @back="goBack" content="活动详情"></el-page-header>
            </div>
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="活动编号"><span class="info">{{ actiData.id }}</span></el-form-item>
                <el-form-item label="活动名称"><span class="info">{{ actiData.title }}</span></el-form-item>
                <el-form-item label="活动时间"><span class="info">{{ actiData.date }}</span></el-form-item>
                <el-form-item label="活动性质"><span class="info">{{ actiData.type }}</span></el-form-item>
                <el-form-item label="活动形式"><span class="info">{{ actiData.form }}</span></el-form-item>
                <el-form-item label="提交时间"><span class="info">{{ actiData.submit }}</span></el-form-item>
                <el-form-item label="举办方"><span class="info">{{ actiData.organizer }}</span></el-form-item>
                <el-form-item label="活动概述" style="width: 100%;"><span class="info">{{ actiData.desc }}</span></el-form-item>
            </el-form>
        </el-card>
        <el-card class="next-card">
            <div slot="header" style="text-align: left;">
                <el-page-header @back="goBack" content="项目详情"></el-page-header>
            </div>
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="项目编号"><span class="info">{{ projData.id }}</span></el-form-item>
                <el-form-item label="项目名称"><span class="info">{{ projData.title }}</span></el-form-item>
                <el-form-item label="项目性质"><span class="info">{{ projData.type }}</span></el-form-item>
                <el-form-item label="项目形式"><span class="info">{{ projData.form }}</span></el-form-item>
                <el-form-item label="开题时间"><span class="info">{{ projData.startdate }}</span></el-form-item>
                <el-form-item label="结题时间"><span class="info">{{ projData.enddate }}</span></el-form-item>
                <el-form-item label="负责导师"><span class="info">{{ projData.tutor }}</span></el-form-item>
                <el-form-item label="项目成员"><span class="info">{{ projData.member }}</span></el-form-item>
                <el-form-item label="项目概述" style="width: 100%;"><span class="info">{{ projData.desc }}</span></el-form-item>
            </el-form>
        </el-card>
        <el-card class="next-card">
            <div slot="header" style="text-align: left;">
                <el-page-header @back="goBack" content="论文详情"></el-page-header>
            </div>
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="论文编号"><span class="info">{{ thesisData.id }}</span></el-form-item>
                <el-form-item label="论文题目"><span class="info">{{ thesisData.title }}</span></el-form-item>
                <el-form-item label="发表期刊"><span class="info">{{ thesisData.period }}</span></el-form-item>
                <el-form-item label="期刊刊号"><span class="info">{{ thesisData.number }}</span></el-form-item>
                <el-form-item label="作者名字"><span class="info">{{ thesisData.name }}</span></el-form-item>
                <el-form-item label="作者排序"><span class="info">{{ thesisData.seque }}</span></el-form-item>
                <el-form-item label="期刊性质"><span class="info">{{ thesisData.type }}</span></el-form-item>
                <el-form-item label="期刊级别"><span class="info">{{ thesisData.level }}</span></el-form-item>
                <el-form-item label="发表时间"><span class="info">{{ thesisData.date }}</span></el-form-item>
                <el-form-item label="论文概述" style="width: 100%;"><span class="info">{{ thesisData.desc }}</span></el-form-item>
            </el-form>
        </el-card>
        <el-card class="next-card">
            <div slot="header" style="text-align: left;">
                <el-page-header @back="goBack" content="其他成果-专利-软件著作权-比赛获奖详情"></el-page-header>
            </div>
            暂无数据
        </el-card>
        <el-card class="next-card">
            <div slot="header" style="text-align: left;">
                <el-page-header @back="goBack" content="培养计划"></el-page-header>
            </div>
            暂无数据
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            actiData: {
                id: '12987122',
                state: '通过',
                title: '2020年华为四川赛区鲲鹏应用大赛',
                organizer: '华为技术有限公司&讯方有限公司',
                date: '2019-07-26',
                type: '学术比赛',
                form: '线下',
                submit: '2020-02-23 19:25:32',
                desc: '界面内会展示出所有可选的导师（名额满了的导师不展示），学生可以在系统选择导师提交申请，导师端可以收到学生的申请，老师可以通过学生的申请，也可以退回学生的申请，只有老师通过学生的申请，老师和学生才算绑定成功，被退回的学生可以再次进入选导师的界面重新选择。'
            },
            projData: {
                id: '12987122',
                tutor: '廖雪花',
                member: '陈香伶、李知恩、权志龙、陈死狗',
                quota: '2 / 5',
                state: '进行中',
                title: '导师指导研究生管理系统',
                type: '省级大学生创新项目',
                form: '合作交流',
                startdate: '2019-07-26',
                enddate: '2020-02-23',
                desc: '界面内会展示出所有可选的导师（名额满了的导师不展示），学生可以在系统选择导师提交申请，导师端可以收到学生的申请，老师可以通过学生的申请，也可以退回学生的申请，只有老师通过学生的申请，老师和学生才算绑定成功，被退回的学生可以再次进入选导师的界面重新选择。'
            },
            thesisData: {
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
                desc: '界面内会展示出所有可选的导师（名额满了的导师不展示），学生可以在系统选择导师提交申请，导师端可以收到学生的申请，老师可以通过学生的申请，也可以退回学生的申请，只有老师通过学生的申请，老师和学生才算绑定成功，被退回的学生可以再次进入选导师的界面重新选择。'
            },

        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
    }
}
</script>

<style scoped>
.next-card {
    margin-top: 20px;
}
.info {
    color: #99a9bf;
}
.demo-table-expand {
  font-size: 0;
  text-align: left;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>