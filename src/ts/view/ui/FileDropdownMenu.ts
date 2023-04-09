import { State } from "../../model/State";
export class FileDropdownMenu extends createjs.EventDispatcher {
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public readonly EVENT_OPEN_FILE_DROPDOWN: string = "event open file dropdown";
	public readonly EVENT_CLOSE_FILE_DROPDOWN: string = "event close file dropdown";
	public readonly EVENT_SELECT_MENU_FILE_DROPDOWN: string = "event select menu file dropdown";
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
	private _anchorList: Array<HTMLAnchorElement>;
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
			this.dispatchEvent(new createjs.Event(this.EVENT_OPEN_FILE_DROPDOWN, true, true));
		});
		//クローズ
		fdd.addEventListener("hide.bs.dropdown", (e: Event) => {
			//this.reset();
			this.dispatchEvent(new createjs.Event(this.EVENT_CLOSE_FILE_DROPDOWN, true, true));
		});
		//----------------------
		// リンク
		//----------------------
		//新規作成
		let newLink:HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('#fileDropdown a#fileNewMenu');

		//ローカル環境からJSONファイルを読み込む
		let loadJsonFromLocalLink:HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('#fileDropdown a#fileLoadMenu');

		//ローカル環境にJSONファイルを保存
		let saveJsonToLocalLink:HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('#fileDropdown a#fileSaveMenu');

		//ローカル環境にSVGファイルを書き出し
		let publishSvgToLocalLink:HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('#fileDropdown #filePublishMenu a#publishSvgToLocal');
		
		this._anchorList = [
								newLink,
								loadJsonFromLocalLink,
								saveJsonToLocalLink,
								publishSvgToLocalLink
							];
		for (let anchor of this._anchorList) {
			anchor.addEventListener('click', this._onClickHandler);
		}
	}
	//=============================================
	// event handler
	//=============================================

	private _onClickHandler = (e:MouseEvent) => {
		let target:HTMLAnchorElement = <HTMLAnchorElement>e.currentTarget;
	
		let mode :string;
		if(target.id == "fileNewMenu"){
			mode = State.FILE_NEW;
		}else if(target.id == "fileLoadMenu"){
			mode = State.FILE_LOAD_JSON_FROM_LOCAL;
		}else if(target.id == "fileSaveMenu"){
			mode = State.FILE_SAVE_JSON_TO_LOCAL;
		}else if(target.id == "publishSvgToLocal"){
			mode = State.FILE_SAVE_SVG_TO_LOCAL;
		}

		this._state.setCurrent(mode);
		this.dispatchEvent(new createjs.Event(this.EVENT_SELECT_MENU_FILE_DROPDOWN, true, true));
		e.preventDefault();
	}
	//=============================================
	// private
	//=============================================
	//=============================================
	// public
	//=============================================
	/*
	public reset = () => {
		this._saveMenu.style.display = "block";
	}
	public hideSaveMenu = () => {
		this._saveMenu.style.display = "none";
		//this._saveLink.classList.add("disabled");
	}
	*/
	//=============================================
	// getter/setter
	//=============================================
}