import * as bootstrap from "bootstrap";
import { State } from "../../model/State";
import { WPConector } from "../../model/connector/WPConnector";
import { Pagenation } from "../../view/ui/Pagenation";
import { ShapePreview } from "../../view/canvas/preview/ShapePreview";
import { PixcelArtData } from "../../model/data/PixcelArtData";
import { LoadFromWPController } from "./LoadFromWPController";

export class SpOffcanvasLoadFromWPController extends LoadFromWPController {
	//=============================================
	// TODO
	//=============================================

	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------

	//----------private---------
	private _ocvs: bootstrap.Offcanvas;

	//private _pn: Pagenation;
	
	/*
	private _dotsize: number;
	private _widthThumbField: number;
	private _heightThumbField: number;
	private _marginThumbField: number;
	*/

	private _posts_per_page: number;

	private _stage: createjs.Stage;
	
	private _loadingView: HTMLElement;
	private _mainView: HTMLElement;

	private _thumbList: Array<Thumb>;

	private _pad: PixcelArtData;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state:State) {
		super(state);

		this._ocvs = new bootstrap.Offcanvas(document.querySelector('#loadFromWpOffcanvas'));

		this._loadingView = <HTMLElement>document.querySelector('#loadFromWpOffcanvas .loadingView');
		this._mainView = <HTMLElement>document.querySelector('#loadFromWpOffcanvas .mainView');

		this._thumbList = [];

		this._wpc.addEventListener(WPConector.EVENT_COMPLETE_WPCONNECT, this._onGetListHandler);
		//this._pn.addEventListener(Pagenation.EVENT_CHANGE_PAGENATION, this._onPagenationClickHandler);
	}
	//=============================================
	// event handler
	//=============================================
	private _onGetListHandler = (e: Event) => {
		if(this._wpc.isSuccess){
			//console.log("_onPageSpritListHandler");

			let obj: any = JSON.parse(this._wpc.result);
			let posts: any = obj.posts;

			this._addThumb(posts);
			//this._pn.setting(max_page, current_page);

			this._loadingView.classList.add("display-none");
			this._mainView.classList.remove("display-none");
		}else{
			alert("WordPressからのデータ読み込みに失敗しました。");
		}
	}
	private _onThumbClickHandler = (e: Event) => {
		let thumb: Thumb = <Thumb>e.target;

		this._pad = thumb.pad;

		this.dispatchEvent(new createjs.Event(LoadFromWPController.EVENT_SELECT_THUMB, true, true));
		this.close();
	}
	//=============================================
	// private
	//=============================================
	private _reset = () => {
		this._loadingView.classList.remove("display-none");
		this._mainView.classList.add("display-none");

		let thumb: Thumb;
		for(var i=0; i<this._thumbList.length; i++){
			thumb = this._thumbList[i];
			thumb.removeAllEventListeners();
		}
		this._thumbList = [];
		this._mainView.innerHTML = "";
	}
	private _addThumb = (data: any) => {
		let thumb: Thumb;
		for (var post_title in data) {
			//let post_data: any = data[post_title];
			thumb = new Thumb(post_title, data[post_title]);
			thumb.addEventListener(Thumb.EVENT_CLICK_THUMB, this._onThumbClickHandler)
			this._mainView.appendChild(thumb.htmlElement)
			this._thumbList.push(thumb);
		}
	}
	//=============================================
	// public
	//=============================================
	public override open = ():void => {
		this._reset();
		this._ocvs.show();
		this._wpc.getList(true);
	}
	public override close = ():void => {
		this._ocvs.hide();
		this._reset();
	}
	public override getPixcelArtData = ():PixcelArtData => {
		return this._pad;
	}
	//=============================================
	// getter/setter
	//=============================================
	/*
	get pad(): PixcelArtData {
		return this._pad;
	}
	*/
}

class Thumb extends createjs.EventDispatcher{
	//=============================================
	// TODO
	//=============================================
	/*
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_CLICK_THUMB:string = "event click thumb";
	//----------private---------
	//private _title:string;
	private _pad:PixcelArtData;
	private _svgStr:string;
	private _ele:HTMLElement;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(title:string, data:any) {
		super();

		this._pad = new PixcelArtData();
		this._pad.setValue(data.dot_json, data.id, title);
		//this._svgStr = data.svg;
		this._ele = <HTMLElement>(document.createElement('span'));
		this._ele.innerHTML = data.svg;
		this._ele.addEventListener("click", this._onClickHandler)
	}
	//=============================================
	// event handler
	//=============================================
	private _onClickHandler = (e:MouseEvent) => {
		console.log(this._pad.id, this._pad.title);
		this.dispatchEvent(new createjs.Event(Thumb.EVENT_CLICK_THUMB, true, true));
	}
	//=============================================
	// private
	//=============================================
	//=============================================
	// public
	//=============================================
	//=============================================
	// getter/setter
	//=============================================
	get pad(): PixcelArtData {
		return this._pad;
	}
	get svgStr(): string {
		return this._svgStr;
	}
	get htmlElement():HTMLElement{
		return this._ele;
	}
}
