import { Canvas2DrawLayerData } from "../../../../model/Canvas2DrawLayerData";
import { State } from "../../../../model/State";
import { DrawLayerData } from "../../../../model/data/DrawLayerData";
import { DrawLayer } from "./DrawLayer";

export class TemporaryLayer extends DrawLayer {
	//=============================================
	// TODO
	//=============================================
	/*
		Canvasの描画領域の大きさが変わると、getDrawLayerDataの戻り値の座標計算がずれる…
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_MOVE_TEMP: string = "event move temporary layer";
	//----------private---------
	private _stageMargin:number;
	private _width:number;
	private _height:number;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state:State, name:string) {
		super(state, name);
	}
	//=============================================
	// event handler
	//=============================================
	//=============================================
	// private
	//=============================================
	private _superSetDrawLayerData : Function = this.setDrawLayerData;
	//=============================================
	// public
	//=============================================
	public init = () =>{
		this.x = 0;
		this.y = 0;
		this.visible = false;
		this.graphics.clear();
		this.updateCache();
	}
	public setStageMargin = (value:number) =>{
		this._stageMargin = value;
	}
	public override setDrawLayerData = (dld:DrawLayerData) => {
		this._superSetDrawLayerData(dld);
		this._width = dld.width * this._dotSize;
		this._height = dld.height * this._dotSize;
	}
	public override getDrawLayerData = (): DrawLayerData => {
		let cc: HTMLCanvasElement = <HTMLCanvasElement>this.cacheCanvas;
		let ctx: CanvasRenderingContext2D = cc.getContext("2d");

		/*
		console.log(
			this._stageWidth, 
			this._stageHeight,
			this._dotSize,
			this._drawAreaLeft,
			this._drawAreaTop,
			this._drawAreaRight,
			this._drawAreaBottom
		);
		*/
		this._c2ld.init(
			ctx,
			this._stageWidth,
			this._stageHeight,
			this._dotSize,
			false,
			true,
			this._drawAreaLeft,
			this._drawAreaTop,
			this._drawAreaRight,
			this._drawAreaBottom
		);
		let dld:DrawLayerData = this._c2ld.getDrawLayerData(1);
		dld.x = dld.x + Math.floor((this.x - this._drawAreaLeft + this._stageMargin) / this._dotSize) + 0;
		dld.y = dld.y + Math.floor((this.y - this._drawAreaTop + this._stageMargin) / this._dotSize) + 0;
		this._c2ld.dispose();
		return dld;
	}
	public move = (mouseX:number, mouseY:number):void =>{
		if(this._state.current == State.SELECT_COPY || this._state.current == State.SELECT_CUT){
			this.alpha = 0.5;
			let xx:number = mouseX - this._width/2;
			let yy:number = mouseY - this._height/2;
			this.x= this._adustX(xx) + this._drawAreaLeft - this._stageMargin;
			this.y= this._adustY(yy) + this._drawAreaTop - this._stageMargin;
			this.dispatchEvent(new createjs.Event(TemporaryLayer.EVENT_MOVE_TEMP, true, true));
		}
	}
	//=============================================
	// getter/setter
	//=============================================
	get drawAreaLeft():number{
		return this._drawAreaLeft;
	}
	get drawAreaTop():number{
		return this._drawAreaTop;
	}
}