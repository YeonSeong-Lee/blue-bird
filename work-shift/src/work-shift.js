class WorkShift extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const today = new Date().toLocaleDateString('kr', {month: '2-digit', day: "2-digit"});
        // TODO: get data from localStorage,sync with the latest data
        // TODO: should be fetch after render.js is loaded
        const parsed_data_by_name = JSON.parse(localStorage.getItem('parsed_data_by_name'));
        const parsed_data_by_date = JSON.parse(localStorage.getItem('parsed_data_by_date'));
        const today_key = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
        const day_worker = parsed_data_by_date[today_key].filter(worker => worker.value.includes('D'));
        const evening_worker = parsed_data_by_date[today_key].filter(worker => worker.value.includes('E'));
        const night_worker = parsed_data_by_date[today_key].filter(worker => worker.value.includes('N'));
        const yellow_day_workers = parsed_data_by_date[today_key].filter(worker => worker["노D"] === true);
        const css = `table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                font-size: 18px;
                text-align: left;
            }
            
            #header {
                background-color: #73a7d9;
                color: #ffffff;
                font-size: 24px;
                font-weight: bold;
                text-align: center;
            }

            table thead tr {
                background-color: #73a7d9;
                color: #ffffff;
                text-align: left;
                font-weight: bold;
            }

            table th, table td {
                padding: 12px 15px;
                border: 1px solid #dddddd;
                min-width: 42px;
            }

            table tbody tr {
                border-bottom: 1px solid #dddddd;
            }

            table tbody tr:nth-of-type(even) {
                background-color: #f3f3f3;
            }

            table tbody tr:last-of-type {
                border-bottom: 2px solid #73a7d9;
            }

            table tbody tr:hover {
                background-color: #f1f1f1;
            }`;

        this.shadowRoot.innerHTML = `
            <style>${css}</style>
            <div class="work-shift">
                <table>
                <tr>
                    <th colspan="2" id="header">${today} 근무표</th>
                <tr>
                    <th>시간</th>
                    <th>근무자</th>
                </tr>
                <tr>
                    <td>노D</td>
                    <td>${yellow_day_workers.map((e) => e.name)}</td>
                </tr>
                <tr>
                    <td>D</td>
                    <td>${day_worker.map((e) => e.name)}</td>
                </tr>
                <tr>
                    <td>E</td>
                    <td>${evening_worker.map((e) => e.name)}</td>
                </tr>
                <tr>
                    <td>N</td>
                    <td>${night_worker.map((e) => e.name)}</td>
                </tr>
                </table>
            </div>
        `;
    }

}

customElements.define('work-shift', WorkShift);
