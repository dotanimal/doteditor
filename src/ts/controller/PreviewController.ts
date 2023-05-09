import { State } from "../model/State";
import { ShapePreview } from "../view/canvas/preview/ShapePreview";
import { PixcelArtData } from "../model/data/PixcelArtData";
import { StagePreview } from "../view/canvas/preview/StagePreview";

export class PreviewController extends createjs.EventDispatcher {
	//=============================================
	// TODO
	//=============================================
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	//----------private---------
	private _state:State;

	private _stage: createjs.Stage;

	private _preview: StagePreview;
	private _slider:HTMLInputElement;

	private _pad:PixcelArtData;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state:State) {
		super();
		this._state = state;

		this._slider = <HTMLInputElement>document.querySelector('#previewRange');
		
		this._preview = new StagePreview("previewCanvas", parseInt(this._slider.value));

		this._slider.addEventListener('input', this._onSliderChangeHandler);
		//this._slider.addEventListener('change', this._onSliderChangeHandler);
	}
	//=============================================
	// event handler
	//=============================================
	private _onSliderChangeHandler = (e:Event) => {
		let dotSize:number = parseInt(this._slider.value);
		this._preview.dotSize = dotSize;
		
		this._preview.drawPad(this._pad, false);
	}
	//=============================================
	// private
	//=============================================
	//=============================================
	// public
	//=============================================
	public setPad = (pad:PixcelArtData):void =>{
		this._pad = pad;

		this._preview.drawPad(this._pad, false);
	}
	//=============================================
	// getter/setter
	//=============================================
}