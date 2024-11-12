// 获取设备信息
function extractUserAgentInfo(userAgent) {
    const deviceMatch = userAgent.match(/\(([^)]+)\)/); // 匹配括号中的内容
    const browserMatch = userAgent.match(/(Chrome|Firefox|Safari|Edge|MicroMessenger|Opera)\/([^\s]+)/); // 匹配浏览器及版本
    const netTypeMatch = userAgent.match(/NetType\/([^\s]+)/); // 匹配网络类型（PC 端不常见）
    const languageMatch = userAgent.match(/Language\/([^\s]+)/); // 匹配语言（PC 端不常见）

    // 解析设备信息
    const deviceInfo = deviceMatch ? deviceMatch[1] : 'Unknown Device';

    // 解析操作系统信息，区分 PC 和移动设备
    let osInfo;
    if (deviceInfo.includes('Windows')) {
        osInfo = deviceInfo.match(/Windows NT [\d.]+/)?.[0] || 'Unknown Windows Version';
    } else if (deviceInfo.includes('Macintosh')) {
        osInfo = 'macOS'; // Mac 操作系统
    } else if (deviceInfo.includes('iPhone') || deviceInfo.includes('iPad')) {
        osInfo = deviceInfo.match(/iPhone OS [\d_]+/)?.[0].replace(/_/g, '.') || 'Unknown iOS Version';
    } else if (deviceInfo.includes('Android')) {
        osInfo = deviceInfo.match(/Android [\d.]+/)?.[0] || 'Unknown Android Version';
    } else {
        osInfo = 'Unknown OS';
    }

    // 解析浏览器信息
    const browser = browserMatch ? `${browserMatch[1]} ${browserMatch[2]}` : 'Unknown Browser';

    // 解析网络类型（PC 端不常见）
    const netType = netTypeMatch ? netTypeMatch[1] : 'Unknown NetType';

    // 解析语言
    const language = navigator.language || 'Unknown Language'; // PC 端一般有 `navigator.language`

    return {
        deviceInfo, // 设备信息
        osInfo, // 系统信息
        language, // 系统语言
        browser, // 浏览器信息
        netType, // 网络信息

    };
}

// 时间检查
function timeCheck(){
    let sentry_timestamp = localStorage.getItem('sentry_timestamp') // 检查哨兵时间戳
    if(sentry_timestamp){
        let nowTimestamp = Date.now() // 现在的时间戳
        let pastMinutes = (nowTimestamp - Number(sentry_timestamp)) / (1000 * 60) // 过去的分钟数
        if (pastMinutes >= 5){
            localStorage.setItem('sentry_timestamp', String(nowTimestamp))
            return true
        }
        return false
    }else{
        localStorage.setItem('sentry_timestamp', String(Date.now())) // 当前时间戳
        return true
    }
}

// 获取ip信息
async function getIpInfo(){
    let response = await fetch('https://qifu-api.baidubce.com/ip/local/geo/v1/district')
    let data = await response.json();

    return {
        ip: data.ip, // ip地址
        isp: data.data.isp, // 网络运营商
        prov: data.data.prov, // 省份
        city: data.data.city, // 城市
        lat: data.data.lat, // 维度
        lng: data.data.lng, // 经度
    }
}

export default async function sentry() {
    if(timeCheck()){
        const key = 'Qndcjv9tmLsoB3cYuSPaPi'; // Bark密钥
        const ipInfo = await getIpInfo();
        const device = extractUserAgentInfo(navigator.userAgent); // 设备信息
        const deviceString = `设备信息：${device.deviceInfo}\n系统信息：${device.osInfo}\n系统语言：${device.language}\n浏览器信息：${device.browser}\n网络信息：${device.netType}\nip地址：${ipInfo.ip}\n网络运营商：${ipInfo.isp}\n省份：${ipInfo.prov}\n城市：${ipInfo.city}\n经度：${ipInfo.lng}\n维度：${ipInfo.lat}\n`;

        fetch(`https://api.day.app/${key}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                icon: 'https://pic.imgdb.cn/item/66a3ac61d9c307b7e9b6cf51.webp', // 推送图标
                title: '小圆圈-哨兵', // 推送标题
                body: deviceString, // 推送内容
                group: '小圆圈' // 分组
            })
        })
            .then((res) => {
                if (res.ok) {
                    console.log('sentry success');
                } else {
                    console.error('sentry failed:', res.statusText);
                }
            })
            .catch((err) => {
                console.error('sentry error:', err);
            });
    }

}
