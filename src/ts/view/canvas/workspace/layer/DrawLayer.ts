import { Canvas2DrawLayerData } from "../../../../model/Canvas2DrawLayerData";
import { State } from "../../../../model/State";
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
	private _dotsize: number;
	private _hexColorCode : string;

	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state:State, name:string) {
		super(state);
		this.name = name;
	}
	//=============================================
	// event handler
	//=============================================
	//=============================================
	// private
	//=============================================
	private _pencil = (mx: number, my: number, color: string) => {
		this.graphics.clear();
		let xx = Math.floor((mx - this._areaLeftX) / this._dotSize) * this._dotSize + this._areaLeftX;
		let yy = Math.floor((my - this._areaTopY) / this._dotSize) * this._dotSize + this._areaTopY;
		this.graphics.beginFill(color);
		this.graphics.drawRect(xx, yy, this._dotSize, this._dotSize);
		//描画した順に上書き（追記）
		this.updateCache("source-over");
	}
	private _eraser = (mx: number, my: number) => {
		this.graphics.clear();
		let xx :number = Math.floor((mx - this._areaLeftX) / this._dotSize) * this._dotSize + this._areaLeftX;
		let yy :number = Math.floor((my - this._areaTopY) / this._dotSize) * this._dotSize + this._areaTopY;
		this.graphics.beginFill('#' + "000000");
		this.graphics.drawRect(xx, yy, this._dotSize, this._dotSize);
		//元からある図形に対して重なっていない部分のみ描画（消しゴム）
		this.updateCache("destination-out");
	}
	//=============================================
	// public
	//=============================================
	public override setStageSize = (stageWidth:number, stageHeight:number, dotSize:number, areaTopY:number, areaRightX:number, areaBottomY:number, areaLeftX:number) => {
		this._superSetStageSize(stageWidth, stageHeight, dotSize, areaTopY, areaRightX, areaBottomY, areaLeftX);
		//console.log("[DrawLayer] change size");
	}
	public drawDot = (mx: number, my: number) => {
		if(this._state.current == State.DRAW_PENCIL){
			this._pencil(mx, my, this._state.hexColorCode);
		}else if(this._state.current == State.DRAW_ERACER){
			this._eraser(mx, my);
		}
	}
	public setHexColorCode = (value : string) => {
		this._hexColorCode =  value;
	}
	public setDrawLayerData = (dld:DrawLayerData) => {
		let xCount :number = dld.width;
		let yCount :number = dld.height;
		let baseX :number = dld.x;
		let baseY :number = dld.y;
		let hexColorCodeList :Array<string>= dld.hexColorCodeList;
		let dataList :Array<number>= dld.dataList;

		this.graphics.clear();
		for (var i = 0; i < dataList.length; i++) {
			let hexColorCode :string = '';
			let colorId :number = dataList[i];
			if (0 < colorId) {
				if (Number.isInteger(colorId) == true) {
					let xx = i % xCount + baseX;
					let yy = Math.floor(i / xCount) + baseY;
					hexColorCode = hexColorCodeList[colorId];
					this.graphics.beginFill('#' + hexColorCode);
					this.graphics.drawRect(xx * this._dotSize + this._areaLeftX, yy * this._dotSize + this._areaTopY, this._dotSize, this._dotSize);
				}
			}
		}
		this.updateCache("source-over");
	}
	public getDrawLayerData = (): DrawLayerData => {
		var cc: HTMLCanvasElement = <HTMLCanvasElement>this.cacheCanvas;
		var ctx: CanvasRenderingContext2D = cc.getContext("2d");

		let c2ld: Canvas2DrawLayerData = new Canvas2DrawLayerData(ctx, this._stageWidth, this._stageHeight, this._dotSize, false, true, this._areaTopY, this._areaRightX, this._areaBottomY, this._areaLeftX);
		return c2ld.getLayerData(1);
	}
	//=============================================
	// getter/setter
	//=============================================
}