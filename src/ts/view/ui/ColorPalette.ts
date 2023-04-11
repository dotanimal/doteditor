import { State } from "../../model/State";

export class ColorPalette extends createjs.EventDispatcher{
	//=============================================
	// TODO
	//=============================================
	/*
		WS切替時にその時点のパレットの内容を保存しておきたい
		　戻ってきたときに初期化されてると面倒
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public readonly EVENT_CHANGE_COLOR: string = "event change color";
	//----------private---------
	private _state: State;
	private _colorPickerList: NodeListOf<Element>;
	private _currentEle: HTMLInputElement;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state : State) {
		super();
		
		this._state = state;

		this._colorPickerList = document.querySelectorAll('#editor > .menu #colorPalette span input');

		let colorPicker: HTMLInputElement;
		for (var i = 0; i < this._colorPickerList.length; i++) {
			colorPicker = <HTMLInputElement>this._colorPickerList[i];
			colorPicker.addEventListener("input", this._onChangeHandler, false);
			colorPicker.addEventListener("change", this._onChangeHandler, false);
			colorPicker.addEventListener("click", this._onChangeHandler, false);
		}
	}
	//=============================================
	// event handler
	//=============================================
	private _onChangeHandler = (e: Event = null) => {
		if (e != null) {
			let colorPicker: HTMLInputElement = <HTMLInputElement>e.target;
			//this._state.setHexColorCode(colorPicker.value);
			this._currentEle = colorPicker;
		}
		this._changeActive();
		this.dispatchEvent(new createjs.Event(this.EVENT_CHANGE_COLOR, true, true));
	}
	//=============================================
	// private
	//=============================================
	private _changeActive = () => {
		let colorPicker: HTMLInputElement
		let parent: HTMLElement;
		for (var i = 0; i < this._colorPickerList.length; i++) {
			colorPicker = <HTMLInputElement>this._colorPickerList[i];
			parent = colorPicker.parentElement;
			if (colorPicker == this._currentEle) {
				parent.classList.add("active");
			} else {
				parent.classList.remove("active");
			}
		}
	}
	private _apply2AllColorPicker = (func:Function) => {
		let colorPicker: HTMLInputElement;
		for (var i = 0; i < this._colorPickerList.length; i++) {
			colorPicker = <HTMLInputElement>this._colorPickerList[i];
			colorPicker.disabled = true;
			func(colorPicker);
		}
	}
	//=============================================
	// public
	//=============================================
	public init = () => {
		this._currentEle = <HTMLInputElement>this._colorPickerList[0];
		//this._state.setHexColorCode(this._currentEle.value);
		this._onChangeHandler();
	}
	/*
	public getHexColor = (): string => {
		return this._currentEle.value;
	}
	*/
	public setHexColorList = (arr: Array<string>) => {
		let colorLen: number = arr.length;
		let pickerLen: number = this._colorPickerList.length;
		//colorLen = (pickerLen < colorLen) ? pickerLen : colorLen;
		let colorPickerEle: HTMLInputElement;
		let color: String;
		for (var i = 0; i < pickerLen; i++) {
			colorPickerEle = <HTMLInputElement>this._colorPickerList[i];
			if (i < colorLen) {
				color = arr[i];
			} else {
				color = "FFFFFF";
			}
			colorPickerEle.value = "#" + color;
		}
		this._currentEle = <HTMLInputElement>this._colorPickerList[0];
		//this._state.setHexColorCode(this._currentEle.value);
		this._onChangeHandler();
	}
	/*
	public setHexColor = (value:string ) => {
		this._currentEle.value = "#" + value;
	}
	*/
	public changedState = () =>{
		let state :string = this._state.current;
		let category:string = this._state.currentCategory;

		if(state == State.SELECT_RANGE || state == State.SELECT_DRAG){
			this._apply2AllColorPicker(function(target:HTMLInputElement){
				target.disabled = true;
				target.style.opacity = "0.7";
			});
		}else{
			this._apply2AllColorPicker(function(target:HTMLInputElement){
				target.disabled = false;
				target.style.opacity = "1";
			});
		}
		
	}
	//=============================================
	// getter/setter
	//=============================================
	get hexColor(): string{
		let hex :string = this._currentEle.value;
		return hex.replace('#', '');
	}
	set hexColor(value: string) {
		this._currentEle.value = "#" + value;
	}
}