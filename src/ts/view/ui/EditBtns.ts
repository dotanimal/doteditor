import { State } from "../../model/State";

export class EditBtns extends createjs.EventDispatcher {
	//=============================================
	// TODO
	//=============================================
	/*
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public readonly EVENT_CLICK_EDIT_BTN: string = "event click edit btn";
	//----------private---------
	private _state: State;
	private _btnList: Array<HTMLElement>;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state : State) {
		super();
		
		this._state = state;

		let pencilBtn: HTMLElement = <HTMLElement>document.querySelector('#drawBtnGrp > #pencil');
		let eracerBtn: HTMLElement = <HTMLElement>document.querySelector('#drawBtnGrp > #eracer');
		let dropperBtn: HTMLElement = <HTMLElement>document.querySelector('#drawBtnGrp > #dropper');
		//let rangeSelectBtn: HTMLElement = <HTMLElement>document.querySelector('#drawBtnGrp > #selectRange');
		
		this._btnList = [pencilBtn, eracerBtn/*, dropperBtn, rangeSelectBtn*/];
		for (let btn of this._btnList) {
			btn.addEventListener('click', this._onClickHandler);
		}

		//鉛筆が選択されている状態にする
		this._btnInactive(pencilBtn);
		this._state.setMode(State.MODE_DRAW_PENCIL);
		this.dispatchEvent(new createjs.Event(this.EVENT_CLICK_EDIT_BTN, true, true));
	}
	//=============================================
	// event handler
	//=============================================
	private _onClickHandler = (e:MouseEvent) => {
		let target:HTMLElement = <HTMLElement>e.currentTarget;
		this._btnInactive(target);

		let mode :string;
		if(target.id == "pencil"){
			mode = State.MODE_DRAW_PENCIL;
		}else if(target.id == "eracer"){
			mode = State.MODE_DRAW_ERACER;
		}else if(target.id == "dropper"){
			mode = State.MODE_EDIT_DROPPER;
		}
		this._state.setMode((this._state.currentMode== mode) ? null : mode);
		this.dispatchEvent(new createjs.Event(this.EVENT_CLICK_EDIT_BTN, true, true));
	}
	//=============================================
	// private
	//=============================================
	private _btnInactive = (target: HTMLElement = null) => {
		for (let btn of this._btnList) {
			if (btn != target) {
				btn.classList.remove("active");
			} else {
				btn.classList.add("active");
			}
		}
	}
	//=============================================
	// public
	//=============================================
	public reset = () => {
		for (let btn of this._btnList) {
			btn.classList.remove("active");
		}
	}
	//=============================================
	// getter/setter
	//=============================================
}