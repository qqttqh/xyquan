<template>
    <div class="title-container">
        <h1>登录</h1>
    </div>
    <el-form :model="form" :rules="rules" ref="formRef" class="custom-el-form" autocomplete="off">
        <el-form-item class="custom-el-form-item" prop="email">
            <el-input placeholder="电子邮箱" v-model="form.email" autocomplete="off" style="font-size: 16px">
                <template #prefix>
                    <el-icon>
                        <Email />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item class="custom-el-form-item" prop="password">
            <el-input placeholder="密码" type="password" v-model="form.password" autocomplete="off" style="font-size: 16px">
                <template #prefix>
                    <el-icon>
                        <Lock />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" color="#4933FF" @click="submitForm">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import Email from '@/components/icons/Email.vue'
import { Lock } from '@element-plus/icons-vue'
import { login } from '@/api/auth'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore
const formRef = ref(null);

const form = ref({
    email: '',
    password: '',
});

const rules = {
    email: [
        { required: true, message: '请输入电子邮箱', trigger: 'blur' },
        { type: 'email', message: '邮箱不正确', trigger: ['blur', 'change'] },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码不少于6个字符', trigger: 'blur' },
    ],
};

const submitForm = async () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            const { email, password } = form.value
            login(email, password)

        } else {
            ElMessage.error('表单验证失败')
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
