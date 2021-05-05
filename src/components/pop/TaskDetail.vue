<template>
    <div class="taskdeatil_container">
        <!-- 活动详情、项目详情、论文详情、其他成果  专利  软件著作权 比赛获奖详情 -->
        <el-card v-if="ifShowActi">
            <div slot="header" style="text-align: left;">
                <el-page-header @back="goBack" content="活动详情"></el-page-header>
            </div>
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="活动编号"><span class="info">{{ actiData.actiId }}</span></el-form-item>
                <el-form-item label="活动名称"><span class="info">{{ actiData.actiTitle }}</span></el-form-item>
                <el-form-item label="活动时间"><span class="info">{{ actiData.actiDate }}</span></el-form-item>
                <el-form-item label="活动性质"><span class="info">{{ actiData.actiType }}</span></el-form-item>
                <el-form-item label="活动形式"><span class="info">{{ actiData.actiForm }}</span></el-form-item>
                <el-form-item label="举 办 方"><span class="info">{{ actiData.actiHost }}</span></el-form-item>
                <el-form-item label="活动概述" style="width: 100%;"><span class="info">{{ actiData.actiDesc }}</span></el-form-item>
            </el-form>
        </el-card>
        <el-card class="next-card" v-if="ifShowProj">
            <div slot="header" style="text-align: left;">
                <el-page-header @back="goBack" content="项目详情"></el-page-header>
            </div>
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="项目编号"><span class="info">{{ this.projData.projInfo.projId }}</span></el-form-item>
                <el-form-item label="项目名称"><span class="info">{{ this.projData.projInfo.projTitle }}</span></el-form-item>
                <el-form-item label="开题时间"><span class="info">{{ this.projData.projInfo.projOndate }}</span></el-form-item>
                <el-form-item label="结题时间"><span class="info">{{ this.projData.projInfo.projOffdate }}</span></el-form-item>
                <el-form-item label="项目性质" style="width: 100%;"><span class="info">{{ this.projData.projInfo.projType }}</span></el-form-item>
                <el-form-item label="项目形式" style="width: 100%;"><span class="info">{{ this.projData.projInfo.projForm }}</span></el-form-item>
                <el-form-item label="负责导师" style="width: 100%;"><span class="info">{{ this.projData.teaInfo.teaName+"（"+this.projData.teaInfo.teaTno+"，"+this.projData.teaInfo.teaCollege+"）"}}</span></el-form-item>
                <el-form-item label="项目成员" style="width: 100%;">
                    <div v-for="i in this.projData.stuInfo" :key="i.stuId">
                        <span class="info">{{ i.stuName+"（"+i.stuSno+"，"+i.stuCollege+"）" }}</span>
                    </div>
                </el-form-item>
                <el-form-item label="项目概述" style="width: 100%;"><span class="info">{{ this.projData.projInfo.projDesc }}</span></el-form-item>
            </el-form>
        </el-card>
        <el-card class="next-card" v-if="ifShowThesis">
            <div slot="header" style="text-align: left;">
                <el-page-header @back="goBack" content="论文详情"></el-page-header>
            </div>
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="论文编号"><span class="info">{{ thesisData.thesisId }}</span></el-form-item>
                <el-form-item label="论文题目"><span class="info">{{ thesisData.thesisTitle }}</span></el-form-item>
                <el-form-item label="发表期刊"><span class="info">{{ thesisData.thesisPeriod }}</span></el-form-item>
                <el-form-item label="作者名字"><span class="info">{{ thesisData.thesisName }}</span></el-form-item>
                <el-form-item label="作者排序"><span class="info">{{ thesisData.thesisSeque }}</span></el-form-item>
                <el-form-item label="期刊性质"><span class="info">{{ thesisData.thesisType }}</span></el-form-item>
                <el-form-item label="期刊级别"><span class="info">{{ thesisData.thesisLevel }}</span></el-form-item>
                <el-form-item label="发表时间"><span class="info">{{ thesisData.thesisDate }}</span></el-form-item>
                <el-form-item label="论文概述" style="width: 100%;"><span class="info">{{ thesisData.thesisDesc }}</span></el-form-item>
            </el-form>
        </el-card>
        <el-card class="next-card" v-if="ifShowOthers">
            <div slot="header" style="text-align: left;">
                <el-page-header @back="goBack" content="其他成果-专利-软件著作权-比赛获奖详情"></el-page-header>
            </div>
            暂无数据
        </el-card>
        <el-card class="next-card" v-if="ifShowPlan">
            <div slot="header" style="text-align: left;">
                <el-page-header @back="goBack" content="培养计划"></el-page-header>
            </div>
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="计划标题"><span class="info">{{ planData.planTitle }}</span></el-form-item>
                <el-form-item label="上传时间"><span class="info">{{ planData.planDate }}</span></el-form-item>
                <el-form-item label="计划内容" style="width: 100%;"><span class="info">{{ planData.planContent }}</span></el-form-item>
            </el-form>
        </el-card>
        <el-card class="next-card" v-if="ifShowAnno">
            <div slot="header" style="text-align: left;">
                <el-page-header @back="goBack" :content="annoData.annoTitle"></el-page-header>
            </div>
            <div class="content-body">
                <div class="content-html">
                    <mavon-editor v-model="annoData.annoContent" @change="updateDoc" class="markdown"></mavon-editor>
                    <div v-html="this.content"></div>
                </div>
                <div class="college">{{annoData.annoCollege}}</div>
                <div class="date">{{annoData.annoDate}}</div>
            </div>
        </el-card>
    </div>
</template>

<script>
// import marked from 'marked'
export default {
    data() {
        return {
            //session中的东西
            TaskType: '',
            TaskId: '',
            //确定展示的详情板块
            ifShowActi: false,
            ifShowProj: false,
            ifShowThesis: false,
            ifShowPlan: false,
            ifShowOthers: false,
            ifShowAnno: false,
            //每个板块的数据
            actiData: {},
            projData: {},
            thesisData: {},
            planData: {},
            annoData: {},
            //
            content: '',
            blog: ''

        }
    },
    methods: {
        //markdown转html
        updateDoc(value, render) {
            this.content = render
        },
        goBack() {
            //清空session中的TaskType和TaskId
            sessionStorage.removeItem('TaskType');
            sessionStorage.removeItem('TaskId');
            this.$router.go(-1);
        },
        getTaskInfo() {
            let TaskType = sessionStorage.getItem("TaskType");
            let TaskId = sessionStorage.getItem("TaskId");
            //根据ID去获取相应的数据
            switch (TaskType) {
                case 'activity':
                    this.ifShowActi = true;
                    this.axios.get('/common/viewActivity/'+TaskId)
                    .then(res => {
                        this.actiData = res.data.data;
                    }).catch(error => {
                        console.log(error);
                    })
                    break;
                case 'project':
                    this.ifShowProj = true;
                    this.axios.get('/common/viewProject/'+TaskId)
                    .then(res => {
                        //console.log(res.data.data);
                        this.projData = res.data.data;
                    }).catch(error => {
                        console.log(error);
                    })
                    break;
                case 'thesis':
                    this.ifShowThesis = true;
                    this.axios.get('/common/viewThesis/'+TaskId)
                    .then(res => {
                        console.log(res.data.data);
                        this.thesisData = res.data.data;
                    }).catch(error => {
                        console.log(error);
                    })
                    break;
                case 'plan':
                    this.ifShowPlan = true;
                    this.axios.get('/common/viewPlan/'+TaskId)
                    .then(res => {
                        this.planData = res.data.data;
                    }).catch(error => {
                        console.log(error);
                    })
                    break;
                case 'announce':
                    this.ifShowAnno = true;
                    this.axios.get('/common/viewAnnounce/'+TaskId)
                    .then(res => {
                        this.annoData = res.data.data;
                        // this.blog = marked(this.annoData.annoContent)
                    }).catch(error => {
                        console.log(error);
                    })
                    break;
            }
        }
    },
    mounted() {
        this.getTaskInfo();
    }
}
</script>

<style scoped>
/* @import '../../assets/markdown.css'; */
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
.content-body {
    /* border: 1px solid red; */
    width: 100%;
    display: flex;
    flex-direction: column;
}
.college {
    /* border: 1px solid red; */
    width: 100%;
    text-align: right;
    margin-top: 20px;
}
.date {
    /* border: 1px solid red; */
    width: 100%;
    text-align: right;
    margin-top: 20px;
}
.content-html {
    /* border: 1px solid red; */
    width: 100%;
    text-align: start;
    /* background-color: #e5e5e5; */
}
.markdown {
    display: none;
}
</style>