import { State } from "../../model/State";
import { WPConector } from "../../model/connector/WPConnector";
import { PixcelArtData } from "../../model/data/PixcelArtData";

export abstract class SaveToWPController extends createjs.EventDispatcher {
	//=============================================
	// TODO
	//=============================================
	/*
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_SAVE_COMPLETE_TO_WP: string = "event save complete to wp";
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
	abstract open(pad: PixcelArtData):void;
	abstract close():void;
	abstract getPixcelArtData(): PixcelArtData
	//=============================================
	// getter/setter
	//=============================================
	//abstract get pad(): PixcelArtData;
}