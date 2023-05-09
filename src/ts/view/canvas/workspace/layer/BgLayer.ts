import { State } from "../../../../model/State";
import { Layer } from "./Layer";

export class BgLayer extends Layer {
	//=============================================
	// TODO
	//=============================================
	/*
		１pxよりも細い線が引けないので、やるとしたら画像を読み込んで表示するしかないみたい
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	//----------private---------
	private _isActive:boolean;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state:State) {
		super(state);
		this._isActive = false;
	}
	//=============================================
	// event handler
	//=============================================
	//=============================================
	// private
	//=============================================
	private _drawLine = () => {
		let color: string;
		let count:number;
		//格子柄
		for (var yy = this._drawAreaTop; yy < this._drawAreaBottom; yy += this._dotSize / 2) {
			for (var xx = this._drawAreaLeft; xx < this._drawAreaRight; xx += this._dotSize / 2) {
				if (yy % this._dotSize == xx % this._dotSize) {
					color = "#FFFFFF";
				} else {
					color = "#EEEEEE";
				}
				this.graphics.beginFill(color);
				this.graphics.drawRect(xx, yy, this._dotSize / 2, this._dotSize / 2);
			}
		}
		//5本ごとに色を濃くする
		//重なりの兼ね合いがあるので、薄い色の描画　⇒　濃い色の描画にしてる
		
		//薄い線
		color = "#dddddd";
		count = 0;
		for (var xx = this._drawAreaLeft; xx <= this._drawAreaRight; xx += this._dotSize) {
			if(count % 5 != 0){
			//if (xx % (this._dotSize * 5) != 0) {
				this.graphics.beginStroke(color);
				this.graphics.setStrokeStyle(1);
				this.graphics.moveTo(xx + 0.5, this._drawAreaTop);
				this.graphics.lineTo(xx + 0.5, this._drawAreaBottom);
				this.graphics.endStroke();
			}
			count++;
		}
		count = 0;
		for (var yy = this._drawAreaTop; yy <= this._drawAreaBottom; yy += this._dotSize) {
			if(count % 5 != 0){
			//if (yy % (this._dotSize * 5) != 0) {
				this.graphics.beginStroke(color);
				this.graphics.setStrokeStyle(1);
				this.graphics.moveTo(this._drawAreaLeft, yy + 0.5);
				this.graphics.lineTo(this._drawAreaRight, yy + 0.5);
				this.graphics.endStroke();
			}
			count++;
		}
		//濃い線
		color = "#bbbbbb";
		count = 0;
		for (var xx = this._drawAreaLeft; xx <= this._drawAreaRight; xx += this._dotSize) {
			if(count % 5 == 0){
			//if (xx % (this._dotSize * 5) == 0) {
				this.graphics.beginStroke(color);
				this.graphics.setStrokeStyle(1);
				this.graphics.moveTo(xx + 0.5, this._drawAreaTop);
				this.graphics.lineTo(xx + 0.5, this._drawAreaBottom);
				this.graphics.endStroke();
			}
			count++;
		}
		count = 0;
		for (var yy = this._drawAreaTop; yy <= this._drawAreaBottom; yy += this._dotSize) {
			if(count % 5 == 0){
			//if (yy % (this._dotSize * 5) == 0) {
				this.graphics.beginStroke(color);
				this.graphics.setStrokeStyle(1);
				this.graphics.moveTo(this._drawAreaLeft, yy + 0.5);
				this.graphics.lineTo(this._drawAreaRight, yy + 0.5);
				this.graphics.endStroke();
			}
			count++;
		}

		//描画した順に上書き（追記）
		//this.updateCache("source-over");
	}
	//=============================================
	// public
	//=============================================
	public override setStageSize = (stageWidth:number, stageHeight:number, dotSize:number, drawAreaLeft:number, drawAreaTop:number, drawAreaRight:number, drawAreaBottom:number) => {
		this._superSetStageSize(stageWidth, stageHeight, dotSize, drawAreaLeft, drawAreaTop, drawAreaRight, drawAreaBottom);
		//console.log("[BgLayer] change size");

		this.graphics.clear();
		if(this._isActive){
			this.graphics.beginFill("#ccc");
			this.graphics.drawRect(0, 0, this._stageWidth, this._stageHeight);
		}
		this._drawLine();
		this.updateCache();
	}
	public active = ():void =>{
		if(!this._isActive){
			this.graphics.clear();
			this.graphics.beginFill("#ccc");
			this.graphics.drawRect(0, 0, this._stageWidth, this._stageHeight);
			this._drawLine();
			this.updateCache();

			this._isActive = true;
		}
	}
	public inactive = ():void =>{
		if(this._isActive){
			this.graphics.clear();
			//this.graphics.beginFill("#ccc");
			this.graphics.drawRect(0, 0, this._stageWidth, this._stageHeight);
			this._drawLine();
			this.updateCache();

			this._isActive = false;
		}
	}
	//=============================================
	// getter/setter
	//=============================================
}