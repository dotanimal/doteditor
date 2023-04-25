export class KeyBindManager {
	//=============================================
	// TODO
	//=============================================
	/*
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly METHOD_TYPE_CLICK : string = "method type click";
	//----------private---------
	private _list: { [key: string]: KeyBindManagerData };
	private _currentKey :string;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor() {
		this._list = {};
		document.addEventListener("keydown", (e:KeyboardEvent) => {
			if(e.key != this._currentKey){
				let data:KeyBindManagerData = this._list[e.key];
				if(data){
					data.execute();
				}
				this._currentKey = e.key;
			}
			return false;
		});
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
	public add = (key:string, target:HTMLElement, methodType:string) =>{
		this._list[key] = new KeyBindManagerData(key, target, methodType);
	}
	//=============================================
	// getter/setter
	//=============================================
}
class KeyBindManagerData {
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	//----------private---------
	private _key:string;
	private _target:HTMLElement;
	private _methodType:string;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(key:string, target:HTMLElement, methodType:string) {
		this._key = key;
		this._target = target;
		this._methodType = methodType;
	}
	//=============================================
	// public
	//=============================================
	public execute = () =>{
		if(this._methodType == KeyBindManager.METHOD_TYPE_CLICK){
			this._target.click();
		}
	}
	//=============================================
	// getter/setter
	//=============================================
}