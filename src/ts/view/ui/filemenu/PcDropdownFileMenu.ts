import { State } from "../../../model/State";
import { FileMenu } from "./FileMenu";

export class PcDropdownFileMenu extends FileMenu {
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	//----------private---------
	private _fddLink:HTMLAnchorElement;
	
	private _filePublishMenuLink:HTMLAnchorElement;
	private _fileLoadMenuLink:HTMLAnchorElement;
	private _fileSaveMenuLink:HTMLAnchorElement;

	private _itemList: Array<HTMLElement>;

	private _update2WpBtn:HTMLAnchorElement;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state : State) {
		super(state);
		//----------------------
		// ドロップダウンメニュー
		//----------------------
		this._fddLink = <HTMLAnchorElement>document.querySelector('#fileDropdown > a');
		
		let fdd:HTMLElement = <HTMLElement>document.querySelector('#fileDropdown');
		//オープン
		fdd.addEventListener("show.bs.dropdown", (e: Event) => {
			this._state.setCurrent(State.FILE_MENU_OPEN);
			this.dispatchEvent(new createjs.Event(FileMenu.EVENT_OPEN_FILE_MENU, true, true));
		});
		//クローズ
		fdd.addEventListener("hide.bs.dropdown", (e: Event) => {
			//this.reset();
			this.dispatchEvent(new createjs.Event(FileMenu.EVENT_CLOSE_FILE_MENU, true, true));
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
		let newBtn:HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('#fileDropdown a#fileNewMenu');

		//ローカル環境からJSONファイルを読み込む
		let loadJsonFromLocalBtn:HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('#fileDropdown a#fileLoadJsonFromLocalBtn');

		//ローカル環境にJSONファイルを保存
		let saveJsonToLocalBtn:HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('#fileDropdown a#fileSaveJson2LocalBtn');

		//ローカル環境にSVGファイルを書き出し
		let publishSvgToLocalBtn:HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('#fileDropdown a#publishSvgToLocalBtn');
		//ローカル環境にPNGファイルを書き出し
		let publishPngToLocalBtn:HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('#fileDropdown a#publishPngToLocalBtn');
		//ローカル環境にJPEGファイルを書き出し
		let publishJpegToLocalBtn:HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('#fileDropdown a#publishJpegToLocalBtn');
		

		//WPからリストを読み込む
		let loadListFromWpBtn:HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('#fileDropdown a#fileLoadListFromWpBtn');
		
		//WPに上書き保存
		this._update2WpBtn = <HTMLAnchorElement>document.querySelector('#fileDropdown a#fileUpdate2WpBtn');
		
		//WPに新規保存
		let post2WpBtn:HTMLAnchorElement = <HTMLAnchorElement>document.querySelector('#fileDropdown a#filePost2WpBtn');
		
		this._itemList = [
								newBtn,
								loadJsonFromLocalBtn,
								saveJsonToLocalBtn,
								publishSvgToLocalBtn,
								publishPngToLocalBtn,
								publishJpegToLocalBtn,
								loadListFromWpBtn,
								this._update2WpBtn,
								post2WpBtn
							];
		for (let item of this._itemList) {
			item.addEventListener('click', this._onClickHandler);
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
		}else if(target.id == "fileLoadJsonFromLocalBtn"){
			mode = State.FILE_LOAD_JSON_FROM_LOCAL;
		}else if(target.id == "fileSaveJson2LocalBtn"){
			mode = State.FILE_SAVE_JSON_TO_LOCAL;
		}else if(target.id == "publishSvgToLocalBtn"){
			mode = State.FILE_SAVE_SVG_TO_LOCAL;
		}else if(target.id == "publishPngToLocalBtn"){
			mode = State.FILE_SAVE_PNG_TO_LOCAL;
		}else if(target.id == "publishJpegToLocalBtn"){
			mode = State.FILE_SAVE_JPEG_TO_LOCAL;
		}else if(target.id == "fileUpdate2WpBtn"){
			mode = State.FILE_UPDATE_TO_WP;
		}else if(target.id == "filePost2WpBtn"){
			mode = State.FILE_POST_TO_WP;
		}else if(target.id == "fileLoadListFromWpBtn"){
			mode = State.FILE_LOAD_PAGE_SPLIT_LIST_FROM_WP;
		}

		this._state.setCurrent(mode);
		this.dispatchEvent(new createjs.Event(FileMenu.EVENT_SELECT_ITEM_FILE_MENU, true, true));
		e.preventDefault();
	}
	//=============================================
	// private
	//=============================================
	//=============================================
	// public
	//=============================================
	public override changedState = () => {
		let state :string = this._state.current;
		//let category:string = this._state.currentCategory;
		if(state == State.SELECT_RANGE){
			this._fddLink.classList.add("disabled");
			return false;
		}
		
		this._fddLink.classList.remove("disabled");

		if(state == State.FILE_MENU_OPEN_WS_IS_NEW_DRAW){
			//新規で作成したデータの場合
			//上書き保存のボタンを表示しない
			this._update2WpBtn.style.display = "none";
		}else{
			//WordPressから読み込まれたデータの場合
			this._update2WpBtn.style.display = "block";
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