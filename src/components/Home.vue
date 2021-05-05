<template>
    <div class="home_container">
        <el-container style="height: 100%;">
            <el-main>
                <div class=" bg bg_blur"></div>
                <div class="title"><span>导师指导研究生管理系统</span></div>
                <el-tabs :tab-position="tabPosition" class="tabs">
                    <el-tab-pane label="学生登录">
                        <div class="pane_container">
                            <div class="spanhead">
                                <span>STUDENT</span>
                            </div>
                            <div class="spanmain">
                                <el-form :model="stuForm" :rules="sturules" ref="stuForm" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="学号" prop="stuno" label-width="60px">
                                        <el-input v-model="stuForm.stuno" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码" prop="stupwd" label-width="60px">
                                        <el-input v-model="stuForm.stupwd" clearable show-password></el-input>
                                    </el-form-item>
                                    <el-form-item class="loginitem">
                                        <el-button plain @click="goStuPage('stuForm')" class="loginbtn">直接进入</el-button>
                                        <el-button plain @click="onStuLogin('stuForm')" class="loginbtn">登录</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="老师登录">
                        <div class="pane_container">
                            <div class="spanhead">
                                <span>TEACHER</span>
                            </div>
                            <div class="spanmain">
                                <el-form :model="teaForm" :rules="tearules" ref="teaForm" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="工号" prop="teano" label-width="60px">
                                        <el-input v-model="teaForm.teano" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码" prop="teapwd" label-width="60px">
                                        <el-input v-model="teaForm.teapwd" clearable show-password></el-input>
                                    </el-form-item>
                                    <el-form-item class="loginitem">
                                        <el-button plain @click="goTeaPage('teaForm')" class="loginbtn">直接进入</el-button>
                                        <el-button plain @click="onTeaLogin('teaForm')" class="loginbtn">登录</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="管理员登录">
                        <div class="pane_container">
                            <div class="spanhead">
                                <span>ADMIN</span>
                            </div>
                            <div class="spanmain">
                                <el-form :model="adminForm" :rules="adminrules" ref="adminForm" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="账号" prop="adminno" label-width="60px">
                                        <el-input v-model="adminForm.adminno" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码" prop="adminpwd" label-width="60px">
                                        <el-input v-model="adminForm.adminpwd" clearable show-password></el-input>
                                    </el-form-item>
                                    <el-form-item class="loginitem">
                                        <el-button plain @click="goAdminPage('adminForm')" class="loginbtn">Admin</el-button>
                                        <el-button plain @click="goSuperPage('adminForm')" class="loginbtn">Super</el-button>
                                        <el-button plain class="loginbtn" @click="onAdminLogin('adminForm')">登录</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
            <el-footer>
                版权所有：四川师范大学计算机科学学院2017级4班软件工程 陈香伶 1252005708@qq.com
            </el-footer>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            role: '',
            tabPosition: 'left',
            stuForm: {
                stuno: '',
                stupwd: ''
            },
            teaForm: {
                teano: '',
                teapwd: ''
            },
            adminForm: {
                adminno: '',
                adminpwd: ''
            },
            sturules: {
                stuno: [
                    { required: true, message: '请输入学号', trigger: 'blur' }
                ],
                stupwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            tearules: {
                teano: [
                    { required: true, message: '请输入学号', trigger: 'blur' }
                ],
                teapwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            adminrules: {
                adminno: [
                    { required: true, message: '请输入学号', trigger: 'blur' },
                ],
                adminpwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        //绕过后台直接进入页面
        goStuPage(formName) {
            this.role = 'student';
            this.$router.push({
                name: 'User',
                params: {role: this.role}
            });
        },
        onStuLogin(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.axios.post('/common/student-login',{
                        stuSno: this.stuForm.stuno,
                        stuPwd: this.stuForm.stupwd
                    }).then(res => {
                        console.log(res.data);
                        if (res.data.success) {
                            sessionStorage.setItem('role',res.data.role);
                            sessionStorage.setItem('userInfo',JSON.stringify(res.data.data));
                            this.$router.push('/user');
                            this.$notify({
                                title: '登录成功',
                                message: res.data.message,
                                type: 'success'
                            })
                        } else {
                            this.$notify.error({
                                title: '登录失败，请重试',
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
        //绕过后台直接进入页面
        goTeaPage(formName) {
            this.role = 'teacher';
            this.$router.push({
                name: 'User',
                params: {role: this.role}
            });
        },
        onTeaLogin(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.axios.post('/common/teacher-login',{
                        teaTno: this.teaForm.teano,
                        teaPwd: this.teaForm.teapwd
                    }).then(res => {
                        console.log(res);
                        if (res.data.success) {
                            //数据存session storage里面
                            sessionStorage.setItem('role',res.data.role);
                            sessionStorage.setItem('userInfo',JSON.stringify(res.data.data));
                            this.$router.push('/user');
                            this.$notify({
                                title: '登录成功',
                                message: res.data.message,
                                type: 'success'
                            })
                        } else {
                            this.$notify.error({
                                title: '登录失败，请重试',
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
        goAdminPage(formName) {
            this.role = 'admin';
            this.$router.push({
                name: 'Admin',
                params: {role: this.role}
            });
        },
        goSuperPage(formName) {
            this.role = 'super';
            this.$router.push({
                name: 'Admin',
                params: {role: this.role}
            });
        },
        onAdminLogin(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.axios.post('/common/admin-login',{
                        adminAno: this.adminForm.adminno,
                        adminPwd: this.adminForm.adminpwd
                    }).then(res => {
                        console.log(res);
                        if (res.data.success) {
                            sessionStorage.setItem('role',res.data.role);
                            sessionStorage.setItem('userInfo',JSON.stringify(res.data.data));
                            this.$router.push('/admin');
                            this.$notify({
                                title: '登录成功',
                                message: res.data.message,
                                type: 'success'
                            })
                        } else {
                            this.$notify.error({
                                title: '登录失败，请重试'
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
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        //检查是否已经有用户正在处于登录状态
        checkLogined() {
            this.axios.get('/common/checkLogined')
            .then(res => {
                if (res.data.success) {
                    //允许登录
                } else {
                    //不允许登录,说明有用户正在处于登录状态
                    //直接判断用户身份，跳转到对应的用户界面
                    //console.log(res.data.message);
                    switch (res.data.role) {
                        case '学生':
                        case '老师':
                            //数据存session storage里面
                            sessionStorage.setItem('role',res.data.role);
                            sessionStorage.setItem('userInfo',JSON.stringify(res.data.data));
                            this.$router.push('/user');
                            break;
                        case '院级管理员':
                        case '超级管理员':
                            sessionStorage.setItem('role',res.data.role);
                            sessionStorage.setItem('userInfo',JSON.stringify(res.data.data));
                            this.$router.push('/admin');
                            break;
                    }
                }
            }).catch(error => {
                console.log(error);
            })
        }
    },
    mounted() {
        this.checkLogined();
    }
}
</script>

<style scoped>
.home_container {
    height: 100%;
}
.el-footer {
  background-color: rgba(226, 225, 225, 0.6);
  color: #333;
  text-align: center;
  line-height: 60px;
  width: 100%;
  position: absolute;
  bottom: 0;
}
.el-main {
    /* background-color: #E9EEF3; */
    color: #333;
    text-align: center;
    /* line-height: 160px; */
    padding: 0;
}
.title {
    position: absolute;
    width: 80%;
    color: #fff;
    font-family:华文隶书;
    font-size: 90px;
    top: 10%;
    left: 50%;
    transform: translate(-50%,0);
    text-shadow: 10px 12px 15px rgba(255,255,255,.5);
}
.bg {
    /* border: 1px solid red; */
    background-image: url(~@/assets/bg4.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
}
.bg_blur {
    float: left;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
}
body > .el-container {
  margin-bottom: 40px;
}
.tabs {
    width: 500px;
    height: 230px;
    padding: 50px 20px 50px 20px;
    border: 1px solid #EBEEF5;
    border-radius: 4px;
    box-shadow: 15px 15px 15px 0 rgba(255,255,255,.3);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(226, 225, 225, 0.85);
}
.pane_container {
    display: flex;
    /* border: 1px solid red; */
    flex-direction: column;
    height: 300px;
    width: 100%;
    /* padding-right: 10px; */
}
.spanhead {
    /* border: 1px solid blue; */
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.spanhead span {
    font-family: Georgia;
    font-size: 20px;
}
.spanmain {
    /* border: 1px solid green; */
    width: 100%;
    height: 80%;
}
.demo-ruleForm {
    padding-right: 10px;
}
.loginitem {
    text-align: right;
}
</style>