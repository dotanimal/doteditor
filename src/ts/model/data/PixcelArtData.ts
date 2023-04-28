import { DrawLayerData } from "./DrawLayerData";

export class PixcelArtData {
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	//----------private---------
	private _obj: any;
	private _id: number;
	private _title: string;
	private _dotJsonObj: any;
	//private _drawLayerDataList: any;
	private _drawLayerDataList: Array<DrawLayerData>;
	private _x: number;
	private _y: number;
	private _width: number;
	private _height: number;
	//=============================================
	// constructor
	//=============================================
	constructor(isBlank:boolean = false) {
		this._drawLayerDataList = [];
		if(isBlank){
			this.addDrawLayerData(new DrawLayerData(true));
		}
	}
	//=============================================
	// private
	//=============================================
	//=============================================
	// public
	//=============================================
	public setValue = (dotJsonObj: any, id: number = null, title: string = null ) => {//TODO 要調整
		this._id = id;
		this._title = title;

		this._drawLayerDataList = [];
		if (dotJsonObj != null) {
			this._dotJsonObj = dotJsonObj;

			for (var key in this._dotJsonObj) {
				let layerJsonObj: any = this._dotJsonObj[key];
				let dld: DrawLayerData = new DrawLayerData();
				dld.name = key;
				dld.setJsonObj(layerJsonObj);
				this._drawLayerDataList.push(dld);
			}
		}
		this.layoutInit();
	}
	public getJsonObj = (): any => {
		let obj: any = {};
		for(var i = 0; i < this._drawLayerDataList.length; i++){
			let dld: DrawLayerData = this._drawLayerDataList[i];
			obj[dld.name] = dld.getJsonObj();
		}
		let result: any = { "id": this._id, "title": this._title, "dot_json": obj };
		//console.log('\n[JsonObj]', "\n\t", result);
		//console.log('\n[JsonStr]', "\n\t", JSON.stringify(result));
		return result;
	}
	//色配列を返す
	public getHexColorCodeList = (): Array<string> => {
		let result: Array<string> = [];
		for(var i = 0; i < this._drawLayerDataList.length; i++){
			let dld: DrawLayerData = this._drawLayerDataList[i];
			let hexColorCodeList: Array<string> = dld.hexColorCodeList;
			result = result.concat(hexColorCodeList);
		}
		//重複削除
		result = Array.from(new Set(result));
		//最初の１つを削除
		result.shift();
		return result;
	}
	public addDrawLayerData = (dld: DrawLayerData) => {
		this._drawLayerDataList.push(dld);
	}
	public getDrawLayerDataList = ():Array<DrawLayerData> => {
		return this._drawLayerDataList;
	}
	public layoutInit = () => {
		//console.log(this._dotJsonObj);
		/*
		for (var key in this._dotJsonObj) {
			let dot_json: any = this._dotJsonObj[key];
			let layerData: DrawLayerData = new DrawLayerData();
			layerData.name = key;
			layerData.setJsonObj(dot_json);
			this._drawLayerDataList.push(layerData);
		}
		*/
		let minX: number = Number.MAX_SAFE_INTEGER;
		let minY: number = Number.MAX_SAFE_INTEGER;
		let maxX: number = 0;
		let maxY: number = 0;
		//console.log(this._drawLayerDataList);
		for(var i = 0; i < this._drawLayerDataList.length; i++){
			let dld: DrawLayerData = this._drawLayerDataList[i];
			if (dld.x < minX) {
				minX = dld.x;
			}
			if (dld.y < minY) {
				minY = dld.y;
			}
			if (maxX < dld.x + dld.width) {
				maxX = dld.x + dld.width;
			}
			if (maxY < dld.y + dld.height) {
				maxY = dld.y + dld.height;
			}
		}
		this._x = minX;
		this._y = minY;
		this._width = maxX - minX;
		this._height = maxY - minY;
	}
	//=============================================
	// getter/setter
	//=============================================
	get id(): number {
		return this._id;
	}
	set id(value: number) {
		this._id = value;
	}
	get title(): string {
		return this._title;
	}
	set title(value: string) {
		this._title = value;
	}
	get x(): number {
		return this._x;
	}
	set x(value: number) {
		this._x = value;
	}

	get y(): number {
		return this._y;
	}
	set y(value: number) {
		this._y = value;
	}

	get width(): number {
		return this._width;
	}
	get height(): number {
		return this._height;
	}
}