const shipDatas = [
    {size: 4, direction: "row", startX: 10, startY:345},
    {size: 3, direction: "row", startX: 10, startY:390},
    {size: 3, direction: "row", startX: 120, startY:390},
    {size: 2, direction: "row", startX: 10, startY:435},
    {size: 2, direction: "row", startX: 88, startY:435},
    {size: 2, direction: "row", startX: 167, startY:435},
    {size: 1, direction: "row", startX: 10, startY:480},
    {size: 1, direction: "row", startX: 55, startY:480},
    {size: 1, direction: "row", startX: 100, startY:480},
    {size: 1, direction: "row", startX: 145, startY:480},
]

class PreparationScene extends Scene {
    draggedShip = null;
    draggedOffsetX = 0;
    draggedOffsetY = 0;
    

    init(){
        const {player} = this.app;
        for(const {size, direction, startX, startY} of shipDatas){
            const ship = new ShipView(size, direction, startX, startY);
            player.addShip(ship)
        }        

    }

    start(){

        const {player} = this.app;
        this.app.player.randomize(ShipView)

        for(let i = 0; i<10; i++){
            const ship = player.ships[i]
            ship.startX = shipDatas[i].startX;
            ship.startY = shipDatas[i].startY;
        }

        document.querySelectorAll(".app-actions").
        forEach(element => element.classList.add("hidden"));

        document.querySelector('[data-scene = "preparation"]')
        .classList.remove("hidden")


       const randomizeButton =  document.querySelector('[data-action = "randomize"]');
       randomizeButton.addEventListener("click",() => console.log("randomize"))
    }

    update(){
        const {mouse, player} = this.app;

        if(!this.draggedShip && mouse.left && !mouse.pLeft){
            const ship = player.ships.find((ship) => ship.isUnder(mouse));
            if(ship){
                const shipRectangle = ship.div.getBoundingClientRect();
                this.draggedShip = ship;
                this.draggedOffsetX = mouse.x - shipRectangle.left;
                this.draggedOffsetY = mouse.y - shipRectangle.top;

                ship.x = null;
                ship.y = null;


            }
        }
        //перетаскивание корябля
        if(mouse.left && this.draggedShip){
            const{left, top} = player.root.getBoundingClientRect();

            this.draggedShip.div.style.left = `${mouse.x - left - this.draggedOffsetX}px`;
            this.draggedShip.div.style.top = `${mouse.y - top - this.draggedOffsetY}px`;
        }
        //бросание корабля
		if (!mouse.left && this.draggedShip) {
			const ship = this.draggedShip;
			this.draggedShip = null;

			const { left, top } = ship.div.getBoundingClientRect();
			const { width, height } = player.cells[0][0].getBoundingClientRect();

			const point = {
				x: left + width / 2,
				y: top + height / 2,
			};

			const cell = player.cells
				.flat()
				.find((cell) => isUnderPoint(point, cell));

			if (cell) {
				const x = parseInt(cell.dataset.x);
				const y = parseInt(cell.dataset.y);

				player.removeShip(ship);
				player.addShip(ship, x, y);
			} else {
				player.removeShip(ship);
				player.addShip(ship);
			}
		}

        //Вращание
		if (this.draggedShip && mouse.delta ) {
			this.draggedShip.toggleDirection();
		}
    }

    stop(){
        console.log("PreparationScene stop")
    }
}