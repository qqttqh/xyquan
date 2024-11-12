// 计算相对时间
export function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date; // 以毫秒为单位的差异

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    return `${days}天前`;
}
