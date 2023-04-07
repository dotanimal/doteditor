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
	protected _stageWidth: number;
	protected _stageHeight: number;
	protected _dotSize: number;
	protected _areaTopY : number;
	protected _areaRightX : number;
	protected _areaBottomY : number;
	protected _areaLeftX : number;
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
	public setStageSize = (stageWidth:number, stageHeight:number, dotSize:number, areaTopY:number, areaRightX:number,areaBottomY:number, areaLeftX:number) =>{
	}
	//=============================================
	// protected
	//=============================================
	protected _superSetStageSize = (stageWidth:number, stageHeight:number, dotSize:number, areaTopY:number, areaRightX:number,areaBottomY:number, areaLeftX:number) => {
		this._stageWidth = stageWidth;
		this._stageHeight = stageHeight;
		this._dotSize = dotSize;
		this._areaTopY = areaTopY;
		this._areaRightX = areaRightX;
		this._areaBottomY = areaBottomY;
		this._areaLeftX = areaLeftX;
		
		this.cache(0, 0, this._stageWidth, this._stageHeight);
	}
	//=============================================
	// getter/setter
	//=============================================
}