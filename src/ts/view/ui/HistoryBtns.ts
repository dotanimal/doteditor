import { State } from "../../model/State";

export class HistoryBtns extends createjs.EventDispatcher {
	//=============================================
	// TODO
	//=============================================
	/*
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public readonly EVENT_HIDSTORY_UNDO: string = "event history undo";
	public readonly EVENT_HIDSTORY_REDO: string = "event history redo";
	//----------private---------
	private _state: State;
	private _btnList: Array<HTMLElement>;

	private _undoBtn: HTMLElement;
	private _redoBtn: HTMLElement;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state : State) {
		super();
		
		this._state = state;

		this._undoBtn = <HTMLElement>document.querySelector('#historyBtnGrp > #undo');
		this._undoBtn.addEventListener('click', this._onUndoBtnClickHandler);

		this._redoBtn = <HTMLElement>document.querySelector('#historyBtnGrp > #redo');
		this._redoBtn.addEventListener('click', this._onRedoBtnClickHandler);
		
		this._btnList = [this._undoBtn, this._redoBtn];

		this.redoBtnDisactive(true);
		this.undoBtnDisactive(true);
	}
	//=============================================
	// event handler
	//=============================================
	private _onUndoBtnClickHandler = (e: Event) => {
		let target = <HTMLElement>e.currentTarget;
		this._btnInactive(target);
		this._state.setCurrent(State.HISTORY_UNDO);
		this.dispatchEvent(new createjs.Event(this.EVENT_HIDSTORY_UNDO, true, true));
	}
	private _onRedoBtnClickHandler = (e: Event) => {
		let target = <HTMLElement>e.currentTarget;
		this._btnInactive(target);
		this._state.setCurrent(State.HISTORY_REDO);
		this.dispatchEvent(new createjs.Event(this.EVENT_HIDSTORY_REDO, true, true));
	}
	//=============================================
	// private
	//=============================================
	private _btnInactive = (target: HTMLElement = null) => {
		/*
		for (let btn of this._btnList) {
			if (btn != target) {
				btn.classList.remove("active");
			} else {
				btn.classList.add("active");
			}
		}
		*/
	}
	//=============================================
	// public
	//=============================================
	public redoBtnDisactive = (flag: boolean) => {
		if (flag) {
			this._redoBtn.classList.add("disabled");
		} else {
			this._redoBtn.classList.remove("disabled");
		}
	}
	public undoBtnDisactive = (flag: boolean) => {
		if (flag) {
			this._undoBtn.classList.add("disabled");
		} else {
			this._undoBtn.classList.remove("disabled");
		}
	}
	//=============================================
	// getter/setter
	//=============================================
}