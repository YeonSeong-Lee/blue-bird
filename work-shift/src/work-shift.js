class WorkShift extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const today = new Date().toLocaleDateString('kr', {month: '2-digit', day: "2-digit"});
        // TODO: get data from localStorage,sync with the latest data
        // TODO: should be fetch after render.js is loaded
        const parsed_data_by_name = JSON.parse(localStorage.getItem('parsed_data_by_name'));
        const parsed_data_by_date = JSON.parse(localStorage.getItem('parsed_data_by_date'));
        console.log('parsed_data_by_name', parsed_data_by_name);
        console.log('parsed_data_by_date', parsed_data_by_date);
        const today_key = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
        console.log('data', parsed_data_by_date[today_key]);
        const day_worker = parsed_data_by_date[today_key].filter(worker => worker.value.includes('D'));
        const evening_worker = parsed_data_by_date[today_key].filter(worker => worker.value.includes('E'));
        const night_worker = parsed_data_by_date[today_key].filter(worker => worker.value.includes('N'));
        const yellow_day_workers = parsed_data_by_date[today_key].filter(worker => worker["노D"] === true);

        console.log('day_worker', day_worker);
        console.log('yellow_day_workers', yellow_day_workers);
        console.log('evening_worker', evening_worker);
        console.log('night_worker', night_worker);

        this.shadowRoot.innerHTML = `
            <div class="work-shift">
                <h2>${today} 근무표</h2>
                <table>
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
