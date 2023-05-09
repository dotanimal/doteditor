import { State } from "../../../model/State";
import { FileMenu } from "./FileMenu";
import * as bootstrap from 'bootstrap'
export class SpOffcanvasFileMenu extends FileMenu {
	//=============================================
	// TODO
	//=============================================
	/*
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	//----------private---------
	private _ocvs:bootstrap.Offcanvas;
	private _update2WpBtn:HTMLElement;

	private _itemList: Array<HTMLElement>;

	private _publishMenu:HTMLElement;
	private _loadMenu:HTMLElement;
	private _saveMenu:HTMLElement;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state : State) {
		super(state);

		//----------------------
		// オフキャンバス
		//----------------------
	
		var ocvsEle:HTMLElement = document.querySelector('#menuOffcanvas');

		this._ocvs = new bootstrap.Offcanvas(ocvsEle);
		
		//オープン
		ocvsEle.addEventListener("show.bs.offcanvas", (e: Event) => {
			//console.log("open");
			this._state.setCurrent(State.FILE_MENU_OPEN);
			this.dispatchEvent(new createjs.Event(FileMenu.EVENT_OPEN_FILE_MENU, true, true));
		});
		//クローズ
		ocvsEle.addEventListener("hide.bs.offcanvas", (e: Event) => {
			//console.log("close");
			//this.reset();
			this.dispatchEvent(new createjs.Event(FileMenu.EVENT_CLOSE_FILE_MENU, true, true));
		});
		//----------------------
		// メニュー
		//----------------------
		
		this._publishMenu = <HTMLElement>document.querySelector('#fileMenu #publishFileMenu');
		this._loadMenu = <HTMLElement>document.querySelector('#fileMenu #loadFileMenu');
		this._saveMenu = <HTMLElement>document.querySelector('#fileMenu #saveFileMenu');

		//----------------------
		// リンク
		//----------------------
		//新規作成
		let newBtn:HTMLElement = <HTMLElement>document.querySelector('#fileMenu #fileNewBtn');

		//ローカル環境からJSONファイルを読み込む
		let loadJsonFromLocalBtn:HTMLElement = <HTMLElement>document.querySelector('#fileMenu #fileLoadJsonFromLocalBtn');

		//ローカル環境にJSONファイルを保存
		let saveJsonToLocalBtn:HTMLElement = <HTMLElement>document.querySelector('#fileMenu #fileSaveJson2LocalBtn');

		//ローカル環境にSVGファイルを書き出し
		let publishSvgToLocalBtn:HTMLElement = <HTMLElement>document.querySelector('#fileMenu #publishSvgToLocalBtn');
		//ローカル環境にPNGファイルを書き出し
		let publishPngToLocalBtn:HTMLElement = <HTMLElement>document.querySelector('#fileMenu #publishPngToLocalBtn');
		//ローカル環境にJPEGファイルを書き出し
		let publishJpegToLocalBtn:HTMLElement = <HTMLElement>document.querySelector('#fileMenu #publishJpegToLocalBtn');
		
		//WPからリストを読み込む
		let loadListFromWpBtn:HTMLElement = <HTMLElement>document.querySelector('#fileMenu #fileLoadListFromWpBtn');
		
		//WPに上書き保存
		this._update2WpBtn = <HTMLElement>document.querySelector('#fileMenu #fileUpdate2WpBtn');
		
		//WPに新規保存
		let post2WpBtn:HTMLElement = <HTMLElement>document.querySelector('#fileMenu #filePost2WpBtn');
		
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
		if(target.id == "fileNewBtn"){
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

		this._ocvs.hide();
	}
	//=============================================
	// private
	//=============================================
	//=============================================
	// public
	//=============================================
	public override changedState = () => {
		let state :string = this._state.current;
		//let category:string = this._state.currentCategory
		/*
		if(state == State.SELECT_RANGE){
			this._fddLink.classList.add("disabled");
			return false;
		}
		*/
		
		//this._fddLink.classList.remove("disabled");

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
			this._saveMenu.style.display = "none";
			this._publishMenu.style.display = "none";
		}else{
			this._saveMenu.style.display = "block";
			this._publishMenu.style.display = "block";
		}
	}
	//=============================================
	// getter/setter
	//=============================================
}