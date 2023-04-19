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
	protected _c2ld:Canvas2DrawLayerData;
	//=============================================
	// constructor
	//=============================================
	constructor(state:State, name:string) {
		super(state);
		this.name = name;
		this._c2ld = new Canvas2DrawLayerData();
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
	public drawDot = (mx: number, my: number, hexColor:string) => {
		this.graphics.clear();
		let xx:number = this._adustX(mx);
		let yy:number = this._adustY(my);
		this.graphics.beginFill('#' + hexColor);
		this.graphics.drawRect(xx, yy, this._dotSize, this._dotSize);
		if(this._state.current== State.DRAW_PENCIL){
			//描画した順に上書き（追記）
			this.updateCache("source-over");
		}else if(this._state.current== State.DRAW_ERACER){
			//元からある図形に対して重なっていない部分のみ描画（消しゴム）
			this.updateCache("destination-out");
		}
	}
	public drawRect = (left:number, top:number, right:number, bottom:number, hexColor:string, isDelete: boolean = false) =>{
		this.graphics.clear();
		let al:number = this._adustX(left);
		let at:number = this._adustY(top);
		let ar:number = this._adustX(right);
		let ab:number = this._adustY(bottom);
		this.graphics.beginFill('#' + hexColor);
		this.graphics.drawRect(al, at, ar-al, ab-at);
		if(!isDelete){
			//塗り
			this.updateCache("source-over");
		}else{
			//削除
			this.updateCache("destination-out");
		}
	}
	public getDotHexColor = (mx: number, my: number) : string => {
		let dld :DrawLayerData = this.getRectDrawLayerData(mx, my, mx+this._dotSize, my+this._dotSize);
		let jsonObj:any = dld.getJsonObj();
		if(jsonObj.color){
			if(1<jsonObj.color.length){
				return jsonObj.color[1];
			}
		}
	}
	public getRectDrawLayerData = (targetAreaLeft:number, targetAreaTop:number, targetAreaRight:number, targetAreaBottom:number):DrawLayerData =>{
		let cc: HTMLCanvasElement = <HTMLCanvasElement>this.cacheCanvas;
		let ctx: CanvasRenderingContext2D = cc.getContext("2d");
		let left:number = targetAreaLeft - (targetAreaLeft-this._drawAreaLeft) % this._dotSize;
		let top:number = targetAreaTop - (targetAreaTop-this._drawAreaTop) % this._dotSize;
		let right:number =  targetAreaRight - (targetAreaRight-this._drawAreaRight) % this._dotSize;
		let bottom:number = targetAreaBottom - (targetAreaBottom-this._drawAreaBottom) % this._dotSize;
		
		this._c2ld.init(ctx, this._stageWidth, this._stageHeight, this._dotSize, false, false, left,top,right,bottom);
		let dld :DrawLayerData = this._c2ld.getDrawLayerData(1);
		this._c2ld.dispose(); 
		return dld;
	}
	/*
	public setHexColorCode = (value : string) => {
		this._hexColorCode =  value;
	}
	*/
	public setDrawLayerData = (dld:DrawLayerData) => {
		this.graphics.clear();
		let xCount :number = dld.width;
		let yCount :number = dld.height;
		let baseX :number = dld.x;
		let baseY :number = dld.y;
		let hexColorCodeList :Array<string>= dld.hexColorCodeList;
		let dataList :Array<number>= dld.dataList;
		for (var i = 0; i < dataList.length; i++) {
			let hexColorCode :string = '';
			let colorId :number = dataList[i];
			if (0 < colorId) {
				if (Number.isInteger(colorId) == true) {
					let xx = i % xCount + baseX;
					let yy = Math.floor(i / xCount) + baseY;
					hexColorCode = hexColorCodeList[colorId];
					this.graphics.beginFill('#' + hexColorCode);
					this.graphics.drawRect(xx * this._dotSize + this._drawAreaLeft, yy * this._dotSize + this._drawAreaTop, this._dotSize, this._dotSize);
				}
			}
		}
		this.updateCache("source-over");
	}
	public getDrawLayerData = (): DrawLayerData => {
		let cc: HTMLCanvasElement = <HTMLCanvasElement>this.cacheCanvas;
		let ctx: CanvasRenderingContext2D = cc.getContext("2d");
		this._c2ld.init(ctx, this._stageWidth, this._stageHeight, this._dotSize, false, true, this._drawAreaLeft, this._drawAreaTop, this._drawAreaRight, this._drawAreaBottom);
		let dld:DrawLayerData = this._c2ld.getDrawLayerData(1);
		this._c2ld.dispose(); 
		return dld;
	}
	//=============================================
	// getter/setter
	//=============================================
}