<template>
    <div class="Stutorchoose_container">
        <el-card>
            <div class="endTime">结束时间为:{{end_time}}</div>
            <div class="countDown"><i class="el-icon-time"></i>{{d}}天{{h}}时{{m}}分{{s}}秒</div>
        </el-card>
        <el-card style="text-align:left;margin-top:20px;">
            <div slot="header" style="text-align: left;"><b>关于选择导师</b></div>
            <span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;界面内会展示出所有可选的导师，学生可以在系统选择导师
                提交申请，导师端可以收到学生的申请，老师可以通过学生的申请，也可以退回学生的申请，只有老师通过学生的申请，
                老师和学生才算绑定成功，被退回的学生可以再次进入选导师的界面重新选择。<b>注意，每个学生只能选择一名导师。</b>
            </span>
        </el-card>
        <div class="result">
            <el-card class="box-card">
                <div slot="header" style="text-align: left;"><b>已选导师</b></div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="teaInfo.teaName" label="姓名" min-width="150"></el-table-column>
                    <el-table-column prop="teaInfo.teaSex" label="性别" min-width="110"></el-table-column>
                    <el-table-column prop="teaInfo.teaRank" label="职称" min-width="110"></el-table-column>
                    <el-table-column prop="teaInfo.teaDirection" label="研究方向" min-width="200"></el-table-column>
                    <el-table-column prop="teaInfo.teaEmail" label="邮箱" min-width="200"></el-table-column>
                    <el-table-column prop="recordStatus" label="标签" min-width="150">
                        <template slot-scope="scope">
                            <el-tag
                            :type="tagType(scope.row.recordStatus)"
                            disable-transitions>{{tagMsg(scope.row.recordStatus)}}</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
        <div class="list">
            <el-card>
                <div slot="header" style="text-align: left;"><b>可选导师</b></div>
                <el-table :data="TutorData" style="width: 100%">
                    <el-table-column prop="teaInfo.teaName" label="姓名" min-width="150"></el-table-column>
                    <el-table-column prop="teaInfo.teaSex" label="性别" min-width="110"></el-table-column>
                    <el-table-column prop="teaInfo.teaRank" label="职称" min-width="110"></el-table-column>
                    <el-table-column prop="teaInfo.teaDirection" label="研究方向" min-width="200"></el-table-column>
                    <el-table-column prop="teaInfo.teaEmail" label="邮箱" min-width="200"></el-table-column>
                    <el-table-column prop="appliNum" label="申请人数" min-width="100"></el-table-column>
                    <el-table-column prop="surplusQuota" label="剩余名额" min-width="100"></el-table-column>
                    <el-table-column label="操作" min-width="150">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" :disabled="ifCanAppliTutor"
                            @click="handleAppli(scope.$index, scope.row)">申请</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
// import moment from 'moment';
export default {
    data() {
        return {
            tableData: [
                {name: '李知恩', sex: '女', job: '教授', direction: '数据挖掘、人工智能', state: '待老师审核', quota: '5 / 8'}
            ],
            //倒计时
            d:'',
            h: '',
            m: '',
            s: '',
            sum_h: '',
            //结束时间
            end_time: '',
            //分页      
            currentPage: 1,
            pageSize: 5,
            TutorData: [],
            total: 0,
            //判断可否申请导师
            ifCanAppliTutor: false,

        }
    },
    methods: {
        handleAppli(index, row) {
            this.axios.get('/tutor/appliTutor/'+row.teaInfo.teaId)
            .then(res => {
                if (res.data.success) {
                    console.log(res.data);
                    this.$notify.success({
                        title: res.data.message
                    })
                    this.getMyTutorRecord();
                    this.getTutors(this.currentPage, this.pageSize);
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: res.data.message
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        },
        //分页
        handleSizeChange(val) {
            this.pageSize = val;
            this.getTutors(this.currentPage, this.pageSize);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTutors(this.currentPage, this.pageSize);
        },
        //获取我已经选择的导师记录
        getMyTutorRecord() {
            this.axios.get('/tutor/getMyTutorRecord')
            .then(res => {
                if (res.data.success) {
                    this.tableData = res.data.data;
                    let list = res.data.data;
                    for (let i in list) {
                        if (list[i].recordStatus=='0' || list[i].recordStatus=='1') {
                            this.ifCanAppliTutor = true;
                        }
                    }

                } else {
                    this.$notify.error({
                        title: '错误',
                        message: res.data.message
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        },
        //获取可选导师列表
        getTutors(pageNum, pageSize) {
            this.axios.get('/tutor/getTutors/'+pageNum+'/'+pageSize)
            .then(res => {
                if (res.data.success) {
                    this.TutorData = res.data.data.list;
                    this.total = res.data.data.total;
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: res.data.message
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        },
        //获取结束时间
        getEndTime() {
            this.axios.get('/tutor/getTutorEndTime')
            .then(res => {
                if (res.data.success) {
                    this.end_time = res.data.data;
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: res.data.message
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        },
        //标签样式
        tagType(status) {
            switch (status) {
                case '0':
                    return 'warning';
                case '1':
                    return 'success';
                case '2':
                    return 'info';
            }
        },
        //标签信息
        tagMsg(status) {
            switch (status) {
                case '0':
                    return '待审核';
                case '1':
                    return '通过';
                case '2':
                    return '未通过';
            }
        },
        //倒计时
        countTime: function() {
			// 定义结束时间戳'2021-5-12 10:10:10'
			const end = Date.parse(new Date(this.end_time))
			// 定义当前时间戳
			const now = Date.parse(new Date())
			// 做判断当倒计时结束时都为0
			if (now >= end) {
				this.d = 0
				this.h = 0
				this.m = 0
				this.s = 0
				return
			}
			// 用结束时间减去当前时间获得倒计时时间戳
			const msec = end - now
			let d = parseInt(msec / 1000 / 60 / 60 / 24) //算出天数
			let h = parseInt(msec / 1000 / 60 / 60 % 24)//算出小时数
			let m = parseInt(msec / 1000 / 60 % 60)//算出分钟数
			let s = parseInt(msec / 1000 % 60)//算出秒数
			//给数据赋值
			this.d = d
			this.h = h > 9 ? h : '0' + h
			this.m = m > 9 ? m : '0' + m
			this.s = s > 9 ? s : '0' + s
			//定义this指向
			const that = this
			// 使用定时器 然后使用递归 让每一次函数能调用自己达到倒计时效果
			setTimeout(function () {
				that.countTime()
			}, 1000)
		},
    },
    mounted() {
        this.getEndTime();
        this.countTime();//倒计时
        this.getMyTutorRecord();
        this.getTutors(this.currentPage, this.pageSize);
    },
    
}
</script>

<style scoped>
.Stutorchoose_container {
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
}
.result {
    /* border: 1px solid green; */
    /* height: 150px; */
    margin-top: 20px;
}
.list {
    /* border: 1px solid purple; */
    margin-top: 20px;
}
.countDown {
    margin-top: 20px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 32px;
}
.page {
    margin-top: 20px;
}
</style>