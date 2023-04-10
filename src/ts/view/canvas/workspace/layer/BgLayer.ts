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
	private _drawGraphics = () => {
		this.graphics.clear();
		let color: string;

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
		for (var xx = this._drawAreaLeft; xx <= this._drawAreaRight; xx += this._dotSize) {
			if (xx % (this._dotSize * 5) != 0) {
				this.graphics.beginStroke(color);
				this.graphics.setStrokeStyle(1);
				this.graphics.moveTo(xx + 0.5, this._drawAreaTop);
				this.graphics.lineTo(xx + 0.5, this._drawAreaBottom);
				this.graphics.endStroke();
			}
		}
		for (var yy = this._drawAreaTop; yy <= this._drawAreaBottom; yy += this._dotSize) {
			if (yy % (this._dotSize * 5) != 0) {
				this.graphics.beginStroke(color);
				this.graphics.setStrokeStyle(1);
				this.graphics.moveTo(this._drawAreaLeft, yy + 0.5);
				this.graphics.lineTo(this._drawAreaRight, yy + 0.5);
				this.graphics.endStroke();
			}
		}
		//濃い線
		color = "#bbbbbb";
		for (var xx = this._drawAreaLeft; xx <= this._drawAreaRight; xx += this._dotSize) {
			if (xx % (this._dotSize * 5) == 0) {
				this.graphics.beginStroke(color);
				this.graphics.setStrokeStyle(1);
				this.graphics.moveTo(xx + 0.5, this._drawAreaTop);
				this.graphics.lineTo(xx + 0.5, this._drawAreaBottom);
				this.graphics.endStroke();
			}
		}
		for (var yy = this._drawAreaTop; yy <= this._drawAreaBottom; yy += this._dotSize) {
			if (yy % (this._dotSize * 5) == 0) {
				this.graphics.beginStroke(color);
				this.graphics.setStrokeStyle(1);
				this.graphics.moveTo(this._drawAreaLeft, yy + 0.5);
				this.graphics.lineTo(this._drawAreaRight, yy + 0.5);
				this.graphics.endStroke();
			}
		}

		//描画した順に上書き（追記）
		this.updateCache("source-over");
	}
	//=============================================
	// public
	//=============================================
	public override setStageSize = (stageWidth:number, stageHeight:number, dotSize:number, drawAreaLeft:number, drawAreaTop:number, drawAreaRight:number, drawAreaBottom:number) => {
		this._superSetStageSize(stageWidth, stageHeight, dotSize, drawAreaLeft, drawAreaTop, drawAreaRight, drawAreaBottom);
		//console.log("[BgLayer] change size");

		this._drawGraphics();
	}
	//=============================================
	// getter/setter
	//=============================================
}