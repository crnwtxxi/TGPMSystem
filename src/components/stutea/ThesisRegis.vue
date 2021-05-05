<template>
    <div class="thesisregis_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>论文发表情况登记</b></div>
            <div class="regis">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="论文题目" prop="thesisTitle">
                        <el-input v-model="ruleForm.thesisTitle" type="text" maxlength="50" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="发表期刊">
                        <el-col :span="11">
                            <el-form-item prop="thesisPeriod">
                                <el-input v-model="ruleForm.thesisPeriod" placeholder="请输入期刊全称"></el-input>
                            </el-form-item>
                        </el-col>    
                        <el-col class="line" :span="1">—</el-col>
                        <el-col :span="11">
                            <el-form-item prop="number">
                                <el-input v-model="ruleForm.number" placeholder="请输入期刊刊号,没有则无"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="作者名字">
                        <el-col :span="11">
                            <el-form-item prop="thesisName">
                                <el-input v-model="ruleForm.thesisName" placeholder="输入名字全称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">—</el-col>
                        <el-col :span="11">
                            <el-form-item prop="thesisSeque">
                                <el-select v-model="ruleForm.thesisSeque" placeholder="请选择作者排序" style="width: 100%;">
                                    <el-option label="第一作者" value="第一作者"></el-option>
                                    <el-option label="第二作者" value="第二作者"></el-option>
                                    <el-option label="其他" value="其他"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="期刊性质">
                        <el-col :span="11">
                            <el-form-item prop="thesisType">
                                <el-select v-model="ruleForm.thesisType" placeholder="请选择期刊类别" style="width: 100%;">
                                    <el-option label="学术理论类" value="学术理论类"></el-option>
                                    <el-option label="互作指导类" value="互作指导类"></el-option>
                                    <el-option label="时事政治类" value="时事政治类"></el-option>
                                    <el-option label="文学艺术类" value="文学艺术类"></el-option>
                                    <el-option label="综合文化生活类" value="综合文化生活类"></el-option>
                                    <el-option label="教学辅导类" value="教学辅导类"></el-option>
                                    <el-option label="信息文摘类" value="信息文摘类"></el-option>
                                    <el-option label="其他" value="其他"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">—</el-col>
                        <el-col :span="11">
                            <el-form-item prop="thesisLevel">
                                <el-select v-model="ruleForm.thesisLevel" placeholder="请选择期刊级别" style="width: 100%;">
                                    <el-option label="省级期刊" value="省级期刊"></el-option>
                                    <el-option label="国家级期刊" value="国家级期刊"></el-option>
                                    <el-option label="核心期刊" value="核心期刊"></el-option>
                                    <el-option label="其他" value="其他"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="发表时间" style="width: 50%;">
                        <el-form-item prop="thesisDate">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.thesisDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="备注" prop="thesisDesc">
                        <el-input type="textarea" placeholder="请将论文摘要复制至此" v-model="ruleForm.thesisDesc"
                            maxlength="200" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card style="margin-top: 20px;text-align: left;">
            <div slot="header" style="text-align: left;"><b>注意事项</b></div>
            <span style="line-height:30px;font-size: 15px;">
                1、<b>[什么是学术期刊？]</b>学术理论类期刊:能反映国内学术水平，论点明确、论据充分，并具有创新性、探索性和较高学术价值(共2397种)。学术论文只能发表在学术理论类期刊上。<br><br>
                2、<b>正式期刊:</b>
                    由国家新闻出版署与国家有关部委在商定的数额内审批，并编入“国内统一-刊号 ”。
                    国内外公开发行的正式期刊具有国内统一刊号(GN) 和国际刊号(ISSN)，-号一
                    刊，这是公开发行的正式刊物最基本的标志。<br>
                    CN刊号标准格式是: CN XXxXXx/x,<br>
                    CN为中国的国名代码，前2位数字为地区代码，后4位数字为地区连续出版物的序号，最后的字母为分类号。<br>
                    如《读者》杂志的刊号为CN62 -1118/Z，62 是甘肃省的地区代号，1118 是它的序号，Z表示该杂志为综合类刊物。(期刊的分类法按《中国图书馆分类法(第4版)》的基本大类划分)<br>
                    <b>非正式期刊:</b>是指通行政部门审核领取“内部报刊准印证”作为行业内部交流的期刊，不得公开发行。<br><br>
                3、<b>期刊级别分类:</b>国家没有任何一-个政府部门给刊物划分级别，所谓的刊物级别只是期刊行业的一种认识和一些社会 机构推出期刊目录,虽然国家没有划分,可职称评审部门都有对期刊级别的要求。
                    以往的分法为一级刊物、二级刊物、三级刊物。现在一般是分为“核心期刊和普通期刊”两类，近几年有些地方在核心期刊里又分出;权威、重要、核心。<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    ①、省级期刊:“省级”期刊指由各省、自治区、直辖市及其所属部、委办、厅、局主办的期刊以及由各本、专科院校主办的学报(刊)。如《陕西教育》主办单位为:陕西省教育厅<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    ②、国家级期刊: .“国家级”期刊指由国家部委、全国性团体、组织、机关、学术机构主办的刊物。如《现代商业》主办单位:中华全 国商业信息中心<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    ③、核心期刊:目前国内有7大核心期刊(或来源期刊)遴选体系凡是这些来源期刊目录里有的刊物均可认为核心期刊。<br>
                        <li>北京大学图书馆“中文核心期刊”，<br></li>
                        <li>南京大学“中文社会科学引文索引(CSCI) 来源期刊”<br></li>
                        <li>中国科学院文献情报中心“中国科学引文数据库(CSCD) 来源期刊”，<br></li>
                        <li>中国科学技术信息研究所“中国科技论文统计源期刊”(又称“中国科技核心期刊”);<br></li>
                        <li>中国社会科学院文献信息中心“中国人文社会科学核心期刊”，<br></li>
                        <li>中国人文社会科学学报学会“中国人文社科学报核心期刊”，<br></li>
                        <li>万方数据股份有限公司正在建设中的“中国核心期刊遊选数据库”。<br></li>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        目前职称评审部门要求的核心期刊主要是以“中文核心期刊”和“中文社会科学引文索引(SSCI来源期刊"注●极个别评审单位采用“ 中国科学引文数
                        据库(CSCD)来源期刊”。<br>
            </span>
        </el-card>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: '0',
            ruleForm: {
                thesisTitle: '',
                thesisDate: '',
                thesisPeriod: '',
                number: '',
                thesisName: '',
                thesisSeque: '',
                thesisType: '',
                thesisLevel: '',
                thesisDesc: ''
            },
            rules: {
                thesisTitle: [
                    { required: true, message: '请输入论文题目', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                thesisPeriod: [
                    { required: true, message: '请输入期刊全称', trigger: 'blur' }
                ],
                number: [
                    { required: true, message: '请输入期刊刊号', trigger: 'blur' }
                ],
                thesisName: [
                    { required: true, message: '请输入作者名字', trigger: 'blur' }
                ],
                thesisSeque: [
                    { required: true, message: '请选择作者排序', trigger: 'change' }
                ],
                thesisType: [
                    { required: true, message: '请选择期刊性质', trigger: 'change' }
                ],
                thesisLevel: [
                    { required: true, message: '请选择期刊级别', trigger: 'change' }
                ],
                thesisDate: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                thesisDesc: [
                    { required: true, message: '请填写备注', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.axios.post('/common/reportThesis',{
                    thesisTitle: this.ruleForm.thesisTitle,
                    thesisPeriod: this.ruleForm.thesisPeriod,
                    thesisName: this.ruleForm.thesisName,
                    thesisSeque: this.ruleForm.thesisSeque,
                    thesisType: this.ruleForm.thesisType,
                    thesisLevel: this.ruleForm.thesisLevel,
                    thesisDesc: this.ruleForm.thesisDesc,
                    thesisDate: this.ruleForm.thesisDate
                }).then(res => {
                    console.log(res);
                    if (res.data.success) {
                        this.$notify({
                            title: '论文登记成功，待审核',
                            message: res.data.message,
                            type: 'success'
                        });
                        //清空
                        this.resetForm('ruleForm');
                    } else {
                        this.$notify.error({
                            title: '计划上传失败，请重试',
                            message: res.data.message
                        })
                    }
                }).catch(error => {
                    console.log("faile");
                    console.log(error);
                })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>
.regis {
    text-align: left;
}
.line {
    text-align: center;
}
</style>