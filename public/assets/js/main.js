console.log("JS loaded");

// async/await
async function getData() {
    try {
        const response = await fetch('/assets/data/content.json');
        const data = await response.json();

        const container = document.querySelector('.infoCards');

        data.info_cards.forEach(card => {

            const col = document.createElement('article');
            col.className = 'col-12 col-sm-6';

            const section = document.createElement('section');
            section.className = 'card h-100';

            // HEADER
            section.innerHTML = `
                <div class="card-header-custom d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="mb-0">${card.title}</h5>
                        <small class="subText">${card.subtitle}</small>
                    </div>
                    <a href="#" class="small text-primary">${card.link_text}</a>
                </div>
            `;

            // TICKET ROWS
            if (card.rows) {
                card.rows.forEach(row => {
                    const rowDiv = document.createElement('div');
                    rowDiv.className = 'card-row d-flex justify-content-between';

                    rowDiv.innerHTML = `
                        <span>${row.label}</span>
                        <span class="text-muted">${row.value}</span>
                    `;

                    section.appendChild(rowDiv);
                });
            }

            // TASKS
            if (card.tasks) {

                // CREATE NEW TASK ROW
                const inputRow = document.createElement('div');
                inputRow.className = 'card-row d-flex align-items-center border-0';

                inputRow.innerHTML = `
        <input type="text" class="form-control form-control-sm border-0 shadow-none" placeholder="Create new task">
        <button class="btn btn-light btn-sm ms-2">+</button>
    `;

                section.appendChild(inputRow);

                card.tasks.forEach(task => {
                    const taskDiv = document.createElement('div');
                    taskDiv.className = 'card-row d-flex justify-content-between align-items-center';

                    taskDiv.innerHTML = `
                        <div class="form-check m-0">
                            <input class="form-check-input" type="checkbox" ${task.checked ? 'checked' : ''}>
                            <label class="form-check-label">${task.label}</label>
                        </div>
                       <span class="badge ${getBadgeClass(task.status)}">${task.status}</span>
                    `;

                    section.appendChild(taskDiv);
                });
            }

            col.appendChild(section);
            container.appendChild(col);
        });

    } catch (error) {
        console.warn(error);
    }
}
getData();

function getBadgeClass(status) {
    switch (status) {
        case 'URGENT':
            return 'bg-warning text-light';
        case 'NEW':
            return 'bg-success';
        case 'DEFAULT':
            return 'bg-secondary';
        default:
            return 'bg-secondary';
    }
}

async function loadNav() {
    try {
        const response = await fetch("/assets/data/content.json");
        const data = await response.json();

        const navItems = data.main_nav;

        const navList = document.getElementById("nav-list");

        navItems.forEach(item => {
            if (item.divider) {
                const divider = document.createElement("img");
                divider.src = "assets/images/divider.png";
                divider.className = "divider mb-2";
                navList.appendChild(divider);
                return;
            }

            const li = document.createElement("li");
            li.className = "nav-item mb-2";

            const a = document.createElement("a");
            a.className = "nav-link d-flex align-items-center";
            a.href = item.link;
            a.textContent = item.label;

            const span = document.createElement("span");
            span.className =
                "ps-3 d-flex align-items-center w-100 justify-content-center justify-content-md-start";

            const img = document.createElement("img");
            img.src = item.icon;
            img.className = "nav-symbol me-2";

            span.appendChild(img);
            span.append(item.name);

            a.appendChild(span);
            li.appendChild(a);
            navList.appendChild(li);
        });

    } catch (error) {
        console.error("Error loading nav:", error);
    }
}

loadNav();