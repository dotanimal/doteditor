import { State } from "../../model/State";
import { WPConector } from "../../model/connector/WPConnector";
import { PixcelArtData } from "../../model/data/PixcelArtData";

export abstract class LoadFromWPController extends createjs.EventDispatcher {
	//=============================================
	// TODO
	//=============================================
	/*
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_SELECT_THUMB: string = "event select thumb";
	//----------private---------
	//----------protected-------
	protected _state:State;
	protected _wpc: WPConector;
	//=============================================
	// constructor
	//=============================================
	constructor(state:State) {
		super();
		this._state = state;
		this._wpc = new WPConector(this._state);
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
	abstract open():void;
	abstract close():void;
	abstract getPixcelArtData(): PixcelArtData
	//=============================================
	// getter/setter
	//=============================================
	//abstract get pad(): PixcelArtData;
}