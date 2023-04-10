import { State } from "../../../../model/State";

export class Layer extends createjs.Shape {
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
	//----------protected---------
	protected _state: State;
	protected _stageWidth: number;
	protected _stageHeight: number;
	protected _dotSize: number;
	protected _drawAreaTop : number;
	protected _drawAreaRight : number;
	protected _drawAreaBottom : number;
	protected _drawAreaLeft : number;
	//=============================================
	// constructor
	//=============================================
	constructor(state:State) {
		super();
		this._state = state;
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
	public setStageSize = (stageWidth:number, stageHeight:number, dotSize:number, drawAreaLeft:number, drawAreaTop:number, drawAreaRight:number, drawAreaBottom:number) =>{
	}
	//=============================================
	// protected
	//=============================================
	protected _superSetStageSize = (stageWidth:number, stageHeight:number, dotSize:number, drawAreaLeft:number, drawAreaTop:number, drawAreaRight:number, drawAreaBottom:number) => {
		this._stageWidth = stageWidth;
		this._stageHeight = stageHeight;
		this._dotSize = dotSize;
		this._drawAreaLeft = drawAreaLeft;
		this._drawAreaTop = drawAreaTop;
		this._drawAreaRight = drawAreaRight;
		this._drawAreaBottom = drawAreaBottom;
		
		this.cache(0, 0, this._stageWidth, this._stageHeight);
	}
	//=============================================
	// getter/setter
	//=============================================
}