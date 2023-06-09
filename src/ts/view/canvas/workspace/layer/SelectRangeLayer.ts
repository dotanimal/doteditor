import { State } from "../../../../model/State";
import { Layer } from "./Layer";

export class SelectRangeLayer extends Layer {
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
	private _resetSelect = () =>{
		this._selectBeginX = undefined;
		this._selectBeginY = undefined;
		this._selectEndX = undefined;
		this._selectEndY = undefined;
		//this._isShowSelectArea = false;
		this._isLockSelect = false;
		this.graphics.clear();
		this.updateCache();
	}
	//=============================================
	// public
	//=============================================
	public init = () =>{
		this.x = 0;
		this.y = 0;
		this.visible = false;
		this._isLockSelect = false;
		this._selectBeginX = undefined;
		this._selectBeginY = undefined;
		this._selectEndX = undefined;
		this._selectEndY = undefined;
		this.graphics.clear();
		this.updateCache();
	}
	public override setStageSize = (stageWidth:number, stageHeight:number, dotSize:number, drawAreaLeft:number, drawAreaTop:number, drawAreaRight:number, drawAreaBottom:number) => {
		this._superSetStageSize(stageWidth, stageHeight, dotSize, drawAreaLeft, drawAreaTop, drawAreaRight, drawAreaBottom);
		//console.log("[DrawLayer] change size");
		this._isLockSelect = false;
	}
	public beginSelect = (mx:number, my:number) =>{
		if(	this._state.current != State.SELECT_RANGE){ return false;}

		this._selectBeginX = this._adustX(mx);
		this._selectBeginY  = this._adustY(my);
		this._isLockSelect = false;
		//this._isShowSelectArea = true;
	}
	public endSelect = (mx:number, my:number, isLockSelect:boolean = false) =>{
		if(	this._state.current != State.SELECT_RANGE){ return false;}
		if(this._selectBeginX == undefined || this._selectBeginY == undefined){return false;}
		if(this._isLockSelect){return false;}

		this._selectEndX = this._adustX(mx) + this._dotSize;
		this._selectEndY = this._adustY(my) + this._dotSize;

		this.graphics.clear();

		if( this._selectBeginX < this._selectEndX && this._selectBeginY < this._selectEndY ){
			this.graphics.beginStroke(this._LINE_HEX_COLOR);
			this.graphics.setStrokeDash([4,2],0);
			this.graphics.setStrokeStyle(2);
	
			this.graphics.moveTo(this._selectBeginX,	this._selectBeginY);
			this.graphics.lineTo(this._selectEndX,		this._selectBeginY);
			this.graphics.lineTo(this._selectEndX,		this._selectEndY);
			this.graphics.lineTo(this._selectBeginX,	this._selectEndY);
			this.graphics.lineTo(this._selectBeginX,	this._selectBeginY);
	
			this.graphics.endStroke();

			this._isLockSelect = isLockSelect;
		}

		this.updateCache();
		
	}
	public setBeginEnd = (bx:number, by:number, ex:number, ey:number) :void =>{
		this._selectBeginX = this._adustX(bx);
		this._selectBeginY  = this._adustY(by);

		this._selectEndX = this._adustX(ex) + this._dotSize;
		this._selectEndY = this._adustY(ey) + this._dotSize;

		this.graphics.clear();

		if( this._selectBeginX < this._selectEndX && this._selectBeginY < this._selectEndY ){
			this.graphics.beginStroke(this._LINE_HEX_COLOR);
			this.graphics.setStrokeDash([4,2],0);
			this.graphics.setStrokeStyle(2);
	
			this.graphics.moveTo(this._selectBeginX,	this._selectBeginY);
			this.graphics.lineTo(this._selectEndX,		this._selectBeginY);
			this.graphics.lineTo(this._selectEndX,		this._selectEndY);
			this.graphics.lineTo(this._selectBeginX,	this._selectEndY);
			this.graphics.lineTo(this._selectBeginX,	this._selectBeginY);
	
			this.graphics.endStroke();
		}
		this.updateCache();
	}
	public move = (xx : number, yy : number) => {
		this.x = xx - this.selectBeginX + this._drawAreaLeft;
		this.y = yy - this.selectBeginY + this._drawAreaTop;
	}
	//=============================================
	// getter/setter
	//=============================================
	get selectBeginX(): number {
		return this._selectBeginX;
	}
	get selectBeginY(): number {
		return this._selectBeginY;
	}
	get selectEndX(): number {
		return this._selectEndX;
	}
	get selectEndY(): number {
		return this._selectEndY;
	}
}