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
	private _dot_json: any;
	private _drawLayerDataList: any;
	private _x: number;
	private _y: number;
	private _width: number;
	private _height: number;
	//=============================================
	// constructor
	//=============================================
	constructor() {
		this._drawLayerDataList = {};
	}
	//=============================================
	// private
	//=============================================
	//=============================================
	// public
	//=============================================
	public getJsonObj = (): any => {
		let obj: any = {};
		for (var key in this._drawLayerDataList) {
			let layerData: DrawLayerData = this._drawLayerDataList[key];
			obj[key] = layerData.getJson();
		}
		let result: any = { "id": this._id, "title": this._title, "dot_json": obj };
		console.log('\n[JsonObj]', "\n\t", result);
		return result;
	}
	public addDrawLayerData = (name: string, layerData: DrawLayerData) => {
		//console.log("setLayerData", name, layerData);
		this._drawLayerDataList[name] = layerData;
		//this.layoutDataInit();
	}
	public getDrawLayerDataList = () => {
		return this._drawLayerDataList;
	}
	public layoutInit = () => {

		for (var key in this._dot_json) {
			let dot_json: any = this._dot_json[key];
			let layerData: DrawLayerData = new DrawLayerData();
			layerData.setJson(dot_json);
			this._drawLayerDataList[key] = layerData;
			//console.log(key);
		}
		let minX: number = Number.MAX_SAFE_INTEGER;
		let minY: number = Number.MAX_SAFE_INTEGER;
		let maxX: number = 0;
		let maxY: number = 0;
		//console.log(this._drawLayerDataList);
		for (var key in this._drawLayerDataList) {

			//console.log(key);
			let ld: DrawLayerData = this._drawLayerDataList[key];
			//console.log(key, ld.x, ld.y, ld.width, ld.height);
			if (ld.x < minX) {
				minX = ld.x;
			}
			if (ld.y < minY) {
				minY = ld.y;
			}
			if (maxX < ld.x + ld.width) {
				maxX = ld.x + ld.width;
			}
			if (maxY < ld.y + ld.height) {
				maxY = ld.y + ld.height;
			}
		}
		//console.log("result", minX, minY, maxX, maxY);
		this._x = minX;
		this._y = minY;
		this._width = maxX - minX;
		this._height = maxY - minY;
		
		//console.log(this._x, this._y, this._width, this._height);
	}
	//=============================================
	// getter/setter
	//=============================================
	get id(): number {
		return this._id;
	}
	get title(): string {
		return this._title;
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