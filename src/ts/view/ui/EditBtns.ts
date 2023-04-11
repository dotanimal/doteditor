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

	private _pencilBtn: HTMLElement;
	private _eracerBtn: HTMLElement;
	private _dropperBtn: HTMLElement;
	private _rangeSelectBtn: HTMLElement;
	private _dragBtn: HTMLElement;
		
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state : State) {
		super();
		
		this._state = state;

		this._pencilBtn = <HTMLElement>document.querySelector('#drawBtnGrp > #pencil');
		this._eracerBtn = <HTMLElement>document.querySelector('#drawBtnGrp > #eracer');
		this._dropperBtn = <HTMLElement>document.querySelector('#drawBtnGrp > #dropper');
		this._rangeSelectBtn = <HTMLElement>document.querySelector('#drawBtnGrp > #selectRange');
		this._dragBtn = <HTMLElement>document.querySelector('#drawBtnGrp > #drag');
		
		this._btnList = [this._pencilBtn, this._eracerBtn, this._dropperBtn, this._rangeSelectBtn, this._dragBtn/**/];
		for (let btn of this._btnList) {
			btn.addEventListener('click', this._onClickHandler);
		}

		//鉛筆が選択されている状態にする
		this._btnsInactive(this._pencilBtn);
		this._state.setCurrent(State.DRAW_PENCIL);
		this.dispatchEvent(new createjs.Event(this.EVENT_CLICK_EDIT_BTN, true, true));
	}
	//=============================================
	// event handler
	//=============================================
	private _onClickHandler = (e:MouseEvent) => {
		let target:HTMLElement = <HTMLElement>e.currentTarget;
		let state :string;

		if(target.id == "pencil"){
			state = State.DRAW_PENCIL;
		}else if(target.id == "eracer"){
			state = State.DRAW_ERACER;
		}else if(target.id == "dropper"){
			state = State.EDIT_DROPPER;
		}else if(target.id == "selectRange"){
			state = State.SELECT_RANGE;
		}else if(target.id == "drag"){
			state = State.SELECT_DRAG;
		}
		if(this._state.current!= state){
			this._btnsInactive(target);
		}else{
			//同じボタンを押して非アクティブにした場合
			state = null;
			if(target.id == "drag"){
				//ドラッグボタンを非アクティブにしたときだけ特別なイベントを送る
				state = State.SELECT_DRAG_END;
			}
		}
		this._state.setCurrent(state);
		//this.changedState();
		this.dispatchEvent(new createjs.Event(this.EVENT_CLICK_EDIT_BTN, true, true));
	}
	//=============================================
	// private
	//=============================================
	//対象のボタン以外のアクティブを外す
	private _btnsInactive = (target: HTMLElement = null) => {
		for (let btn of this._btnList) {
			if (btn != target) {
				btn.classList.remove("active");
			} else {
				btn.classList.add("active");
			}
		}
	}
	private _btnAble = (target:HTMLElement, isAble :boolean) => {
		if(isAble){
			target.classList.remove("disabled");
		}else{
			target.classList.add("disabled");
		}
	}
	//=============================================
	// public
	//=============================================
	private _reset = () => {
		for (let btn of this._btnList) {
			btn.classList.remove("active");
			btn.classList.remove("disabled");
		}
		this._btnAble(this._dragBtn, false);
	}
	public changedState = () =>{
		let state :string = this._state.current;
		let category:string = this._state.currentCategory;

		if(state == State.DRAW_PENCIL){
			this._btnAble(this._pencilBtn, true);
			this._btnAble(this._eracerBtn, true);
			this._btnAble(this._dropperBtn, true);
			this._btnAble(this._rangeSelectBtn, true);
			this._btnAble(this._dragBtn, false);
		}else if(state == State.DRAW_ERACER){
			this._btnAble(this._pencilBtn, true);
			this._btnAble(this._eracerBtn, true);
			this._btnAble(this._dropperBtn, true);
			this._btnAble(this._rangeSelectBtn, true);
			this._btnAble(this._dragBtn, false);
		}else if(state == State.EDIT_DROPPER){
			this._btnAble(this._pencilBtn, true);
			this._btnAble(this._eracerBtn, true);
			this._btnAble(this._dropperBtn, true);
			this._btnAble(this._rangeSelectBtn, true);
			this._btnAble(this._dragBtn, false);
		}else if(state == State.SELECT_RANGE){
			this._btnAble(this._pencilBtn, true);
			this._btnAble(this._eracerBtn, true);
			this._btnAble(this._dropperBtn, true);
			this._btnAble(this._rangeSelectBtn, true);
			this._btnAble(this._dragBtn, true);
		}else if(state == State.SELECT_DRAG){
			this._btnAble(this._pencilBtn, false);
			this._btnAble(this._eracerBtn, false);
			this._btnAble(this._dropperBtn, false);
			this._btnAble(this._rangeSelectBtn, false);
			this._btnAble(this._dragBtn, true);
		}else if(state == State.SELECT_DRAG_END){
			this._btnAble(this._pencilBtn, true);
			this._btnAble(this._eracerBtn, true);
			this._btnAble(this._dropperBtn, true);
			this._btnAble(this._rangeSelectBtn, true);
			this._btnAble(this._dragBtn, false);
		}
		if(category == State.CATEGORY_FILE){
			this._reset();
		}else if(category == State.CATEGORY_HISTORY){
			this._reset();
		}
	}
	//=============================================
	// getter/setter
	//=============================================
}