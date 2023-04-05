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
		//let ws: Workspace = this._getActiveWS();
	}
	//ドロップダウンメニューが閉じた
	private _onCloseFileDropdownMenuHandore = (e: Event) => {
	}
	//ドロップダウンメニューの中のメニューを選択した
	private _onMenuSelectFileDropdownMenuHandore = (e: Event) => {
		let ws: Workspace;
		let pad: PixcelArtData;
		if(this._state.current == State.FILE_LOAD_JSON_FROM_LOCAL){
			console.log("JSONファイルの読み込み");
			//ws = this._getActiveWS();
		}else if(this._state.current == State.FILE_SAVE_JSON_TO_LOCAL){
			console.log("JSONファイルの保存");
			ws = this._getActiveWS();
			pad = ws.getPixcelArtData();
			let json: any = pad.getJson();
			let dot_json_str: string = JSON.stringify(json.dot_json);
			//console.log(dot_json_str);
			this._jsonFileDownload(dot_json_str);
		}
	}
	//----------Workspace----------
	//ワークスペースの変更
	private _onWorkspaceChangeHandler = (e: Event) => {
		let ws: Workspace = <Workspace>e.target;
		let pad: PixcelArtData = ws.getPixcelArtData();
		let json: any = pad.getJson();
		let dot_json_str: string = JSON.stringify(json.dot_json);
		//console.log(dot_json_str);
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
	private _jsonFileDownload = (json : string, filename:string = "dot.json") => {
		console.log(json);
		const blob :Blob = new Blob([json], { type: 'application/json' });
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
	//=============================================
	// public
	//=============================================
	//=============================================
	// getter/setter
	//=============================================
}