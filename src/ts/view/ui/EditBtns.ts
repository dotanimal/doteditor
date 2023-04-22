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
	private _btnList: Array<HTMLButtonElement>;

	private _pencilBtn: HTMLButtonElement;
	private _eracerBtn: HTMLButtonElement;
	private _dropperBtn: HTMLButtonElement;
	private _rangeSelectBtn: HTMLButtonElement;
	private _copyBtn: HTMLButtonElement;
	private _cutBtn: HTMLButtonElement;
	private _pasteBtn: HTMLButtonElement;
		
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state : State) {
		super();
		
		this._state = state;
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
		}else if(target.id == "copy"){
			state = State.SELECT_COPY;
		}else if(target.id == "cut"){
			state = State.SELECT_CUT;
		}
		if(this._state.current!= state){
			this._btnsInactive(target);
		}else{
			//同じボタンを押して非アクティブにした場合
			state = null;
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
			target.classList.remove("active");
		}
	}
	private _btnsAble = (
		pencil:boolean,
		eracer:boolean,
		dropper:boolean,
		rangeSelect:boolean,
		copy:boolean,
		cut:boolean
	) : void => {
		this._btnAble(this._pencilBtn, pencil);
		this._btnAble(this._eracerBtn, eracer);
		this._btnAble(this._dropperBtn, dropper);
		this._btnAble(this._rangeSelectBtn, rangeSelect);
		this._btnAble(this._copyBtn, copy);
		this._btnAble(this._cutBtn, cut);
	}
	private _reset = () => {
		for (let btn of this._btnList) {
			btn.classList.remove("active");
			btn.classList.remove("disabled");
		}
	}
	//=============================================
	// public
	//=============================================
	public init = ():void =>{
		this._pencilBtn = <HTMLButtonElement>document.querySelector('#drawBtnGrp > #pencil');
		this._eracerBtn = <HTMLButtonElement>document.querySelector('#drawBtnGrp > #eracer');
		this._dropperBtn = <HTMLButtonElement>document.querySelector('#drawBtnGrp > #dropper');
		this._rangeSelectBtn = <HTMLButtonElement>document.querySelector('#drawBtnGrp > #selectRange');

		this._copyBtn = <HTMLButtonElement>document.querySelector('#drawBtnGrp > #copy');
		this._cutBtn = <HTMLButtonElement>document.querySelector('#drawBtnGrp > #cut');
		
		this._btnList = [
			this._pencilBtn,
			this._eracerBtn,
			this._dropperBtn,
			this._rangeSelectBtn,
			this._copyBtn,
			this._cutBtn
		];
		for (let btn of this._btnList) {
			btn.addEventListener('click', this._onClickHandler);
		}

		//鉛筆が選択されている状態にする
		this._pencilBtn.click();
	}
	public changedState = () =>{
		let state :string = this._state.current;
		let category:string = this._state.currentCategory;

		if(state == State.DRAW_PENCIL){
			this._btnsAble(
				true,
				true,
				true,
				true,
				false,
				false
			);
		}else if(state == State.DRAW_ERACER){
			this._btnsAble(
				true,
				true,
				true,
				true,
				false,
				false
			);
		}else if(state == State.EDIT_DROPPER){
			this._btnsAble(
				true,
				true,
				true,
				true,
				false,
				false
			);
		}else if(state == State.SELECT_RANGE){
			this._btnsAble(
				true,
				true,
				true,
				true,
				true,
				true
			);
		}else if(state == State.SELECT_COPY){
			this._btnsAble(
				false,
				false,
				false,
				false,
				false,
				false
			);
		}else if(state == State.SELECT_CUT){
			this._btnsAble(
				false,
				false,
				false,
				false,
				false,
				false
			);
		}else if(state == State.SELECT_END){
			this._btnsAble(
				true,
				true,
				true,
				true,
				false,
				false
			);
		}
		if(category == State.CATEGORY_FILE){
			this._reset();
		}else if(category == State.CATEGORY_HISTORY){
			this._reset();
		}else if(category == null){
			this._btnsAble(
				true,
				true,
				true,
				true,
				false,
				false
			);
		}
	}
	//=============================================
	// getter/setter
	//=============================================
}