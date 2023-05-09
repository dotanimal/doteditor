import { State } from "../../model/State";
export abstract class ColorpaletteController extends createjs.EventDispatcher {
	//=============================================
	// TODO
	//=============================================
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_CHANGE_COLORPALETTE: string = "event change color palette panel";
	//----------private---------
	//----------protected-------
	protected _state:State;
	//=============================================
	// constructor
	//=============================================
	constructor(state:State) {
		super();
		this._state = state;
	}
	//=============================================
	// event handler
	//=============================================

	//=============================================
	// private
	//=============================================

	//=============================================
	// public
	//=============================================
	abstract setHexColorList(arr: Array<string>):void;
	abstract changedState():void;
	//=============================================
	// getter/setter
	//=============================================
	abstract get hexColor(): string;
	abstract set hexColor(value: string);
}