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
	private _superChangeSize:Function = <Function>this.changeSize;
	public override changeSize = (stageWidth:number, stageHeight:number, dotSize:number) => {
		this._superChangeSize(stageWidth, stageHeight, dotSize);
		//console.log("[DrawLayer] change size");
	}
	public move = (mx: number, my: number) => {
		let color : string = "#000";
		let length : number = this._dotSize * 0.3;
		let offset : number = 1;

		let xx = Math.floor(mx / this._dotSize) * this._dotSize;
		let yy = Math.floor(my / this._dotSize) * this._dotSize;


		this.graphics.clear();

		this.graphics.beginStroke(color);
		this.graphics.setStrokeStyle(2);
		//左上
		this.graphics.moveTo(xx,							yy + length);
		this.graphics.lineTo(xx,							yy);
		this.graphics.lineTo(xx + length,					yy);
		//右上
		this.graphics.moveTo(xx + offset*2 + this._dotSize - length,	yy);
		this.graphics.lineTo(xx + offset*2 + this._dotSize , 			yy);
		this.graphics.lineTo(xx + offset*2 + this._dotSize , 			yy + length);
		//左下
		this.graphics.moveTo(xx,							yy + offset*2 + this._dotSize - length);
		this.graphics.lineTo(xx,							yy + offset*2 + this._dotSize);
		this.graphics.lineTo(xx + length,					yy + offset*2 + this._dotSize);
		//右下
		this.graphics.moveTo(xx + offset*2 + this._dotSize,			yy + offset*2 + this._dotSize - length);
		this.graphics.lineTo(xx + offset*2 + this._dotSize,			yy + offset*2 + this._dotSize);
		this.graphics.lineTo(xx + offset*2 + this._dotSize - length,	yy + offset*2 + this._dotSize);

		this.graphics.endStroke();

		this.updateCache();
	}
	//=============================================
	// getter/setter
	//=============================================
}