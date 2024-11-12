// 发表新评论
export function createComment() {
    if (target.name) {
        inputPlaceholder.value = `回复${target.name}`
    } else {
        inputPlaceholder.value = '请输入评论内容'
    }
    if (newComment.value) {
        postData.comments.push({
            commentId: postData.comments.length,
            authorId: userData.id,
            authorName: userData.name,
            targetId: target.id ? target.id : null,
            targetName: target.name ? target.name : null,
            commentContent: newComment.value
        })
        newComment.value = ''
    }
}
