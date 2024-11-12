<template>
    <div class="root-container" :class="{ 'first-post': index === 0 }">
        <!-- 左侧头像部分 -->
        <aside>
            <el-avatar shape="square" size="100" fit="cover" :src="postData.user.userAvatar" />
        </aside>

        <!-- 右侧文章主体 -->
        <main>
            <!-- 帖子头部 -->
            <header>
                <!-- 用户名 -->
                <div>{{ postData.user.userName }}</div>
                <div class="tag-container">
                    <Tag v-for="(item) in postData.user.userTag" :title="item.title" :type="item.type"></Tag>
                </div>
            </header>

            <!-- 文章内容 -->
            <article>{{ postData.content }}</article>

            <!-- 图片容器 -->
            <div class="img-container">
                <el-image class="img-element" v-for="(item, index) in postData.imgs"
                    :src="item" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :preview-src-list="postData.imgs"
                    :initial-index="index" fit="cover" hide-on-click-modal preview-teleported />
            </div>

            <!-- 点赞-评论 -->
            <footer>
                <!-- 按钮-点赞-评论-删除-收展 -->
                <div class="time-and-btns-container">
                    <!-- 创建时间 -->
                    <span class="create-time">{{ formatRelativeTime(postData.createTime) }}</span>

                    <span>
                        <!-- 点赞按钮 -->
                        <el-badge :value="postData.likeList.length" class="custom-badge">
                            <el-button @click="handleLikeClick"
                                :class="{ 'heart-btn-highlight': postData.likeList.includes(userData.userId) }" circle>
                                <template #icon>
                                    <el-icon>
                                        <IconHeart />
                                    </el-icon>
                                </template>
                            </el-button>
                        </el-badge>

                        <!-- 评论按钮 -->
                        <el-badge :value="postData.comments.length" class="custom-badge">
                            <el-button @click="changeShowCommentArea" style="margin: 0;" :icon="ChatDotRound" circle />
                        </el-badge>

                        <!-- 删除帖子按钮 -->
                        <el-popconfirm @confirm="myDeletePost" title="删除？" confirm-button-text="是滴" cancel-button-text="不是滴"
                            confirm-button-type="info" :icon="Delete" icon-color="#4933FF">
                            <template #reference>
                                <el-button v-if="userData.userId === postData.user.userId" style="margin: 0;" :icon="Delete"
                                    circle />
                            </template>
                        </el-popconfirm>

                        <!-- 评论展开收起按钮 -->
                        <el-button style="margin: 0;" @click="changeShowComment" circle>
                            <template #icon>
                                <component :is="showComment ? ArrowUp : ArrowDown"></component>
                            </template>
                        </el-button>
                    </span>
                </div>

                <!-- 评论区 -->
                <div class="comment-section" :class="{ 'height-zero': !showComment, 'height-auto': showComment }">
                    <!-- 评论 -->
                    <div class="comment" v-for="(item) in postData.comments"
                        @click="changeTarget(item.authorId, item.authorName)">
                        <span class="commentAuthor">{{ item.authorName }}</span>
                        <span v-if="item.targetName">回复</span>
                        <span v-if="item.targetName" class="commentTarget">{{ item.targetName }}</span>
                        <span>：{{ item.commentContent }}</span>
                        <!-- 评论删除按钮 -->
                        <el-button @click="myDeleteComment(item.commentId)" v-if="userData.userId === item.authorId"
                            style="margin: 0;" :icon="Delete" circle size="small" />
                    </div>

                    <!-- 评论框 -->
                    <div class="create-comment-container"
                        :class="{ 'height-zero': !showCommentArea, 'height-auto': showCommentArea }">
                        <el-input v-model="newComment" style="width: 100%; font-size: 16px" :placeholder="inputPlaceholder">
                            <template #append>
                                <el-button @click="myCreateComment">发送</el-button>
                            </template>
                        </el-input>
                    </div>

                </div>
            </footer>
        </main>
    </div>
</template>

<script setup>
import { computed, reactive, ref, defineEmits } from 'vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import { ChatDotRound, ArrowDown, ArrowUp, Delete } from '@element-plus/icons-vue'
import { formatRelativeTime } from '@/utils/time'
import { useUserStore } from '@/stores/user'
import Tag from '@/components/base/Tag.vue'
import { toggleLike, createComment, deleteComment, deletePost } from '@/api/posts'
import { generateUniqueId } from '@/utils/utilUniqueId'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
// 刷新路由
const refreshPage = () => {
    const { fullPath } = route
    router.push('/') // 跳转到一个临时路由
    router.push(fullPath)     // 然后再跳回当前路由
}

// 用户仓库
const { userData } = useUserStore()

// 帖子数据
const props = defineProps({
    propsPostData: Object,
    index: Number
})
// 注册删除帖子事件
const emit = defineEmits(['deleteMe'])
const postData = props.propsPostData
// 新评论内容
const newComment = ref('')
// 评论的对象
const target = reactive({
    id: '',
    name: ''
})
function changeTarget(targetId, targetName) {
    if (targetId) {
        target.id = targetId
        target.name = targetName
    } else {
        target.id = ''
        target.name = ''
    }
}
// 评论框占位符
const inputPlaceholder = computed(() => {
    return target.name ? `回复${target.name}` : '请输入评论内容'
})

// 评论区收展状态
const showComment = ref(false)
const changeShowComment = () => {
    showComment.value = showComment.value ? false : true // 收展评论区
    showCommentArea.value = showCommentArea.value ? false : false // 收起评论框
}

// 评论框展示状态
const showCommentArea = ref(false)
function changeShowCommentArea() {
    showComment.value = true // 展开评论区
    if (target.id) {
        changeTarget()
        showCommentArea.value = true
    } else {
        showCommentArea.value = showCommentArea.value ? false : true // 收展评论狂
    }
}

// 发表新评论
function myCreateComment() {
    if (target.name) {
        inputPlaceholder.value = `回复${target.name}`
    } else {
        inputPlaceholder.value = '请输入评论内容'
    }
    if (newComment.value) {
        const commentData = {
            postId: postData.postId,
            commentId: generateUniqueId(),
            authorId: userData.userId,
            authorName: userData.userName,
            targetId: target.id ? target.id : null,
            targetName: target.name ? target.name : null,
            commentContent: newComment.value
        }
        postData.comments.push(commentData)  // 保存到本地仓库
        newComment.value = '' // 上传评论到服务器
        createComment(commentData) // 上传到服务器
    }
}

// 处理点赞按钮
function handleLikeClick() {
    if (postData.likeList.includes(userData.userId)) {
        // 已点赞-进行取消
        postData.likeList = (postData.likeList.filter(item => item !== userData.userId))
        toggleLike(postData.postId, 'unlike')
    } else {
        // 未点赞-进行点赞
        postData.likeList.push(userData.userId)
        toggleLike(postData.postId, 'like')
    }
}

// 删除帖子方法
function myDeletePost() {
    if (postData.user.userId === userData.userId) {
        // 删除前端缓存
        emit('deleteMe', postData.postId)
        // 删除后端数据
        deletePost(postData.postId)
        // 刷新路由
        refreshPage()
    }
}
// 删除评论方法
function myDeleteComment(commentId) {
    let index = postData.comments.findIndex(item => item.commentId === commentId)
    if (index !== -1) {
        postData.comments.splice(index, 1)
    }
    deleteComment(postData.postId, commentId)
}
</script>

<style lang="scss" scoped>
.first-post {
    margin-top: 20px;
}

.height-zero {
    height: 0;
    transition: height 1s ease !important;
}

.height-auto {
    height: auto;
    transition: height 1s ease !important;
}

@import url(../../assets/styles/Post.scss);
</style>
