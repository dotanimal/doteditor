import { State } from "../../../model/State";
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
	public readonly EVENT_CHANGE_WS: string = "change workspace event";
	//----------private---------
	private _state: State;
	private _canvasId: string;

	private _stageWidth: number;
	private _stageHeight: number;
	private _dotSize: number;
	
	private _isMouseDown: boolean;
	
	private _bgLayer: BgLayer;
	private _cursroLayer: CursorLayer;
	private _drawLayerList: Array<DrawLayer>;
	private _activeDrawLayerId: number;
	//private _workspaceDataLogList: Array<WorkspaceData>;


	private _color: string;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state: State, canvasId: string) {
		super(canvasId);
		
		this._dotSize = 16;

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

		this._addDrawLayer();
		
		this._cursroLayer = new CursorLayer();
		this.addChild(this._cursroLayer);

		this._changeSize();

		this._addMouseEventListener();
	}
	//=============================================
	// event handler
	//=============================================
	//=============================================
	// private
	//=============================================
	private _changeSize = () =>{
		let canvas = <HTMLCanvasElement>this.canvas;
		this._stageWidth = canvas.width;
		this._stageHeight = canvas.height;

		this._bgLayer.changeSize(this._stageWidth, this._stageHeight, this._dotSize);
		for(let drawLayer of this._drawLayerList) {
			drawLayer.changeSize(this._stageWidth, this._stageHeight, this._dotSize);
		}
		this._cursroLayer.changeSize(this._stageWidth, this._stageHeight, this._dotSize);


		this.update();
	}
	private _addDrawLayer = () =>{
		//TODO：将来的には引数にLayerDataを持たせて、NULLなら空のレイヤーを作るような作りにする
		let drawLayer : DrawLayer = new DrawLayer();
		let len : number = this._drawLayerList.push(drawLayer);
		this._activeDrawLayerId = len - 1;
		this.addChild(drawLayer);
	}
	private _addMouseEventListener = () => {
		// インタラクティブの設定
		//TODO　描画のあるところでないとイベントが発生しない？
		this.addEventListener("stagemousedown", (e: MouseEvent) => {
			this._isMouseDown = true;

			let layer: DrawLayer = this._getActiveDrawLayer();
			if (layer) {
				if (this._state.current == State.EDIT_PENCIL) {
					layer.pencil(this.mouseX, this.mouseY, this._color);
				} else if (this._state.current == State.EDIT_ERACER) {
					layer.eraser(this.mouseX, this.mouseY);
				}
				this.update();
			}
		});
		this.addEventListener("stagemouseup", (e: MouseEvent) => {
			if (this._isMouseDown) {
				if (this._state.current == State.EDIT_PENCIL || this._state.current == State.EDIT_ERACER) {
					this.dispatchEvent(new createjs.Event(this.EVENT_CHANGE_WS, true, true));
				}
			}
			this._isMouseDown = false;
		});
		this.addEventListener("stagemousemove", (e: MouseEvent) => {
			this._cursroLayer.move(this.mouseX, this.mouseY);
			if (this._isMouseDown) {
				let layer: DrawLayer = this._getActiveDrawLayer();
				if (layer) {
					if (this._state.current == State.EDIT_PENCIL) {
						layer.pencil(this.mouseX, this.mouseY, this._color);
					} else if (this._state.current == State.EDIT_ERACER) {
						layer.eraser(this.mouseX, this.mouseY);
					}
					//this.update();
				}
			}
			this.update();
		});
	}
	private _removeMouseEventListener = () => {
		this.removeAllEventListeners("stagemousedown");
		this.removeAllEventListeners("stagemouseup");
		this.removeAllEventListeners("stagemousemove");
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
	//=============================================
	// public
	//=============================================
	public setColor = (color: string) => {
		this._color = color;
	}
	//=============================================
	// getter/setter
	//=============================================
}