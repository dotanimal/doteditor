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
	public set = (value : string) => {
		this._prev = this._current;
		this._current = value;
		console.log('\n[State:change]', "\t" + this.current);
	}
	public prev = () => {
		this._current = this._prev;
		console.log('\n[State:change]', "\t" + this.current);
	}
	//=============================================
	// getter/setter
	//=============================================
	get current(): string {
		return this._current;
	}
}