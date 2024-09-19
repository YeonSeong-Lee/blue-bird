const fetch_xlsx = async () => {
    const raw_data = await window.versions.fetch_xlsx()
    // TODO: validate raw_data and alert if it's invalid
    const year = '20' + raw_data[0].split('-')[0]
    console.log(raw_data)
    const date = []
    for (let i = 1; i < raw_data[1].length; i++) {
        if (raw_data[1][i].value === null || raw_data[2][i].value === null) {
            continue
        }
        date.push(year + '년 ' + raw_data[1][i].value + ' ' + raw_data[2][i].value + '일')
    }
    const parsed_data = {}
    for (let i = 4; i < raw_data.length; i++) {
        const row = []
        const name = raw_data[i][1]?.value
        for (let j = 2; j < raw_data[i].length; j++) {
            if (!raw_data[i][j] || !raw_data[i][j].value) {
                continue
            }
            const temp = { date: date[j - 2], value: raw_data[i][j].value }
            if (raw_data[i][j].style?.fill?.fgColor?.argb === 'FFFFFF00') {
                temp['노D'] = true
            }
            row.push(temp)
        }
        parsed_data[name] = row
    }
    console.log(parsed_data)
}

fetch_xlsx();