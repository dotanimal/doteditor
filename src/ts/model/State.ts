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

	public static readonly EDIT_DROPPER: string = 'edit dropper';

	public static readonly SELECT_RANGE: string = 'select range';
	public static readonly SELECT_COPY: string = 'select copy';
	public static readonly SELECT_CUT: string = 'select cut';
	public static readonly SELECT_END: string = 'select end';

	public static readonly HISTORY_UNDO: string = 'history undo';
	public static readonly HISTORY_REDO: string = 'history redo';

	public static readonly FILE_MENU_OPEN: string = 'file menu open';
	public static readonly FILE_MENU_OPEN_WS_IS_NEW_DRAW: string = 'file menu open ws is new draw';
	public static readonly FILE_MENU_OPEN_WS_IS_NO_DRAW: string = 'file menu open ws is no draw';

	public static readonly FILE_NEW: string = 'file new';
	public static readonly FILE_LOAD_JSON_FROM_LOCAL: string = 'file load json from local';
	public static readonly FILE_SAVE_JSON_TO_LOCAL: string = 'file save json to local';
	public static readonly FILE_SAVE_SVG_TO_LOCAL: string = 'file save svg to local';
	
	public static readonly FILE_POST_TO_WP: string = 'file post to wordpress';
	public static readonly FILE_UPDATE_TO_WP: string = 'file update to wordpress';
	public static readonly FILE_LOAD_DETAIL_FROM_WP: string = 'file load detail from wordpress';
	public static readonly FILE_LOAD_LIST_FROM_WP: string = 'file load list from wordpress';
	public static readonly FILE_LOAD_PAGE_SPLIT_LIST_FROM_WP: string = 'file load page split list from wordpress';

	public static readonly CATEGORY_DRAW:string = 'category draw';
	public static readonly CATEGORY_EDIT:string = 'category edit';
	public static readonly CATEGORY_SELECT:string = 'category select';
	public static readonly CATEGORY_HISTORY:string = 'category histroy';
	public static readonly CATEGORY_FILE:string = 'category file';

	//----------private---------
	private _currentCategory : string;
	private _prevCategory : string;
	private _current : string;
	private _prev : string;

	//private _hexColorCode : string;
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
		}else if(/^edit/.test(this._current)){
			result = State.CATEGORY_EDIT;
		}else if(/^select/.test(this._current)){
			result = State.CATEGORY_SELECT;
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
	public setHexColorCode = (value : string) => {
		this._hexColorCode = value;
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
	/*
	get prevCategory(): string {
		return this._prevCategory;
	}
	*//*
	get hexColorCode(): string {
		return this._hexColorCode;
	}*/
}