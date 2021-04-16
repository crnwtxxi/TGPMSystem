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
                            账号：2021888888<br>
                            您的角色：{{this.roleName}}<br>
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
                                <b ref="nav1">系统管理</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </template>
                            <el-menu-item index="1-1" @click="toSetAdmin"><span class="navText" ref="nav11">设置管理员</span></el-menu-item>
                        </el-submenu>
                        <el-submenu index="2" v-if="!ifShow">
                            <template slot="title">
                                <i class="el-icon-date"></i>
                                <b ref="nav2">公告栏目</b>
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
                            <el-menu-item index="3-5" @click="toAllocation"><span class="navText" ref="nav35">师生分配情况</span></el-menu-item>
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

        <el-drawer
            title="消息列表"
            :visible.sync="drawer"
            :with-header="true">
            <div v-for="o in 4" :key="o" class="text item" style="text-align:left;margin-left:10px;margin-bottom:10px;">
                {{'列表内容 ' + o }}
            </div>
        </el-drawer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            role: '',
            roleName: '',
            ifShow: '',
            drawer: false,
            nav1: '首页',
            nav2: ''
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
        handleCommand(command) {
            if (command == 'modify') {
                console.log("点击了修改密码");
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
        getRole() {
            this.role = this.$route.params.role;
            // console.log("lalal  "+this.role);
            if (this.role == 'admin') {
                this.ifShow = false;
                this.roleName = '学院管理员';
            } else {
                this.ifShow = true;
                this.roleName = '超级管理员';
            }
        }
    },
    mounted() {
        this.getRole();
        this.toAdminHome();
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
    margin-left: 13px;
}
.el-divider__text {
    background-color: rgba(255, 255, 255, 0);
}
</style>