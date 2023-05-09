import * as bootstrap from "bootstrap";
import { State } from "../../model/State";
import { WPConector } from "../../model/connector/WPConnector";
import { Pagenation } from "../../view/ui/Pagenation";
import { ShapePreview } from "../../view/canvas/preview/ShapePreview";
import { PixcelArtData } from "../../model/data/PixcelArtData";
import { LoadFromWPController } from "./LoadFromWPController";

export class PcModalLoadFromWPController extends LoadFromWPController {
	//=============================================
	// TODO
	//=============================================
	/*
		WordPressへの接続失敗時にメッセージを出力したい
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	//----------private---------
	private _modal: bootstrap.Modal;

	private _pn: Pagenation;
	
	private _dotsize: number;
	private _widthThumbField: number;
	private _heightThumbField: number;
	private _marginThumbField: number;

	private _posts_per_page: number;

	private _stage: createjs.Stage;
	
	private _loadingView: HTMLElement;
	private _mainView: HTMLElement;

	private _thumbList: Array<ShapePreview>;

	private _pad: PixcelArtData;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state:State) {
		super(state);

		this._modal = new bootstrap.Modal(document.getElementById('loadFromWPModal'), { keyboard: true });

		this._pn = new Pagenation("loadFromWPPagenation");
		
		this._dotsize = 3;
		this._widthThumbField = 80;
		this._heightThumbField = 80;
		this._marginThumbField = 17;

		this._posts_per_page = 24;

		
		this._stage = new createjs.Stage("loadFromWPCanvas");
		// マウスオーバーを有効にする
		this._stage.enableMouseOver();

		this._loadingView = <HTMLElement>document.querySelector('#loadFromWPModal .loadingView');
		this._mainView = <HTMLElement>document.querySelector('#loadFromWPModal .mainView');

		this._thumbList = [];

		this._wpc.addEventListener(WPConector.EVENT_COMPLETE_WPCONNECT, this._onGetPageSpritListHandler);
		this._pn.addEventListener(Pagenation.EVENT_CHANGE_PAGENATION, this._onPagenationClickHandler);
	}
	//=============================================
	// event handler
	//=============================================
	private _onPagenationClickHandler = (e: Event) => {
		//console.log(this._pn.pageId);
		this._reset();

		this._pageChange(this._pn.pageId, this._posts_per_page)
	}
	private _onGetPageSpritListHandler = (e: Event) => {
		if(this._wpc.isSuccess){
			//console.log("_onPageSpritListHandler");

			let obj: any = JSON.parse(this._wpc.result);

			let max_page: number = obj.max_page;
			let current_page: number = obj.current_page;
			let posts_per_page: number = obj.posts_per_page;
			let posts: any = obj.posts;

			//console.log(max_page, current_page, posts_per_page);

			this._addThumb(posts);
			this._pn.setting(max_page, current_page);

			this._loadingView.classList.add("display-none");
			this._mainView.classList.remove("display-none");
		}else{
			alert("WordPressからのデータ読み込みに失敗しました。");
		}
	}
	private _onThumbClickHandler = (e: Event) => {
		let thumb: ShapePreview = <ShapePreview>e.target;

		this._pad = thumb.pixcelArtData;

		this.dispatchEvent(new createjs.Event(LoadFromWPController.EVENT_SELECT_THUMB, true, true));
		this._modal.hide();
	}
	//=============================================
	// private
	//=============================================
	private _reset = () => {
		this._loadingView.classList.remove("display-none");
		this._mainView.classList.add("display-none");
		this._removeThumbAll();
		this._pn.reset();
	}
	private _removeThumbAll = () => {
		let thumb: ShapePreview;
		for (var i = 0; i < this._thumbList.length; i++) {
			thumb = this._thumbList[i];
			thumb.removeAllEventListeners(ShapePreview.EVENT_CLICK_PREVIEW);
		}
		this._stage.removeAllChildren();
		this._stage.update();
		this._thumbList = [];
	}
	private _addThumb = (data: any) => {
		let pad: PixcelArtData;
		let thumb: ShapePreview;

		let canvas: HTMLCanvasElement = <HTMLCanvasElement>this._stage.canvas;

		let xx: number = 0;
		let yy: number = 0;
		for (var post_title in data) {
			let post_data: any = data[post_title];
			pad = new PixcelArtData();
			pad.setValue(post_data.dot_json, post_data.id, post_title);

			if (yy + this._heightThumbField < canvas.height) {
				thumb = new ShapePreview(this._widthThumbField, this._heightThumbField, this._dotsize);
				thumb.drawPad(pad, true);
				thumb.addMouseEvent();
				thumb.x = xx;
				thumb.y = yy;
				this._stage.addChild(thumb);

				thumb.addEventListener(ShapePreview.EVENT_CLICK_PREVIEW, this._onThumbClickHandler);
				this._thumbList.push(thumb);
			}
			xx += this._widthThumbField + this._marginThumbField;
			if (canvas.width < xx + this._widthThumbField) {
				//xx = this._marginThumbField;
				xx = 0;
				yy += this._heightThumbField + this._marginThumbField;
			}
		}
		this._stage.update();
	}
	private _pageChange = (paged: number = 1, posts_per_page: number = 28) => {
		this._wpc.getPageSplitList(paged, posts_per_page);
	}
	//=============================================
	// public
	//=============================================
	public override open = () => {
		this._reset();

		this._modal.show();
		this._pageChange(1, this._posts_per_page);
		//this.dispatchEvent(new createjs.Event(this.EVENT_LOAD_FROM_WP_LIST_LOAD, true, true));
	}
	public override close = () => {
		this._modal.hide();
	}
	public override getPixcelArtData = ():PixcelArtData => {
		return this._pad;
	}
	//=============================================
	// getter/setter
	//=============================================
	/*
	override get pad(): PixcelArtData {
		return this._pad;
	}
	*/
}