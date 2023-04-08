import { State } from "../../model/State";
export class FileDropdownMenu extends createjs.EventDispatcher {
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public readonly EVENT_DROPDOWN_OPEN: string = "event dropdown open";
	public readonly EVENT_DROPDOWN_CLOSE: string = "event dropdown close";
	public readonly EVENT_DROPDOWN_MENU_SELECT: string = "event dropdown menu select";
	//----------private---------
	//private _dropdown: bootstrap.Dropdown;

	private _newMenu:HTMLElement;
	private _loadMenu:HTMLElement;
	//private _loadJsonFromLocalLink:HTMLElement;
	//private _loadJsonFromLocalInput:HTMLInputElement;

	private _saveMenu:HTMLElement;


	private _publishMenu:HTMLElement;
	//private _saveJsonToLocalLink:HTMLElement;
	
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
		let fdd: HTMLElement = <HTMLElement>document.querySelector('#fileDropdown');
		//オープン
		fdd.addEventListener("show.bs.dropdown", (e: Event) => {
			this.dispatchEvent(new createjs.Event(this.EVENT_DROPDOWN_OPEN, true, true));
		});
		//クローズ
		fdd.addEventListener("hide.bs.dropdown", (e: Event) => {
			this.reset();
			this.dispatchEvent(new createjs.Event(this.EVENT_DROPDOWN_CLOSE, true, true));
		});
		//----------------------
		// 新規作成
		//----------------------
		this._newMenu = <HTMLElement>document.querySelector('#fileDropdown #fileNewMenu');
		//
		let newLink:HTMLElement = <HTMLElement>document.querySelector('#fileDropdown #fileNewMenu a');
		newLink.addEventListener("click", (e: Event) => {
			//loadJsonFromLocalInput.click();
			this._state.setCurrent(State.FILE_NEW);
			this.dispatchEvent(new createjs.Event(this.EVENT_DROPDOWN_MENU_SELECT, true, true));
			e.preventDefault();
		});
		//----------------------
		// 読み込み
		//----------------------
		this._loadMenu = <HTMLElement>document.querySelector('#fileDropdown #fileLoadMenu');
		//ローカル環境からJSONファイルを読み込む
		let loadJsonFromLocalLink:HTMLElement = <HTMLElement>document.querySelector('#fileDropdown #fileLoadMenu a');
		loadJsonFromLocalLink.addEventListener("click", (e: Event) => {
			//loadJsonFromLocalInput.click();
			this._state.setCurrent(State.FILE_LOAD_JSON_FROM_LOCAL);
			this.dispatchEvent(new createjs.Event(this.EVENT_DROPDOWN_MENU_SELECT, true, true));
			e.preventDefault();
		});
		//----------------------
		// 保存
		//----------------------
		this._saveMenu = <HTMLElement>document.querySelector('#fileDropdown #fileSaveMenu');
		//ローカル環境にJSONファイルを保存
		let saveJsonToLocalLink:HTMLElement = <HTMLElement>document.querySelector('#fileDropdown #fileSaveMenu a');
		saveJsonToLocalLink.addEventListener("click", (e: Event) => {
			this._state.setCurrent(State.FILE_SAVE_JSON_TO_LOCAL);
			this.dispatchEvent(new createjs.Event(this.EVENT_DROPDOWN_MENU_SELECT, true, true));
			e.preventDefault();
		});
		//----------------------
		// 書き出し
		//----------------------
		this._publishMenu = <HTMLElement>document.querySelector('#fileDropdown #filePublishMenu');
		//ローカル環境にSVGファイルを書き出し
		let publishSvgToLocalLink:HTMLElement = <HTMLElement>document.querySelector('#fileDropdown #filePublishMenu #publishSvgToLocal a');
		publishSvgToLocalLink.addEventListener("click", (e: Event) => {
			console.log("svg");
			this._state.setCurrent(State.FILE_SAVE_SVG_TO_LOCAL);
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
	//=============================================
	// public
	//=============================================
	public reset = () => {
		this._saveMenu.style.display = "block";
	}
	public hideSaveMenu = () => {
		this._saveMenu.style.display = "none";
		//this._saveLink.classList.add("disabled");
	}
	//=============================================
	// getter/setter
	//=============================================
}