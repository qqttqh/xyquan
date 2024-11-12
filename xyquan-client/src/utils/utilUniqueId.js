/**
 * 生成一个唯一的ID
 * @returns {string} 唯一的ID
 */
export function generateUniqueId() {
    const timestamp = Date.now(); // 获取当前时间戳
    const randomNum = Math.floor(Math.random() * 1000000); // 生成一个随机数
    return `${timestamp}-${randomNum}`; // 将时间戳和随机数组合在一起
}