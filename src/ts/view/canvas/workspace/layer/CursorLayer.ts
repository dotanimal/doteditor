import { State } from "../../../../model/State";
import { Layer } from "./Layer";

export class CursorLayer extends Layer {
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
	constructor(state:State) {
		super(state);
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
	public override setStageSize = (stageWidth:number, stageHeight:number, dotSize:number, drawAreaLeft:number, drawAreaTop:number, drawAreaRight:number, drawAreaBottom:number) => {
		this._superSetStageSize(stageWidth, stageHeight, dotSize, drawAreaLeft, drawAreaTop, drawAreaRight, drawAreaBottom);
		//console.log("[DrawLayer] change size");
	}
	public move = (mx: number, my: number) => {
		let color : string = "#000";
		let length : number = this._dotSize * 0.3;
		let offset : number = 1;

		let xx = Math.floor((mx - this._drawAreaLeft) / this._dotSize) * this._dotSize + this._drawAreaLeft;
		let yy = Math.floor((my - this._drawAreaTop) / this._dotSize) * this._dotSize + this._drawAreaTop;

		this.graphics.clear();

		this.graphics.beginStroke(color);
		this.graphics.setStrokeStyle(2);
		//左上
		this.graphics.moveTo(xx,							yy + length);
		this.graphics.lineTo(xx,							yy);
		this.graphics.lineTo(xx + length,					yy);
		//右上
		this.graphics.moveTo(xx + offset + this._dotSize - length,	yy);
		this.graphics.lineTo(xx + offset + this._dotSize , 			yy);
		this.graphics.lineTo(xx + offset + this._dotSize , 			yy + length);
		//左下
		this.graphics.moveTo(xx,							yy + offset + this._dotSize - length);
		this.graphics.lineTo(xx,							yy + offset + this._dotSize);
		this.graphics.lineTo(xx + length,					yy + offset + this._dotSize);
		//右下
		this.graphics.moveTo(xx + offset + this._dotSize,			yy + offset + this._dotSize - length);
		this.graphics.lineTo(xx + offset + this._dotSize,			yy + offset + this._dotSize);
		this.graphics.lineTo(xx + offset + this._dotSize - length,	yy + offset + this._dotSize);

		this.graphics.endStroke();

		this.updateCache();
	}
	//=============================================
	// getter/setter
	//=============================================
}