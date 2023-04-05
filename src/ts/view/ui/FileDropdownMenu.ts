import { State } from "../../model/State";
export class FileDropdownMenu extends createjs.EventDispatcher {
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public readonly EVENT_DROPDOWN_OPEN: string = "event dropdown open";
	public readonly EVENT_DROPDOWN_CLOSE: string = "event dropdown close";
	public readonly EVENT_DROPDOWN_MENU_SELECT: string = "event dropdown menu select";

	/*
	public readonly EVENT_FILE_IMG_LOAD_FROM_PC: string = "event file img load from pc";
	public readonly EVENT_LIST_LOAD_FROM_WP: string = "event list load from wp";
	public readonly EVENT_OVERWRITE_SAVE_TO_WP: string = "event overwrite save to wp";
	public readonly EVENT_NEW_SAVE_WP: string = "event new save wp";
	*/
	//----------private---------
	//private _dropdown: bootstrap.Dropdown;
	/*
	private _ilfpcLink: HTMLElement;
	private _llfwpLink: HTMLElement;
	private _ostwpLink: HTMLElement;
	private _nstwpLink: HTMLElement;
	*/
	private _loadJsonFileFlomLocalLink:HTMLElement;
	private _saveJsonFileToLocalLink:HTMLElement;
	private _state: State;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state : State) {
		super();
		this._state = state;
		//----------------------
		// ドロップダウンメニュー
		//----------------------
		let fdd: HTMLElement = <HTMLElement>document.querySelector('#file-dropdown');
		//オープン
		fdd.addEventListener("show.bs.dropdown", (e: Event) => {
			this.dispatchEvent(new createjs.Event(this.EVENT_DROPDOWN_OPEN, true, true));
		});
		//クローズ
		fdd.addEventListener("hide.bs.dropdown", (e: Event) => {
			this._reset();
			this.dispatchEvent(new createjs.Event(this.EVENT_DROPDOWN_CLOSE, true, true));
		});
		//----------------------
		// 読み込み
		//----------------------
		//ローカル環境からJSONファイルを読み込む
		this._loadJsonFileFlomLocalLink = <HTMLElement>document.querySelector('#file-dropdown #loadJsonFileFromLocal');
		this._loadJsonFileFlomLocalLink.addEventListener("click", (e: Event) => {
			this._state.current = State.FILE_LOAD_JSON_FROM_LOCAL;
			this.dispatchEvent(new createjs.Event(this.EVENT_DROPDOWN_MENU_SELECT, true, true));
			e.preventDefault();
		});
		//----------------------
		// 保存
		//----------------------
		//ローカル環境にJSONファイルを保存
		this._saveJsonFileToLocalLink = <HTMLElement>document.querySelector('#file-dropdown #saveJsonFileToLocal');
		this._saveJsonFileToLocalLink.addEventListener("click", (e: Event) => {
			this._state.current = State.FILE_SAVE_JSON_TO_LOCAL;
			this.dispatchEvent(new createjs.Event(this.EVENT_DROPDOWN_MENU_SELECT, true, true));
			e.preventDefault();
		});
	}
	//=============================================
	// event handler
	//=============================================
	//=============================================
	// private
	//=============================================
	private _reset = () => {
	}
	//=============================================
	// public
	//=============================================

	//=============================================
	// getter/setter
	//=============================================
}