import { State } from "../model/State";
import { PixcelArtData } from "../model/data/PixcelArtData";
import { Workspace } from "../view/canvas/workspace/Workspace";
import { ColorPalette } from "../view/ui/ColorPalette";
import { EditBtns } from "../view/ui/EditBtns";
import { FileDropdownMenu } from "../view/ui/FileDropdownMenu";
import { LocalConnector } from "./file/LocalConnector";

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

	private _lc: LocalConnector;

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

		this._lc = new LocalConnector(this._state);

		this._wsList = {};
		
		this._addWorkSpace('workspace1');

		this._eb.addEventListener(this._eb.EVENT_CHANGE_BTN, this._onChangeEditBtnsHandler);
		this._cp.addEventListener(this._cp.EVENT_CHANGE_COLOR, this._onChangeColorPaletteHandler);
		this._fdm.addEventListener(this._fdm.EVENT_DROPDOWN_OPEN, this._onOpenFileDropdownMenuHandler);
		this._fdm.addEventListener(this._fdm.EVENT_DROPDOWN_CLOSE, this._onCloseFileDropdownMenuHandler);
		this._fdm.addEventListener(this._fdm.EVENT_DROPDOWN_MENU_SELECT, this._onMenuSelectFileDropdownMenuHandler);

		this._lc.addEventListener(this._lc.EVENT_LOAD_JSON_COMPLETE, this._onLoadJsonFromLocalCompleteHandler);
		this._lc.addEventListener(this._lc.EVENT_SAVE_JSON_COMPLETE, this._onSaveJsonToLocalCompleteHandler);
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
		let ws: Workspace = this._getActiveWorkSpace();
		let color: string = this._cp.getHexColorCode();
		ws.setHexColorCode(color);
		console.log('\n[Event]', e.type, "\n\t" + "color : " + color);
	}
	//----------FileDropdownMenu----------
	//ドロップダウンメニューが開いた
	private _onOpenFileDropdownMenuHandler = (e: Event) => {
		console.log('\n[Event]', e.type, "\n\t" + "state : " + this._state.current);
		this._eb.reset();
		let ws: Workspace = this._getActiveWorkSpace();
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
	private _onCloseFileDropdownMenuHandler = (e: Event) => {
	}
	//ドロップダウンメニューの中のメニューを選択した
	private _onMenuSelectFileDropdownMenuHandler = (e: Event) => {
		console.log('\n[Event]', e.type, "\n\t" + "state : " + this._state.current);
		let ws: Workspace;
		let pad: PixcelArtData;
		if(this._state.current == State.FILE_LOAD_JSON_FROM_LOCAL){
			ws = this._getActiveWorkSpace();
			pad = ws.getPixcelArtData();
			this._lc.loadJson();
		}else if(this._state.current == State.FILE_SAVE_JSON_TO_LOCAL){
			ws = this._getActiveWorkSpace();
			pad = ws.getPixcelArtData();
			this._lc.saveJson(pad);
		}
	}
	//----------Workspace----------
	//ワークスペースの変更
	private _onWorkspaceChangeHandler = (e: Event) => {
		console.log('\n[Event]', e.type, "\n\t" + "state : " + this._state.current);
		let ws: Workspace = <Workspace>e.target;
		let pad:PixcelArtData = ws.getPixcelArtData();
		let jsonObj: any = pad.getJsonObj();
	}
	//----------LocalConnector----------
	//読み込み完了
	private _onLoadJsonFromLocalCompleteHandler = (e: Event) => {
		let pad : PixcelArtData = this._lc.loadResultPad;
		if(pad != null){
			console.log('\n[Event]', e.type);
			this._setPixcelArtData2WorkSpace(pad);
		}
	}
	//保存完了
	private _onSaveJsonToLocalCompleteHandler = (e: Event) => {
		console.log(this._state.current);
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
	private _getActiveWorkSpace = () => {
		return this._wsList[this._activeWsId];
	}
	private _setPixcelArtData2WorkSpace = (pad: PixcelArtData) => {
		//console.log("MainController : _setPixcelArtData2WS");
		//タイトルの反映
		//this._titleTxtInput.value = pad.title;

		//ワークスペースにデータを反映
		let ws: Workspace = this._getActiveWorkSpace();
		ws.setData(pad);
		
		//カラーパレットに色を反映
		let colorList: Array<string> = pad.getHexColorCodeList();
		this._cp.setHexColorList(colorList);

		//ws.saveLog();
	}
	//=============================================
	// public
	//=============================================
	//=============================================
	// getter/setter
	//=============================================
}