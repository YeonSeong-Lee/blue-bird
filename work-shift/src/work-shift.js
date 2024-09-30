class WorkShift extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const today = new Date().toLocaleDateString('kr', {month: '2-digit', day: "2-digit"});
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
                    <td>김철수</td>
                </tr>
                <tr>
                    <td>D</td>
                    <td>이영희</td>
                </tr>
                <tr>
                    <td>E</td>
                    <td>박영수</td>
                </tr>
                <tr>
                    <td>N</td>
                    <td>홍길동</td>
                </tr>
                </table>
            </div>
        `;
    }

}

customElements.define('work-shift', WorkShift);
