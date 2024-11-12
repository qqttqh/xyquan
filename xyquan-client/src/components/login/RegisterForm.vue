<template>
    <div class="title-container">
        <h1>注册</h1>
    </div>
    <el-form :model="form" :rules="rules" ref="formRef" class="custom-el-form">
        <el-form-item class="custom-el-form-item" prop="email">
            <el-input placeholder="电子邮箱" v-model="form.email" style="font-size: 16px">
                <template #prefix>
                    <el-icon>
                        <Email />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item class="custom-el-form-item" prop="password">
            <el-input placeholder="密码" type="password" v-model="form.password" style="font-size: 16px">
                <template #prefix>
                    <el-icon>
                        <Lock />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item class="custom-el-form-item" prop="confirmPassword">
            <el-input placeholder="确认密码" type="password" v-model="form.confirmPassword" style="font-size: 16px">
                <template #prefix>
                    <el-icon>
                        <Lock />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" color="#4933FF" @click="submitForm">注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import Email from '@/components/icons/Email.vue'
import { Lock } from '@element-plus/icons-vue'
import { register } from '@/api/auth'

const emit = defineEmits(['closeRegist'])
const formRef = ref(null);
const form = ref({
    email: '',
    password: '',
    confirmPassword: '',
});

const rules = {
    email: [
        { required: true, message: '请输入电子邮箱', trigger: 'blur' },
        { type: 'email', message: '电子邮箱不正确', trigger: ['blur', 'change'] },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不少于6个字符', trigger: 'blur' },
    ],
    confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value !== form.value.password) {
                    callback(new Error('两次密码不一致'));
                } else {
                    callback();
                }
            }, trigger: 'blur'
        },
    ],
};

const submitForm = async () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            // 表单验证通过，获取邮箱和密码
            const { email, password } = form.value
            register(email, password)
            // window.location.reload()
        } else {
            ElMessage({
                message: '注册发生错误',
                type: 'error',
            });
            return false;
        }
    });
};
</script>

<style lang="scss" scoped>
.title-container {
    h1 {
        text-align: center;
        color: #4933FF;
    }
}

.custom-el-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 10px;

    .custom-el-form-item {
        width: 80%;
    }
}
</style>
