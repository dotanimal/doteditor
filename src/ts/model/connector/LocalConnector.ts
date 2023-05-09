import { StagePreview } from "../../view/canvas/preview/StagePreview";
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

	//save png
	//private _stage: createjs.Stage;
	private _preview: StagePreview;
	//private _bg: createjs.Shape;
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

		let cvs:HTMLCanvasElement = <HTMLCanvasElement>document.createElement("CANVAS");
		cvs.width = 500;
		cvs.height = 500;

		//this._stage = new createjs.Stage(cvs);
		
		//this._bg = new createjs.Shape();
		//this._bg.graphics.beginFill('#' + "FFFFFF");
		//this._bg.graphics.drawRect(0, 0, cvs.width, cvs.height);
		//this._stage.addChild(this._bg);

		//this._preview = new ShapePreview(cvs.width, cvs.height, 10);
		this._preview = new StagePreview(cvs, 10);
		//this._stage.addChild(this._preview);
	}
	//=============================================
	// event handler
	//=============================================
	//=============================================
	// private
	//=============================================
	private _saveFile = (blob:Blob, filename:string, accept:any, description:string) =>{
		//Firefoxやスマホではwindow.showSaveFilePickerに対応していないので、対応していない場合は別の方法で保存する
		(async ()=> {
			if(typeof window.showSaveFilePicker == 'function'){
				//console.log("_filePickerSaveFile");
				//let accept:any = {"application/json": [".json"]};
				await this._filePickerSaveFile(blob, filename, accept, description,this.EVENT_SAVE_JSON_COMPLETE);	
				
			}else{
				//console.log("_blobSaveFile");
				this._blobSaveFile(	blob, filename, this.EVENT_SAVE_JSON_COMPLETE);
			}
		})();
	}
	private _blobSaveFile = (blob:Blob, filename:string, completeEventType:string) => {
		//const blob :Blob = new Blob([txt], { type: filetype });
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
	//Secured Contextな環境でしか使えない（httpsやlocalhostなど）
	private _filePickerSaveFile = async (blob:Blob, filename:string, accept:any, description:string,  completeEventType:string) => {
		try {
			//const textContent = txt;
			// メイン処理
			const saveFileOptions = {
				types: [
					{
						description: description,
						accept: accept
					}
				],
				suggestedName: filename,
			};
			const handle = await window.showSaveFilePicker(saveFileOptions);
			// writable作成
			const writable = await handle.createWritable();
			// コンテンツを書き込む
			await writable.write(blob);
			// ファイル閉じる
			await writable.close();
			//console.log("\tresult","\t:\t","success");
		} catch (error) {
			//console.log("\tresult","\t:\t","fail");
		} finally{
			this.dispatchEvent(new createjs.Event(completeEventType, true, true));
		}
	}
	//=============================================
	// public
	//=============================================
	//---------------------- 
	// load
	//---------------------- 
	public loadJson = () => {
		//console.log("load json");
		this._loadResultPad = null;
		//読み込んだファイルのキャッシュをクリア（キャッシュが残っていると同じファイルを読み込んだときにchangeイベントが発生しない）
		//this._loadJsonFromLocalInput.files = null;
		this._loadJsonFromLocalInput.value = null;
		//クリックイベントを発生させファイル選択ダイアログを表示
		this._loadJsonFromLocalInput.click();
	}
	//---------------------- 
	// save
	//---------------------- 
	public saveJson = (pad:PixcelArtData, filename:string = "dot.json") => {
		const jsonObj :any = pad.getJsonObj();
		const jsonStr :string = JSON.stringify(jsonObj.dot_json);
		//console.log('\n[Local]', "saveJson\n", jsonStr);
		const blob :Blob = new Blob([jsonStr], { type: 'application/json' });
		this._saveFile(
			blob,
			filename,
			{"application/json": [".json"]},
			"JSON Files"
		);
		/*
		(async ()=> {
			const blob :Blob = new Blob([jsonStr], { type: 'application/json' });
			//Firefoxやスマホではwindow.showSaveFilePickerに対応していないので、対応していない場合は別の方法で保存する
			if(typeof window.showSaveFilePicker == 'function'){
				console.log("window.showSaveFilePicker");
				let accept:any = {"application/json": [".json"]};
				this._filePickerSave(blob, filename, accept, "JSON Files",this.EVENT_SAVE_JSON_COMPLETE  )
			}else{
				//this._bolbSave(	blob, filename,'application/json', this.EVENT_SAVE_JSON_COMPLETE);
				this._bolbSave(	blob, filename, this.EVENT_SAVE_JSON_COMPLETE);
			}
		})();
		*/
	}
	
	public saveSvg = (pad:PixcelArtData, filename:string = "dot.svg") => {
		const PATH :string = "../cmn/php/dotjson2img.php";

		let jsonObj: any = pad.getJsonObj();
		let dot_json_str: string = JSON.stringify(jsonObj.dot_json);

		let xhr : XMLHttpRequest = new XMLHttpRequest();
		xhr.onreadystatechange = (e: Event) => {
			if (xhr.readyState == 4) {// データ受信完了
				var pattern = new RegExp(/2\d\d/);
				if (pattern.test(String(xhr.status)) == true) { //200番台
					const blob :Blob = new Blob([xhr.responseText], { type: 'image/svg+xml' });
					this._saveFile(
						blob,
						filename,
						{"image/svg+xml": [".svg"]},
						"SVG Files"
					);

					/*
					(async ()=> {
						const blob :Blob = new Blob([xhrResTxt], { type: 'image/svg+xml' });
						//Firefoxやスマホではwindow.showSaveFilePickerに対応していないので、対応していない場合は別の方法で保存する
						if(typeof window.showSaveFilePicker == 'function'){
							let accept:any = {"image/svg+xml": [".svg"]};
							this._filePickerSave(blob, filename, accept, "SVG Files",this.EVENT_SAVE_SVG_COMPLETE);
						}else{
							this._bolbSave(blob, filename , this.EVENT_SAVE_SVG_COMPLETE);
						}
					})();
					*/
				} else {
					//console.log('Failed. : ', this._xhr.status, this._xhr.statusText);
				}
			}
		}
		xhr.open('POST', PATH);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send("type=svg&dot_json=" + dot_json_str);
	}
	
	public savePng = (pad:PixcelArtData, filename:string = "dot.png") => {
		let cvs:HTMLCanvasElement = <HTMLCanvasElement>this._preview.canvas;
		//this._bg.visible = false;
		//this._preview.graphics.clear();
		this._preview.drawPad(pad, false);
		//this._stage.update();

		cvs.toBlob(async (blob:Blob)=> {
			this._saveFile(
				blob,
				filename,
				{"image/png": [".png"]},
				"PNG Files"
			);
			/*
			if(typeof window.showSaveFilePicker == 'function'){
				let accept:any = {"image/png": [".png"]};
				this._filePickerSave(result, filename, accept, "PNG Files",this.EVENT_SAVE_SVG_COMPLETE);
			}else{
				this._bolbSave(result, filename , this.EVENT_SAVE_SVG_COMPLETE);
			}
			*/
			this._preview.drawClear();
			//this._stage.update();
		},"image/png");
	}
	public saveJpeg = (pad:PixcelArtData, filename:string = "dot.jpg") => {
		let cvs:HTMLCanvasElement = <HTMLCanvasElement>this._preview.canvas;
		//this._bg.visible = true;
		this._preview.drawClear();
		this._preview.drawPad(pad, true);
		//this._stage.update();
		
		cvs.toBlob(async (blob:Blob)=> {
			this._saveFile(
				blob,
				filename,
				{"image/jpeg": [".jpg"]},
				"JPEG Files"
			);
			/*
			if(typeof window.showSaveFilePicker == 'function'){
				let accept:any = {"image/jpeg": [".jpg"]};
				this._filePickerSave(result, filename, accept, "JPEG Files",this.EVENT_SAVE_SVG_COMPLETE);
			}else{
				this._bolbSave(result, filename , this.EVENT_SAVE_SVG_COMPLETE);
			}
			*/
			this._preview.drawClear();
		},"image/jpeg", 1);
	}
	//=============================================
	// getter/setter
	//=============================================
	get loadResultPad(): PixcelArtData {
		return this._loadResultPad;
	}
}