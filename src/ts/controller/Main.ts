import { State } from "../model/State";
import { PixcelArtData } from "../model/data/PixcelArtData";
import { Workspace } from "../view/canvas/workspace/Workspace";
import { ColorPalette } from "../view/ui/ColorPalette";
import { EditBtns } from "../view/ui/EditBtns";
import { FileDropdownMenu } from "../view/ui/FileDropdownMenu";
import { HistoryBtns } from "../view/ui/HistoryBtns";
import { LocalConnector } from "../model/connector/LocalConnector";
import { LocalStorageConnector } from "../model/connector/LocalStorageConnector";
import { SaveToWPController } from "./SaveToWPController";
import { LoadFromWPController } from "./LoadFromWPController";
import { DrawLayerData } from "../model/data/DrawLayerData";
import Split from 'split.js';
import { PreviewController } from "./PreviewController";
import { KeyBindManager } from "../model/KeyBindManager";

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
	private _prvwCtrl:PreviewController;

	private _wsList: { [key: string]: Workspace };
	private _activeWsId: string;

	//private _selectDLD:DrawLayerData;
	//=============================================
	// constructor
	//=============================================
	constructor() {
		this._state = new State();
		
		//キーバインドの設定
		let km:KeyBindManager = new KeyBindManager();
		
		this._fdm = new FileDropdownMenu(this._state);
		this._eb = new EditBtns(this._state, km);
		this._hb = new HistoryBtns(this._state);
		this._cp = new ColorPalette(this._state);

		this._lc = new LocalConnector();
		this._lsc = new LocalStorageConnector();

		//let wpc:WPConector = new WPConector(this._state);
		this._stwpCtrl = new SaveToWPController(this._state);
		this._lfwpCtrl = new LoadFromWPController(this._state);
		this._prvwCtrl = new PreviewController(this._state);

		this._wsList = {};
		
		this._addWorkSpace('workspace1');
		this._addWorkSpace('workspace2');

		this._fdm.addEventListener(this._fdm.EVENT_OPEN_FILE_DROPDOWN, this._onOpenFileDropdownMenuHandler);
		this._fdm.addEventListener(this._fdm.EVENT_CLOSE_FILE_DROPDOWN, this._onCloseFileDropdownMenuHandler);
		this._fdm.addEventListener(this._fdm.EVENT_SELECT_MENU_FILE_DROPDOWN, this._onSelectMenuFileDropdownMenuHandler);
		this._hb.addEventListener(this._hb.EVENT_CLICK_HISTORY_BTN, this._onClickHistoryBtnHandler);
		this._eb.addEventListener(this._eb.EVENT_CLICK_EDIT_BTN, this._onClickEditBtnHandler);
		this._cp.addEventListener(this._cp.EVENT_CHANGE_COLOR, this._onChangeColorPaletteHandler);

		this._lc.addEventListener(this._lc.EVENT_LOAD_JSON_COMPLETE, this._onLoadJsonFromLocalCompleteHandler);

		this._lfwpCtrl.addEventListener(LoadFromWPController.EVENT_SELECT_THUMB, this._onLoadFromWPHandler);
		//window.addEventListener('beforeunload', this._onBeforeunloadHandler);

		//ワークスペースにローカルストレージのデータを反映
		for (var key in this._wsList) {
			let ws:Workspace = this._wsList[key];
			let pad:PixcelArtData = this._lsc.load(ws.name);
			if(!pad){
				//LocalStorageがなければ空のデータを作成する
				pad = new PixcelArtData(true);
			}
			this._setPixcelArtData2WorkSpace(ws, pad);
		}

		this._setSplit();


		//アクティブワークスペースを設定
		let ws:Workspace = <Workspace>this._wsList["workspace1"];
		this._wsActiveChange(ws);
		//this._prvwCtrl.setPad(ws.getPixcelArtData());

		
		//最後に初期化が必要なもの
		this._cp.init();
		this._eb.init();
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
		
		if(this._state.current == State.SELECT_COPY){
			let ws: Workspace = this._getActiveWorkSpace();
			let dld:DrawLayerData = ws.getSelectRangeDLD(false);
			for (var key in this._wsList) {
				ws = this._wsList[key];
				ws.setSelectRangeDLD(dld);
			}
		}else if(this._state.current == State.SELECT_CUT){
			let ws: Workspace = this._getActiveWorkSpace();
			let dld:DrawLayerData = ws.getSelectRangeDLD(true);
			for (var key in this._wsList) {
				ws = this._wsList[key];
				ws.setSelectRangeDLD(dld);
			}
		}
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

		let ws: Workspace = this._getActiveWorkSpace();
		let pad: PixcelArtData = ws.getPixcelArtData();
		
		if(!pad.id){
			//ワークスペースの内容はWPから読み込まれたものではない
			this._state.setCurrent(State.FILE_MENU_OPEN_WS_IS_NEW_DRAW);
		}
		if(pad.width < 1 || pad.height < 1){
			//ワークスペースに描画がない
			this._state.setCurrent(State.FILE_MENU_OPEN_WS_IS_NO_DRAW);
		}


		this._changeState();
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
			this._wsActiveChange(ws);
			/*
			ws.active();
			this._onChangeColorPaletteHandler(null);
			*/
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
		}else if(this._state.current== State.FILE_SAVE_PNG_TO_LOCAL){
			//ローカルにPNGファイルを保存
			ws = this._getActiveWorkSpace();
			pad = ws.getPixcelArtData();
			this._lc.savePng(pad);
		}else if(this._state.current== State.FILE_SAVE_JPEG_TO_LOCAL){
			//ローカルにJPEGファイルを保存
			ws = this._getActiveWorkSpace();
			pad = ws.getPixcelArtData();
			this._lc.saveJpeg(pad);
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
	private _onWSChangeHandler = (e: Event) => {
		console.log('\n[Event]', e.type, "\n\t" + "state : " + this._state.current);
		let ws: Workspace = <Workspace>e.target;
		this._setupHistoryBtn(ws);
		
		//コピーまたはカットが終わった
		if(this._state.current == State.SELECT_END){
			this._changeState();
			//this._state.setCurrent(null);
		}
		
		let pad : PixcelArtData = ws.getPixcelArtData();

		//プレビューに反映
		this._prvwCtrl.setPad(pad);
		
		//ローカルストレージにデータを保存
		this._lsc.save(ws.name, pad);

	}
	//色の取得
	private _onGetHexColorHandler = (e: Event) => {
		let ws: Workspace = <Workspace>e.target;
		this._cp.hexColor =  ws.hexColor;
	}
	//ワークスペースへのマウスダウン
	private _onWSMouseDownHandler = (e: Event) => {
		let ws: Workspace = <Workspace>e.target;
		//console.log("mousedown", ws.name);
		let targetWsId : string = ws.name;
		if(this._activeWsId != targetWsId){
			//アクティブWSの変更
			for (var key in this._wsList) {
				ws = this._wsList[key];
				if (key == targetWsId) {
					this._wsActiveChange(ws);
				}else{
					ws.inactive();
				}
			}
		}
	}
	//----------LocalConnector----------
	//JSONファイルの読み込み完了
	private _onLoadJsonFromLocalCompleteHandler = (e: Event) => {
		let pad : PixcelArtData = this._lc.loadResultPad;
		if(pad != null){
			console.log('\n[Event]', e.type);
			let ws: Workspace = this._getActiveWorkSpace();
			this._setPixcelArtData2WorkSpace(ws, pad);
		}
	}
	//----------LoadFromWPController----------
	//WordPressからの読み込み完了
	private _onLoadFromWPHandler = (e: Event) => {
		let pad : PixcelArtData = this._lfwpCtrl.loadResultPad;
		if(pad != null){
			console.log('\n[Event]', e.type);
			let ws: Workspace = this._getActiveWorkSpace();
			this._setPixcelArtData2WorkSpace(ws, pad);
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
			ws.addEventListener(Workspace.EVENT_CHANGE_WS, this._onWSChangeHandler);
			ws.addEventListener(Workspace.EVENT_EXTRACT_HEX_COLOR_WS, this._onGetHexColorHandler);
			ws.addEventListener(Workspace.EVENT_MOUSE_DOWN_WS, this._onWSMouseDownHandler);
		} else {
			alert("この名前のワークスペースはすでに登録されています");
		}
	}
	private _getActiveWorkSpace = () => {
		return this._wsList[this._activeWsId];
	}
	private _setPixcelArtData2WorkSpace = (ws:Workspace, pad: PixcelArtData) => {
		//console.log("MainController : _setPixcelArtData2WS");
		//タイトルの反映
		//this._titleTxtInput.value = pad.title;

		//ワークスペースにデータを反映
		//let ws: Workspace = this._getActiveWorkSpace();
		ws.setPixcelArtData(pad);
		
		//カラーパレットに色を反映
		let colorList: Array<string> = pad.getHexColorCodeList();
		this._cp.setHexColorList(colorList);
	}
	private _setupHistoryBtn = (ws:Workspace):void =>{
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
	} 
	private _wsActiveChange = (ws:Workspace):void =>{
		ws.active();
		this._activeWsId = ws.name;
		
		//プレビューに反映
		this._prvwCtrl.setPad(ws.getPixcelArtData());

		let hexColor : string = this._cp.hexColor;
		ws.hexColor = hexColor;

		this._setupHistoryBtn(ws);
	}
	private _changeState = () => {
		this._eb.changedState();
		this._hb.changedState();
		this._fdm.changedState();
		this._cp.changedState();
		

		for (var key in this._wsList) {
			let ws:Workspace = this._wsList[key];
			ws.changedState();
		}

		//let ws: Workspace = this._getActiveWorkSpace();
		//ws.changedState();
	}
	private _setSplit =():void =>{
		let sizes:any = localStorage.getItem('dotanimal-doteditor-split-sizes'); //LocalStrage
		if (sizes) {
			sizes = JSON.parse(sizes);
		} else {
			sizes = [50, 50] // デフォルトのサイズ
		}
		Split([
			
			'#workspace1Container', //分割対象となるセレクタを指定　
			'#workspace2Container',
			], {
			sizes: sizes,
			minSize: 50, //画面の最小値
			maxSize: 501, //画面の最大値
			gutterSize: 16, //画面領域を変更するハンドルのサイズ
			snapOffset: 5, //ハンドルから画面端までの距離がここで指定した数値よりも下回ったらハンドルを画面端に吸着する
			direction:"horizontal", //分割の方向
			onDragEnd: function (sizes) {
				localStorage.setItem('dotanimal-doteditor-split-sizes', JSON.stringify(sizes)) //幅を変更するたびにLocalStrageに保存
			},
		});
	}
	//=============================================
	// public
	//=============================================
	//=============================================
	// getter/setter
	//=============================================
}