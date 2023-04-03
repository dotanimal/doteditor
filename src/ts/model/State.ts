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
	public static readonly EDIT_PENCIL: string = 'edit pencil';
	public static readonly EDIT_ERACER: string = 'edit eracer';

	public static readonly EDIT_UNDO: string = 'edit undo';
	public static readonly EDIT_REDO: string = 'edit redo';
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
	/*
	get currentCategory(): string {
		//this._current をもとに分類
		return this._category;
	}
	*/
}