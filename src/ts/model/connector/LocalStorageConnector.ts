import { PixcelArtData } from "../data/PixcelArtData";
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
	private readonly _KEY: string = "dotanimal_doteditor_";
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
	public save = (workspaceId:string, pad:PixcelArtData) => {
		let jsonObj: any = pad.getJsonObj();
		let jsonStr: string = JSON.stringify(jsonObj);
		window.localStorage.setItem(this._KEY + workspaceId, jsonStr)
	}
	public load = (workspaceId:string): PixcelArtData => {
		let localStorageData:string = localStorage.getItem(this._KEY + workspaceId);
		//console.log(this._KEY + workspaceId, localStorageData);
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