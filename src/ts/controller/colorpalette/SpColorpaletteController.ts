import { State } from "../../model/State";
import Picker from 'vanilla-picker';
import * as bootstrap from "bootstrap";
import { ColorpaletteController } from "./ColorpaletteController";
export class SpColorpaletteController extends ColorpaletteController {
	//=============================================
	// TODO
	//=============================================
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	//----------private---------
	
	private _picker:Picker;
	private _boxList:Array<Box>;
	private _current:Box;
	private _offcanvas:bootstrap.Offcanvas;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state:State) {
		super(state);
		this._boxList = [];

		let pickerEle:HTMLElement = <HTMLElement>document.querySelector('#sp #colorpalettePicker');
		let boxContainerEle:HTMLElement = <HTMLElement>document.querySelector('#sp #colorpaletteBoxContainer');

		
		this._picker = new Picker({
			parent: pickerEle,
			popup: false,
			alpha: false,
			editor: false,
			onChange: this._onChangePickerHandler,
		});
		
		let item:HTMLElement;
		let box:Box;
		for(let i:number = 0; i < 7; i++){
			item = <HTMLElement>document.createElement("span");
			item.appendChild(document.createElement("i"));
			//item.appendChild(document.createElement("span"));
			box = new Box(<HTMLElement>boxContainerEle.appendChild(item));
			box.addEventListener(Box.EVENT_TOUCH_START_BOX, this._onTouchStartBoxHandler);
			box.addEventListener(Box.EVENT_DOUBLE_TOUCH_BOX, this._onDoubleTouchBoxHandler);
			this._boxList.push(box);
		}

		this._offcanvas = new bootstrap.Offcanvas(document.querySelector('#colorPickerOffcanvas'));
		//console.log(this._offcanvas, document.querySelector('#colorPickerOffacanva'));
	}
	//=============================================
	// event handler
	//=============================================
	private _onChangePickerHandler = (color:any = null) =>{
		let isChange:boolean = true;
		if(color){
			isChange = false;
			if(this._current){
				let rgba:string = color.hex;
				let matches:RegExpMatchArray  = rgba.match(/#(.{6}).{2}/);
				if(matches){
					if(1<matches.length){
						let hex:string = matches[1];
						if(this._current.hexColor != hex){
							this._current.hexColor = hex;
							isChange = true;
						}
						
					}
				}
			}
		}
		if(isChange){
			this.dispatchEvent(new createjs.Event(ColorpaletteController.EVENT_CHANGE_COLORPALETTE, true, true));
		}
	}
	private _onTouchStartBoxHandler = (e:Event) =>{
		let box:Box;
		for(box of this._boxList){
			if(box == <Box>e.target){
				box.active();
				this._current = box;
				//this._picker.setColor("#"+box.hexColor, true);
				this.dispatchEvent(new createjs.Event(ColorpaletteController.EVENT_CHANGE_COLORPALETTE, true, true));
			}else{
				box.inactive();
			}
		}
	}
	private _onDoubleTouchBoxHandler = (e:Event) =>{
		let box:Box = <Box>e.target;
		this._current = box;
		this._picker.setColor("#"+box.hexColor, true);
		this._offcanvas.show();
	}
	//=============================================
	// private
	//=============================================

	//=============================================
	// public
	//=============================================

	public override setHexColorList = (arr: Array<string>) => {
		let colorLen: number = arr.length;
		let boxLen: number = this._boxList.length;
		//colorLen = (pickerLen < colorLen) ? pickerLen : colorLen;
		let box: Box;
		let color: string;
		for (var i = 0; i < boxLen; i++) {
			box = <Box>this._boxList[i];
			if (i < colorLen) {
				color = arr[i];
			} else {
				color = "FFFFFF";
			}
			box.hexColor = color;
		}
		box = <Box>this._boxList[0];
		box.active();
		this._current = box;
		//this._picker.setColor("#"+box.hexColor, true);

		this._onChangePickerHandler();
	}
	
	public override changedState = () =>{
		let state :string = this._state.current;
		let category:string = this._state.currentCategory;

		if(state == State.SELECT_RANGE){
			//無効化する処理
		}else{
			//有効化する処理
		}
	}
	//=============================================
	// getter/setter
	//=============================================
	override get hexColor(): string{
		return this._current.hexColor;
	}
	override set hexColor(value: string) {
		this._current.hexColor = value;
	}
}


class Box extends createjs.EventDispatcher {
	//=============================================
	// TODO
	//=============================================
	/*
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_TOUCH_START_BOX: string = "event touch start box";
	public static readonly EVENT_DOUBLE_TOUCH_BOX: string = "event double touch box";

	//----------private---------
	private _target:HTMLElement;
	private _inner:HTMLElement;
	private _hexColor:string;
	//private _timeoutId:any;
	private _prevTime:number;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(target:HTMLElement) {
		super();
		this._target = target;
		this._inner = target.querySelector("i");
		this._prevTime = 0;

		//this._target.addEventListener("click", this._onClickHandler);
		this._target.addEventListener("touchstart", this._onTouchStartHandler);
		this._target.addEventListener("touchend", this._onTouchEndHandler);
	}
	//=============================================
	// event handler
	//=============================================
	private _onTouchStartHandler = (e:Event)=>{
		this.dispatchEvent(new createjs.Event(Box.EVENT_TOUCH_START_BOX, true, true));
		/*
		this._timeoutId = setTimeout(this._onTimeoutHandler, 200);
		document.addEventListener("touchend", (e:Event)=>{
			e.preventDefault();
			clearTimeout(this._timeoutId);	
			//console.log("touchend");
		}, { once: true });
		*/
	}
	private _onTouchEndHandler = (e:Event)=>{
		let now:number = new Date().getTime();
		if ((now - this._prevTime) < 350){
			this.dispatchEvent(new createjs.Event(Box.EVENT_DOUBLE_TOUCH_BOX, true, true));
		}
		this._prevTime = now;
	}
	/*
	private _onTimeoutHandler = () =>{
		//console.log("timeout");
		clearTimeout(this._timeoutId);	
		this.dispatchEvent(new createjs.Event(Box.EVENT_LONG_TOUCH_BOX, true, true));
	}
	*/
	/*
	private _onClickHandler = (e:Event)=>{
		//console.log("click");
		this.dispatchEvent(new createjs.Event(Box.EVENT_CLICK_BOX, true, true));
	}
	*/
	//=============================================
	// private
	//=============================================
	//=============================================
	// public
	//=============================================
	public active = ()=>{
		this._target.classList.add("active");
	}
	public inactive = ()=>{
		this._target.classList.remove("active");
	}
	/*
	public setHexColor = (value:string) =>{
		this._target.style.backgroundColor = "#" + value;
	}
	*/
	//=============================================
	// getter/setter
	//=============================================
	get hexColor(): string{
		return this._hexColor;
	}
	set hexColor(value: string) {
		this._hexColor = value;
		this._inner.style.backgroundColor = "#" + value;
	}

}
