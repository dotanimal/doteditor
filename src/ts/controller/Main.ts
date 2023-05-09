import { State } from "../model/State";
import { PixcelArtData } from "../model/data/PixcelArtData";
import { Workspace } from "../view/canvas/workspace/Workspace";
import { EditBtns } from "../view/ui/EditBtns";
import { HistoryBtns } from "../view/ui/HistoryBtns";
import { LocalConnector } from "../model/connector/LocalConnector";
import { LocalStorageConnector } from "../model/connector/LocalStorageConnector";
import { DrawLayerData } from "../model/data/DrawLayerData";
import Split from 'split.js';
import { PreviewController } from "./PreviewController";
import { KeyBindManager } from "../model/KeyBindManager";
import { LayerPanelController } from "./LayerPanelController";
import { DraggableWindow } from "../view/ui/DraggableWindow";
import { SpWorkspaceTabs } from "../view/ui/SpWorkspaceTabs";
import { FileMenu } from "../view/ui/filemenu/FileMenu";
import { LoadFromWPController } from "./loadFromWp/LoadFromWPController";
import { SaveToWPController } from "./saveToWp/SaveToWPController";
import { PcColorpaletteController } from "./colorpalette/PcColorpaletteController";
import { SpColorpaletteController } from "./colorpalette/SpColorpaletteController";
import { ColorpaletteController } from "./colorpalette/ColorpaletteController";
import { PcDropdownFileMenu } from "../view/ui/filemenu/PcDropdownFileMenu";
import { PcModalSaveToWPController } from "./saveToWp/PcModalSaveToWPController";
import { PcModalLoadFromWPController } from "./loadFromWp/PcModalLoadFromWPController";
import { SpOffcanvasFileMenu } from "../view/ui/filemenu/SpOffcanvasFileMenu";
import { SpOffcanvasSaveToWPController } from "./saveToWp/SpOffcanvasSaveToWPController";
import { SpOffcanvasLoadFromWPController } from "./loadFromWp/SpOffcanvasLoadFromWPController";
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

	private _fm: FileMenu;
	private _hb: HistoryBtns;
	private _eb: EditBtns;
	private _lc: LocalConnector;
	private _lsc: LocalStorageConnector;

	private _stwpCtrl: SaveToWPController;
	private _lfwpCtrl: LoadFromWPController;
	private _prvwCtrl:PreviewController;
	private _lypnCtrl:LayerPanelController;
	private _cpCtrl:ColorpaletteController;

	private _spWsTab:SpWorkspaceTabs;

	private _wsList: { [key: string]: Workspace };
	private _activeWsId: string;
	//=============================================
	// constructor
	//=============================================
	constructor() {
		this._state = new State();
		
		if(this._state.device == State.DEVICE_PC){
			this._pcInit();
		}else if(this._state.device == State.DEVICE_SP){
			this._spInit();
		}
	}
	private _pcInit = ():void => {
		//キーバインドの設定
		let km:KeyBindManager = new KeyBindManager();
		
		this._fm = new PcDropdownFileMenu(this._state);
		this._eb = new EditBtns(this._state, km);
		this._hb = new HistoryBtns(this._state);

		this._lc = new LocalConnector();
		this._lsc = new LocalStorageConnector();

		this._stwpCtrl = new PcModalSaveToWPController(this._state);
		this._lfwpCtrl = new PcModalLoadFromWPController(this._state);
		this._prvwCtrl = new PreviewController(this._state);
		this._lypnCtrl = new LayerPanelController(this._state);
		//this._cppnCtrl = new PcColorpaletteController(this._state);
		this._cpCtrl = new PcColorpaletteController(this._state);

		this._wsList = {};

		let dotSize:number = 16;
		let stageMargin:number = 2;
		this._addWorkSpace('workspace1', dotSize, stageMargin);
		this._addWorkSpace('workspace2', dotSize, stageMargin);

		this._fm.addEventListener(FileMenu.EVENT_OPEN_FILE_MENU, this._onOpenFileDropdownMenuHandler);
		this._fm.addEventListener(FileMenu.EVENT_CLOSE_FILE_MENU, this._onCloseFileDropdownMenuHandler);
		this._fm.addEventListener(FileMenu.EVENT_SELECT_ITEM_FILE_MENU, this._onSelectMenuFileDropdownMenuHandler);
		this._hb.addEventListener(this._hb.EVENT_CLICK_HISTORY_BTN, this._onClickHistoryBtnHandler);
		this._eb.addEventListener(this._eb.EVENT_CLICK_EDIT_BTN, this._onClickEditBtnHandler);

		this._lc.addEventListener(this._lc.EVENT_LOAD_JSON_COMPLETE, this._onLoadJsonFromLocalCompleteHandler);

		this._lfwpCtrl.addEventListener(LoadFromWPController.EVENT_SELECT_THUMB, this._onLoadFromWPHandler);
		this._lypnCtrl.addEventListener(LayerPanelController.EVENT_CHANGE_DATA_LAYERPANEL, this._onChangeDataLPHandler);
		this._lypnCtrl.addEventListener(LayerPanelController.EVENT_CHANGE_ACTIVELAYER_LAYERPANEL, this._onChangeActiveLaylerLPlHandler);
		this._cpCtrl.addEventListener(ColorpaletteController.EVENT_CHANGE_COLORPALETTE, this._onChangeColorPaletteHandler);

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


		//アクティブワークスペースを設定
		this._state.setCurrent(undefined);
		let ws:Workspace = <Workspace>this._wsList["workspace1"];
		this._wsActiveChange(ws);
		//this._lypnCtrl.setPad(ws.getPixcelArtData());
		//this._prvwCtrl.setPad(ws.getPixcelArtData());


		this._splitInit();
		this._windowInit();
		
		//最後に初期化が必要なもの
		//this._cp.init();
		this._eb.init();
	}
	private _spInit = ():void => {

		//キーバインドの設定
		//let km:KeyBindManager = new KeyBindManager();
		
		this._fm = new SpOffcanvasFileMenu(this._state);
		this._eb = new EditBtns(this._state);
		this._hb = new HistoryBtns(this._state);

		this._lc = new LocalConnector();
		this._lsc = new LocalStorageConnector();

		this._stwpCtrl = new SpOffcanvasSaveToWPController(this._state);
		this._lfwpCtrl = new SpOffcanvasLoadFromWPController(this._state);
		this._lypnCtrl = new LayerPanelController(this._state);
		this._cpCtrl = new SpColorpaletteController(this._state);

		this._wsList = {};
		
		let dotSize:number = 12;
		let stageMargin:number = 0;
		
		let ws1:Workspace = this._addWorkSpace('workspace1', dotSize, stageMargin);
		let ws2:Workspace = this._addWorkSpace('workspace2', dotSize, stageMargin);
		this._spDisableSpScreenEnlargement();

		this._spWsTab = new SpWorkspaceTabs(this._state);
		this._spWsTab.addTab(ws2.name, '#sp #editorBody > .nav > .nav-item:nth-child(2)');
		this._spWsTab.addTab(ws1.name, '#sp #editorBody > .nav > .nav-item:nth-child(1)');
		this._spWsTab.addEventListener(SpWorkspaceTabs.EVENT_CHANGE_SPWS_TABS, this._onChangeSpWsTabHandler);

		this._fm.addEventListener(FileMenu.EVENT_OPEN_FILE_MENU, this._onOpenFileDropdownMenuHandler);
		this._fm.addEventListener(FileMenu.EVENT_CLOSE_FILE_MENU, this._onCloseFileDropdownMenuHandler);
		this._fm.addEventListener(FileMenu.EVENT_SELECT_ITEM_FILE_MENU, this._onSelectMenuFileDropdownMenuHandler);
		this._hb.addEventListener(this._hb.EVENT_CLICK_HISTORY_BTN, this._onClickHistoryBtnHandler);
		this._eb.addEventListener(this._eb.EVENT_CLICK_EDIT_BTN, this._onClickEditBtnHandler);

		this._lc.addEventListener(this._lc.EVENT_LOAD_JSON_COMPLETE, this._onLoadJsonFromLocalCompleteHandler);

		this._lfwpCtrl.addEventListener(LoadFromWPController.EVENT_SELECT_THUMB, this._onLoadFromWPHandler);
		this._lypnCtrl.addEventListener(LayerPanelController.EVENT_CHANGE_DATA_LAYERPANEL, this._onChangeDataLPHandler);
		this._lypnCtrl.addEventListener(LayerPanelController.EVENT_CHANGE_ACTIVELAYER_LAYERPANEL, this._onChangeActiveLaylerLPlHandler);
		//this._cppnCtrl.addEventListener(ColorpalettePanelController.EVENT_CHANGE_COLORPALETTE, this._onChangeColorPaletteHandler2);
		this._cpCtrl.addEventListener(ColorpaletteController.EVENT_CHANGE_COLORPALETTE, this._onChangeColorPaletteHandler);
		
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

		//アクティブワークスペースを設定
		this._state.setCurrent(undefined);
		let ws:Workspace = <Workspace>this._wsList["workspace1"];
		this._wsActiveChange(ws);
		//this._lypnCtrl.setPad(ws.getPixcelArtData());
		//this._prvwCtrl.setPad(ws.getPixcelArtData());

		window.addEventListener("orientationchange resize", function() {
			
		});
		//ws = <Workspace>this._wsList["workspace2"];
		
		/*
		if(this._spPreviewList){
			let spPreview:StagePreview
			for (let key in this._spPreviewList) {
				ws = <Workspace>this._wsList[key];
				this._spWsTab
				spPreview = this._spPreviewList[key];
				spPreview.drawPad(ws.getPixcelArtData(),false);
			}
		}
		*/
		for (let key in this._wsList) {
			ws = <Workspace>this._wsList[key];
			this._spWsTab.setPad(ws.name, ws.getPixcelArtData());
		}
		
		//最後に初期化が必要なもの
		//this._cp.init();
		this._eb.init();

		this._spCover();
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
		let hexColor : string = this._cpCtrl.hexColor;
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
			//pad = ws.getPixcelArtData();
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
		//console.log(pad.getJsonObj());
		//ローカルストレージにデータを保存
		this._lsc.save(ws.name, pad);


		//最初のタイミングでは以降は実行しない
		if(this._state.current == State.INIT){return false};

		//プレビューに反映
		if(this._prvwCtrl){//★★★★★★★★★SP設定途中の条件分岐　本来は不要
			this._prvwCtrl.setPad(pad);
		}
		if(this._state.currentCategory != State.CATEGORY_LAYER){
			//レイヤーパネルに反映
			
			if(this._lypnCtrl){//★★★★★★★★★SP設定途中の条件分岐　本来は不要
				this._lypnCtrl.setPad(pad);
			}
		}
		
		if(this._spWsTab){
			for (let key in this._wsList) {
				ws = <Workspace>this._wsList[key];
				this._spWsTab.setPad(ws.name, ws.getPixcelArtData());
			}
		}
	}
	//色の取得
	private _onGetHexColorHandler = (e: Event) => {
		let ws: Workspace = <Workspace>e.target;
		//this._cp.hexColor =  ws.hexColor;
		if(this._cpCtrl){
			this._cpCtrl.hexColor = ws.hexColor;
		}
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
		let pad : PixcelArtData = this._lfwpCtrl.getPixcelArtData();
		if(pad != null){
			console.log('\n[Event]', e.type);
			let ws: Workspace = this._getActiveWorkSpace();
			this._setPixcelArtData2WorkSpace(ws, pad);
		}
	}
	//----------LayerPanelController----------
	private _onChangeDataLPHandler = (e:Event) => {
		let pad : PixcelArtData = this._lypnCtrl.getPad();
		if(pad != null){
			//console.log('\n[Event]', e.type, pad.getJsonObj());
			let ws: Workspace = this._getActiveWorkSpace();
			this._setPixcelArtData2WorkSpace(ws, pad);
		}
		this._changeState();
	}
	private _onChangeActiveLaylerLPlHandler = (e:Event) => {
		//let layerId:number = this._lypnCtrl.activeLayerId;
		let layerName:string = this._lypnCtrl.activeLayerName;
		let ws: Workspace = this._getActiveWorkSpace();
		ws.setActiveLayerName(layerName);
	}
	//----------SP Workspace Tab Change----------
	private _onChangeSpWsTabHandler = (e:Event) =>{
		console.log('\n[Event]', e.type, "\n\t");
		let tabs:SpWorkspaceTabs = <SpWorkspaceTabs>e.target;
		let targetWsId : string = tabs.currentId;
		let ws:Workspace = this._getActiveWorkSpace();
		
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
	//=============================================
	// private
	//=============================================
	private _addWorkSpace = (canvasId: string, dotSize:number, stageMargin:number):Workspace => {
		let isAdded: boolean = false;
		let ws:Workspace;
		for (var key in this._wsList) {
			if (key == canvasId) {
				isAdded = true;
				break;
			}
		}
		if (!isAdded) {
			ws = new Workspace(this._state, canvasId, dotSize, stageMargin);
			this._wsList[canvasId] = ws;
			this._activeWsId = canvasId;
			ws.addEventListener(Workspace.EVENT_CHANGE_WS, this._onWSChangeHandler);
			ws.addEventListener(Workspace.EVENT_EXTRACT_HEX_COLOR_WS, this._onGetHexColorHandler);
			if(this._state.device == State.DEVICE_PC){
				ws.addEventListener(Workspace.EVENT_MOUSE_DOWN_WS, this._onWSMouseDownHandler);
			}
		} else {
			alert("この名前のワークスペースはすでに登録されています");
		}
		return ws;
	}
	private _getActiveWorkSpace = () => {
		return this._wsList[this._activeWsId];
	}
	private _setPixcelArtData2WorkSpace = (ws:Workspace, pad: PixcelArtData) => {

		ws.setPixcelArtData(pad);
		
		//カラーパレットに色を反映
		let colorList: Array<string> = pad.getHexColorCodeList();

		if(this._cpCtrl){//★★★★★★★★★SP設定途中の条件分岐　本来は不要
			this._cpCtrl.setHexColorList(colorList);
		}
		
	}
	private _setupHistoryBtn = (ws:Workspace):void =>{
		if (ws.hasPrevLog) {
			this._hb.undoBtnInactive(false);
		} else {
			this._hb.undoBtnInactive(true);
		}
		if (ws.hasNextLog) {
			this._hb.redoBtnInactive(false);
		} else {
			this._hb.redoBtnInactive(true);
		}
	} 
	private _wsActiveChange = (ws:Workspace):void =>{
		console.log('\n[Main]', "ws " + ws.name + " active change", "\n\t" + "state : " + this._state.current);
		ws.active();
		this._activeWsId = ws.name;
		
		let pad:PixcelArtData = ws.getPixcelArtData();

		//プレビューに反映
		if(this._prvwCtrl){//★★★★★★★★★SP設定途中の条件分岐　本来は不要
			this._prvwCtrl.setPad(pad);
		}

		//レイヤーパネルに反映
		if(this._lypnCtrl){//★★★★★★★★★SP設定途中の条件分岐　本来は不要
			this._lypnCtrl.setPad(pad);
		}

		if(this._cpCtrl){//★★★★★★★★★SP設定途中の条件分岐　本来は不要
			let hexColor : string = this._cpCtrl.hexColor;
			ws.hexColor = hexColor;
		}

		if(this._spWsTab){
			for (let key in this._wsList) {
				ws = <Workspace>this._wsList[key];
				this._spWsTab.setPad(ws.name, ws.getPixcelArtData());
			}
		}

		this._setupHistoryBtn(ws);
	}
	private _changeState = () => {
		//console.log("change state");
		this._eb.changedState();
		this._hb.changedState();
		
		if(this._fm){//★★★★★★★★★SP設定途中の条件分岐　本来は不要
			this._fm.changedState();
		}
		if(this._cpCtrl){//★★★★★★★★★SP設定途中の条件分岐　本来は不要
			this._cpCtrl.changedState();
		}

		

		for (var key in this._wsList) {
			let ws:Workspace = this._wsList[key];
			ws.changedState();
		}
	}
	private _splitInit =():void =>{
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
	private _windowInit = ():void => {
		let layer:HTMLElement = <HTMLElement>document.querySelector("#layerWindow");
		let preview:HTMLElement = <HTMLElement>document.querySelector("#previewWindow");
		let colorpalette:HTMLElement = <HTMLElement>document.querySelector("#colorpaletteWindow");

		let editor:HTMLElement = <HTMLElement>document.querySelector("#editor");
		
		let left:number = editor.offsetLeft + editor.offsetWidth - layer.offsetWidth;
		let top:number = editor.offsetTop;
		//let bottom:number = preview.offsetHeight + top;

		let previewWin:DraggableWindow = new DraggableWindow(preview);
		let layerWin:DraggableWindow = new DraggableWindow(layer);
		let colorpaletteWin:DraggableWindow = new DraggableWindow(colorpalette);

		layerWin.child = previewWin;
		colorpaletteWin.child = layerWin;
		colorpaletteWin.setPos(left, top);
	}
	private _spDisableSpScreenEnlargement = ():void=>{
		/* ピッチインピッチアウトによる拡大縮小を禁止 */
		document.documentElement.addEventListener('touchstart', (e:TouchEvent)=>{
			if (e.touches.length >= 2){
				e.preventDefault();
			}
		}, {
			passive: false
		});

		/* ダブルタップによる拡大を禁止 */
		let t:number = 0;
		document.documentElement.addEventListener('touchend',(e:TouchEvent)=>{
			let now:number = new Date().getTime();
			if ((now - t) < 350){
				e.preventDefault();
			}
			t = now;
		}, false);
	}
	private _spCover =():void=>{
		
		let editor:HTMLElement = <HTMLHtmlElement>document.querySelector("#editor");
		editor.classList.remove("display-none");
		setTimeout(()=>{
			let cover:HTMLElement = <HTMLHtmlElement>document.querySelector("#cover");
			let editor:HTMLElement = <HTMLHtmlElement>document.querySelector("#editor");
			cover.classList.add("hide");
			editor.classList.remove("display-none");


			const mediaQueryList:MediaQueryList = window.matchMedia("(orientation: portrait)");
			if(mediaQueryList.matches){
				// 縦の時の処理
				//console.log("縦");
				setTimeout(()=>{
					cover.classList.remove("opening");
					cover.classList.remove("hide");
					cover.classList.add("display-none");
					cover.classList.add("rotation");
				}, 300);
			}
			else{
				// 横の時の処理
				//console.log("横");
				cover.classList.remove("opening");
				cover.classList.remove("hide");
				cover.classList.add("rotation");
				cover.classList.remove("display-none");
			}
			mediaQueryList.addEventListener("change",  (e:MediaQueryListEvent ) =>{
				let cover:HTMLElement = <HTMLHtmlElement>document.querySelector("#cover");
				if(e.matches){
					// 縦の時の処理
					//console.log("縦");
					cover.classList.add("display-none");
				}
				else{
					// 横の時の処理
					//console.log("横");
					cover.classList.remove("display-none");
				}
			});
		}, 500);
	}
	//=============================================
	// public
	//=============================================
	//=============================================
	// getter/setter
	//=============================================
}