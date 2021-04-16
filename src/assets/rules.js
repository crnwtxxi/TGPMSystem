//设置密码
var setPass = (rule, value, callback) => {
    var inputPattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    if (!value) {
        return callback(new Error('不能为空'));
    }
    setTimeout(() => {
        if (!inputPattern.test(value)) {
            callback(new Error('密码至少包含 数字和英文，长度6-20，请重新输入'));
        } else {
            callback();
        }
    }, 1000);
};



export  {
    setPass
}
// import {setPass} from '../assets/rules.js'