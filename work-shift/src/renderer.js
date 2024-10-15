const fetch_xlsx = async () => {
    const EXCEL_FILE_PATH = localStorage.getItem('EXCEL_FILE_PATH') || '24년 근무표.xlsx';
    try {
        const raw_data = await window.electronAPI.fetch_xlsx(EXCEL_FILE_PATH)
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
    } catch (error) {
        console.error('Error fetching Excel data:', error);
        // 여기에 오류 처리 로직을 추가할 수 있습니다.
    }
}

const fetchAndRenderData = () => {
    fetch_xlsx().then(() => {
        const workShiftElement = document.querySelector('work-shift');
        if (workShiftElement) {
            workShiftElement.render(new Date().toISOString().slice(0, 10));
        }
    }).catch(error => {
        console.error('Error in fetchAndRenderData:', error);
        // 여기에 오류 처리 로직을 추가할 수 있습니다.
    });
};


// Set initial Excel file path and notify main process
const initialPath = localStorage.getItem('EXCEL_FILE_PATH') || '24년 근무표.xlsx';
window.electronAPI.set_file_path(initialPath);
localStorage.setItem("EXCEL_FILE_PATH", initialPath);


// Initial fetch and render
fetchAndRenderData();

// Listen for file changes
window.electronAPI.on('file-changed', () => {
    fetchAndRenderData();
});
