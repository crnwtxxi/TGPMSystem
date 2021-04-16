<template>
    <div class="Stutorinfo_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>我的导师</b></div>
            <el-table :data="TutorData" style="width: 100%">
                <el-table-column prop="name" label="姓名" min-width="15%"></el-table-column>
                <el-table-column prop="sex" label="性别" min-width="15%"></el-table-column>
                <el-table-column prop="job" label="职称" min-width="15%"></el-table-column>
                <el-table-column prop="direction" label="研究方向" min-width="30%"></el-table-column>
                <el-table-column label="操作" min-width="25%">
                    <template slot-scope="scope">
                        <el-button size="mini"
                        @click="handleView(scope.$index, scope.row)">查看导师信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            TutorData: [
                {name: '李知恩', sex: '女', job: '教授', direction: '数据挖掘、人工智能'}
            ]
        }
    },
    methods: {
        handleView(index, row) {
            this.$router.push('/user/InfoDetail');
        }
    }
}
</script>

<style scoped>

</style>