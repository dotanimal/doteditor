export class State {
	//=============================================
	// TODO
	//=============================================
	/*
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly MODE_DRAW_PENCIL: string = 'draw pencil';
	public static readonly MODE_DRAW_ERACER: string = 'draw eracer';

	public static readonly MODE_EDIT_DROPPER: string = 'edit dropper';

	public static readonly MODE_SELECT_RANGE: string = 'select range';

	public static readonly MODE_HISTORY_UNDO: string = 'history undo';
	public static readonly MODE_HISTORY_REDO: string = 'history redo';

	public static readonly MODE_FILE_NEW: string = 'file new';
	public static readonly MODE_FILE_LOAD_JSON_FROM_LOCAL: string = 'file load json from local';
	public static readonly MODE_FILE_SAVE_JSON_TO_LOCAL: string = 'file save json to local';
	public static readonly MODE_FILE_SAVE_SVG_TO_LOCAL: string = 'file save svg to local';

	public static readonly MODE_CATEGORY_DRAW:string = 'category edit';
	public static readonly MODE_CATEGORY_SELECT:string = 'category select';
	public static readonly MODE_CATEGORY_HISTORY:string = 'category histroy';
	public static readonly MODE_CATEGORY_FILE:string = 'category file';

	//----------private---------
	private _currentModeCategory : string;
	private _prevModeCategory : string;
	private _currentMode : string;
	private _prevMode : string;

	private _hexColorCode : string;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor() {
	}
	//=============================================
	// event handler
	//=============================================
	//=============================================
	// private
	//=============================================
	private _setModeCategory = () => {
		let result : string;
		if(/^draw/.test(this._currentMode)){
			result = State.MODE_CATEGORY_DRAW;
		}else if(/^select/.test(this._currentMode)){
			result = State.MODE_CATEGORY_SELECT;
		}else if(/^history/.test(this._currentMode)){
			result = State.MODE_CATEGORY_HISTORY;
		}else if(/^file/.test(this._currentMode)){
			result = State.MODE_CATEGORY_FILE;
		}else{
			result = null;
		}
		this._prevModeCategory = this._currentModeCategory;
		this._currentModeCategory = result;
	}
	//=============================================
	// public
	//=============================================
	public setMode = (value : string) => {
		if(this._currentMode == value){return false};
		this._prevMode = this._currentMode;
		this._currentMode = value;
		this._setModeCategory();
		//console.log('\n[State:change]', "\t" + this.current);
	}
	public setHexColorCode = (value : string) => {
		this._hexColorCode = value;
	}
	/*
	public setPrev = (value : string) => {
		this._prev = value;
		this._current = value;
		this._setCategory();
	}
	*/
	
	/*
	public prev = () => {
		this._current = this._prev;
		this._setCategory();
		console.log('\n[State:change]', "\t" + this.current);
	}
	*/
	//=============================================
	// getter/setter
	//=============================================
	get currentMode(): string {
		return this._currentMode;
	}
	/*
	get prev(): string {
		return this._prev;
	}
	*/
	get currentModeCategory(): string {
		return this._currentModeCategory;
	}
	/*
	get prevCategory(): string {
		return this._prevCategory;
	}
	*/
	get hexColorCode(): string {
		return this._hexColorCode;
	}
}