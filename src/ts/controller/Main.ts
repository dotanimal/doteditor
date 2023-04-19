import { State } from "../model/State";
import { PixcelArtData } from "../model/data/PixcelArtData";
import { Workspace } from "../view/canvas/workspace/Workspace";
import { ColorPalette } from "../view/ui/ColorPalette";
import { EditBtns } from "../view/ui/EditBtns";
import { FileDropdownMenu } from "../view/ui/FileDropdownMenu";
import { HistoryBtns } from "../view/ui/HistoryBtns";
import { LocalConnector } from "../model/connector/LocalConnector";
import { LocalStorageConnector } from "../model/connector/LocalStorageConnector";
import { WPConector } from "../model/connector/WPConnector";
import { SaveToWPController } from "./SaveToWPController";
import { LoadFromWPController } from "./LoadFromWPController";

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

	private _stwpCtrl: SaveToWPController;
	private _lfwpCtrl: LoadFromWPController;

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

		let wpc:WPConector = new WPConector(this._state);
		this._stwpCtrl = new SaveToWPController(this._state, wpc);
		this._lfwpCtrl = new LoadFromWPController(this._state, wpc);

		this._wsList = {};
		
		this._addWorkSpace('workspace1');

		this._fdm.addEventListener(this._fdm.EVENT_OPEN_FILE_DROPDOWN, this._onOpenFileDropdownMenuHandler);
		this._fdm.addEventListener(this._fdm.EVENT_CLOSE_FILE_DROPDOWN, this._onCloseFileDropdownMenuHandler);
		this._fdm.addEventListener(this._fdm.EVENT_SELECT_MENU_FILE_DROPDOWN, this._onSelectMenuFileDropdownMenuHandler);
		this._hb.addEventListener(this._hb.EVENT_CLICK_HISTORY_BTN, this._onClickHistoryBtnHandler);
		this._eb.addEventListener(this._eb.EVENT_CLICK_EDIT_BTN, this._onClickEditBtnHandler);
		this._cp.addEventListener(this._cp.EVENT_CHANGE_COLOR, this._onChangeColorPaletteHandler);

		this._lc.addEventListener(this._lc.EVENT_LOAD_JSON_COMPLETE, this._onLoadJsonFromLocalCompleteHandler);

		this._lfwpCtrl.addEventListener(LoadFromWPController.EVENT_SELECT_THUMB, this._onLoadFromWPHandler);
		//window.addEventListener('beforeunload', this._onBeforeunloadHandler);


		let pad:PixcelArtData = this._lsc.load();
		if(!pad){
			//LocalStorageがなければ空のデータを作成する
			pad = new PixcelArtData(true);
		}
		this._setPixcelArtData2WorkSpace(pad);
		//カラーパレットに色を反映
		//let colorList: Array<string> = pad.getHexColorCodeList();
		//this._cp.setHexColorList(colorList);

		//this._lc.addEventListener(this._lc.EVENT_SAVE_JSON_COMPLETE, this._onSaveJsonToLocalCompleteHandler);
		//カラーパレットの初期化　イベントリスナーを登録したあとに実行しないと色々うごかないのでここで実行
		this._cp.init();
	}
	//=============================================
	// event handler
	//=============================================
	//----------HistoryBtns----------
	private _onClickHistoryBtnHandler = (e: Event) => {
		//console.log('\n[Event]', e.type, "\n\t" + "state : " + this._state.current);
		//this._eb.reset();
		this._changeState();
		
		let ws: Workspace = this._getActiveWorkSpace();
		//ws.isAbleDraw = false;
		if(this._state.current== State.HISTORY_UNDO){
			ws.undo();
		}else if(this._state.current== State.HISTORY_REDO){
			ws.redo();
		}
	}
	//----------EditBtns----------
	private _onClickEditBtnHandler = (e: Event) => {
		//console.log('\n[Event]', e.type, "\n\t" + "state : " + this._state.current);
		this._changeState();
		//ws.isAbleDraw = true;
	}
	//----------ColorPalette----------
	private _onChangeColorPaletteHandler = (e: Event) => {
		let hexColor : string = this._cp.hexColor;
		let ws: Workspace = this._getActiveWorkSpace();
		ws.hexColor = hexColor;
	}
	//----------FileDropdownMenu----------
	//ドロップダウンメニューが開いた
	private _onOpenFileDropdownMenuHandler = (e: Event) => {
		console.log('\n[Event]', e.type, "\n\t" + "state : " + this._state.current);
		//this._eb.reset();
		this._changeState();
		//ws.isAbleDraw = false;
		//this._fdm.reset();
	}
	//ドロップダウンメニューが閉じた
	private _onCloseFileDropdownMenuHandler = (e: Event) => {
	}
	//ドロップダウンメニューの中のメニューを選択した
	private _onSelectMenuFileDropdownMenuHandler = (e: Event) => {
		console.log('\n[Event]', e.type, "\n\t" + "state : " + this._state.current);

		this._changeState();
		
		let ws: Workspace;
		let pad: PixcelArtData;
		if(this._state.current== State.FILE_NEW){
			//新規作成
			ws = this._getActiveWorkSpace();
			pad = new PixcelArtData(true);
			ws.setPixcelArtData(pad);
		}else if(this._state.current== State.FILE_LOAD_JSON_FROM_LOCAL){
			//ローカルからJSONファイルを読み込み
			ws = this._getActiveWorkSpace();
			pad = ws.getPixcelArtData();
			this._lc.loadJson();
		}else if(this._state.current== State.FILE_SAVE_JSON_TO_LOCAL){
			//ローカルにJSONファイルを保存
			ws = this._getActiveWorkSpace();
			pad = ws.getPixcelArtData();
			this._lc.saveJson(pad);
		}else if(this._state.current== State.FILE_SAVE_SVG_TO_LOCAL){
			//ローカルにSVGファイルを保存
			ws = this._getActiveWorkSpace();
			pad = ws.getPixcelArtData();
			this._lc.saveSvg(pad);
		}else if(this._state.current== State.FILE_LOAD_PAGE_SPLIT_LIST_FROM_WP){
			//WPからリストを取得
			ws = this._getActiveWorkSpace();
			//pad = ws.getPixcelArtData();
			this._lfwpCtrl.open();
		}else if(this._state.current== State.FILE_UPDATE_TO_WP){
			//WPに上書き保存
			ws = this._getActiveWorkSpace();
			pad = ws.getPixcelArtData();
			this._stwpCtrl.open(pad);
		}else if(this._state.current== State.FILE_POST_TO_WP){
			//WPに新規保存
			ws = this._getActiveWorkSpace();
			pad = ws.getPixcelArtData();
			this._stwpCtrl.open(pad);
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
	private _onGetHexColorHander = (e: Event) => {
		let ws: Workspace = <Workspace>e.target;
		this._cp.hexColor =  ws.hexColor;
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
	//----------LoadFromWPController----------
	//WordPressからの読み込み完了
	private _onLoadFromWPHandler = (e: Event) => {
		let pad : PixcelArtData = this._lfwpCtrl.loadResultPad;
		if(pad != null){
			console.log('\n[Event]', e.type);
			this._setPixcelArtData2WorkSpace(pad);
		}
	}
	
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
			ws.addEventListener(ws.EVENT_CHANGE_WS, this._onWorkspaceChangeHandler);
			ws.addEventListener(ws.EVENT_EXTRACT_HEX_COLOR, this._onGetHexColorHander);
		} else {
			alert("この名前のワークスペースはすでに登録されています");
		}
	}
	/*WSを削除するときに使う（未完成）
	private _removeWorkSpace = (canvasId: string) => {
		let isAdded: boolean = false;
		let ws: Workspace = this._wsList[canvasId];
		if(ws){
			//_wslistから取り除いて、のこりのWSから_activeWsIdを設定する必要がある
			this._wsList; ←
			this._activeWsId; ←
			ws.removeEventListener(ws.EVENT_CHANGE_WS, this._onWorkspaceChangeHandler);
			ws.removeEventListener(ws.EVENT_EXTRACT_HEX_COLOR, this._onGetHexColorHander);
		}else{
			alert("この名前のワークスペースはありません");
		}
	}
	*/
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
	private _changeState = () => {
		this._eb.changedState();
		this._hb.changedState();
		this._fdm.changedState();
		this._cp.changedState();
		
		let ws: Workspace = this._getActiveWorkSpace();
		ws.changedState();
	}
	//=============================================
	// public
	//=============================================
	//=============================================
	// getter/setter
	//=============================================
}