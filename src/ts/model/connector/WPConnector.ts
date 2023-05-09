import { State } from "../State";
import { PixcelArtData } from "../data/PixcelArtData";

export class WPConector extends createjs.EventDispatcher {
	//=============================================
	// TODO
	//=============================================
	/*
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_COMPLETE_WPCONNECT: string = "event complete wordpress connect";
	//----------private---------
	private readonly _API_PATH: string = "/assets/php/pixcelart_api.php";

	private _state:State;
	private _xhr: XMLHttpRequest;
	private _isSuccess:boolean;
	private _result:string;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state:State) {
		super();

		this._state = state;
		this._xhr = new XMLHttpRequest();
		this._xhr.onreadystatechange = this._onReadyStateChageHandler;
	}
	//=============================================
	// event handler
	//=============================================
	private _onReadyStateChageHandler = (e: Event = null) => {
		this._isSuccess = false;
		this._result = null;
		if (this._xhr.readyState == 4) {// データ受信完了
			//console.log(this._xhr.readyState, this._xhr.status, this._xhr.statusText, this._xhr.responseText);
			var pattern = new RegExp(/2\d\d/);
			if (pattern.test(String(this._xhr.status)) == true) { //200番台
				this._isSuccess = true;
				this._result = this._xhr.responseText;
			} else {
				this._isSuccess = false;
				this._result = this._xhr.responseText;
			}
			this.dispatchEvent(new createjs.Event(WPConector.EVENT_COMPLETE_WPCONNECT, true, true));
		}
	}
	//=============================================
	// private
	//=============================================
	//=============================================
	// public
	//=============================================
	//新規投稿
	public post = (pad: PixcelArtData) => {
		setTimeout(()=>{
			this._isSuccess = false;
			this._result = null;
			this.dispatchEvent(new createjs.Event(WPConector.EVENT_COMPLETE_WPCONNECT, true, true));
		},100);
	}
	//更新
	public update = (pad: PixcelArtData) => {
		setTimeout(()=>{
			this._isSuccess = false;
			this._result = null;
			this.dispatchEvent(new createjs.Event(WPConector.EVENT_COMPLETE_WPCONNECT, true, true));
		},100);
	}
	//全リストを取得
	public getList = (isSvg:boolean = false) => {
		this._state.setCurrent(State.FILE_LOAD_LIST_FROM_WP);

		this._xhr.open('POST', this._API_PATH);
		this._xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		if(isSvg){
			this._xhr.send("mode=list&svg=true");
		}else{
			this._xhr.send("mode=list");
		}
	}
	//ページ指定でリストを取得
	public getPageSplitList = (paged: number, posts_per_page: number, isSvg:boolean = false) => {
		this._state.setCurrent(State.FILE_LOAD_PAGE_SPLIT_LIST_FROM_WP);

		this._xhr.open('POST', this._API_PATH);
		this._xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		if(isSvg){
			this._xhr.send("mode=page-split-list" + "&paged=" + paged + "&posts_per_page=" + posts_per_page + "&svg=true");
		}else{
			this._xhr.send("mode=page-split-list" + "&paged=" + paged + "&posts_per_page=" + posts_per_page);
		}
	}
	//=============================================
	// getter/setter
	//=============================================
	get isSuccess(): boolean {
		return this._isSuccess;
	}
	get result(): string {
		return this._result;
	}
}