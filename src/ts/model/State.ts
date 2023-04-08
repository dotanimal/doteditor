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
	public static readonly DRAW_PENCIL: string = 'draw pencil';
	public static readonly DRAW_ERACER: string = 'draw eracer';

	public static readonly HISTORY_UNDO: string = 'history undo';
	public static readonly HISTORY_REDO: string = 'history redo';

	public static readonly FILE_LOAD_JSON_FROM_LOCAL: string = 'file load json from local';
	public static readonly FILE_SAVE_JSON_TO_LOCAL: string = 'file save json to local';
	public static readonly FILE_SAVE_SVG_TO_LOCAL: string = 'file save svg to local';

	public static readonly CATEGORY_DRAW:string = 'category draw';
	public static readonly CATEGORY_HISTORY:string = 'category histroy';
	public static readonly CATEGORY_FILE:string = 'category file';

	//----------private---------
	private _currentCategory : string;
	private _prevCategory : string;
	private _current : string;
	private _prev : string;
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
	private _setCategory = () => {
		let result : string;
		if(/^draw/.test(this._current)){
			result = State.CATEGORY_DRAW;
		}else if(/^history/.test(this._current)){
			result = State.CATEGORY_HISTORY;
		}else if(/^file/.test(this._current)){
			result = State.CATEGORY_FILE;
		}else{
			result = null;
		}
		this._prevCategory = this._currentCategory;
		this._currentCategory = result;
	}
	//=============================================
	// public
	//=============================================
	public setCurrent = (value : string) => {
		if(this._current == value){return false};
		this._prev = this._current;
		this._current = value;
		this._setCategory();
		//console.log('\n[State:change]', "\t" + this.current);
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
	get current(): string {
		return this._current;
	}
	get prev(): string {
		return this._prev;
	}
	get currentCategory(): string {
		return this._currentCategory;
	}
	get prevCategory(): string {
		return this._prevCategory;
	}
}