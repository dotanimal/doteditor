export class DrawLayerData {
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	//----------private---------
	private _name: string;

	private _x: number;
	private _y: number;
	private _width: number;
	private _height: number;
	private _hexColorCodeList: Array<string>;
	private _dataList: Array<number>;

	private _isActive:boolean;
	private _visible:boolean;
	//=============================================
	// constructor
	//=============================================
	constructor(name:string = "") {
		if(name){
			this._name = name;
			this._hexColorCodeList = ["","333333"];
		}else{
			this._hexColorCodeList = [];
		}
		this._dataList = [];
		this._visible = true;
	}
	//=============================================
	// private
	//=============================================
	//=============================================
	// public
	//=============================================
	public setData = (width: number, height: number, hexColorCodeList: Array<string>, dataList: Array<number>, x: number = 0, y: number = 0) => {
		this._width = width;
		this._height = height;
		this._hexColorCodeList = hexColorCodeList;
		this._dataList = dataList;
		this._x = x;
		this._y = y;
	}
	public setJsonObj = (obj: any) => {
		let size: Array<number> = obj.size;
		this._width = size[0];
		this._height = size[1];

		this._hexColorCodeList = obj.color;
		this._dataList = obj.data;

		if (obj.pos) {
			let pos: Array<number> = obj.pos;
			this._x = pos[0];
			this._y = pos[1];
		} else {
			this._x = 0;
			this._y = 0;
		}
	}
	public getJsonObj = (): any => {
		let result: any = { "size": [this._width, this._height], "color": this._hexColorCodeList, "data": this._dataList };
		if (this._x != 0 || this._y != 0) {
			result["pos"] = [this._x, this._y];
		}
		return result;
	}
	//=============================================
	// getter/setter
	//=============================================
	get name(): string {
		return this._name;
	}
	set name(value: string) {
		this._name = value;
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
	get hexColorCodeList(): Array<string> {
		return this._hexColorCodeList;
	}
	get dataList(): Array<number> {
		return this._dataList;
	}
	get isActive(): boolean {
		return this._isActive;
	}
	set isActive(value: boolean) {
		this._isActive = value;
	}
	get visible():boolean{
		return this._visible;
	}
	set visible(value:boolean){
		this._visible = value;
	}
}