import { State } from "../model/State";
import { PixcelArtData } from "../model/data/PixcelArtData";
import { Workspace } from "../view/canvas/workspace/Workspace";
import { ColorPalette } from "../view/ui/ColorPalette";
import { EditBtns } from "../view/ui/EditBtns";
import { FileDropdownMenu } from "../view/ui/FileDropdownMenu";
import { HistoryBtns } from "../view/ui/HistoryBtns";
import { LocalConnector } from "./file/LocalConnector";
import { LocalStorageConnector } from "./file/LocalStorageConnector";

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

	private _fdm: FileDropdownMenu;
	private _hb: HistoryBtns;
	private _eb: EditBtns;
	private _cp: ColorPalette;

	private _lc: LocalConnector;
	private _lsc: LocalStorageConnector;

	private _wsList: { [key: string]: Workspace };
	private _activeWsId: string;
	//=============================================
	// constructor
	//=============================================
	constructor() {
		this._state = new State();
		
		this._fdm = new FileDropdownMenu(this._state);
		this._eb = new EditBtns(this._state);
		this._hb = new HistoryBtns(this._state);
		this._cp = new ColorPalette(this._state);

		this._lc = new LocalConnector();
		this._lsc = new LocalStorageConnector();

		this._wsList = {};
		
		this._addWorkSpace('workspace1');

		this._fdm.addEventListener(this._fdm.EVENT_OPEN_FILE_DROPDOWN, this._onOpenFileDropdownMenuHandler);
		this._fdm.addEventListener(this._fdm.EVENT_CLOSE_FILE_DROPDOWN, this._onCloseFileDropdownMenuHandler);
		this._fdm.addEventListener(this._fdm.EVENT_SELECT_MENU_FILE_DROPDOWN, this._onSelectMenuFileDropdownMenuHandler);
		this._hb.addEventListener(this._hb.EVENT_CLICK_HISTORY_BTN, this._onClickHistoryBtnHandler);
		//this._hb.addEventListener(this._hb.EVENT_REDO_HIDSTORY, this._onRedoHistoryHandler);
		this._eb.addEventListener(this._eb.EVENT_CLICK_EDIT_BTN, this._onClickEditBtnHandler);
		this._cp.addEventListener(this._cp.EVENT_CHANGE_COLOR, this._onChangeColorPaletteHandler);

		this._lc.addEventListener(this._lc.EVENT_LOAD_JSON_COMPLETE, this._onLoadJsonFromLocalCompleteHandler);

		//window.addEventListener('beforeunload', this._onBeforeunloadHandler);

		//this._lc.addEventListener(this._lc.EVENT_SAVE_JSON_COMPLETE, this._onSaveJsonToLocalCompleteHandler);
		//カラーパレットの初期化　イベントリスナーを登録したあとに実行しないと色々うごかないのでここで実行
		this._cp.init();

		let pad:PixcelArtData = this._lsc.load();
		if(!pad){
			//LocalStorageがなければ空のデータを作成する
			pad = new PixcelArtData(true);
		}
		this._setPixcelArtData2WorkSpace(pad);
	}
	//=============================================
	// event handler
	//=============================================
	//----------HistoryBtns----------
	private _onClickHistoryBtnHandler = (e: Event) => {
		//console.log('\n[Event]', e.type, "\n\t" + "state : " + this._state.current);
		this._eb.reset();
		let ws: Workspace = this._getActiveWorkSpace();
		
		ws.isAbleDraw = false;
		if(this._state.current == State.HISTORY_UNDO){
			ws.undo();
		}else if(this._state.current == State.HISTORY_REDO){
			ws.redo();
		}
	}
	//----------EditBtns----------
	private _onClickEditBtnHandler = (e: Event) => {
		//console.log('\n[Event]', e.type, "\n\t" + "state : " + this._state.current);
		let ws: Workspace = this._getActiveWorkSpace();
		ws.isAbleDraw = true;
	}
	//----------ColorPalette----------

	private _onChangeColorPaletteHandler = (e: Event) => {
		let ws: Workspace = this._getActiveWorkSpace();
		let color: string = this._cp.getHexColorCode();
		//console.log('\n[Event]', e.type, "\n\t" + "color : " + color);
		ws.setHexColorCode(color);
	}
	//----------FileDropdownMenu----------
	//ドロップダウンメニューが開いた
	private _onOpenFileDropdownMenuHandler = (e: Event) => {
		console.log('\n[Event]', e.type, "\n\t" + "state : " + this._state.current);
		this._eb.reset();
		let ws: Workspace = this._getActiveWorkSpace();
		ws.isAbleDraw = false;
		//this._fdm.reset();
	}
	//ドロップダウンメニューが閉じた
	private _onCloseFileDropdownMenuHandler = (e: Event) => {
	}
	//ドロップダウンメニューの中のメニューを選択した
	private _onSelectMenuFileDropdownMenuHandler = (e: Event) => {
		console.log('\n[Event]', e.type, "\n\t" + "state : " + this._state.current);
		let ws: Workspace;
		let pad: PixcelArtData;
		if(this._state.current == State.FILE_NEW){
			//新規作成
			ws = this._getActiveWorkSpace();
			pad = new PixcelArtData(true);
			ws.setPixcelArtData(pad);
		}else if(this._state.current == State.FILE_LOAD_JSON_FROM_LOCAL){
			//ローカルからJSONファイルを読み込み
			ws = this._getActiveWorkSpace();
			pad = ws.getPixcelArtData();
			this._lc.loadJson();
		}else if(this._state.current == State.FILE_SAVE_JSON_TO_LOCAL){
			//ローカルにJSONファイルを保存
			ws = this._getActiveWorkSpace();
			pad = ws.getPixcelArtData();
			this._lc.saveJson(pad);
		}else if(this._state.current == State.FILE_SAVE_SVG_TO_LOCAL){
			//ローカルにSVGファイルを保存
			ws = this._getActiveWorkSpace();
			pad = ws.getPixcelArtData();
			this._lc.saveSvg(pad);
		}
	}
	//----------Workspace----------
	//ワークスペースの変更
	private _onWorkspaceChangeHandler = (e: Event) => {
		console.log('\n[Event]', e.type, "\n\t" + "state : " + this._state.current);
		let ws: Workspace = <Workspace>e.target;
		if (ws.hasPrevLog) {
			this._hb.undoBtnDisactive(false);
		} else {
			this._hb.undoBtnDisactive(true);
		}
		if (ws.hasNextLog) {
			this._hb.redoBtnDisactive(false);
		} else {
			this._hb.redoBtnDisactive(true);
		}
		
		let pad : PixcelArtData = ws.getPixcelArtData();
		//ローカルストレージにデータを保存
		this._lsc.save(pad);

	}
	//----------LocalConnector----------
	//JSONファイルの読み込み完了
	private _onLoadJsonFromLocalCompleteHandler = (e: Event) => {
		let pad : PixcelArtData = this._lc.loadResultPad;
		if(pad != null){
			console.log('\n[Event]', e.type);
			this._setPixcelArtData2WorkSpace(pad);
		}
	}
	/*
	//JSONファイルの保存完了
	private _onSaveJsonToLocalCompleteHandler = (e: Event) => {
		console.log(this._state.current);
	}
	*/
	
	//----------Window----------
	private _onBeforeunloadHandler = (e:BeforeUnloadEvent) =>{
		e.preventDefault();
		e.returnValue = "";
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
		ws.setPixcelArtData(pad);
		
		//カラーパレットに色を反映
		let colorList: Array<string> = pad.getHexColorCodeList();
		this._cp.setHexColorList(colorList);
	}
	//=============================================
	// public
	//=============================================
	//=============================================
	// getter/setter
	//=============================================
}