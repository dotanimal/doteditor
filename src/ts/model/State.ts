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
	//----------private---------
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
	//=============================================
	// public
	//=============================================
	//=============================================
	// getter/setter
	//=============================================
	get current(): string {
		return this._current;
	}
	set current(value){
		this._prev = this._current;
		this._current = value;

		/*this._current をもとに分類したものを設定
		this._currentCategory =
		*/ 
	}
	get prev(): string {
		return this._prev;
	}
	/*
	get currentCategory(): string {
		//this._current をもとに分類
		return this._category;
	}
	*/
}