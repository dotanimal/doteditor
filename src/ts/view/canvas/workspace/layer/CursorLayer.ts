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
	private readonly _LINE_HEX_COLOR:string = "#333";
	
	private _selectBeginX:number;
	private _selectBeginY:number;
	private _selectEndX:number;
	private _selectEndY:number;

	private _isLockSelect:boolean;
	private _isShowSelectArea:boolean;

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
		this._isLockSelect = false;
	}
	public move = (mx: number, my: number) => {
		
		this.graphics.clear();

		//以下の条件以外のときは処理を中断する
		if(
				this._state.currentCategory == State.CATEGORY_DRAW
				|| 
				this._state.currentCategory == State.CATEGORY_EDIT
				||
				this._state.current == State.SELECT_RANGE
			){
		}else{
			return false;
		}

		//カーソル
		let length : number = this._dotSize * 0.3;
		let offset : number = 1;

		let xx = this._adustX(mx);
		let yy = this._adustY(my);

		this.graphics.beginStroke(this._LINE_HEX_COLOR);
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