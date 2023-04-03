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
	public changeSize = (stageWidth:number, stageHeight:number, dotSize:number) => {
		this._stageWidth = stageWidth;
		this._stageHeight = stageHeight;
		this._dotSize = dotSize;
		
		this.cache(0, 0, this._stageWidth, this._stageHeight);
	}
	//=============================================
	// getter/setter
	//=============================================
}