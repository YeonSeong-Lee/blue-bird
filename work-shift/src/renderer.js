const fetch_xlsx = async () => {
    const raw_data = await window.versions.fetch_xlsx()
    // TODO: validate raw_data and alert if it's invalid
    const year = '20' + raw_data[0].split('-')[0]
    const date = []
    for (let i = 1; i < raw_data[1].length; i++) {
        if (raw_data[1][i].value === null || raw_data[2][i].value === null) {
            continue
        }
        date.push(year + '년 ' + raw_data[1][i].value.trim() + ' ' + raw_data[2][i].value + '일')
    }
    const parsed_data_by_name = {}
    const START_NAME_ROW = 4
    const WORK_NUM = 30
    for (let i = START_NAME_ROW; i < START_NAME_ROW + WORK_NUM; i++) {
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
        parsed_data_by_name[name] = row
    }

    localStorage.setItem('parsed_data_by_name', JSON.stringify(parsed_data_by_name))

    const parsed_data_by_date = {}
    for (let i = 2; i < raw_data[1].length; i++) {
        const row = []
        for (let j = START_NAME_ROW; j < START_NAME_ROW + WORK_NUM; j++) {
            if (!raw_data[j][i] || !raw_data[j][i].value) {
                continue
            }
            const temp = { name: raw_data[j][1].value, value: raw_data[j][i].value }
            if (raw_data[j][i].style?.fill?.fgColor?.argb === 'FFFFFF00') {
                temp['노D'] = true
            }
            row.push(temp)
        }
        parsed_data_by_date[date[i - 2]] = row
    }
    localStorage.setItem('parsed_data_by_date', JSON.stringify(parsed_data_by_date))
}

fetch_xlsx();