<template>
    <div class="Stutorinfo_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>我的导师</b></div>
            <el-table :data="tutorData" style="width: 100%">
                <el-table-column prop="teaName" label="姓名" min-width="200"></el-table-column>
                <el-table-column prop="teaTno" label="工号" min-width="200"></el-table-column>
                <el-table-column prop="teaSex" label="性别" min-width="150"></el-table-column>
                <el-table-column prop="teaCollege" label="学院" min-width="200"></el-table-column>
                <el-table-column prop="teaDirection" label="研究方向" min-width="200"></el-table-column>
                <el-table-column prop="teaEmail" label="邮箱" min-width="300"></el-table-column>
                <el-table-column label="操作" min-width="200">
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
            tutorData: [],
        }
    },
    methods: {
        handleView(index, row) {
            this.$router.push('/user/InfoDetail');
        },
        //获取导师信息
        getMyTutor() {
            this.axios.get('/student/getMyTutor')
            .then(res => {
                this.tutorData = res.data.data;
            }).catch(error => {
                console.log(error);
            })
        }
    },
    mounted() {
        this.getMyTutor();
    }
}
</script>

<style scoped>

</style>