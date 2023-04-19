import { DrawLayerData } from "./data/DrawLayerData";

export class Canvas2DrawLayerData {
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
	private _dotSize: number;
	private _imgWidth: number;
	private _imgHeight: number;

	private _targetAreaTop : number;
	private _targetAreaRight : number;
	private _targetAreaBottom : number;
	private _targetAreaLeft : number;
	
	private _xCount: number;
	private _yCount: number;
	private _imgDataDotList: Array<ImageData>;
	private _hexDotList: Array<string>;

	private _xBase: number;
	private _yBase: number;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(){
	}
	//=============================================
	// event handler
	//=============================================
	//=============================================
	// private
	//=============================================
	private _isTransparentColorCheck = (imgData: ImageData): Boolean => {
		let result: Boolean = true;
		if (0 < imgData.data[3]) {
			result = false;
		}
		return result;
	}
	private _isWhiteColorCheck = (imgData: ImageData): Boolean => {
		let result: Boolean = false;
		if (imgData.data[0] == 255) {
			if (imgData.data[1] == 255) {
				if (imgData.data[2] == 255) {
					result = true;
				}
			}
		}
		return result;
	}
	private _checkTopMargin = (ctx: CanvasRenderingContext2D, colorCheckMethod: Function): number => {
		var imgData: ImageData;
		var isMatch: boolean = false;
		for (var yy = this._targetAreaTop; yy < this._targetAreaBottom; yy += this._dotSize) {
			for (var xx = this._targetAreaLeft; xx < this._targetAreaRight; xx += this._dotSize) {
				imgData = ctx.getImageData(xx, yy, 1, 1);
				if (!colorCheckMethod(imgData)) {
					isMatch = true;
					break;
				}
			}
			if (isMatch) { break; }
		}
		return yy;
	}
	private _checkBottomMargin = (ctx: CanvasRenderingContext2D, colorCheckMethod: Function): number => {
		var imgData: ImageData;
		var isMatch: boolean = false;
		for (var yy = this._imgHeight - this._targetAreaBottom; yy < this._imgHeight - this._targetAreaTop; yy += this._dotSize) {
			for (var xx = this._targetAreaLeft; xx < this._targetAreaRight; xx += this._dotSize) {
				imgData = ctx.getImageData(xx, this._imgHeight - 1 - yy, 1, 1);
				if (!colorCheckMethod(imgData)) {
					isMatch = true;
					break;
				}
			}
			if (isMatch) { break; }
		}
		return yy;
	}
	private _checkLeftMargin = (ctx: CanvasRenderingContext2D, colorCheckMethod: Function): number => {
		var imgData: ImageData;
		var isMatch: boolean = false;
		for (var xx = this._targetAreaLeft; xx < this._targetAreaRight; xx += this._dotSize) {
			for (var yy = this._targetAreaTop; yy < this._targetAreaBottom; yy += this._dotSize) {
				imgData = ctx.getImageData(xx, yy, 1, 1);
				if (!colorCheckMethod(imgData)) {
					isMatch = true;
					break;
				}
			}
			if (isMatch) { break; }
		}
		return xx;
	}
	private _checkRightMargin = (ctx: CanvasRenderingContext2D, colorCheckMethod: Function): number => {
		var imgData: ImageData;
		var isMatch: boolean = false;
		for (var xx = this._imgWidth - this._targetAreaRight; xx < this._imgWidth - this._targetAreaLeft; xx += this._dotSize) {
			for (var yy = this._targetAreaTop; yy < this._targetAreaBottom; yy += this._dotSize) {
				imgData = ctx.getImageData(this._imgWidth - 1 - xx, yy, 1, 1);
				if (!colorCheckMethod(imgData)) {
					isMatch = true;
					break;
				}
			}
			if (isMatch) { break; }
		}
		return xx;
	}
	private _rgb2hex = (rgb: Array<number>): string => {
		return "" + rgb.map(function (value) {
			return ("0" + value.toString(16)).slice(-2);
		}).join("");
	}

	private _checkColorData = (colorData1: ImageData, colorData2: ImageData): boolean => {
		var result = false;
		if (colorData1.data[0] == colorData2.data[0]) {
			if (colorData1.data[1] == colorData2.data[1]) {
				if (colorData1.data[2] == colorData2.data[2]) {
					//if (colorData1.data[3] == colorData2.data[3]) {
					result = true;
					//}
				}
			}
		}
		return result;
	}
	//=============================================
	// public
	//=============================================
	/**
	 * 画像やCanvasのデータをドット絵用のデータに変換するクラス
	 * @param {CanvasRenderingContext2D} ctx canvasのcontext2D
	 * @param {number} dotSize 画像から色データを抽出する際のドットサイズ。小さいと処理時間やメモリ量が増える　ドットサイズが不明な画像などは最小値の１にしておいて、後でサイズを選べるほうがよいが、サイズが決まってるなら不要なデータを削除できるので、ドットサイズを指定しておいたほうがよい。
	 * @param {Boolean} isWhiteMarginTrimming 周囲の白色の余白を削除するかどうかのフラグ
	 * @param {Boolean} isTransparentMarginTrimming 周囲の透過の余白を削除するかどうかのフラグ
	 */
	public init = (ctx: CanvasRenderingContext2D, stageWidth: number, stageHeight: number, dotSize: number = 1, isWhiteMarginTrimming: Boolean = false, isTransparentMarginTrimming: Boolean = false, targetAreaLeft:number = 0, targetAreaTop:number = 0, targetAreaRight:number = 0, targetAreaBottomY:number = 0):void => {		
		//console.log('\n[Canvas2DrawLayerData]', "\n");
		this._imgWidth = stageWidth;
		this._imgHeight = stageHeight;
		this._dotSize = dotSize;
		//console.log("\tstage\t\t\t:", stageWidth, stageHeight);
		
		this._targetAreaTop = targetAreaTop;
		this._targetAreaRight = targetAreaRight;
		this._targetAreaBottom = targetAreaBottomY;
		this._targetAreaLeft = targetAreaLeft;
		//console.log("\ttargetArea\t\t\t:", this._targetAreaTop, this._targetAreaRight, this._targetAreaBottom, this._targetAreaLeft)

		//トリミング---------------------------------------------------
		let colorCheckMethod: Function;
		if (isWhiteMarginTrimming) {
			colorCheckMethod = this._isWhiteColorCheck;
		}
		if (isTransparentMarginTrimming) {
			colorCheckMethod = this._isTransparentColorCheck;
		}

		let topMargin: number = this._targetAreaTop;
		let bottomMargin: number = stageHeight - this._targetAreaBottom;
		let leftMargin: number = this._targetAreaLeft;
		let rightMargin: number = stageWidth - this._targetAreaRight;
		if (colorCheckMethod) {
			topMargin = this._checkTopMargin(ctx, colorCheckMethod);
			bottomMargin = this._checkBottomMargin(ctx, colorCheckMethod);
			leftMargin = this._checkLeftMargin(ctx, colorCheckMethod);
			rightMargin = this._checkRightMargin(ctx, colorCheckMethod);
		}
		//console.log("\tmargin\t\t\t:", topMargin, rightMargin, bottomMargin, leftMargin);

		//色データ抽出---------------------------------------------------
		let imgData: ImageData;
		let hex: string;
		this._hexDotList = [];
		this._imgDataDotList = [];
		this._xCount = Math.floor((this._imgWidth - rightMargin - leftMargin) / dotSize);
		this._yCount = Math.floor((this._imgHeight - bottomMargin - topMargin) / dotSize);
		//console.log("\tdot count\t\t:", this._xCount, this._yCount);

		if(0 < this._xCount && 0 < this._yCount){	
			for (let yy = topMargin; yy <= this._imgHeight - bottomMargin -1 ; yy += dotSize) {
				for (let xx = leftMargin; xx <= this._imgWidth - rightMargin - 1; xx += dotSize) {
					//console.log(xx,yy);
					imgData = ctx.getImageData(xx, yy, 1, 1);//キャンバスのピクセル情報を取得。左上、右下。
					hex = this._rgb2hex([imgData.data[0], imgData.data[1], imgData.data[2]]);
					//console.log(hex);
					this._imgDataDotList.push(imgData);
					this._hexDotList.push(hex);
				}
			}
			this._xBase = (leftMargin - this._targetAreaLeft) / this._dotSize;
			this._yBase = (topMargin - this._targetAreaTop) / this._dotSize;
			//console.log("\tdot base pos\t:", this._xBase,this._yBase);
		}
	}
	public dispose = ():void =>{
		this._dotSize = undefined;
		this._imgWidth = undefined;
		this._imgHeight = undefined;
		
		this._targetAreaTop  = undefined;
		this._targetAreaRight  = undefined;
		this._targetAreaBottom  = undefined;
		this._targetAreaLeft  = undefined;
		
		this._xCount = undefined;
		this._yCount = undefined;
		this._imgDataDotList = null;
		this._hexDotList = null;
		
		this._xBase = undefined;
		this._yBase = undefined;
	}
	public getHexDotList = (): Array<string> => {
		return this._hexDotList;
	}
	public getDrawLayerData = (dotsize: number): DrawLayerData => {

		let dld: DrawLayerData = new DrawLayerData();

		if(this._imgDataDotList.length <= 0){
			dld.setData(0, 0, [], [], 0, 0);
		}else{
			let xCount: number = Math.floor(this._xCount / dotsize);
			let yCount: number = Math.floor(this._yCount / dotsize);
			var colorData1: any;
			var colorData2: any;
	
			var colorDataList: Array<any> = [{ "data": [0, 0, 0, 0] }];
			let dataList: Array<number> = [];
			var colorList: Array<string> = [""];
	
			for (let yy = 0; yy < yCount; yy++) {
				for (let xx = 0; xx < xCount; xx++) {
					let id: number = xx * dotsize + yy * dotsize * this._xCount;
					colorData1 = this._imgDataDotList[id];
					if (colorData1.data[3] == 0) {
						dataList.push(0);
					} else {
						var isMatch: boolean = false;
						for (var i = 1; i < colorDataList.length; i++) {
							colorData2 = colorDataList[i];
							if (this._checkColorData(colorData1, colorData2) == true) {
								dataList.push(i);
								isMatch = true;
								break;
							}
						}
						if (!isMatch) {
							var colorId: number = colorDataList.push(colorData1) - 1;
							dataList.push(colorId);
						}
					}
	
				}
			}
			for (var i = 1; i < colorDataList.length; i++) {
				colorData1 = colorDataList[i];
				var hex = this._rgb2hex([colorData1.data[0], colorData1.data[1], colorData1.data[2]]);
				colorList.push(hex);
			}
			this._dotSize = dotsize;
			dld.setData(xCount, yCount, colorList, dataList, this._xBase, this._yBase);
		}
		
		return dld;
	}
	//=============================================
	// getter/setter
	//=============================================
}