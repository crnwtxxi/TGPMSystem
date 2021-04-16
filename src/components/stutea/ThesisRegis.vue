<template>
    <div class="thesisregis_container">
        <el-card>
            <div slot="header" style="text-align: left;"><b>论文发表情况登记</b></div>
            <div class="regis">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="论文题目" prop="title">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="发表期刊">
                        <el-col :span="11">
                            <el-form-item prop="period">
                                <el-input v-model="ruleForm.period" placeholder="请输入期刊全称"></el-input>
                            </el-form-item>
                        </el-col>    
                        <el-col class="line" :span="1">—</el-col>
                        <el-col :span="11">
                            <el-form-item prop="number">
                                <el-input v-model="ruleForm.number" placeholder="请输入期刊刊号"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="作者名字">
                        <el-col :span="11">
                            <el-form-item prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">—</el-col>
                        <el-col :span="11">
                            <el-form-item prop="seque">
                                <el-select v-model="ruleForm.seque" placeholder="请选择作者排序" style="width: 100%;">
                                    <el-option label="第一作者" value="first"></el-option>
                                    <el-option label="第二作者" value="second"></el-option>
                                    <el-option label="其他" value="others"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="期刊性质">
                        <el-col :span="11">
                            <el-form-item prop="type">
                                <el-select v-model="ruleForm.type" placeholder="请选择期刊类别" style="width: 100%;">
                                    <el-option label="学术理论类" value="academic"></el-option>
                                    <el-option label="互作指导类" value="guidance"></el-option>
                                    <el-option label="时事政治类" value="political"></el-option>
                                    <el-option label="文学艺术类" value="literature"></el-option>
                                    <el-option label="综合文化生活类" value="comprehensive"></el-option>
                                    <el-option label="教学辅导类" value="teaching"></el-option>
                                    <el-option label="信息文摘类" value="information"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">—</el-col>
                        <el-col :span="11">
                            <el-form-item prop="level">
                                <el-select v-model="ruleForm.level" placeholder="请选择期刊级别" style="width: 100%;">
                                    <el-option label="省级期刊" value="provin"></el-option>
                                    <el-option label="国家级期刊" value="nation"></el-option>
                                    <el-option label="核心期刊" value="core"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="发表时间" style="width: 50%;">
                        <el-form-item prop="date">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" v-model="ruleForm.remark" maxlength="200" @input="descInput"></el-input>
                        <span class="limit">{{count}}/200</span>
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
                title: '',
                period: '',
                number: '',
                name: '',
                seque: '',
                type: '',
                level: '',
                date: '',
                remark: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入论文题目', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                period: [
                    { required: true, message: '请输入期刊全称', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                number: [
                    { required: true, message: '请输入期刊刊号', trigger: 'blur' },
                    { min: 10, max: 15, message: '长度在 10 到 15 个字符', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入作者名字', trigger: 'blur' },
                    { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                ],
                seque: [
                    { required: true, message: '请选择作者排序', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择期刊性质', trigger: 'change' }
                ],
                level: [
                    { required: true, message: '请选择期刊级别', trigger: 'change' }
                ],
                date: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        descInput(){
            this.count = this.ruleForm.remark.length;
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