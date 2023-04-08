import { PixcelArtData } from "../../model/data/PixcelArtData";
export class LocalStorageConnector {
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
	private readonly _KEY: string = "dotanimal_doteditor";
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor() {
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
	public save = (pad:PixcelArtData) => {
		let jsonObj: any = pad.getJsonObj();
		let jsonStr: string = JSON.stringify(jsonObj);
		window.localStorage.setItem(this._KEY, jsonStr)
	}
	public load = (): PixcelArtData => {
		let localStorageData:string = localStorage.getItem(this._KEY);
		if(localStorageData){
			let localStorageDataObj:any = JSON.parse(localStorageData);
			if(localStorageDataObj.dot_json){
				let pad :PixcelArtData = new PixcelArtData();
				pad.setValue(localStorageDataObj.dot_json);
				pad.layoutInit();
				if(0 < pad.width && 0 < pad.height){
					return pad; 
				}
			}
		}
		return null;
	}
	//=============================================
	// getter/setter
	//=============================================
}