import { State } from "../../../model/State";

export abstract class FileMenu extends createjs.EventDispatcher{
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_OPEN_FILE_MENU: string = "event open file menu";
	public static readonly EVENT_CLOSE_FILE_MENU: string = "event close file menu";
	public static readonly EVENT_SELECT_ITEM_FILE_MENU: string = "event select item file menu";
	//----------private---------
	//----------protected-------
	protected _state:State;
	//=============================================
	// constructor
	//=============================================
	constructor(state : State) {
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
	public changedState = () =>{
	}
	//=============================================
	// getter/setter
	//=============================================
}