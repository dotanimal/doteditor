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
	public readonly EVENT_CHANGE_BTN: string = "event change btn";
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
		pencilBtn.addEventListener('click', this._onPenchilBtnClickHandler);

		let eracerBtn: HTMLElement = <HTMLElement>document.querySelector('#drawBtnGrp > #eracer');
		eracerBtn.addEventListener('click', this._onEracerBtnClickHandler);
		
		this._btnList = [pencilBtn, eracerBtn];

		//鉛筆が選択されている状態にする
		this._btnInactive(pencilBtn);
		this._state.set(State.DRAW_PENCIL);
		this.dispatchEvent(new createjs.Event(this.EVENT_CHANGE_BTN, true, true));
	}
	//=============================================
	// event handler
	//=============================================
	private _onPenchilBtnClickHandler = (e: Event) => {
		let target = <HTMLElement>e.currentTarget;
		this._btnInactive(target);
		this._state.set((this._state.current == State.DRAW_PENCIL) ? null : State.DRAW_PENCIL);
		this.dispatchEvent(new createjs.Event(this.EVENT_CHANGE_BTN, true, true));
	}
	private _onEracerBtnClickHandler = (e: Event) => {
		let target = <HTMLElement>e.currentTarget;
		this._btnInactive(target);
		this._state.set((this._state.current == State.DRAW_ERACER) ? null : State.DRAW_ERACER);
		this.dispatchEvent(new createjs.Event(this.EVENT_CHANGE_BTN, true, true));
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
		this._state.set(null);
	}
	//=============================================
	// getter/setter
	//=============================================
}