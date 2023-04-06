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
	public setValue = (dotJsonObj: any, id: number = null, title: string = null ) => {//TODO 要調整
		this._id = id;
		this._title = title;

		this._drawLayerDataList = {};
		if (dotJsonObj != null) {
			this._dotJsonObj = dotJsonObj;

			for (var key in this._dotJsonObj) {
				let layerJsonObj: any = this._dotJsonObj[key];
				let dld: DrawLayerData = new DrawLayerData();
				//console.log(key, layerJson);
				dld.setJsonObj(layerJsonObj);
				this._drawLayerDataList[key] = dld;
			}
		}
	}
	public getJsonObj = (): any => {
		let obj: any = {};
		for (var key in this._drawLayerDataList) {
			let layerData: DrawLayerData = this._drawLayerDataList[key];
			obj[key] = layerData.getJsonObj();
		}
		let result: any = { "id": this._id, "title": this._title, "dot_json": obj };
		console.log('\n[JsonObj]', "\n\t", result);
		console.log('\n[JsonStr]', "\n\t", JSON.stringify(result));
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
		//console.log(this._dotJsonObj);
		for (var key in this._dotJsonObj) {
			let dot_json: any = this._dotJsonObj[key];
			let layerData: DrawLayerData = new DrawLayerData();
			layerData.setJsonObj(dot_json);
			this._drawLayerDataList[key] = layerData;
		}
		let minX: number = Number.MAX_SAFE_INTEGER;
		let minY: number = Number.MAX_SAFE_INTEGER;
		let maxX: number = 0;
		let maxY: number = 0;
		//console.log(this._drawLayerDataList);
		for (var key in this._drawLayerDataList) {
			let ld: DrawLayerData = this._drawLayerDataList[key];
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
	get title(): string {
		return this._title;
	}
	get drawLayerDataList(): any {
		return this._drawLayerDataList;
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