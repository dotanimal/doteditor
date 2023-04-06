import { State } from "../model/State";
import { PixcelArtData } from "../model/data/PixcelArtData";
import { Workspace } from "../view/canvas/workspace/Workspace";
import { ColorPalette } from "../view/ui/ColorPalette";
import { EditBtns } from "../view/ui/EditBtns";
import { FileDropdownMenu } from "../view/ui/FileDropdownMenu";

export class Main {
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
	//----------protected-------
	private _state: State;

	private _cp: ColorPalette;
	private _eb: EditBtns;
	private _fdm: FileDropdownMenu;

	private _wsList: { [key: string]: Workspace };
	private _activeWsId: string;
	//=============================================
	// constructor
	//=============================================
	constructor() {
		this._state = new State();
		
		this._cp = new ColorPalette(this._state);
		this._eb = new EditBtns(this._state);
		this._fdm = new FileDropdownMenu(this._state);

		this._wsList = {};
		
		this._addWorkSpace('workspace1');

		this._eb.addEventListener(this._eb.EVENT_CHANGE_BTN, this._onChangeEditBtnsHandler);
		this._cp.addEventListener(this._cp.EVENT_CHANGE_COLOR, this._onChangeColorPaletteHandler);
		this._fdm.addEventListener(this._fdm.EVENT_DROPDOWN_OPEN, this._onOpenFileDropdownMenuHandore);
		this._fdm.addEventListener(this._fdm.EVENT_DROPDOWN_CLOSE, this._onCloseFileDropdownMenuHandore);
		this._fdm.addEventListener(this._fdm.EVENT_DROPDOWN_MENU_SELECT, this._onMenuSelectFileDropdownMenuHandore);

		//カラーパレットの初期化　イベントリスナーを登録したあとに実行しないと色々うごかないのでここで実行
		this._cp.init();
	}
	//=============================================
	// event handler
	//=============================================
	//----------EditBtn----------
	//ボタンの変更
	private _onChangeEditBtnsHandler = (e: Event) => {
		console.log('\n[Event]', e.type, "\n\t" + "state : " + this._state.current);
	}
	//----------ColorPalette----------
	//カラーパレットの変更
	private _onChangeColorPaletteHandler = (e: Event) => {
		let ws: Workspace = this._getActiveWS();
		let color: string = this._cp.getColor();
		ws.setColor(color);
		console.log('\n[Event]', e.type, "\n\t" + "color : " + color);
	}
	//----------FileDropdownMenu----------
	//ドロップダウンメニューが開いた
	private _onOpenFileDropdownMenuHandore = (e: Event) => {
		console.log('\n[Event]', e.type, "\n\t" + "state : " + this._state.current);
		//let ws: Workspace = this._getActiveWS();
		let ws: Workspace = this._getActiveWS();
		let pad:PixcelArtData = ws.getPixcelArtData();
		let jsonObj: any = pad.getJsonObj();
		if(Object.keys(jsonObj.dot_json).length <= 0){
			console.log("\n[Info]", "\n\t" + "描画データなし");
			this._fdm.hideSaveMenu();
		}else{
			this._fdm.reset();
		}
	}
	//ドロップダウンメニューが閉じた
	private _onCloseFileDropdownMenuHandore = (e: Event) => {
	}
	//ドロップダウンメニューの中のメニューを選択した
	private _onMenuSelectFileDropdownMenuHandore = (e: Event) => {
		console.log('\n[Event]', e.type, "\n\t" + "state : " + this._state.current);
		let ws: Workspace;
		let pad: PixcelArtData;
		if(this._state.current == State.FILE_LOAD_JSON_FROM_LOCAL){
			//ws = this._getActiveWS();
			alert("未実装");
			this._state.current = this._state.prev;
		}else if(this._state.current == State.FILE_SAVE_JSON_TO_LOCAL){
			ws = this._getActiveWS();
			pad = ws.getPixcelArtData();
			let jsonObj: any = pad.getJsonObj();
			this._jsonFileDownload(jsonObj);
			this._state.current = this._state.prev;
		}
	}
	//----------Workspace----------
	//ワークスペースの変更
	private _onWorkspaceChangeHandler = (e: Event) => {
		console.log('\n[Event]', e.type, "\n\t" + "state : " + this._state.current);
		let ws: Workspace = <Workspace>e.target;
		let pad:PixcelArtData = ws.getPixcelArtData();
		let jsonObj: any = pad.getJsonObj();
		let dot_json_str: string = JSON.stringify(jsonObj.dot_json);
		
		console.log('\n[DotJsonStr]', "\n\t", dot_json_str);
	}
	//=============================================
	// private
	//=============================================
	private _addWorkSpace = (canvasId: string) => {
		let isAdded: boolean = false;
		for (var key in this._wsList) {
			if (key == canvasId) {
				isAdded = true;
				break;
			}
		}
		if (!isAdded) {
			let ws: Workspace = new Workspace(this._state, canvasId);
			this._wsList[canvasId] = ws;
			this._activeWsId = canvasId;
			ws.addEventListener(ws.EVENT_CHANGE_WS, this._onWorkspaceChangeHandler)
		} else {
			alert("この名前のワークスペースはすでに登録されています");
		}
	}
	private _getActiveWS = () => {
		return this._wsList[this._activeWsId];
	}
	private _jsonFileDownload = (jsonObj : any, filename:string = "dot.json") => {
		const jsonStr :string = JSON.stringify(jsonObj.dot_json);
		console.log('\n[DotJsonStr]', "\n\t", jsonStr);
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
					console.log('書き込み完了');
				} catch (error) {
					console.log('書き込み失敗');
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
			}
		})();
	}
	//=============================================
	// public
	//=============================================
	//=============================================
	// getter/setter
	//=============================================
}