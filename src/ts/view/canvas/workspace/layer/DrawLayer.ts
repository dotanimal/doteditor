import { Canvas2DrawLayerData } from "../../../../model/Canvas2DrawLayerData";
import { DrawLayerData } from "../../../../model/data/DrawLayerData";
import { Layer } from "./Layer";

export class DrawLayer extends Layer {
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
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor() {
		super();
	}
	//=============================================
	// event handler
	//=============================================
	//=============================================
	// private
	//=============================================
	//=============================================
	// public
	//=============================================
	public override changeSize = (stageWidth:number, stageHeight:number, dotSize:number, areaTopY:number, areaRightX:number,areaBottomY:number, areaLeftX:number) => {
		this._superChangeSize(stageWidth, stageHeight, dotSize, areaTopY, areaRightX, areaBottomY, areaLeftX);
		//console.log("[DrawLayer] change size");
	}
	public pencil = (mx: number, my: number, color: string) => {
		this.graphics.clear();
		let xx = Math.floor((mx - this._areaLeftX) / this._dotSize) * this._dotSize + this._areaLeftX;
		let yy = Math.floor((my - this._areaTopY) / this._dotSize) * this._dotSize + this._areaTopY;
		this.graphics.beginFill(color);
		this.graphics.drawRect(xx, yy, this._dotSize, this._dotSize);
		//描画した順に上書き（追記）
		this.updateCache("source-over");
	}
	public eraser = (mx: number, my: number) => {
		this.graphics.clear();
		let xx = Math.floor((mx - this._areaLeftX) / this._dotSize) * this._dotSize + this._areaLeftX;
		let yy = Math.floor((my - this._areaTopY) / this._dotSize) * this._dotSize + this._areaTopY;
		this.graphics.beginFill('#' + "000000");
		this.graphics.drawRect(xx, yy, this._dotSize, this._dotSize);
		//元からある図形に対して重なっていない部分のみ描画（消しゴム）
		this.updateCache("destination-out");
	}
	public getDrawLayerData = (): DrawLayerData => {
		var cc: HTMLCanvasElement = <HTMLCanvasElement>this.cacheCanvas;
		var ctx: CanvasRenderingContext2D = cc.getContext("2d");

		let c2ld: Canvas2DrawLayerData = new Canvas2DrawLayerData(ctx, this._stageWidth, this._stageHeight, this._dotSize, false, true);
		return c2ld.getLayerData(1);
	}
	//=============================================
	// getter/setter
	//=============================================
}