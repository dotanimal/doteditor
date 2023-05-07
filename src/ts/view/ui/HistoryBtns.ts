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
	public readonly EVENT_CLICK_HISTORY_BTN: string = "event click history btn";
	//----------private---------
	private _state: State;

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
		this._undoBtn.addEventListener('click', this._onClickHandler);

		this._redoBtn = <HTMLElement>document.querySelector('#historyBtnGrp > #redo');
		this._redoBtn.addEventListener('click', this._onClickHandler);

		this.redoBtnInactive(true);
		this.undoBtnInactive(true);
	}
	//=============================================
	// event handler
	//=============================================
	private _onClickHandler = (e: Event) => {
		let target = <HTMLElement>e.currentTarget;
		
		let mode :string;
		if(target.id == "undo"){
			mode = State.HISTORY_UNDO;
		}else if(target.id == "redo"){
			mode = State.HISTORY_REDO;
		}
		this._state.setCurrent(mode);
		this.dispatchEvent(new createjs.Event(this.EVENT_CLICK_HISTORY_BTN, true, true));
	}
	//=============================================
	// private
	//=============================================
	//=============================================
	// public
	//=============================================
	public redoBtnInactive = (flag: boolean) => {
		if (flag) {
			this._redoBtn.classList.add("disabled");
		} else {
			this._redoBtn.classList.remove("disabled");
		}
	}
	public undoBtnInactive = (flag: boolean) => {
		if (flag) {
			this._undoBtn.classList.add("disabled");
		} else {
			this._undoBtn.classList.remove("disabled");
		}
	}
	public changedState = () =>{
		//let state :string = this._state.current;
		//let category:string = this._state.currentCategory;
	}
	//=============================================
	// getter/setter
	//=============================================
}