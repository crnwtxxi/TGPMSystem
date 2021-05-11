<template>
    <div class="adminmain_container">
        <div class="body">
            <div class="header">
                 <el-dropdown @command="handleCommand">
                    <div class="message">
                        <div class="user el-dropdown-link"><b>管理员</b><i class="el-icon-arrow-down el-icon--right"></i></div>
                        <div class="avatar">
                            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        </div>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item disabled>
                            账号：{{this.userInfo.adminAno}}<br>
                            您的角色：{{this.role}}<br>
                            所属学院：{{this.userInfo.adminCollege}}
                        </el-dropdown-item>
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
                    <el-button type="text" style="color:#303133;" @click="toAdminHome">
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
                        <el-submenu index="1" v-if="ifShow">
                            <template slot="title">
                                <i class="el-icon-user"></i>
                                <b ref="nav1">系统管理</b><span v-if="ifShow">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </template>
                            <el-menu-item index="1-1" @click="toSetAdmin"><span class="navText" ref="nav11">设置管理员</span></el-menu-item>
                        </el-submenu>
                        <el-submenu index="2" v-if="!ifShow">
                            <template slot="title">
                                <i class="el-icon-date"></i>
                                <b ref="nav2">公告栏目</b><span v-if="!ifShow">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </template>
                            <el-menu-item index="2-1" @click="toPostAnno"><span class="navText" ref="nav21">发布公告</span></el-menu-item>
                            <el-menu-item index="2-2" @click="toAnnoRecord"><span class="navText" ref="nav22">公告记录</span></el-menu-item>
                        </el-submenu>
                        <el-submenu index="3" v-if="!ifShow">
                            <template slot="title">
                                <i class="el-icon-folder-opened"></i>
                                <b slot="title" ref="nav3">师生信息</b>
                            </template>
                            <el-menu-item index="3-1" @click="toTeaUpload"><span class="navText" ref="nav31">老师信息上传</span></el-menu-item>
                            <el-menu-item index="3-2" @click="toTeaInfo"><span class="navText" ref="nav32">老师信息管理</span></el-menu-item>
                            <el-menu-item index="3-3" @click="toStuUpload"><span class="navText" ref="nav33">学生信息上传</span></el-menu-item>
                            <el-menu-item index="3-4" @click="toStuInfo"><span class="navText" ref="nav34">学生信息管理</span></el-menu-item>
                            <el-menu-item index="3-5" @click="toAllocation"><span class="navText" ref="nav35">师生情况</span></el-menu-item>
                        </el-submenu>
                        <el-submenu index="4" v-if="!ifShow">
                            <template slot="title">
                                <i class="el-icon-monitor"></i>
                                <b slot="title" ref="nav4">事务审核</b>
                            </template>
                            <el-menu-item index="4-1" @click="toPlanVeri"><span class="navText" ref="nav41">培养计划审核</span></el-menu-item>
                            <el-menu-item index="4-2" @click="toActiVeri"><span class="navText" ref="nav42">学术活动审核</span></el-menu-item>
                            <el-menu-item index="4-3" @click="toProjVeri"><span class="navText" ref="nav43">科研项目审核</span></el-menu-item>
                            <el-menu-item index="4-4" @click="toThesisVeri"><span class="navText" ref="nav44">学术论文审核</span></el-menu-item>
                        </el-submenu>
                        <el-submenu index="5" v-if="!ifShow">
                            <template slot="title">
                                <i class="el-icon-folder-opened"></i>
                                <b slot="title" ref="nav5">选导师模块</b>
                            </template>
                            <el-menu-item index="5-1" @click="toOpening"><span class="navText" ref="nav51">开放模块</span></el-menu-item>
                            <el-menu-item index="5-2" @click="toUpdateQuota"><span class="navText" ref="nav52">名额修改</span></el-menu-item>
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
                        <router-view/>
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
                        <el-button type="text" :disabled="checkRead(notice.notiStatus)" @click="setRead(notice.notiId)">已读</el-button>
                    </div>
                    <div class="notice_content">{{notice.notiContent}}</div>
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
            }
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        toAdminHome() {//首页
            this.nav1 = '首页';
            this.nav2 = '';
            this.$router.push('/admin/AdminHome');
        },
        toSetAdmin() {//设置管理员
            this.nav1 = this.$refs.nav1.innerHTML;
            this.nav2 = this.$refs.nav11.innerHTML;
            this.$router.push('/admin/SetAdmin');
        },
        toPostAnno() {//发布公告
            this.nav1 = this.$refs.nav2.innerHTML;
            this.nav2 = this.$refs.nav21.innerHTML;
            this.$router.push('/admin/PostAnno');
        },
        toAnnoRecord() {//公告记录
            this.nav1 = this.$refs.nav2.innerHTML;
            this.nav2 = this.$refs.nav22.innerHTML;
            this.$router.push('/admin/AnnoRecord');
        },
        toTeaUpload() {//老师信息上传
            this.nav1 = this.$refs.nav3.innerHTML;
            this.nav2 = this.$refs.nav31.innerHTML;
            this.$router.push('/admin/TeaUpload');
        },
        toTeaInfo() {//老师信息管理
            this.nav1 = this.$refs.nav3.innerHTML;
            this.nav2 = this.$refs.nav32.innerHTML;
            this.$router.push('/admin/TeaInfo');
        },
        toStuUpload() {//学生信息上传
            this.nav1 = this.$refs.nav3.innerHTML;
            this.nav2 = this.$refs.nav33.innerHTML;
            this.$router.push('/admin/StuUpload');
        },
        toStuInfo() {//学生信息管理
            this.nav1 = this.$refs.nav3.innerHTML;
            this.nav2 = this.$refs.nav34.innerHTML;
            this.$router.push('/admin/StuInfo');
        },
        toAllocation() {//师生分配情况
            this.nav1 = this.$refs.nav3.innerHTML;
            this.nav2 = this.$refs.nav35.innerHTML;
            this.$router.push('/admin/Allocation');
        },
        toPlanVeri() {//培养计划审核
            this.nav1 = this.$refs.nav4.innerHTML;
            this.nav2 = this.$refs.nav41.innerHTML;
            this.$router.push('/admin/PlanVeri');
        },
        toActiVeri() {//学术活动审核
            this.nav1 = this.$refs.nav4.innerHTML;
            this.nav2 = this.$refs.nav42.innerHTML;
            this.$router.push('/admin/ActiVeri');
        },
        toProjVeri() {//科研项目审核
            this.nav1 = this.$refs.nav4.innerHTML;
            this.nav2 = this.$refs.nav43.innerHTML;
            this.$router.push('/admin/ProjVeri');
        },
        toThesisVeri() {//学术论文审核
            this.nav1 = this.$refs.nav4.innerHTML;
            this.nav2 = this.$refs.nav44.innerHTML;
            this.$router.push('/admin/ThesisVeri');
        },
        toOpening() {//开放选导师模块
            this.nav1 = this.$refs.nav5.innerHTML;
            this.nav2 = this.$refs.nav51.innerHTML;
            this.$router.push('/admin/OpeningTutor');
        },
        toUpdateQuota() {//名额修改
            this.nav1 = this.$refs.nav5.innerHTML;
            this.nav2 = this.$refs.nav52.innerHTML;
            this.$router.push('/admin/UpdateQuota');
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
                        sessionStorage.removeItem('role');
                        sessionStorage.removeItem('userInfo');
                        this.$router.push('/');
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
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
        ifnav2() {
            if (this.nav2 == null) {
                return false;
            } else return true;
        },
        //获取用户登录信息
        getUser() {
            this.role = sessionStorage.getItem('role');
            this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            if (this.role == '院级管理员') {
                this.ifShow = false;
            } else {
                this.ifShow = true;
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
            } else return true;
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
        }
    },
    mounted() {
        this.getUser();//获取用户登录信息
        this.toAdminHome();//默认定向到管理员首页
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
    /* height: 100%; */
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
    /* height: 100%; */
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 0 50px 0 50px;
    overflow-y: auto;
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