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
	private _fddLink:HTMLAnchorElement;
	
	private _filePublishMenuLink:HTMLAnchorElement;
	private _fileLoadMenuLink:HTMLAnchorElement;
	private _fileSaveMenuLink:HTMLAnchorElement;

	private _state: State;
	private _anchorList: Array<HTMLAnchorElement>;

	private _update2WpLink:HTMLAnchorElement;
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
		this._fddLink = <HTMLAnchorElement>document.querySelector('#fileDropdown > a');
		
		let fdd:HTMLElement = <HTMLElement>document.querySelector('#fileDropdown');
		//オープン
		fdd.addEventListener("show.bs.dropdown", (e: Event) => {
			this._state.setCurrent(State.FILE_MENU_OPEN);
			this.dispatchEvent(new createjs.Event(this.EVENT_OPEN_FILE_DROPDOWN, true, true));
		});
		//クローズ
		fdd.addEventListener("hide.bs.dropdown", (e: Event) => {
			//this.reset();
			this.dispatchEvent(new createjs.Event(this.EVENT_CLOSE_FILE_DROPDOWN, true, true));
		});
		//----------------------
		// メニュー
		//----------------------
		this._filePublishMenuLink = <HTMLAnchorElement>document.querySelector('#fileDropdown #filePublishMenu > a');
		this._fileLoadMenuLink = <HTMLAnchorElement>document.querySelector('#fileDropdown #fileLoadMenu > a');
		this._fileSaveMenuLink = <HTMLAnchorElement>document.querySelector('#fileDropdown #fileSaveMenu > a');

		//----------------------
		// リンク
		//----------------------
		//新規作成
		let newLink:HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('#fileDropdown a#fileNewMenu');

		//ローカル環境からJSONファイルを読み込む
		let loadJsonFromLocalLink:HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('#fileDropdown a#fileLoadJsonFromLocalLink');

		//ローカル環境にJSONファイルを保存
		let saveJsonToLocalLink:HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('#fileDropdown a#fileSaveJson2LocalLink');

		//ローカル環境にSVGファイルを書き出し
		let publishSvgToLocalLink:HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('#fileDropdown a#publishSvgToLocalLink');
		

		//WPからリストを読み込む
		let loadListFromWpLink:HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('#fileDropdown a#fileLoadListFromWpLink');
		
		//WPに上書き保存
		this._update2WpLink = <HTMLAnchorElement>document.querySelector('#fileDropdown a#fileUpdate2WpLink');
		
		//WPに新規保存
		let post2WpLink:HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('#fileDropdown a#filePost2WpLink');
		
		this._anchorList = [
								newLink,
								loadJsonFromLocalLink,
								saveJsonToLocalLink,
								publishSvgToLocalLink,
								loadListFromWpLink,
								this._update2WpLink,
								post2WpLink
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
		}else if(target.id == "fileLoadJsonFromLocalLink"){
			mode = State.FILE_LOAD_JSON_FROM_LOCAL;
		}else if(target.id == "fileSaveJson2LocalLink"){
			mode = State.FILE_SAVE_JSON_TO_LOCAL;
		}else if(target.id == "publishSvgToLocalLink"){
			mode = State.FILE_SAVE_SVG_TO_LOCAL;
		}else if(target.id == "fileUpdate2WpLink"){
			mode = State.FILE_UPDATE_TO_WP;
		}else if(target.id == "filePost2WpLink"){
			mode = State.FILE_POST_TO_WP;
		}else if(target.id == "fileLoadListFromWpLink"){
			mode = State.FILE_LOAD_PAGE_SPLIT_LIST_FROM_WP;
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
	
	public changedState = () =>{
		let state :string = this._state.current;
		let category:string = this._state.currentCategory;
		if(state == State.SELECT_RANGE || state == State.SELECT_DRAG){
			this._fddLink.classList.add("disabled");
			return false;
		}
		
		this._fddLink.classList.remove("disabled");

		if(state == State.FILE_MENU_OPEN_WS_IS_NEW_DRAW){
			//新規で作成したデータの場合
			//上書き保存のボタンを表示しない
			this._update2WpLink.style.display = "none";
		}else{
			//WordPressから読み込まれたデータの場合
			this._update2WpLink.style.display = "block";
		}
		if(state == State.FILE_MENU_OPEN_WS_IS_NO_DRAW){
			//描画がない場合は、保存・書き出しを表示しない
			this._fileSaveMenuLink.style.display = "none";
			this._filePublishMenuLink.style.display = "none";
		}else{
			this._fileSaveMenuLink.style.display = "block";
			this._filePublishMenuLink.style.display = "block";
		}
	}
	//=============================================
	// getter/setter
	//=============================================
}