import css from './work-shift-css.js';

// TODO: get data from localStorage,sync with the latest data
// TODO: should be fetch after render.js is loaded

// TODO: 날짜를 입력받아서 해당 날짜의 근무자를 출력하도록 수정

class WorkShift extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.textContent = css;
        this.shadowRoot.appendChild(style);

        const container = document.createElement('div');
        container.classList.add('container');
        this.shadowRoot.appendChild(container);

        this.render(new Date().toISOString().slice(0, 10));
    }

    syncDate(event) {
        const selectedDate = event.target.value;
        this.render(selectedDate);
    }

    render(date) {
        const today = new Date(date).toLocaleDateString('kr', { month: '2-digit', day: "2-digit" });
        const parsed_data_by_date = JSON.parse(localStorage.getItem('parsed_data_by_date'));
        const today_key = new Date(date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
        console.log(parsed_data_by_date[today_key]);
        if (!parsed_data_by_date[today_key]) {
            this.shadowRoot.querySelector('.container').innerHTML = `
                <div class="work-shift">
                <table>
                <tr>
                    <th colspan="2" id="header">${today} 근무표</th>
                    <tr>
                        <td colspan="2">
                        <form id="shift-form">
                            <input type="date" id="date-input" value=${date} />
                            <input type="reset" id="reset-shift" value="오늘 근무" />
                        </form>
                        </td>
                    </tr>
                <tr>
                    <tr>
                        <td>
                            ${today} 근무자를 불러오지 못했습니다. 엑셀 파일을 확인해주세요.
                        </td>
                    </tr>
                </table>
                </div>
            `;
            this.shadowRoot.querySelector('#date-input').addEventListener('change', (event) => {
                this.syncDate(event);
            });
            return;
        }
        const day_worker = parsed_data_by_date[today_key]?.filter(worker => worker.value.includes('D'));
        const yellow_workers = parsed_data_by_date[today_key]?.filter(worker => worker["노D"] === true && (worker.value.includes('D') || worker.value.includes('E')));
        const evening_worker = parsed_data_by_date[today_key]?.filter(worker => worker.value.includes('E'));
        const night_worker = parsed_data_by_date[today_key]?.filter(worker => worker.value.includes('N'));
        const off_worker = parsed_data_by_date[today_key]?.filter(worker => !(worker.value.includes('D') || worker.value.includes('E') || worker.value.includes('N')));

        this.shadowRoot.querySelector('.container').innerHTML = `
            <div class="work-shift">
                <table>
                <tr>
                    <th colspan="2" id="header">${today} 근무표</th>
                    <tr>
                        <td colspan="2">
                        <form id="shift-form">
                            <input type="date" id="date-input" value=${date} />
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
                    <td>${yellow_workers.map((e) => e.name).join(', ')}</td>
                </tr>
                <tr>
                    <td>D</td>
                    <td>${day_worker.map((e) => e.name).join(', ')}</td>
                </tr>
                <tr>
                    <td>E</td>
                    <td>${evening_worker.map((e) => e.name).join(', ')}</td>
                </tr>
                <tr>
                    <td>N</td>
                    <td>${night_worker.map((e) => e.name).join(', ')}</td>
                </tr>
                <tr>
                    <td>OFF</td>
                    <td>${off_worker.map((e) => e.name).join(', ')}</td>
                </tr>
                </table>
            </div>
        `;
        this.shadowRoot.querySelector('#date-input').addEventListener('change', (event) => {
            this.syncDate(event);
        });
    }
}

customElements.define('work-shift', WorkShift);