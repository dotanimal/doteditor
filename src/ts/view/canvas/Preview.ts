import { DrawLayerData } from "../../model/data/DrawLayerData";
import { PixcelArtData } from "../../model/data/PixcelArtData";

export class Preview extends createjs.Shape {
	//=============================================
	// TODO
	//=============================================
	/*
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_CLICK_PREVIEW: string = "event click preview";
	//----------private---------
	private _stageWidth:number;
	private _stageHeight:number;
	private _dotSize:number;
	private _pad: PixcelArtData;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(stageWidth:number, stageHeight:number, dotSize:number) {
		super();

		this._stageWidth = stageWidth;
		this._stageHeight = stageHeight;
		this._dotSize = dotSize;
	}
	//=============================================
	// event handler
	//=============================================
	//=============================================
	// private
	//=============================================
	private _drawDld = (dld:DrawLayerData, sx:number, sy:number) : void => {
		for (var i = 0; i < dld.dataList.length; i++) {
			let hexColorCode:string = '';
			let colorId:number = dld.dataList[i];
			if (0 < colorId) {
				if (Number.isInteger(colorId) == true) {
					let xx = i % dld.width;
					let yy = Math.floor(i / dld.width);
					hexColorCode = dld.hexColorCodeList[colorId];
					this.graphics.beginFill('#' + hexColorCode);
					this.graphics.drawRect((xx + dld.x) * this._dotSize + sx, (yy + dld.y) * this._dotSize + sy, this._dotSize, this._dotSize);
				}
			}
		}
	}
	private _drawBg = () : void => {
		this.graphics.beginFill('#' + "FFFFFF");
		//this.graphics.beginFill('#' + "AAAAAA");
		this.graphics.drawRect(0, 0, this._stageWidth, this._stageHeight);
	}
	//=============================================
	// public
	//=============================================
	public drawPad = (pad:PixcelArtData, isBg:boolean) :void => {
		this._pad = pad;
		//console.log(pad.width,pad.x,this._stageWidth,this._dotSize);
		let sx: number = Math.floor((this._stageWidth - pad.width * this._dotSize) / 2 - (pad.x * this._dotSize));
		let sy: number = Math.floor((this._stageHeight - pad.height * this._dotSize) / 2 - (pad.y * this._dotSize));
		let sw: number = Math.floor((pad.width + pad.x) * this._dotSize);
		let sh: number = Math.floor((pad.height + pad.y) * this._dotSize);
		let dldList : any = pad.getDrawLayerDataList();
		let dld: DrawLayerData;

		this.cache(sx, sy, sw, sh);
		
		if(isBg){this._drawBg();}
		for (let key in dldList) {
			dld = dldList[key];
			this._drawDld(dld, sx, sy);
		}
		
		this.updateCache();
	}
	public drawDld = (dld:DrawLayerData, sx:number, sy:number, sw:number, sh:number, isBg:boolean) :void => {
		this.cache(sx, sy, sw, sh);

		if(isBg){this._drawBg();}
		this._drawDld(dld, sx, sy);
		
		this.updateCache();
	}
	public addMouseEvent = () :void => {
		this.addEventListener("mouseover", (e: MouseEvent) => {
			//参考：http://www.fumiononaka.com/Business/html5/FN1211002.html
			document.body.style.cursor = "pointer";
			this.alpha = 0.5;
			this.stage.update();
		});
		this.addEventListener("mouseout", (e: MouseEvent) => {
			document.body.style.cursor = "";
			this.alpha = 1;
			this.stage.update();
		});
		this.addEventListener("click", (e: MouseEvent) => {
			this.dispatchEvent(new createjs.Event(Preview.EVENT_CLICK_PREVIEW, true, true));
		});
	}
	public removeMouseEvent = () :void => {
		this.removeAllEventListeners();
	}
	//=============================================
	// getter/setter
	//=============================================
	get pixcelArtData(): PixcelArtData {
		return this._pad;
	}
}