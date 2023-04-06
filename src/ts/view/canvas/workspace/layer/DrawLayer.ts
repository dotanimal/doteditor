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
	private _xCount: number; //DisplayObjectのWidth・Heightがとれないので、書き換えたら都度、値を更新しておかないといけない
	private _yCount: number;
	private _colorList: Array<string>;
	private _dataList: Array<number>;

	private _dotsize: number;

	private _baseX: number;
	private _baseY: number;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(name:string) {
		super();
		this.name = name;
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
		let xx :number = Math.floor((mx - this._areaLeftX) / this._dotSize) * this._dotSize + this._areaLeftX;
		let yy :number = Math.floor((my - this._areaTopY) / this._dotSize) * this._dotSize + this._areaTopY;
		this.graphics.beginFill('#' + "000000");
		this.graphics.drawRect(xx, yy, this._dotSize, this._dotSize);
		//元からある図形に対して重なっていない部分のみ描画（消しゴム）
		this.updateCache("destination-out");
	}
	public setDrawLayerData = (dld:DrawLayerData) => {
		this._xCount = dld.width;
		this._yCount = dld.height;
		this._baseX = dld.x;
		this._baseY = dld.y;
		this._colorList = dld.colorList;
		this._dataList = dld.dataList;
	}

	//TODO　メソッド名を変更　毎回処理するメソッドの様に見える
	public drawGraphics = () => {
		this.graphics.clear();
		for (var i = 0; i < this._dataList.length; i++) {
			let colorCode = '';
			let colorId = this._dataList[i];
			if (0 < colorId) {
				if (Number.isInteger(colorId) == true) {
					let xx = i % this._xCount + this._baseX;
					let yy = Math.floor(i / this._xCount) + this._baseY;
					colorCode = this._colorList[colorId];
					this.graphics.beginFill('#' + colorCode);
					this.graphics.drawRect(xx * this._dotSize, yy * this._dotSize, this._dotSize, this._dotSize);
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
	//TODO　メソッド名を変更　毎回処理するメソッドの様に見える
	/*
	public drawGraphics = (dotSize: number) => {
		this._dotSize = dotSize;
		this.graphics.clear();
		for (var i = 0; i < this._dataList.length; i++) {
			let colorCode = '';
			let colorId = this._dataList[i];
			if (0 < colorId) {
				if (Number.isInteger(colorId) == true) {
					let xx = i % this._xCount + this._baseX;
					let yy = Math.floor(i / this._xCount) + this._baseY;
					colorCode = this._colorList[colorId];
					this.graphics.beginFill('#' + colorCode);
					this.graphics.drawRect(xx * dotSize, yy * dotSize, dotSize, dotSize);
				}
			}
		}
		this.updateCache("source-over");
	}
	*/
	//=============================================
	// getter/setter
	//=============================================
}