import * as bootstrap from "bootstrap";
import { WPConector } from "../../model/connector/WPConnector";
import { PixcelArtData } from "../../model/data/PixcelArtData";
import { StagePreview } from "../../view/canvas/preview/StagePreview";
import { State } from "../../model/State";
import { SaveToWPController } from "./SaveToWPController";

export class PcModalSaveToWPController extends SaveToWPController {
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
	private _modal: bootstrap.Modal;

	private _pad: PixcelArtData;

	//private _mode: string;
	private _modalTitle: HTMLElement;

	private _inputView: HTMLElement;
	private _inputTitle: HTMLInputElement;
	//private _inputPreviewCanvas: HTMLCanvasElement;
	//private _inputPreviewStage: createjs.Stage;
	private _inputPostBtn: HTMLButtonElement;
	private _inputPreview: StagePreview;

	private _loadingView: HTMLElement;

	private _completeView: HTMLElement;
	private _completeMessage: HTMLElement;
	private _completeCloseBtn: HTMLButtonElement;

	//private _postBtn: HTMLButtonElement;
	private _titleTxtInput: HTMLInputElement;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state:State) {
		super(state);

		this._modal = new bootstrap.Modal(document.getElementById('saveToWpModal'), { keyboard: true });

		this._modalTitle = <HTMLElement>document.querySelector('#saveToWpModal .modal-title');

		this._inputView = <HTMLElement>document.querySelector('#saveToWpModal .inputView');
		this._inputTitle = <HTMLInputElement>document.querySelector('#saveToWpModal .inputView .topArea input');
		
		let cvs : HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('#saveToWpModal .inputView .middleArea canvas');
		this._inputPreview = new StagePreview(cvs, 5);

		this._inputPostBtn = <HTMLButtonElement>document.querySelector('#saveToWpModal .inputView .bottomArea button');

		this._loadingView = <HTMLElement>document.querySelector('#saveToWpModal .loadingView');

		this._completeView = <HTMLElement>document.querySelector('#saveToWpModal .completeView');
		this._completeMessage = <HTMLElement>document.querySelector('#saveToWpModal .completeView .completeMessage');
		this._completeCloseBtn = <HTMLButtonElement>document.querySelector('#saveToWpModal .completeView .bottomArea button');

		this._titleTxtInput = <HTMLInputElement>document.querySelector('#saveToWpModal .inputView .topArea input');
		//this._postBtn = <HTMLButtonElement>document.querySelector('#saveToWpModal .inputView .topArea button');

		this._inputPostBtn.addEventListener("click", this._onPostBtnClickHandler);
		this._completeCloseBtn.addEventListener("click", this._onCloseBtnClickHandler);
		this._wpc.addEventListener(WPConector.EVENT_COMPLETE_WPCONNECT, this._onPostCompleteHandler);
		//this._wpc.addEventListener(this._wpc.EVENT_UPDATE_COMPLETE, this._onPostCompleteHandler);
	}
	//=============================================
	// event handler
	//=============================================
	private _onPostBtnClickHandler = (e: MouseEvent) => {
		this._inputView.classList.add("display-none");
		this._loadingView.classList.remove("display-none");
		this._completeView.classList.add("display-none");

		this._pad.title = this._titleTxtInput.value;

		if (this._state.current == State.FILE_POST_TO_WP) {
			this._wpc.post(this._pad);
		} else if (this._state.current == State.FILE_UPDATE_TO_WP) {
			this._wpc.update(this._pad);
		}
	}
	private _onPostCompleteHandler = (e: Event) => {
		this._inputView.classList.add("display-none");
		this._loadingView.classList.add("display-none");
		this._completeView.classList.remove("display-none");

		if (this._state.current == State.FILE_POST_TO_WP) {
			if(this._wpc.isSuccess){
				this._completeMessage.innerText = "Wordpressへの新規保存が完了しました";
			}else{
				this._completeMessage.innerText = "Wordpressへの新規保存が失敗しました";
			}
		} else if (this._state.current == State.FILE_UPDATE_TO_WP) {
			if(this._wpc.isSuccess){
				this._completeMessage.innerText = "Wordpressへの上書き保存が完了しました";
			}else{
				this._completeMessage.innerText = "Wordpressへの上書き保存が失敗しました";
			}
		}

		this.dispatchEvent(new createjs.Event(SaveToWPController.EVENT_SAVE_COMPLETE_TO_WP, true, true));
	}
	private _onCloseBtnClickHandler = (e: MouseEvent) => {
		this.close();
	}
	//=============================================
	// private
	//=============================================
	private _reset = () => {
		this._inputView.classList.remove("display-none");
		this._loadingView.classList.add("display-none");
		this._completeView.classList.add("display-none");

		this._titleTxtInput.value = "";
		//this._inputPreviewStage.removeAllChildren();
		//this._inputPreview = null;
	}
	//=============================================
	// public
	//=============================================
	public override open = (pad: PixcelArtData):void => {
		this._reset();

		this._pad = pad;

		if (this._state.current == State.FILE_POST_TO_WP) {
			this._modalTitle.innerText = "新規保存";
		} else if (this._state.current == State.FILE_UPDATE_TO_WP) {
			this._modalTitle.innerText = "上書き保存";
		}

		this._titleTxtInput.value = pad.title;

		
		this._inputPreview.drawPad(pad, false);

		//this._inputPreviewStage.addChild(this._inputPreview);
		//this._inputPreviewStage.update();

		this._modal.show();
	}
	public override close = ():void => {
		this._modal.hide();
	}
	public override getPixcelArtData = (): PixcelArtData => {
		return this._pad;
	}
	//=============================================
	// getter/setter
	//=============================================
}