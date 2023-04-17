import { PixcelArtData } from "../data/PixcelArtData";

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
	public readonly EVENT_LOAD_JSON_COMPLETE: string = "event load json complete";
	public readonly EVENT_SAVE_JSON_COMPLETE: string = "event save json complete";
	public readonly EVENT_SAVE_SVG_COMPLETE: string = "event save svg complete";
	//----------private---------
	private readonly PATH_DOTJSON2IMG : string = "../cmn/php/dotjson2img.php";

	//load json
	private _loadJsonFromLocalInput:HTMLInputElement;
	private _loadResultPad:PixcelArtData;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor() {
		super();
		
		this._loadJsonFromLocalInput = <HTMLInputElement>document.querySelector('#fileLoadInputs #loadJsonFromLocalInput');
		this._loadJsonFromLocalInput.addEventListener("change", (e: Event) => {
			//console.log("change");
			let file:File = this._loadJsonFromLocalInput.files[0];
			//FileReaderの作成
			var reader:FileReader = new FileReader();
			//テキスト形式で読み込む
			reader.readAsText(file);
			//読込終了後の処理
			reader.onload = (e) =>{
				let dotJsonObj:any = JSON.parse(<string>reader.result);
				this._loadResultPad = new PixcelArtData();
				this._loadResultPad.setValue(dotJsonObj);
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
	private _bolbSave = (txt:string, filename:string, filetype:string, completeEventType:string) => {
		const blob :Blob = new Blob([txt], { type: filetype });
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
		this.dispatchEvent(new createjs.Event(completeEventType, true, true));
	}
	//File System Access API
	private _filePickerSave = async (txt:string, accept:any, description:string,  completeEventType:string) => {
		try {
			const textContent = txt;
			// メイン処理
			const saveFileOptions = {
				types: [
					{
						description: description,
						accept: accept
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
			this.dispatchEvent(new createjs.Event(completeEventType, true, true));
		}
	}
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
				console.log("window.showSaveFilePicker");
				let accept:any = {"application/json": [".json"]};
				this._filePickerSave(jsonStr, accept, "JSON Files",this.EVENT_SAVE_JSON_COMPLETE  )
			}else{
				this._bolbSave(jsonStr, filename,'application/json', this.EVENT_SAVE_JSON_COMPLETE);
			}
		})();
	}
	
	public loadJson = () => {
		//console.log("load json");
		this._loadResultPad = null;
		//読み込んだファイルのキャッシュをクリア（キャッシュが残っていると同じファイルを読み込んだときにchangeイベントが発生しない）
		//this._loadJsonFromLocalInput.files = null;
		this._loadJsonFromLocalInput.value = null;
		//クリックイベントを発生させファイル選択ダイアログを表示
		this._loadJsonFromLocalInput.click();
	}
	public saveSvg = (pad:PixcelArtData, filename:string = "dot.svg") => {
		const PATH :string = "../cmn/php/dotjson2img.php";

		let jsonObj: any = pad.getJsonObj();
		let dot_json_str: string = JSON.stringify(jsonObj.dot_json);

		let xhr : XMLHttpRequest = new XMLHttpRequest();
		xhr.onreadystatechange = (e: Event) => {
			if (xhr.readyState == 4) {// データ受信完了
				//console.log(this._xhr.readyState, this._xhr.status, this._xhr.statusText, this._xhr.responseText);
				var pattern = new RegExp(/2\d\d/);
				if (pattern.test(String(xhr.status)) == true) { //200番台
					//var data = e.responseText; // responseXML もあり
					//console.log('Complete! :', e.status, e.statusText);
					let xhrResTxt :string = xhr.responseText;
					(async ()=> {
						//Firefoxやスマホではwindow.showSaveFilePickerに対応していないので、対応していない場合は別の方法で保存する
						if(typeof window.showSaveFilePicker == 'function'){
							console.log("window.showSaveFilePicker");
							let accept:any = {"image/svg+xml": [".svg"]};
							this._filePickerSave(xhrResTxt, accept, "SVG Files",this.EVENT_SAVE_SVG_COMPLETE);
						}else{
							this._bolbSave(xhrResTxt, filename ,'image/svg+xml', this.EVENT_SAVE_SVG_COMPLETE);
						}
					})();
				} else {
					//console.log('Failed. : ', this._xhr.status, this._xhr.statusText);
				}
				//this.dispatchEvent(new createjs.Event(this.EVENT_CONVERT_SVG_COMPLETE, true, true));
			}
		}
		xhr.open('POST', PATH);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send("type=svg&dot_json=" + dot_json_str);
	}
	//=============================================
	// getter/setter
	//=============================================
	get loadResultPad(): PixcelArtData {
		return this._loadResultPad;
	}
}