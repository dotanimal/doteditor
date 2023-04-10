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
		let rangeSelectBtn: HTMLElement = <HTMLElement>document.querySelector('#drawBtnGrp > #selectRange');
		
		this._btnList = [pencilBtn, eracerBtn, dropperBtn, rangeSelectBtn/**/];
		for (let btn of this._btnList) {
			btn.addEventListener('click', this._onClickHandler);
		}

		//鉛筆が選択されている状態にする
		this._btnInactive(pencilBtn);
		this._state.setCurrent(State.DRAW_PENCIL);
		this.dispatchEvent(new createjs.Event(this.EVENT_CLICK_EDIT_BTN, true, true));
	}
	//=============================================
	// event handler
	//=============================================
	private _onClickHandler = (e:MouseEvent) => {
		let target:HTMLElement = <HTMLElement>e.currentTarget;
		this._btnInactive(target);

		let state :string;
		if(target.id == "pencil"){
			state = State.DRAW_PENCIL;
		}else if(target.id == "eracer"){
			state = State.DRAW_ERACER;
		}else if(target.id == "dropper"){
			state = State.EDIT_DROPPER;
		}else if(target.id == "selectRange"){
			state = State.SELECT_RANGE;
		}
		this._state.setCurrent((this._state.current== state) ? null : state);
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