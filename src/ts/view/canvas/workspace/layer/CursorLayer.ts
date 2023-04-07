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
	public override setStageSize = (stageWidth:number, stageHeight:number, dotSize:number, areaTopY:number, areaRightX:number,areaBottomY:number, areaLeftX:number) => {
		this._superSetStageSize(stageWidth, stageHeight, dotSize, areaTopY, areaRightX, areaBottomY, areaLeftX);
		//console.log("[DrawLayer] change size");
	}
	public move = (mx: number, my: number) => {
		let color : string = "#000";
		let length : number = this._dotSize * 0.3;
		let offset : number = 1;

		let xx = Math.floor((mx - this._areaLeftX) / this._dotSize) * this._dotSize + this._areaLeftX;
		let yy = Math.floor((my - this._areaTopY) / this._dotSize) * this._dotSize + this._areaTopY;

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