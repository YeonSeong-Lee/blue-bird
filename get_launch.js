const url = 'http://psnest.kr/sub/sub05_05.php'

const crawl = async (url) => {
    const res = await fetch(url)
    console.log('res', res)
}

crawl(url)