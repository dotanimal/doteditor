import { State } from "../model/State";
import { Workspace } from "../view/canvas/workspace/Workspace";
import { ColorPalette } from "../view/ui/ColorPalette";
import { EditBtns } from "../view/ui/EditBtns";

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

	private _wsList: { [key: string]: Workspace };
	private _activeWsId: string;
	//=============================================
	// constructor
	//=============================================
	constructor() {
		this._state = new State();
		
		this._cp = new ColorPalette(this._state);
		this._eb = new EditBtns(this._state);

		this._wsList = {};
		
		this._addWorkSpace('workspace1');

		this._eb.addEventListener(this._eb.EVENT_CHANGE_BTN, this._onEditBtnsChangeHandler);
		this._cp.addEventListener(this._cp.EVENT_CHANGE_COLOR, this._onColorPaletteChangeHandler);

		//カラーパレットの初期化　イベントリスナーを登録したあとに実行しないと色々うごかないのでここで実行
		this._cp.init();
	}
	//=============================================
	// event handler
	//=============================================
	private _onEditBtnsChangeHandler = (e: Event) => {
		console.log('\n[Event]', e.type, "\n\t" + "state : " + this._state.current);
	}
	private _onColorPaletteChangeHandler = (e: Event) => {
		let ws: Workspace = this._getActiveWS();
		let color: string = this._cp.getColor();
		ws.setColor(color);
		console.log('\n[Event]', e.type, "\n\t" + "color : " + color);
	}
	private _onWorkspaceChangeHandler = (e: Event) => {
		let ws: Workspace = <Workspace>e.target;
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
	//=============================================
	// public
	//=============================================
	//=============================================
	// getter/setter
	//=============================================
}