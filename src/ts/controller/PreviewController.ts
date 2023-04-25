import { State } from "../model/State";
import { Preview } from "../view/canvas/Preview";
import { PixcelArtData } from "../model/data/PixcelArtData";

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

	private _preview: Preview;
	private _slider:HTMLInputElement;

	private _pad:PixcelArtData;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state:State) {
		super();
		this._state = state;

		let cvs:HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('#previewCanvas');

		this._slider = <HTMLInputElement>document.querySelector('#previewRange');
		
		this._preview = new Preview(cvs.width, cvs.height, parseInt(this._slider.value));
		this._stage = new createjs.Stage(cvs);
		this._stage.addChild(this._preview);

		this._slider.addEventListener('input', this._onSliderChangeHandler);
		
		//this._slider.addEventListener('change', this._onSliderChangeHandler);
	}
	//=============================================
	// event handler
	//=============================================
	private _onSliderChangeHandler = (e:Event) => {
		let dotSize:number = parseInt(this._slider.value);
		this._preview.dotSize = dotSize;
		
		this._drawPreview();
	}
	//=============================================
	// private
	//=============================================
	private _drawPreview = () :void =>{
		this._preview.graphics.clear();
		this._preview.drawPad(this._pad, false);
		this._stage.update();
	}
	//=============================================
	// public
	//=============================================
	public setPad = (pad:PixcelArtData):void =>{
		this._pad = pad;

		this._drawPreview();
	}
	//=============================================
	// getter/setter
	//=============================================
}