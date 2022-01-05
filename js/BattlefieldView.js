class BattlefieldView extends Battlefield {
    root = null;
    table = null;
    dock = null;
    polygon = null;

    constructor(){
        super()
        const root = document.createElement("div");
        root.classList.add("battlefield");

        const table = document.createElement("table");
        table.classList.add("battlefield-table");

        const dock = document.createElement("div");
        dock.classList.add("battlefield-dock");

        const polygon = document.createElement("div");
        polygon.classList.add("battlefield-polygon");

        Object.assign(this,{root, table, dock, polygon});
        root.append(table, dock, polygon);


        for(let y = 0; y < 10; y++){
            const tr = document.createElement("tr");
            tr.classList.add("battlefield-row");
            tr.dataset.y = y;

            for(let x = 0; x < 10; x++){
                const td = document.createElement("td");
                td.classList.add("battlefield-item");
                Object.assign(td.dataset,{x, y});

                tr.append(td)

            }
            table.append(tr)
        }

    }

}