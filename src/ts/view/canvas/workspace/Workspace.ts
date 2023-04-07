import { State } from "../../../model/State";
import { DrawLayerData } from "../../../model/data/DrawLayerData";
import { PixcelArtData } from "../../../model/data/PixcelArtData";
import { BgLayer } from "./layer/BgLayer";
import { CursorLayer } from "./layer/CursorLayer";
import { DrawLayer } from "./layer/DrawLayer";

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
	public readonly EVENT_CHANGE_WS: string = "event change workspace";
	//----------private---------
	private _state: State;
	private _canvasId: string;

	private _areaTopY : number;
	private _areaRightX : number;
	private _areaBottomY : number;
	private _areaLeftX : number;
	
	private _dotSize: number;
	private _stageMargin:number;
	
	private _isMouseDown: boolean;
	
	private _bgLayer: BgLayer;
	private _cursroLayer: CursorLayer;
	private _drawLayerList: Array<DrawLayer>;
	private _activeDrawLayerId: number;
	//private _workspaceDataLogList: Array<WorkspaceData>;


	private _hexColorCode: string;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state: State, canvasId: string) {
		super(canvasId);
		
		this._dotSize = 16;
		this._stageMargin = 2;

		this._state = state;

		this._canvasId = canvasId;

		// タッチ操作をサポートしているブラウザーなら、タッチ操作を有効にする
		if (createjs.Touch.isSupported() == true) {
			createjs.Touch.enable(this);
		}
		//this._workspaceDataLogList = [];
		this._drawLayerList = [];

		this._bgLayer = new BgLayer();
		this.addChild(this._bgLayer);

		//最初に作るレイヤー名は"body"にしておく
		this._addDrawLayer("body");
		
		this._cursroLayer = new CursorLayer();
		this.addChild(this._cursroLayer);

		this._resetStageSize();

		this._addMouseEventListener();
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

		this._bgLayer.setStageSize(stageW, stageH, this._dotSize, top, right, bottom, left);
		for(let drawLayer of this._drawLayerList) {
			drawLayer.setStageSize(stageW, stageH, this._dotSize, top, right, bottom, left);
		}
		this._cursroLayer.setStageSize(stageW, stageH, this._dotSize, top, right, bottom, left);

		this._areaTopY = top;
		this._areaRightX = right;
		this._areaBottomY = bottom;
		this._areaLeftX = left;

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
			console.log("\t", "add draw layer\t:", layerName);
			dl = new DrawLayer(layerName);
			let len : number = this._drawLayerList.push(dl);
			this._activeDrawLayerId = len - 1;
			this.addChild(dl);
		}
	}
	private _addMouseEventListener = () => {
		// インタラクティブの設定
		//TODO　描画のあるところでないとイベントが発生しない？
		this.addEventListener("stagemousedown", (e: MouseEvent) => {
			//エリア外なら処理をしない
			if(!this._areaHitTest(this.mouseX,this.mouseY)){return false;}

			this._isMouseDown = true;
			let layer: DrawLayer = this._getActiveDrawLayer();
			if (layer) {
				if (this._state.current == State.DRAW_PENCIL) {
					layer.pencil(this.mouseX, this.mouseY, this._hexColorCode);
				} else if (this._state.current == State.DRAW_ERACER) {
					layer.eraser(this.mouseX, this.mouseY);
				}
				this.update();
			}
		});
		this.addEventListener("stagemouseup", (e: MouseEvent) => {
			if (this._isMouseDown) {
				if (this._state.current == State.DRAW_PENCIL || this._state.current == State.DRAW_ERACER) {
					this.dispatchEvent(new createjs.Event(this.EVENT_CHANGE_WS, true, true));
				}
			}
			this._isMouseDown = false;
		});
		this.addEventListener("stagemousemove", (e: MouseEvent) => {
			//エリア外なら処理をしない
			if(!this._areaHitTest(this.mouseX,this.mouseY)){return false;}

			this._cursroLayer.move(this.mouseX, this.mouseY);
			if (this._isMouseDown) {
				let layer: DrawLayer = this._getActiveDrawLayer();
				if (layer) {
					if (this._state.current == State.DRAW_PENCIL) {
						layer.pencil(this.mouseX, this.mouseY, this._hexColorCode);
					} else if (this._state.current == State.DRAW_ERACER) {
						layer.eraser(this.mouseX, this.mouseY);
					}
					//this.update();
				}
			}
			this.update();
		});
	}
	private _getActiveDrawLayer = (): DrawLayer | null => {
		if (!this._drawLayerList.length) {
			return null;
		}
		if (this._drawLayerList.length < 1) {
			return null;
		}
		return this._drawLayerList[this._activeDrawLayerId];

	}
	private _areaHitTest = (mx:number, my:number) : boolean => {
		if(this._areaLeftX < mx && mx < this._areaRightX && this._areaTopY < my && my < this._areaBottomY){
			return true;
		}else{
			return false;
		}
	}
	/*
	private _reset = () => {
		//console.log("reset");
		//this._removeMouseEventListener();
		this.removeAllChildren();
		this.addChild(this._bgLayer);
		this.update();
	}
	*/
	//=============================================
	// public
	//=============================================
	public setData = (pad: PixcelArtData) => {
		
		console.log("\t", "reset workspace");
		this.removeAllChildren();
		this._drawLayerList = [];
		
		//背景レイヤーをAddChild
		this.addChild(this._bgLayer);
		//this.update();
		if (pad.id) {
			//this._wpId = pad.id;
		}
		//this._wpTitle = data.title;

		let drawLayerDataList: any = pad.drawLayerDataList;
		//レイヤーの追加
		for (var key in drawLayerDataList) {
			this._addDrawLayer(key);
		}
		
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
	}
	public setHexColorCode = (hexColorCode: string) => {
		this._hexColorCode = hexColorCode;
	}
	public getPixcelArtData = ():PixcelArtData => {
		let result: PixcelArtData = new PixcelArtData();
		let layer: DrawLayer;
		let layerData: DrawLayerData;
		for (let i = 0; i < this._drawLayerList.length; i++) {
			layer = this._drawLayerList [i];
			layerData = layer.getDrawLayerData();
			if(layerData){
				result.addDrawLayerData(layer.name, layerData);
			}
		}
		result.layoutInit();
		return result;
	}
	//=============================================
	// getter/setter
	//=============================================
}