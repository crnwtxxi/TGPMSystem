import Vue from 'vue'
import Router from 'vue-router'

//引入 Element UI 组件
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Router)
Vue.use(ElementUI)

// Vue.prototype.$axios = axios

//防止访问重复路由报错
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

//引入路由组件
import Home from '@/components/Home'
import User from '@/components/User'
import Admin from '@/components/Admin';

//common
import ActiVeri from '@/components/common/ActiVeri';//学术活动审核
import ThesisVeri from '@/components/common/ThesisVeri';//学术论文审核

//学生端
import STutorChoose from '@/components/student/STutorChoose';//导师选择
import STutorInfo from '@/components/student/STutorInfo';//导师信息

//学生端老师端共有页面
import UserHome from '@/components/stutea/UserHome';//首页
import ViewPlan from '@/components/stutea/ViewPlan';//查看计划
import ActiReport from '@/components/stutea/ActiReport';//活动填报
import ActiRecord from '@/components/stutea/ActiRecord';//活动记录
import ProjRecord from '@/components/stutea/ProjRecord';//项目记录
import ThesisRegis from '@/components/stutea/ThesisRegis';//论文登记
import ThesisRecord from '@/components/stutea/ThesisRecord';//论文记录

//老师端
import TAppliVeri from '@/components/teacher/TAppliVeri';//学生申请导师审核
import TStuInfo from '@/components/teacher/TStuInfo';//学生信息
import TUploadPlan from '@/components/teacher/TUploadPlan';//上传计划
import TProjAppli from '@/components/teacher/TProjAppli';//科研项目申报

//管理端
import AdminHome from '@/components/admin/AdminHome';//首页
import SetAdmin from '@/components/admin/SetAdmin';//设置管理员
import PostAnno from '@/components/admin/PostAnno';//发布公告
import AnnoRecord from '@/components/admin/AnnoRecord';//公告记录
import TeaUpload from '@/components/admin/TeaUpload';//老师信息上传
import TeaInfo from '@/components/admin/TeaInfo';//老师信息管理
import StuUpload from '@/components/admin/StuUpload';//学生信息上传
import StuInfo from '@/components/admin/StuInfo';//学生信息管理
import Allocation from '@/components/admin/Allocation';//师生分配情况
import PlanVeri from '@/components/admin/PlanVeri';//培养计划审核
import ProjVeri from '@/components/admin/ProjVeri';//科研项目审核

//附属组件
import Anno from '@/components/pop/Anno';//公告详情页面
import InfoDetail from '@/components/pop/InfoDetail';//老师学生详细信息罗列公用页面
import TaskDetail from '@/components/pop/TaskDetail';//活动详情、项目详情、论文详情、其他成果-专利-软件著作权-比赛获奖详情页面

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      children: [
        {
          path: 'UserHome',
          name: 'UserHome',
          component: UserHome
        },
        {
          path: 'STutorChoose',
          name: 'STutorChoose',
          component: STutorChoose
        },
        {
          path: 'STutorInfo',
          name: 'STutorInfo',
          component: STutorInfo
        },
        {
          path: 'ViewPlan',
          name: 'ViewPlan',
          component: ViewPlan
        },
        {
          path: 'ActiReport',
          name: 'ActiReport',
          component: ActiReport
        },
        {
          path: 'ActiRecord',
          name: 'ActiRecord',
          component: ActiRecord
        },
        {
          path: 'ProjRecord',
          name: 'ProjRecord',
          component: ProjRecord
        },
        {
          path: 'ThesisRegis',
          name: 'ThesisRegis',
          component: ThesisRegis
        },
        {
          path: 'ThesisRecord',
          name: 'ThesisRecord',
          component: ThesisRecord
        },
        {
          path: 'TAppliVeri',
          name: 'TAppliVeri',
          component: TAppliVeri
        },
        {
          path: 'TStuInfo',
          name: 'TStuInfo',
          component: TStuInfo
        },
        {
          path: 'TUploadPlan',
          name: 'TUploadPlan',
          component: TUploadPlan
        },
        {
          path: 'TProjAppli',
          name: 'TProjAppli',
          component: TProjAppli
        },
        {
          path: 'Anno',
          name: 'Anno',
          component: Anno
        },
        {
          path: 'InfoDetail',
          name: 'InfoDetail',
          component: InfoDetail
        },
        {
          path: 'TaskDetail',
          name: 'TaskDetail',
          component: TaskDetail
        },
        {
          path: 'ActiVeri',
          name: 'ActiVeri',
          component: ActiVeri
        },
        {
          path: 'ThesisVeri',
          name: 'ThesisVeri',
          component: ThesisVeri
        },
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: 'AdminHome',
          name: 'AdminHome',
          component: AdminHome
        },
        {
          path: 'SetAdmin',
          name: 'SetAdmin',
          component: SetAdmin
        },
        {
          path: 'PostAnno',
          name: 'PostAnno',
          component: PostAnno
        },
        {
          path: 'AnnoRecord',
          name: 'AnnoRecord',
          component: AnnoRecord
        },
        {
          path: 'TeaUpload',
          name: 'TeaUpload',
          component: TeaUpload
        },
        {
          path: 'TeaInfo',
          name: 'TeaInfo',
          component: TeaInfo
        },
        {
          path: 'StuUpload',
          name: 'StuUpload',
          component: StuUpload
        },
        {
          path: 'StuInfo',
          name: 'StuInfo',
          component: StuInfo
        },
        {
          path: 'Allocation',
          name: 'Allocation',
          component: Allocation
        },
        {
          path: 'PlanVeri',
          name: 'PlanVeri',
          component: PlanVeri
        },
        {
          path: 'ActiVeri',
          name: 'ActiVeri',
          component: ActiVeri
        },
        {
          path: 'ProjVeri',
          name: 'ProjVeri',
          component: ProjVeri
        },
        {
          path: 'ThesisVeri',
          name: 'ThesisVeri',
          component: ThesisVeri
        },
        {
          path: 'Anno',
          name: 'Anno',
          component: Anno
        },
        {
          path: 'InfoDetail',
          name: 'InfoDetail',
          component: InfoDetail
        },
        {
          path: 'TaskDetail',
          name: 'TaskDetail',
          component: TaskDetail
        }
      ]
    }
  ]
})