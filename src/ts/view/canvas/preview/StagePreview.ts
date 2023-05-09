import { DrawLayerData } from "../../../model/data/DrawLayerData";
import { PixcelArtData } from "../../../model/data/PixcelArtData";
import { ShapePreview } from "./ShapePreview";

export class StagePreview extends createjs.Stage {
	//=============================================
	// TODO
	//=============================================
	/*
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	//private _dotSize:number;
	private _shp:ShapePreview;
	private _bg:createjs.Shape;
	//private _pad: PixcelArtData;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(canvas: string | HTMLCanvasElement, dotSize:number) {
		super(canvas);

		let cvs:HTMLCanvasElement;
		if(typeof canvas === "string"){
			this.name = canvas;
			//this._dotSize = dotSize;
	
			cvs = <HTMLCanvasElement>document.querySelector('#' + canvas);
			//console.log(cvs, canvas);
		}else{
			cvs = canvas;
		}
		
		this._shp = new ShapePreview(cvs.width, cvs.height, dotSize);
		this._bg = new createjs.Shape();
		this._bg.graphics.beginFill('#' + "FFFFFF");
		this._bg.graphics.drawRect(0, 0, cvs.width, cvs.height);
		
		this.addChild(this._bg);
		this.addChild(this._shp);
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
	/*
	public setPad = (pad:PixcelArtData):void =>{
		this._pad = pad;

		this._draw();
	}
	*/
	public drawClear = () :void =>{
		this._shp.graphics.clear();
		this.update();
	}
	public drawPad = (pad:PixcelArtData, isBg:boolean) :void =>{
		this._shp.graphics.clear();
		this._shp.drawPad(pad, isBg);
		this._bg.visible = isBg;
		this.update();
	}
	public drawDld = (dld:DrawLayerData, sx:number, sy:number, sw:number, sh:number, isBg:boolean) :void => {
		this._shp.graphics.clear();
		this._shp.drawDld(dld, sx, sy, sw, sh, isBg);
		this.update();
	}
	//=============================================
	// getter/setter
	//=============================================
	set dotSize(value:number){
		this._shp.dotSize = value;
	}
}