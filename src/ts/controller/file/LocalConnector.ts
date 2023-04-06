import { State } from "../../model/State";
import { PixcelArtData } from "../../model/data/PixcelArtData";

export class LocalConnector extends createjs.EventDispatcher {
	//=============================================
	// TODO
	//=============================================
	/*
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public readonly EVENT_SAVE_JSON_COMPLETE: string = "event save json complete";
	public readonly EVENT_LOAD_JSON_COMPLETE: string = "event load json complete";
	//----------private---------
	private _state: State;

	//load json
	private _loadJsonFromLocalInput:HTMLInputElement;
	private _resultLoadJson:string;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state:State) {
		super();
		this._state = state;
		
		this._loadJsonFromLocalInput = <HTMLInputElement>document.querySelector('#fileDropdown #fileLoadInputs #loadJsonFromLocalInput');
		this._loadJsonFromLocalInput.addEventListener("change", (e: Event) => {
			let file:File = this._loadJsonFromLocalInput.files[0];
			//FileReaderの作成
			var reader:FileReader = new FileReader();
			//テキスト形式で読み込む
			reader.readAsText(file);
			//読込終了後の処理
			reader.onload = (e) =>{
				this._resultLoadJson = <string>reader.result;
				this._state.prev();
				this.dispatchEvent(new createjs.Event(this.EVENT_LOAD_JSON_COMPLETE, true, true));
			}
			e.preventDefault();
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
	public saveJson = (pad:PixcelArtData, filename:string = "dot.json") => {
		const jsonObj :any = pad.getJsonObj();
		const jsonStr :string = JSON.stringify(jsonObj.dot_json);
		console.log('\n[Local]', "saveJson\n", jsonStr);
		(async ()=> {
			//Firefoxやスマホではwindow.showSaveFilePickerに対応していないので、対応していない場合は別の方法で保存する
			if(typeof window.showSaveFilePicker == 'function'){
				try {
					const textContent = jsonStr;
					// メイン処理
					const saveFileOptions = {
						types: [
							{
								description: "Json Files",
								accept: {
									"application/json": [".json"]
								}
							}
						]
					};
					const handle = await window.showSaveFilePicker(saveFileOptions);
					// writable作成
					const writable = await handle.createWritable();
					// コンテンツを書き込む
					await writable.write(textContent);
					// ファイル閉じる
					await writable.close();
					console.log("\tresult","\t:\t","success");
				} catch (error) {
					console.log("\tresult","\t:\t","fail");
				} finally{
					this._state.prev();
					this.dispatchEvent(new createjs.Event(this.EVENT_SAVE_JSON_COMPLETE, true, true));
				}
			}else{
				const blob :Blob = new Blob([jsonStr], { type: 'application/json' });
				const a:HTMLAnchorElement = <HTMLAnchorElement>document.createElement("a");
				const url :string = window.URL.createObjectURL(blob);
				a.download = filename;
				a.href = url;
				a.style.display = "none";
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				setTimeout(() => {
					window.URL.revokeObjectURL(url);
				}, 1E2); //100ms
				
				this._state.prev();
				this.dispatchEvent(new createjs.Event(this.EVENT_SAVE_JSON_COMPLETE, true, true));
			}
		})();
	}
	
	public loadJson = () => {
		this._resultLoadJson = null;
		this._loadJsonFromLocalInput.click();
	}
	//=============================================
	// getter/setter
	//=============================================
	get resultLoadJson(): string {
		return this._resultLoadJson;
	}
}