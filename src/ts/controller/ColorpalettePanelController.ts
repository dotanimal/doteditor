import { State } from "../model/State";
import Picker from 'vanilla-picker';
export class ColorpalettePanelController extends createjs.EventDispatcher {
	//=============================================
	// TODO
	//=============================================
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_CHANGE_COLORPALETTE: string = "event change color palette panel";
	//----------private---------
	private _state:State;
	
	private _picker:Picker;
	private _boxList:Array<Box>;
	private _current:Box;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state:State) {
		super();
		this._state = state;
		this._boxList = [];

		let topEle:HTMLElement = <HTMLElement>document.querySelector('#colorpalettePanelTop');
		let boxContainerEle:HTMLElement = <HTMLElement>document.querySelector('#colorpalettePanelBottom > #colorpaletteBoxContainer');

		this._picker = new Picker({
			parent: topEle,
			popup: false,
			alpha: false,
			editor: false,
			onChange: this._onChangePickerHandler,
		});
		let item:HTMLElement;
		let box:Box;
		for(let i:number = 0; i < 12; i++){
			item = <HTMLElement>document.createElement("span");
			item.appendChild(document.createElement("i"));
			//item.appendChild(document.createElement("span"));
			box = new Box(<HTMLElement>boxContainerEle.appendChild(item));
			box.addEventListener(Box.EVENT_CLICK_BOX, this._onClickBoxHandler)
			this._boxList.push(box);
		}
		/*
		box = <Box>this._boxList[0];
		box.active();
		this._current = box;
		this._picker.setColor("#"+box.hexColor, true);
		*/
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
			this.dispatchEvent(new createjs.Event(ColorpalettePanelController.EVENT_CHANGE_COLORPALETTE, true, true));
		}
	}
	private _onClickBoxHandler = (e:Event) =>{
		let box:Box;
		for(box of this._boxList){
			if(box == <Box>e.target){
				box.active();
				this._current = box;
				this._picker.setColor("#"+box.hexColor, true);
			}else{
				box.inactive();
			}
		}
	}
	//=============================================
	// private
	//=============================================

	//=============================================
	// public
	//=============================================

	public setHexColorList = (arr: Array<string>) => {
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
		this._picker.setColor("#"+box.hexColor, true);

		this._onChangePickerHandler();
	}
	
	public changedState = () =>{
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
	get hexColor(): string{
		return this._current.hexColor;
	}
	set hexColor(value: string) {
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
	public static readonly EVENT_CLICK_BOX: string = "event click box";

	//----------private---------
	private _target:HTMLElement;
	private _inner:HTMLElement;
	private _hexColor:string;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(target:HTMLElement) {
		super();
		this._target = target;
		this._inner = target.querySelector("i");
		this._target.addEventListener("click", this._onClickHandler);
	}
	//=============================================
	// event handler
	//=============================================
	private _onClickHandler = (e:Event)=>{
		//console.log("click");
		this.dispatchEvent(new createjs.Event(Box.EVENT_CLICK_BOX, true, true));
	}
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
