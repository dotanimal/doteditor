import { State } from "../../../model/State";
import { DrawLayerData } from "../../../model/data/DrawLayerData";
import { PixcelArtData } from "../../../model/data/PixcelArtData";
import { BgLayer } from "./layer/BgLayer";
import { CursorLayer } from "./layer/CursorLayer";
import { DragLayer } from "./layer/DragLayer";
import { DrawLayer } from "./layer/DrawLayer";
import { SelectRangeLayer } from "./layer/SelectRangeLayer";

export class Workspace extends createjs.Stage {
	//=============================================
	// TODO
	//=============================================
	/*
		マウスを素早く動かしたときに処理が追いつかないときがある。
		　mousemoveよりsetIntervalにしたほうがいいかも？
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_CHANGE_WS: string = "event change workspace";
	public static readonly EVENT_EXTRACT_HEX_COLOR_WS: string = "event extract hex color workspace";
	public static readonly EVENT_MOUSEDOWN_WS:string = "event mousedown workspace";
	//----------private---------
	private _state: State;

	private _drawAreaTop : number;
	private _drawAreaRight : number;
	private _drawAreaBottom : number;
	private _drawAreaLeft : number;
	
	private _dotSize: number;
	private _stageMargin:number;
	
	private _isMouseDown: boolean;
	
	private _bgLayer: BgLayer;
	private _cursroLayer: CursorLayer;
	private _selectRangeLayer:SelectRangeLayer;
	private _dragLayer:DragLayer;

	private _drawLayerList: Array<DrawLayer>;

	private _activeDrawLayerId: number;
	//private _workspaceDataLogList: Array<WorkspaceData>;

	private _pixcelArtDataHistoryList: Array<PixcelArtData>;
	private _histroyId: number;

	//private _pad:PixcelArtData;
	private _hexColor: string;

	private _wpId:number;
	private _wpTitle:string;
	
	//private _extractHexColor:string;

	private _isAbleDraw :boolean;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state: State, canvasId: string) {
		super(canvasId);
		this.name = canvasId;
		this._dotSize = 16;
		this._stageMargin = 2;

		this._state = state;

		// タッチ操作をサポートしているブラウザーなら、タッチ操作を有効にする
		if (createjs.Touch.isSupported() == true) {
			createjs.Touch.enable(this);
		}
		//マウスオーバーを有効にする
		this.enableMouseOver();

		this._pixcelArtDataHistoryList = [];
		this._drawLayerList = [];

		this._bgLayer = new BgLayer(state);
		this._cursroLayer = new CursorLayer(state);
		this._selectRangeLayer = new SelectRangeLayer(state);
		this._dragLayer = new DragLayer(state, "");
		this._dragLayer.setStageMargin(this._stageMargin);

		this._addMouseEventListener();
		this._dragLayer.addEventListener(DragLayer.EVENT_DRAG_MOVE,(e:Event) => {
			this._selectRangeLayer.move(
				this._dragLayer.x,// + this._stageMargin,
				this._dragLayer.y// + this._stageMargin
			)
		});
		/*
		this._dragLayer.addEventListener(DragLayer.EVENT_MOVE_FIXED,(e:Event) => {
			this._state.setCurrent(State.SELECT_END);
			let dld:DrawLayerData =  this._dragLayer.getDrawLayerData();
			let dl:DrawLayer = this._getActiveDrawLayer();
			dl.setDrawLayerData(dld);
			this._saveHistory();
			this.dispatchEvent(new createjs.Event(Workspace.EVENT_CHANGE_WS, true, true));
		});
		*/		
		//this.isAbleDraw = true;
	}
	//=============================================
	// event handler
	//=============================================
	//=============================================
	// private
	//=============================================
	private _resetStageSize = () =>{
		let canvas :HTMLCanvasElement= <HTMLCanvasElement>this.canvas;
		let stageW :number = canvas.width;
		let stageH :number = canvas.height;
		
		let remainderX :number = (stageW - this._stageMargin * 2) % this._dotSize;
		let remainderY :number = (stageH - this._stageMargin * 2) % this._dotSize;

		let left :number = Math.floor(remainderX / 2) + this._stageMargin;
		let right:number = stageW - (remainderX - (left - this._stageMargin)) - this._stageMargin;
		let top :number = Math.floor(remainderY / 2) + this._stageMargin;
		let bottom :number = stageH - (remainderY - (top - this._stageMargin)) - this._stageMargin;

		this._bgLayer.setStageSize(stageW, stageH, this._dotSize, left, top, right, bottom);
		for(let drawLayer of this._drawLayerList) {
			drawLayer.setStageSize(stageW, stageH, this._dotSize, left, top, right, bottom);
		}
		this._cursroLayer.setStageSize(stageW, stageH, this._dotSize, left, top, right, bottom);
		this._selectRangeLayer.setStageSize(stageW, stageH, this._dotSize, left, top, right, bottom);
		this._dragLayer.setStageSize(stageW, stageH, this._dotSize, left, top, right, bottom);

		this._drawAreaTop = top;
		this._drawAreaRight = right;
		this._drawAreaBottom = bottom;
		this._drawAreaLeft = left;

		this.update();
	}
	private _addDrawLayer = (layerName:string) =>{
		let dl : DrawLayer;
		let isExist:boolean = false;
		for (var i = 0; i < this._drawLayerList.length; i++) {
			dl = this._drawLayerList[i];
			if (layerName == dl.name) {
				isExist = true;
				break;
			}
		}
		if(isExist){
			//alert("このレイヤーはすでに登録されています");
			throw new Error("[ERROR:add DrawLayer]\n\t" + "name\t:\t" + layerName);
		}else{			
			//console.log("\t", "add draw layer\t:", layerName);
			dl = new DrawLayer(this._state, layerName);
			let len : number = this._drawLayerList.push(dl);
			this._activeDrawLayerId = len - 1;
			this.addChild(dl);
		}
	}
	private _addMouseEventListener = () => {
		// インタラクティブの設定
		//TODO　描画のあるところでないとイベントが発生しない？
		this.addEventListener("stagemousedown", (e: MouseEvent) => {
			this.dispatchEvent(new createjs.Event(Workspace.EVENT_MOUSEDOWN_WS, true, true));

			//エリア外なら処理をしない
			if(!this._areaHitTest(this.mouseX,this.mouseY)){return false;}
			//お絵かきモードでないなら処理しない
			//if(!this.isAbleDraw){return false;}


			//範囲選択
			this._selectRangeLayer.beginSelect(this.mouseX,this.mouseY);

			//お絵かきツール
			if(this._state.currentCategory == State.CATEGORY_DRAW){
				let layer: DrawLayer = this._getActiveDrawLayer();
				if (layer) {
					layer.drawDot(this.mouseX,this.mouseY, this._hexColor);
				}
			}
			
			this._isMouseDown = true;

			//描画の更新
			this.update();
		});
		this.addEventListener("stagemouseup", (e: MouseEvent) => {
			//エリア外なら処理をしない
			if(!this._areaHitTest(this.mouseX,this.mouseY)){return false;}

			//範囲選択
			//if(this._state.currentCategory == State.CATEGORY_SELECT){
			this._selectRangeLayer.endSelect(this.mouseX, this.mouseY, true);
				//this._dragLayerInit();
			//}

			//コピーもしくはカットモード中にマウスアップしたら、セレクトモード終了
			if(this._state.current == State.SELECT_COPY || this._state.current == State.SELECT_CUT){
				this._state.setCurrent(State.SELECT_END);
				let dld:DrawLayerData =  this._dragLayer.getDrawLayerData();
				let dl:DrawLayer = this._getActiveDrawLayer();
				dl.setDrawLayerData(dld);
				this._saveHistory();
				this.dispatchEvent(new createjs.Event(Workspace.EVENT_CHANGE_WS, true, true));
			}

			//スポイトツール
			if(this._state.current == State.EDIT_DROPPER){
				let layer: DrawLayer = this._getActiveDrawLayer();
				if (layer) {
					let hexColor:string = layer.getDotHexColor(this.mouseX,this.mouseY);
					//console.log(hexColor);
					if(hexColor && this._hexColor != hexColor){
						this._hexColor = hexColor;
						this.dispatchEvent(new createjs.Event(Workspace.EVENT_EXTRACT_HEX_COLOR_WS, true, true));
					}
				}
			}

			//お絵かきツール
			if(this._state.currentCategory == State.CATEGORY_DRAW){
				if (this._isMouseDown) {
					if (this._state.current== State.DRAW_PENCIL || this._state.current== State.DRAW_ERACER) {
						this._saveHistory();
						this.dispatchEvent(new createjs.Event(Workspace.EVENT_CHANGE_WS, true, true));
					}
				}
			}

			this._isMouseDown = false;
		});
		this.addEventListener("stagemousemove", (e: MouseEvent) => {
			//エリア外なら処理をしない
			if(!this._areaHitTest(this.mouseX,this.mouseY)){return false;}

			//カーソル
			this._cursroLayer.move(this.mouseX, this.mouseY);
			
			//一時表示するレイヤー
			this._dragLayer.move(this.mouseX, this.mouseY);
			
			//範囲選択
			this._selectRangeLayer.endSelect(this.mouseX,this.mouseY);

			//お絵かきツール
			if(this._state.currentCategory == State.CATEGORY_DRAW){
				if (this._isMouseDown) {
					let layer: DrawLayer = this._getActiveDrawLayer();
					if (layer) {
						layer.drawDot(this.mouseX,this.mouseY, this._hexColor);
					}
				}
			}
			//描画の更新
			this.update();
		});
	}
	private _getActiveDrawLayer = (): DrawLayer => {
		if (this._drawLayerList.length < 1) {
			return null;
		}
		return this._drawLayerList[this._activeDrawLayerId];

	}
	private _areaHitTest = (mx:number, my:number) : boolean => {
		if(this._drawAreaLeft < mx && mx < this._drawAreaRight && this._drawAreaTop < my && my < this._drawAreaBottom){
			return true;
		}else{
			return false;
		}
	}
	private _saveHistory = () => {
		//ログを１０件までに処理
		if (10 <= this._pixcelArtDataHistoryList.length) {
			this._pixcelArtDataHistoryList.shift();
		}
		//ヒストリーの途中で、ドローやファイル読み込みを行った場合に以降のログを削除する
		if(this._histroyId <  this._pixcelArtDataHistoryList.length - 1){
			this._pixcelArtDataHistoryList.splice(this._histroyId + 1, this._pixcelArtDataHistoryList.length - 1);
		}
		var pad: PixcelArtData = this.getPixcelArtData();
		this._pixcelArtDataHistoryList.push(pad);
		this._histroyId = this._pixcelArtDataHistoryList.length - 1;
		console.log("history", "save", this._histroyId);
		//TODO　ログリストとログIDの値からUNDO/REDOボタンの有効・無効を切り替えられるようにしたい
	}
	private _copyDLDFromDraw2Drag = () => {
		let layer: DrawLayer = this._getActiveDrawLayer();

		if (layer) {
			let left:number = this._selectRangeLayer.selectBeginX;
			let top:number = this._selectRangeLayer.selectBeginY;
			/*
			let right:number = this._selectRangeLayer.selectEndX;
			let bottom:number = this._selectRangeLayer.selectEndY;
			*/
			let dld :DrawLayerData = this.getSelectRangeDLD(true);

			this._dragLayer.setDrawLayerData(dld);
			this._dragLayer.x = left - this._drawAreaLeft;
			this._dragLayer.y = top - this._drawAreaTop;
		}
	}
	//=============================================
	// public
	//=============================================
	public setPixcelArtData = (pad: PixcelArtData, isSaveLog:boolean=true) => {
		//console.log("reset", "workspace");
		//this._pad = pad;
		this.removeAllChildren();
		this._drawLayerList = [];
		
		//背景レイヤーをAddChild
		this.addChild(this._bgLayer);
		//this.update();
		if (pad.id) {
			this._wpId = pad.id;
		}
		if(pad.title){
			this._wpTitle = pad.title;
		}

		let drawLayerDataList: any = pad.getDrawLayerDataList();
		//レイヤーの追加
		for (var key in drawLayerDataList) {
			this._addDrawLayer(key);
		}
		//ドラッグレイヤーをAddChild
		this.addChild(this._dragLayer);
		//選択範囲表示用のレイヤーをAddChild
		this.addChild(this._selectRangeLayer);
		//カーソルレイヤーをAddChild
		this.addChild(this._cursroLayer);

		//サイズ指定
		this._resetStageSize();

		//データセット
		let dl: DrawLayer;
		let dld: DrawLayerData;
		for (var i = 0; i < this._drawLayerList.length; i++) {
			dl = this._drawLayerList[i];
			dld = drawLayerDataList[dl.name];
			dl.setDrawLayerData(dld);
		}
		this.update();
		if(isSaveLog){this._saveHistory();}
		this.dispatchEvent(new createjs.Event(Workspace.EVENT_CHANGE_WS, true, true));
	}
	public getPixcelArtData = ():PixcelArtData => {
		let result: PixcelArtData = new PixcelArtData();
		if (this._wpId) {
			result.id = this._wpId;
		}
		if (this._wpTitle) {
			result.title = this._wpTitle;
		}

		let layer: DrawLayer;
		let layerData: DrawLayerData;
		for (let i = 0; i < this._drawLayerList.length; i++) {
			layer = this._drawLayerList [i];
			layerData = layer.getDrawLayerData();
			//if(layerData){
			result.addDrawLayerData(layer.name, layerData);
			//}
		}
		result.layoutInit();
		//this._pad = result;
		return result;
	}
	public undo = () => {
		if (0 < this._histroyId) {
			this._histroyId--;
			console.log("history", "undo", this._histroyId);
			let pad: PixcelArtData = this._pixcelArtDataHistoryList[this._histroyId];//TODO リストにはPixcelArtDataをいれるようにする
			//let data: PixcelArtData = new PixcelArtData()
			//data.setJson(jsonObj);
			this.setPixcelArtData(pad,false);

			//this.dispatchEvent(new createjs.Event(this.EVENT_CHANGE_WS, true, true));
		} else {
			console.log("これ以上古いログはありません");
		}

		//let layer: Layer = this._getActiveLayer();
		//layer.loadLog(0);
		//this.update();
	}
	public redo = () => {
		if (this._histroyId < this._pixcelArtDataHistoryList.length - 1) {
			this._histroyId++;
			//this._reset();
			console.log("history", "redo", this._histroyId);
			let pad: PixcelArtData = this._pixcelArtDataHistoryList[this._histroyId];
			this.setPixcelArtData(pad,false);
			

			//this.dispatchEvent(new createjs.Event(this.EVENT_CHANGE_WS, true, true));
		} else {
			console.log("これ以上新しいログはありません");
		}
	}
	public changedState = () =>{
		//console.log(this._state.currentCategory,this._state.current);
		if(this._state.currentCategory == State.CATEGORY_SELECT){
			this._selectRangeLayer.visible = true;
			if(this._state.current == State.SELECT_DRAG){
				this._dragLayer.init();
				this._copyDLDFromDraw2Drag();
				this._dragLayer.visible = true;
				this._cursroLayer.visible = false;
			}else if(this._state.current == State.SELECT_DRAG_END){
				let layer: DrawLayer = this._getActiveDrawLayer();
				if (layer) {
					let dld : DrawLayerData = this._dragLayer.getDrawLayerData();
					layer.setDrawLayerData(dld);
					this._saveHistory();
					this.dispatchEvent(new createjs.Event(Workspace.EVENT_CHANGE_WS, true, true));
				}
				this._dragLayer.init();
				this._selectRangeLayer.init();

			}else if(this._state.current == State.SELECT_COPY || this._state.current == State.SELECT_CUT){
				this._cursroLayer.visible = false;

			}else if(this._state.current == State.SELECT_END){
				this._dragLayer.visible = false;
				this._cursroLayer.visible = false;
				this._selectRangeLayer.visible = false;
				
				this._dragLayer.init();
				this._selectRangeLayer.init();
			}
			/*
			else if(this._state.current == State.SELECT_COPY || this._state.current == State.SELECT_CUT){
				this._dragLayer.visible = true;
			}
			*/
		}else{
			this._cursroLayer.visible = true;
			this._selectRangeLayer.visible = false;
			this._selectRangeLayer.init();
			this._dragLayer.visible = false;
			//this._selectRangeLayer.resetSelect();
		}
		this.update();
	}
	public active = ():void =>{
		this._bgLayer.active();
		this.update();
	}
	public inactive = ():void =>{
		this._bgLayer.inactive();
		this.update();
	}
	public getSelectRangeDLD = (isDelete:boolean):DrawLayerData =>{
		let result : DrawLayerData;
		let layer: DrawLayer = this._getActiveDrawLayer();
		if (layer) {
			let left:number = this._selectRangeLayer.selectBeginX;
			let top:number = this._selectRangeLayer.selectBeginY;
			let right:number = this._selectRangeLayer.selectEndX;
			let bottom:number = this._selectRangeLayer.selectEndY;
			result = layer.getRectDrawLayerData(left, top, right, bottom);
			if(isDelete){
				layer.drawRect(left, top, right, bottom,"FF0000", true);
				this.update();
			}
		}
		return result;
	}
	public setSelectRangeDLD = (dld:DrawLayerData):void =>{
		this._dragLayer.visible = true;
		this._dragLayer.setDrawLayerData(dld);
		
		let xCount :number = dld.width;
		let yCount :number = dld.height;
		let baseX :number = dld.x;
		let baseY :number = dld.y;
		let bx:number = this._dragLayer.drawAreaLeft + baseX * this._dotSize;
		let by:number = this._dragLayer.drawAreaTop + baseY * this._dotSize;
		let ex:number = bx + (baseX + (xCount-1)) * this._dotSize;
		let ey:number = by + (baseY + (yCount-1)) * this._dotSize;
		
		this._selectRangeLayer.init();
		this._selectRangeLayer.visible = true;
		this._selectRangeLayer.setBeginEnd(bx,by,ex,ey);
	}
	//=============================================
	// getter/setter
	//=============================================
	get hasPrevLog(): boolean {
		return (0 < this._histroyId);
	}
	get hasNextLog(): boolean {
		return (this._histroyId < this._pixcelArtDataHistoryList.length - 1);
	}
	
	get hexColor(): string{
		return this._hexColor;
	}
	set hexColor(value: string) {
		 this._hexColor = value;
	}
}