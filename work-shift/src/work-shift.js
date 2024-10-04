import css from './work-shift-css.js';

class WorkShift extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const today = new Date().toLocaleDateString('kr', {month: '2-digit', day: "2-digit"});
        // TODO: get data from localStorage,sync with the latest data
        // TODO: should be fetch after render.js is loaded

        // TODO: 날짜를 입력받아서 해당 날짜의 근무자를 출력하도록 수정
        // TODO: work-shift를 여러개 설정
        // TODO: 날짜 input으로 입력 받을 수 있도록.
        const parsed_data_by_name = JSON.parse(localStorage.getItem('parsed_data_by_name'));
        const parsed_data_by_date = JSON.parse(localStorage.getItem('parsed_data_by_date'));
        const today_key = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
        const day_worker = parsed_data_by_date[today_key].filter(worker => worker.value.includes('D') && !worker["노D"]);
        const yellow_day_workers = parsed_data_by_date[today_key].filter(worker => worker.value.includes('D') && worker["노D"] === true);
        const evening_worker = parsed_data_by_date[today_key].filter(worker => worker.value.includes('E'));
        const night_worker = parsed_data_by_date[today_key].filter(worker => worker.value.includes('N'));
        const off_worker = parsed_data_by_date[today_key].filter(worker => worker.value.includes('off'));

        // TODO: 사용자의 선택에 따라 근무자를 출력하도록 수정
        this.shadowRoot.innerHTML = `
            <style>${css}</style>
            <div class="work-shift">
                <table>
                <tr>
                    <th colspan="2" id="header">${today} 근무표</th>
                    <tr>
                        <td colspan="2">
                        <form id="shift-form" >
                            <input type="date" id="date-input" value=${new Date().toISOString().slice(0, 10)}  onchange="alert(this.value)"/>
                            <input type="reset" id="reset-shift" value="오늘 근무" />
                        </form>
                        </td>
                    </tr>
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
                <tr>
                    <td>off</td>
                    <td>${off_worker.map((e) => e.name)}</td>
                </tr>
                </table>
            </div>
        `;
    }

}

customElements.define('work-shift', WorkShift);
