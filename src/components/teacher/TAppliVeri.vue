<template>
    <div class="Tappliveri_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>选我的学生申请列表</b></div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="姓名" min-width="15%"></el-table-column>
                <el-table-column prop="sex" label="性别" min-width="15%"></el-table-column>
                <el-table-column prop="profess" label="专业" min-width="25%"></el-table-column>
                <el-table-column prop="degree" label="学位性质" min-width="25%"></el-table-column>
                <el-table-column label="操作" min-width="20%">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleAgree(scope.$index, scope.row)">同意</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleReturn(scope.$index, scope.row)">退回</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="40">
                </el-pagination>
            </div>
        </el-card>
        <el-card style="margin-top: 20px;text-align: left;">
            <!-- <div slot="header" style="text-align: left;"><b>审核记录</b></div> -->
            <el-collapse @change="handleChange">
                <el-collapse-item title="查看审核记录" name="1">
                    <el-timeline>
                        <el-timeline-item
                            v-for="(activity, index) in activities"
                            :key="index"
                            :timestamp="activity.timestamp">
                            {{activity.content}}
                        </el-timeline-item>
                    </el-timeline>
                </el-collapse-item>
            </el-collapse>
            <div>
                
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentPage: 4,
            tableData: [{
                name: '王小虎',
                sex: '女',
                profess: '人工智能',
                degree: '全日制学术型硕士'
            }, {
                name: '陈香伶',
                sex: '女',
                profess: '电子信息',
                degree: '全日制专业型硕士'
            }, {
                name: '张虎',
                sex: '男',
                profess: '计算机科学与技术',
                degree: '全日制专业型硕士'
            }, {
                name: '温思',
                sex: '女',
                profess: '云计算、大数据',
                degree: '全日制学术型硕士'
            }],
            activities: [{
                content: '退回李知恩的申请',
                timestamp: '2018-04-15'
                }, {
                content: '退回李知恩的申请',
                timestamp: '2018-04-13'
                }, {
                content: '同意陈香伶的申请',
                timestamp: '2018-04-11'
            }]
        }
    },
    methods: {
        handleAgree(index, row) {
            console.log(index, row);
        },
        handleReturn(index, row) {
            console.log(index, row);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleChange(val) {
            console.log(val);
        },
    }
}
</script>

<style scoped>
.page {
    /* border: 1px solid red; */
    margin-top: 20px;
}
</style>