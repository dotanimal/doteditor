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
	constructor() {
		super();
	}
	//=============================================
	// event handler
	//=============================================
	//=============================================
	// private
	//=============================================
	private _drawGraphics = () => {
		this.graphics.clear();
		let offset : number = 1;
		let color: string;

		for (var yy = 0; yy <= this._stageHeight; yy += this._dotSize / 2) {
			for (var xx = 0; xx <= this._stageWidth; xx += this._dotSize / 2) {
				if (yy % this._dotSize == xx % this._dotSize) {
					color = "#FFFFFF";
				} else {
					color = "#EEEEEE";
				}
				this.graphics.beginFill(color);
				this.graphics.drawRect(xx + offset, yy + offset, this._dotSize / 2, this._dotSize / 2);
			}
		}
		//5本ごとに色を濃くする
		//重なりの兼ね合いがあるので、薄い色の描画　⇒　濃い色の描画にしてる
		color = "#dddddd";
		for (var xx = 0; xx <= this._stageWidth; xx += this._dotSize) {
			if (xx % (this._dotSize * 5) != 0) {
				this.graphics.beginStroke(color);
				this.graphics.setStrokeStyle(1);
				this.graphics.moveTo(xx + 0.5 + offset, 0 + offset);
				this.graphics.lineTo(xx + 0.5 + offset, this._stageHeight - offset);
				this.graphics.endStroke();
			}
		}
		for (var yy = 0; yy <= this._stageHeight; yy += this._dotSize) {
			if (yy % (this._dotSize * 5) != 0) {
				this.graphics.beginStroke(color);
				this.graphics.setStrokeStyle(1);
				this.graphics.moveTo(0 + offset, yy + 0.5 + offset);
				this.graphics.lineTo(this._stageWidth - offset, yy + 0.5 + offset);
				this.graphics.endStroke();
			}
		}

		color = "#bbbbbb";
		for (var xx = 0; xx <= this._stageWidth; xx += this._dotSize) {
			if (xx % (this._dotSize * 5) == 0) {
				this.graphics.beginStroke(color);
				this.graphics.setStrokeStyle(1);
				this.graphics.moveTo(xx + 0.5 + offset, 0 + offset);
				this.graphics.lineTo(xx + 0.5 + offset, this._stageHeight - offset);
				this.graphics.endStroke();
			}
		}
		for (var yy = 0; yy <= this._stageHeight; yy += this._dotSize) {
			if (yy % (this._dotSize * 5) == 0) {
				this.graphics.beginStroke(color);
				this.graphics.setStrokeStyle(1);
				this.graphics.moveTo(0 + offset, yy + 0.5 + offset);
				this.graphics.lineTo(this._stageWidth - offset, yy + 0.5 + offset);
				this.graphics.endStroke();
			}
		}

		//描画した順に上書き（追記）
		this.updateCache("source-over");
	}
	//=============================================
	// public
	//=============================================
	private _superChangeSize:Function = <Function>this.changeSize;
	public override changeSize = (stageWidth:number, stageHeight:number, dotSize:number) => {
		this._superChangeSize(stageWidth, stageHeight, dotSize);
		//console.log("[BgLayer] change size");

		this._drawGraphics();
	}
	//=============================================
	// getter/setter
	//=============================================
}