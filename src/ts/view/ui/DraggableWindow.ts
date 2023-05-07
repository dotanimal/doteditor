export class DraggableWindow extends createjs.EventDispatcher {
	//=============================================
	// TODO
	//=============================================
	/*
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_DRAG_START:string = "event drag start draggable window";
	//----------private---------
	private readonly OFFSET_X:number = 0;
	private readonly OFFSET_Y:number = -2;

	private _id:string;

	private _isOpen:boolean;
	//private _zIndex:string;
	private _target:HTMLElement;
	private _txt:HTMLElement;
	private _btn:HTMLElement;
	private _relativeX:number;
	private _relativeY:number;
	private _tempLeft:number;
	private _tempTop:number;

	private _manager:Manager;
	private _child:DraggableWindow;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(target:HTMLElement) {
		super();

		this._id = target.id;

		this._manager = Manager.getInstance();
		this._target = target;
		this._manager.add(this);
		//console.log(this._target.style.zIndex);

		this._txt = <HTMLElement>this._target.querySelector(".draggableWindowHeaderTxt");
		this._btn = <HTMLElement>this._target.querySelector(".draggableWindowHeaderBtn");

		this._txt.addEventListener("mousedown", this._onMouseDownHandler);
		this._txt.addEventListener("touchstart", this._onTouchStartHandler);
		this._btn.addEventListener("click", this._onOpenCloseHandler);
	}
	//=============================================
	// event handler
	//=============================================
	private _onOpenCloseHandler = (e:MouseEvent) =>{
		if(this._isOpen){
			this._target.classList.remove("close");
		}else{
			this._target.classList.add("close");
		}
		this.setPos(this._target.offsetLeft, this._target.offsetTop);
		this._isOpen = !this._isOpen;
	}
	private _onMouseDownHandler = (e:MouseEvent) =>{
		//console.log("mouse down");
		e.preventDefault();
		this._startDrag(e.clientX, e.clientY);

		
		document.addEventListener("mousemove", this._onMouseMoveHandler);
		this._txt.addEventListener("mouseup", this._onMouseUpHandler);
	}
	private _onMouseMoveHandler = (e:MouseEvent) =>{
		//console.log("mouse move");
		e.preventDefault();
		this._moveDrag(e.clientX, e.clientY);
		
	}
	private _onMouseUpHandler = (e:MouseEvent) =>{
		//console.log("mouse up");
		e.preventDefault();
		this._endDrag(e.clientX, e.clientY);
		
		document.removeEventListener("mousemove", this._onMouseMoveHandler);
		this._txt.removeEventListener("mouseup", this._onMouseUpHandler);
	}
	private _onTouchStartHandler = (e:TouchEvent) =>{
		//console.log("touch start");
		e.preventDefault();
		this._startDrag(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
		
		document.addEventListener("touchmove", this._onTouchMoveHandler);
		this._txt.addEventListener("touchend", this._onTouchEndHandler);
	}
	private _onTouchMoveHandler = (e:TouchEvent) =>{
		//console.log("touch move");
		e.preventDefault();
		this._moveDrag(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
		
	}
	private _onTouchEndHandler = (e:TouchEvent) =>{
		//console.log("touch end");
		e.preventDefault();
		this._endDrag(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
		
		document.removeEventListener("touchmove", this._onTouchMoveHandler);
		this._txt.removeEventListener("touchend", this._onTouchEndHandler);
	}
	//=============================================
	// private
	//=============================================
	private _startDrag = (mx:number, my:number) =>{
		this._relativeX = mx - this._target.offsetLeft;
		this._relativeY = my - this._target.offsetTop;
		
		this._target.style.left = Math.floor(mx - this._relativeX + this.OFFSET_X) + 'px';
		this._target.style.top = Math.floor(my - this._relativeY + this.OFFSET_Y) + 'px';

		this._target.classList.add("drag");

		//this._zIndex = this._target.style.zIndex
		//this._target.style.zIndex = "10000";

		this.dispatchEvent(new createjs.Event(DraggableWindow.EVENT_DRAG_START, true, true));
	}
	private _moveDrag = (mx:number, my:number) =>{
		//this._target.style.left = Math.floor(mx - this._relativeX) + 'px';
		//this._target.style.top = Math.floor(my - this._relativeY) + 'px';
		
		this._tempLeft = Math.floor(mx - this._relativeX);
		this._tempTop = Math.floor(my - this._relativeY);

		this._manager.checkPos(this);
	}
	private _endDrag = (mx:number, my:number) =>{
		//this._target.style.left = Math.floor(mx - this._relativeX) + 'px';
		//this._target.style.top = Math.floor(my - this._relativeY) + 'px';
		
		this._tempLeft = Math.floor(mx - this._relativeX);
		this._tempTop = Math.floor(my - this._relativeY);

		this._manager.checkPos(this, true);

		this._target.classList.remove("drag");

		//this._target.style.zIndex = this._zIndex;
	}
	
	//=============================================
	// public
	//=============================================
	public setPos = (x:number, y:number) => {
		this._target.style.left = x + "px";
		this._target.style.top = y + "px";

		if(this._child){
			//console.log("[DraggableWindow:setPos]\n", this._target.id, this._child.id);
			this._child.setPos(x, y + this._target.offsetHeight -1);
		}
	}
	//=============================================
	// getter/setter
	//=============================================
	get id ():string{
		return this._id;
	}
	get left ():number{
		return this._target.offsetLeft;
	}
	get top ():number{
		return this._target.offsetTop;
	}
	get right ():number{
		return this._target.offsetLeft + this._target.offsetWidth;
	}
	get bottom ():number{
		return this._target.offsetTop + this._target.offsetHeight;
	}
	get child ():DraggableWindow{
		return this._child;
	}
	set child (value:DraggableWindow){
		this._child = value;
		//this._manager.checkPos(this, true);
	}
	get zIndex():string{
		//this._zIndex = this._target.style.zIndex;
		return this._target.style.zIndex;
	}
	set zIndex(value:string){
		//this._zIndex = value;
		this._target.style.zIndex = value;
	}
	get tempLeft():number{
		return this._tempLeft;
	}
	get tempTop():number{
		return this._tempTop;
	}
}
class Manager {
	//=============================================
	// 定数/変数
	//=============================================
	private _SNAP_OFFSET:number = 20;
	private static instance: Manager;
	private _list:Array<DraggableWindow>;
	//private _zIndex:number;
	//=============================================
	// constructor
	//=============================================
	private constructor() {
		this._list = [];
		//this._zIndex = "0";
	}
	//=============================================
	// event handler
	//=============================================
	private _onDragStartHandler = (e:Event) =>{
		let dw:DraggableWindow = <DraggableWindow>e.target;
		//console.log("[DraggableWindow:_onDragStartHandler]\n", dw.id, dw.zIndex);
		for(let item of this._list){
			if(item.child == dw){
				//console.log(dw.id);
				item.child = null;
				//console.log("[DraggableWindow:_onDragStartHandler]]\n", item.id, item.child, dw.id);
				break;
			}
			if(item == dw){
				item.zIndex = "1";
			}else{
				item.zIndex = "0";
			}
		}
	} 
	//=============================================
	// static
	//=============================================
	static getInstance = () => {
		if (Manager.instance) return Manager.instance;
		Manager.instance = new Manager();
		return Manager.instance;
	}
	//=============================================
	// public
	//=============================================
	public add = (dw:DraggableWindow):void =>{
		//console.log(dw.zIndex);
		this._list.push(dw);
		dw.addEventListener(DraggableWindow.EVENT_DRAG_START, this._onDragStartHandler);
	}
	public checkPos = (dw:DraggableWindow, isSetChild:boolean = false):void =>{
		let isMatch :boolean = false;
		for(let item of this._list){
			if(item != dw){
				if(this._getDistance(item.left, item.bottom, dw.tempLeft, dw.tempTop) < this._SNAP_OFFSET){
					//左下
					if(isSetChild){
						item.child = dw;
						//console.log("[Manager:checkPos]\n", item.id, item.child.id, dw.id);
					}
					dw.setPos(item.left, item.bottom - 1);
					isMatch = true;
					break;
				} else if(this._getDistance(item.right, item.top, dw.tempLeft, dw.tempTop) < this._SNAP_OFFSET){
					//右上
					dw.setPos(item.right - 1, item.top);
					isMatch = true;
					break;
				}
			}
		}
		if(!isMatch){
			dw.setPos(dw.tempLeft, dw.tempTop);
		}
	}
	//=============================================
	// private
	//=============================================
	private _getDistance = (x1:number,y1:number,x2:number,y2:number):number => {
		return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
	}
}