import { Canvas2DrawLayerData } from "../../../../model/Canvas2DrawLayerData";
import { State } from "../../../../model/State";
import { DrawLayerData } from "../../../../model/data/DrawLayerData";
import { DrawLayer } from "./DrawLayer";

export class DragLayer extends DrawLayer {
	//=============================================
	// TODO
	//=============================================
	/*
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_DRAG_MOVE: string = "event drag move";
	//----------private---------
	private _stageMargin:number;
	private _dragPointX :number ;
	private _dragPointY :number ; 
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state:State, name:string) {
		super(state, name);

		this.addEventListener("mouseover", this._onMouseOverHandler);
		this.addEventListener("mouseout", this._onMouseOutHandler);
		this.addEventListener("mousedown", this._onDownHandler);
		this.addEventListener("pressmove", this._onMoveHandler);
		this.addEventListener("pressup", this._onUpHandler);
	}
	//=============================================
	// event handler
	//=============================================
	private _onMouseOverHandler = (e:MouseEvent) => {
		this.alpha = 0.75;
	}
	private _onMouseOutHandler = (e:MouseEvent) => {
		this.alpha = 1;
	}
	private _onDownHandler = (e:MouseEvent) => {
		this._dragPointX = this.stage.mouseX - this.x;
		this._dragPointY = this.stage.mouseY - this.y;
		this.alpha = 0.5;
	}
	private _onMoveHandler = (e:MouseEvent) => {
		let xx:number = this.stage.mouseX - this._dragPointX;
		let yy:number = this.stage.mouseY - this._dragPointY;
		this.x= this._adustX(xx) + this._drawAreaLeft - this._stageMargin;
		this.y= this._adustY(yy) + this._drawAreaTop - this._stageMargin;
		this.dispatchEvent(new createjs.Event(DragLayer.EVENT_DRAG_MOVE, true, true));
	}
	private _onUpHandler = (e:MouseEvent) => {
		this.alpha = 0.75;
	}
	//=============================================
	// private
	//=============================================
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
	public override getDrawLayerData = (): DrawLayerData => {
		let cc: HTMLCanvasElement = <HTMLCanvasElement>this.cacheCanvas;
		let ctx: CanvasRenderingContext2D = cc.getContext("2d");

		this._c2ld.init(ctx, this._stageWidth, this._stageHeight, this._dotSize, false, true, this._drawAreaLeft, this._drawAreaTop, this._drawAreaRight, this._drawAreaBottom);
		let dld:DrawLayerData = this._c2ld.getDrawLayerData(1);
		dld.x = dld.x + Math.floor((this.x - this._drawAreaLeft) / this._dotSize) + 0;
		dld.y = dld.y + Math.floor((this.y - this._drawAreaTop) / this._dotSize) + 0;
		this._c2ld.dispose();
		return dld;
	}
	//=============================================
	// getter/setter
	//=============================================
}