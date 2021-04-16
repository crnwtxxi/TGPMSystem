<template>
    <div class="user_container">
        <div class="body">
            <div class="header">
                 <el-dropdown @command="handleCommand">
                    <div class="message">
                        <div class="user el-dropdown-link"><b>用户</b><i class="el-icon-arrow-down el-icon--right"></i></div>
                        <div class="avatar">
                            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        </div>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item disabled>
                            账号：2021888888<br>
                            您的角色：{{roleName}}<br>
                            所属学院：计算机科学学院
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-edit" divided command="modify">修改密码</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-turn-off" divided command="exit">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="notification">
                    <el-badge :value="9" class="item">
                        <el-button type="text" style="color:#303133;" @click="drawer = true">
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

        <el-drawer
            title="消息列表"
            :visible.sync="drawer"
            :with-header="true">
            <div v-for="o in 4" :key="o" class="text item" style="text-align:left;margin-left:10px;margin-bottom:10px;">
                {{'列表内容 ' + o }}
            </div>
        </el-drawer>

        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="pwdForm" :rules="pwdRules" ref="pwdForm" label-width="80px">
                <el-form-item label="原密码" prop="oldPwd">
                    <el-input type="password" v-model="pwdForm.oldPwd" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
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
            //用户信息，通过session存取
            user: {

            },
            role: '',
            roleName: '',
            ifShow: '',
            drawer: false,
            nav1: '首页',
            nav2: '',
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
            this.$router.push('/user/TStuActiVeri');
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
            this.$router.push('/user/TStuThesisVeri');
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
                console.log("点击了修改密码");
                this.dialogFormVisible = true;
            } else if (command == 'exit') {
                // console.log("点击了退出登录");
                this.$router.push('/');
            }
        },
        ifnav2() {
            if (this.nav2 == null) {
                return false;
            } else return true;
        },
        changePwd(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('修改密码成功');
                    this.dialogFormVisible = false;
                } else {

                }
            })
        },
        getRole() {
            // this.role = this.$route.params.role;
            // console.log(this.role);
            // if (this.role == 'student') {
            //     this.ifShow = true;
            //     this.roleName = '学生';
            // } else {
            //     this.ifShow = false;
            //     this.roleName = '研究生导师';
            // }
            let user = JSON.parse(sessionStorage.getItem('userData'));
        }
    },
    mounted() {
        this.getRole();
        this.toUserHome();
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
</style>