<template>
    <div class="user_container">
        <div class="body">
            <div class="header">
                 <el-dropdown @command="handleCommand">
                    <div class="message">
                        <div class="user el-dropdown-link">
                            <b v-if="ifShow">{{this.userInfo.stuName}}</b>
                            <b v-if="!ifShow">{{this.userInfo.teaName}}</b>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </div>
                        <div class="avatar">
                            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        </div>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item disabled v-if="ifShow">
                            账号：{{this.userInfo.stuSno}}<br>
                            您的角色：{{this.role}}<br>
                            所属学院：{{this.userInfo.stuCollege}}<br>
                            性别：{{this.userInfo.stuSex}}<br>
                            专业：{{this.userInfo.stuProfess}}<br>
                            研究生类别：{{this.userInfo.stuType}}<br>
                            方向：{{this.userInfo.stuDirection}}<br>
                            电子邮箱：{{this.userInfo.stuEmail}}
                        </el-dropdown-item>
                        <el-dropdown-item disabled v-if="!ifShow">
                            账号：{{this.userInfo.teaTno}}<br>
                            您的角色：{{this.role}}<br>
                            所属学院：{{this.userInfo.teaCollege}}<br>
                            性别：{{this.userInfo.teaSex}}<br>
                            研究方向：{{this.userInfo.teaDirection}}<br>
                            职称：{{this.userInfo.teaRank}}<br>
                            电子邮箱：{{this.userInfo.teaEmail}}
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-edit" divided command="modifyEmail">修改邮箱</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-edit" divided command="modify">修改密码</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-turn-off" divided command="exit">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="notification">
                    <el-badge :value="unreadNoticesNum" class="item" :hidden="ifHidden()">
                        <el-button type="text" style="color:#303133;" @click="showNoticesList">
                            <i class="el-icon-message-solid"></i> 消息通知
                        </el-button>
                    </el-badge>
                </div>
                <div class="home">
                    <el-button type="text" style="color:#303133;" @click="toUserHome">
                        <i class="el-icon-s-home"></i> 首页
                    </el-button>
                </div>
                <div class="title">
                    <span style="font-family:华文隶书;font-size:35px;">导师指导研究生管理系统</span>
                </div>
            </div>
            <div class="main">
                <div class="nav">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo menu"
                        @open="handleOpen"
                        @close="handleClose">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-user"></i>
                                <b ref="nav1" v-if="ifShow">我的导师</b><span v-if="ifShow">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <b ref="nav1" v-if="!ifShow">我的学生</b><span v-if="!ifShow">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </template>
                            <el-menu-item index="1-1" @click="toSTutorChoose" v-if="ifShow"><span class="navText" ref="nav11">导师选择</span></el-menu-item>
                            <el-menu-item index="1-2" @click="toSTutorInfo" v-if="ifShow"><span class="navText" ref="nav12">导师信息</span></el-menu-item>
                            <el-menu-item index="1-1" @click="toTAppliVeri" v-if="!ifShow"><span class="navText" ref="nav11">申请审核</span></el-menu-item>
                            <el-menu-item index="1-2" @click="toTStuInfo" v-if="!ifShow"><span class="navText" ref="nav12">学生信息</span></el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-tickets"></i>
                                <b ref="nav2">培养计划</b>
                            </template>
                            <el-menu-item index="2-1" @click="toTUploadPlan" v-if="!ifShow"><span class="navText" ref="nav21">上传计划</span></el-menu-item>
                            <el-menu-item index="2-2" @click="toViewPlan"><span class="navText" ref="nav22">查看计划</span></el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-school"></i>
                                <b slot="title" ref="nav3">学术活动</b>
                            </template>
                            <el-menu-item index="3-1" @click="toTStuActiVeri" v-if="!ifShow"><span class="navText" ref="nav31">学生活动审核</span></el-menu-item>
                            <el-menu-item index="3-2" @click="toActiReport"><span class="navText" ref="nav32">活动填报</span></el-menu-item>
                            <el-menu-item index="3-3" @click="toActiRecord"><span class="navText" ref="nav33">活动记录</span></el-menu-item>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-trophy-1"></i>
                                <b slot="title" ref="nav4">科研项目</b>
                            </template>
                            <el-menu-item index="4-1" @click="toTProjAppli" v-if="!ifShow"><span class="navText" ref="nav41">项目申报</span></el-menu-item>
                            <el-menu-item index="4-2" @click="toProjRecord"><span class="navText" ref="nav42">我的项目</span></el-menu-item>
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-notebook-1"></i>
                                <b ref="nav5">学术论文</b>
                            </template>
                            <el-menu-item index="5-1" @click="toTStuThesisVeri" v-if="!ifShow"><span class="navText" ref="nav51">学生论文审核</span></el-menu-item>
                            <el-menu-item index="5-2" @click="toThesisRegis"><span class="navText" ref="nav52">论文登记</span></el-menu-item>
                            <el-menu-item index="5-3" @click="toThesisRecord"><span class="navText" ref="nav53">论文记录</span></el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>
                <div class="content">
                    <div class="position">
                        <div>
                            <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item><b>当前位置</b></el-breadcrumb-item>
                                <el-breadcrumb-item>{{nav1}}</el-breadcrumb-item>
                                <el-breadcrumb-item v-if="ifnav2">{{nav2}}</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                    </div>
                    <div class="pop">
                        <router-view v-bind:userRole="role"/>
                    </div>
                    <div class="footer">
                        <el-divider>版权所有：四川师范大学计算机科学学院2017级4班软件工程<br> 陈香伶 1252005708@qq.com</el-divider>
                    </div>
                </div>
            </div>
        </div>

        <!-- 抽屉数据展示 -->
        <el-drawer title="消息列表" :visible.sync="drawer" :with-header="true" :before-close="handleCloseDrawer" size="40%">
                <div v-for="notice in noticesList" :key="notice.notiId" class="text item notice_list_container">
                    <div class="notice_container">
                        <div class="btn_delete"><el-button type="text" @click="deleteNotice(notice.notiId)">删除</el-button></div>
                        <div class="btn_read">
                            <el-button type="text" :disabled="checkRead(notice.notiStatus)" @click="setRead(notice.notiId)">标为已读</el-button>
                        </div>
                        <div class="notice_content" ref="notice">{{notice.notiContent}}</div>
                    </div>
                    <div class="notice_time">{{notice.notiTime}}</div>
                </div>
                <el-pagination class="pagination"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :hide-on-single-page="true"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
        </el-drawer>

        <el-dialog title="修改邮箱" :visible.sync="dialogVisible" width="500px">
            <el-form :model="emailForm" :rules="pwdRules" ref="emailForm" label-width="0px">
                <el-form-item prop="newEmail"
                    :rules="[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ]"
                >
                    <el-input v-model="emailForm.newEmail" placeholder="请输入新的邮箱地址"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeEmail('emailForm')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="pwdForm" :rules="pwdRules" ref="pwdForm" label-width="80px">
                <el-form-item label="原密码" prop="oldPwd">
                    <el-input type="password" v-model="pwdForm.oldPwd" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pwd">
                    <el-input type="password" v-model="pwdForm.pwd" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPwd" >
                    <el-input type="password" v-model="pwdForm.checkPwd" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="changePwd('pwdForm')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import {setPass} from '../assets/rules.js'
export default {
    data() {
        //前后密码是否一致
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.pwdForm.pwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            //用户信息
            userInfo: {},
            //用户角色
            role: '',
            //导航栏切换根据字段
            ifShow: '',
            //抽屉
            drawer: false,
            //抽屉分页
            currentPage: 1,
            pageSize: 10,
            noticesList:[],
            total: 0,
            //面包屑
            nav1: '首页',
            nav2: '',
            //未读消息通知个数
            unreadNoticesNum: 0,
            //修改密码
            dialogFormVisible: false,
            pwdForm: {
                oldPwd: '',
                pwd: '',
                checkPwd: ''
            },
            pwdRules: {
                oldPwd: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, validator: setPass, trigger: 'blur' }
                ],
                checkPwd: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ]
            },
            //修改邮箱
            dialogVisible: false,
            emailForm: {
                newEmail: ''
            },
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        toUserHome() {
            this.nav1 = '首页';
            this.nav2 = '';
            this.$router.push('/user/UserHome');
        },
        toSTutorChoose() {//学生端导师选择
            this.nav1 = this.$refs.nav1.innerHTML;
            this.nav2 = this.$refs.nav11.innerHTML;
            this.$router.push('/user/STutorChoose');
        },
        toSTutorInfo() {//学生端导师信息
            this.nav1 = this.$refs.nav1.innerHTML;
            this.nav2 = this.$refs.nav12.innerHTML;
            this.$router.push('/user/STutorInfo');
        },
        toTAppliVeri() {//老师端导师申请审核
            this.nav1 = this.$refs.nav1.innerHTML;
            this.nav2 = this.$refs.nav11.innerHTML;
            this.$router.push('/user/TAppliVeri');
        },
        toTStuInfo() {//老师端学生信息
            this.nav1 = this.$refs.nav1.innerHTML;
            this.nav2 = this.$refs.nav12.innerHTML;
            this.$router.push('/user/TStuInfo');
        },
        toTUploadPlan() {//老师端上传计划
            this.nav1 = this.$refs.nav2.innerHTML;
            this.nav2 = this.$refs.nav21.innerHTML;
            this.$router.push('/user/TUploadPlan');
        },
        toViewPlan() {//查看计划
            this.nav1 = this.$refs.nav2.innerHTML;
            this.nav2 = this.$refs.nav22.innerHTML;
            this.$router.push('/user/ViewPlan');
        },
        toTStuActiVeri() {//老师端学生活动审核
            this.nav1 = this.$refs.nav3.innerHTML;
            this.nav2 = this.$refs.nav31.innerHTML;
            this.$router.push('/user/ActiVeri');
        },
        toActiReport() {//活动填报
            this.nav1 = this.$refs.nav3.innerHTML;
            this.nav2 = this.$refs.nav32.innerHTML;
            this.$router.push('/user/ActiReport');
        },
        toActiRecord() {//活动记录
            this.nav1 = this.$refs.nav3.innerHTML;
            this.nav2 = this.$refs.nav33.innerHTML;
            this.$router.push('/user/ActiRecord');
        },
        toTProjAppli() {//老师端项目申请
            this.nav1 = this.$refs.nav4.innerHTML;
            this.nav2 = this.$refs.nav41.innerHTML;
            this.$router.push('/user/TProjAppli');
        },
        toProjRecord() {//项目记录
            this.nav1 = this.$refs.nav4.innerHTML;
            this.nav2 = this.$refs.nav42.innerHTML;
            this.$router.push('/user/ProjRecord');
        },
        toTStuThesisVeri() {//老师端学生论文审核
            this.nav1 = this.$refs.nav5.innerHTML;
            this.nav2 = this.$refs.nav52.innerHTML;
            this.$router.push('/user/ThesisVeri');
        },
        toThesisRegis() {//论文登记
            this.nav1 = this.$refs.nav5.innerHTML;
            this.nav2 = this.$refs.nav52.innerHTML;
            this.$router.push('/user/ThesisRegis');
        },
        toThesisRecord() {//论文记录
            this.nav1 = this.$refs.nav5.innerHTML;
            this.nav2 = this.$refs.nav53.innerHTML;
            this.$router.push('/user/ThesisRecord');
        },
        handleCommand(command) {
            if (command == 'modify') {
                //console.log("点击了修改密码");
                this.dialogFormVisible = true;
            } else if (command == 'exit') {
                this.axios.get('/common/logout')
                .then(res => {
                    if (res.data.success) {
                        sessionStorage.removeItem('role');
                        sessionStorage.removeItem('userInfo');
                        this.$router.push('/');
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: res.data.message
                        })
                    }
                }).catch(error => {
                    console.log(error);
                })
            } else if (command == 'modifyEmail') {
                this.dialogVisible = true;
            }
        },
        ifnav2() {
            if (this.nav2 == null) {
                return false;
            } else return true;
        },
        //修改邮箱
        changeEmail(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.axios.post('/common/updateEmail',{
                        newEmail: this.emailForm.newEmail
                    }).then(res => {
                        if (res.data.success) {
                            this.$notify({
                                title: '修改邮箱成功',
                                message: res.data.message,
                                type: 'success'
                            })
                            this.resetForm('emailForm');
                            this.dialogVisible = false;
                        } else {
                            this.$notify.error({
                                title: '请重试',
                                message: res.data.message
                            })
                        }
                    }).catch(error => {
                        console.log("faile");
                        console.log(error);
                    })
                } else {

                }
            })
        },
        //修改密码
        changePwd(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.axios.post('/common/updatePassword',{
                        oldPwd: this.pwdForm.oldPwd,
                        newPwd: this.pwdForm.checkPwd
                    }).then(res => {
                        if (res.data.success) {
                            this.$notify({
                                title: '修改密码成功',
                                message: res.data.message,
                                type: 'success'
                            })
                            this.resetForm('pwdForm');
                            this.dialogFormVisible = false;
                        } else {
                            this.$notify.error({
                                title: '请重试',
                                message: res.data.message
                            })
                        }
                    }).catch(error => {
                        console.log("faile");
                        console.log(error);
                    })
                } else {

                }
            })
        },
        //从session storage中拿用户角色信息和用户基本信息
        getUser() {
            this.role = sessionStorage.getItem('role');
            this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            if (this.role == '学生') {
                this.ifShow = true;
            } else {
                this.ifShow = false;
            }
        },
        //获取当前用户未读消息条数
        getUnreadNoticesNum() {
            this.axios.get('/common/unreadNoticesNum')
            .then(res => {
                if (res.data.success) {
                    this.unreadNoticesNum = res.data.data;
                } else {
                    this.$notify.error({
                        title: res.data.message,
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        },
        //是否隐藏右上角数字标记
        ifHidden() {
            if (this.unreadNoticesNum == 0) {
                return true;
            } else return false;
        },
        //打开抽屉，获取消息列表
        showNoticesList() {
            this.drawer = true;
            this.getNoticesList(this.currentPage, this.pageSize);
        },
        //获取消息列表
        getNoticesList(pageNum, pageSize) {
            this.axios.get('/common/getNotices/'+pageNum+'/'+pageSize)
            .then(res => {
                if (res.data.success) {
                    //console.log(res.data.data);
                    this.noticesList = res.data.data.list;
                    this.total = res.data.data.total;
                } else {
                    this.$notify.error({
                        title: res.data.message,
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        },
        //检查是否该条信息是否已读
        checkRead(status) {
            if (status == '0') {
                //未读
                return false;
            } else {
                //已读
                return true;
            }
        },
        //将一条消息置为已读
        setRead(notiId) {
            this.axios.get('common/readNotice/'+notiId)
            .then(res => {
                if (res.data.success) {
                    //console.log(res.data);
                    this.getNoticesList(this.currentPage, this.pageSize);
                } else {
                    this.$notify.error({
                        title: res.data.message,
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        },
        //将一条消息删除
        deleteNotice(notiId) {
            this.axios.get('common/deleteNotice/'+notiId)
            .then(res => {
                if (res.data.success) {
                    this.getNoticesList(this.currentPage, this.pageSize);
                } else {
                    this.$notify.error({
                        title: res.data.message,
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        },
        //分页
        handleSizeChange(val) {
            this.pageSize = val;
            this.getNoticesList(this.currentPage, this.pageSize);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getNoticesList(this.currentPage, this.pageSize);
        },
        //抽屉关闭前的回调
        handleCloseDrawer() {
            this.getUnreadNoticesNum();
            this.drawer = false;
        },
        //清空表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    mounted() {
        this.getUser();//获取用户登录信息
        this.toUserHome();//默认定向到首页
        this.getUnreadNoticesNum();//获取当前用户未读消息条数
    }
}
</script>

<style scoped>
html, body {
    overflow: hidden;
}
.body {
    display: flex;
    /* border: 1px solid red; */
    flex-direction: column;
}
.header {
    border-bottom: 1px solid rgb(190, 188, 188);
    width: 100%;
    height: 64px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    background-image: url(~@/assets/bg9.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
.message {
    /* border: 1px solid green; */
    margin-left: 20px;
    margin-right: 50px;
    /* margin-top: 12px; */
    display: flex;
    flex-direction: row-reverse;
}
.user {
    /* border: 1px solid blue; */
    display: flex;
    align-items: center;
    margin-left: 10px;
}
.avatar {
    /* border: 1px solid blue; */
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.notification {
    /* border: 1px solid blue; */
    width: 110px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.notification:hover {
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    transition: .3s;
}
.home {
    /* border: 1px solid red; */
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.home:hover {
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    transition: .3s;
}
.title {
    /* border: 1px solid red; */
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.main {
    width: 100%;
    /* height: 1000px; */
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 64px;
    bottom: 0px;
}
.nav {
    /* border: 1px solid green; */
    height: 100%;
    /* padding-top: 5px; */
    /* border-right: 1px solid rgb(190, 188, 188); */
    overflow-y: auto;
    box-shadow: 0px 10px 15px rgb(153, 151, 151);
    background-image: url(~@/assets/bg7.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
/*滚动条整体样式*/
.nav::-webkit-scrollbar {
    width: 4px;
}
/*滚动条里面小方块*/
.nav::-webkit-scrollbar-thumb {
    border-radius: 10px;
    /* box-shadow: inset 0 0 5px rgba(0,0,0,.2); */
    background-color: skyblue;
    background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
    );
}
/*滚动条里面轨道*/
.nav::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0,0,0,.2);
    background-color: #ededed;
}
.content {
    /* border: 1px solid orchid; */
    /* height: 1000px; */
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 0 50px 0 50px;
    overflow-y: auto;
    background-color: rgba(226, 225, 225, 0.3);
}
/*滚动条整体样式*/
.content::-webkit-scrollbar {
    width: 4px;
}
/*滚动条里面小方块*/
.content::-webkit-scrollbar-thumb {
    border-radius: 10px;
    /* box-shadow: inset 0 0 5px rgba(0,0,0,.2); */
    background-color: skyblue;
    background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
    );
}
/*滚动条里面轨道*/
.content::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0,0,0,.2);
    background-color: #ededed;
}
.position {
    /* border: 1px solid blue; */
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-shrink: 0;
}
.pop {
    /* border: 1px solid orchid; */
    width: 100%;
    /* height: 3000px; */
    /* overflow-y: auto; */
}
.footer {
    /* border: 1px solid black; */
    width: 100%;
    margin-top: 50px;
    margin-bottom: 50px;
}
.el-dropdown-link {
    cursor: pointer;
    /* color: #409EFF; */
}
.el-icon-arrow-down {
    font-size: 12px;
}
.demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
}
.el-dropdown-menu {
    width: 300px;
}
.el-submenu__icon-arrow {
    right: 5px;
    margin-top: -5px;
}
.menu {
    text-align: left;
    background-color: rgba(255, 255, 255, 0.5);
}
.navText {
    margin-left: 25px;
}
.el-divider__text {
    background-color: rgba(255, 255, 255, 0);
}
/* 抽屉 */
.notice_list_container {
    /* margin: 10px; */
    /* border: 1px solid red; */
    border-bottom: 1px solid rgb(153, 151, 151);
    padding-bottom: 5px;
}
.notice_list_container:hover {
    background: rgba(0,0,0,.06);
}
.notice_container {
    /* border: 1px solid red; */
    display: flex;
    flex-direction: row-reverse;
    padding-left: 10px;
}
.notice_content {
    display: flex;
    align-items: center;
    font-size: 15px;
    flex: 1;
}
.btn_read {
    padding: 0 10px 0 10px;
}
.btn_delete {
    padding: 0 10px 0 10px;
}
.notice_time {
    text-align: right;
    padding-right: 10px;
}
.pagination {
    /* border: 1px solid red; */
    position: absolute;
    bottom: 10px;
    width: 100%;
    height: 40px;
}
</style>