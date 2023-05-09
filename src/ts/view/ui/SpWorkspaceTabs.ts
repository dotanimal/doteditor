import { State } from "../../model/State";
import { PixcelArtData } from "../../model/data/PixcelArtData";
import { StagePreview } from "../canvas/preview/StagePreview";
import { Workspace } from "../canvas/workspace/Workspace";
export class SpWorkspaceTabs extends createjs.EventDispatcher {
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_CHANGE_SPWS_TABS: string = "event change sp workspace tabs";
	//----------private---------
	private _state: State;

	private _tabList:  { [key: string]: Tab };

	private _currentId:string;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state : State) {
		super();
		this._state = state;

		this._tabList = {};
	}
	//=============================================
	// event handler
	//=============================================
	private _onChangeHandler = (e:Event) => {
		let target:Tab = <Tab>e.target;
		this._currentId = target.workspaceId;
		/*
		let tab:Tab;
		for (var key in this._tabList) {
			tab = this._tabList[key];
			if (target == tab) {
				this._currentId = key;
				break;
			}
		}
		*/
		this.dispatchEvent(new createjs.Event(SpWorkspaceTabs.EVENT_CHANGE_SPWS_TABS, true, true));
	}
	
	//=============================================
	// private
	//=============================================
	//=============================================
	// public
	//=============================================
	public addTab = (workspaceId:string, tabSelector:string) =>{
		let tab : Tab = new Tab(workspaceId, tabSelector);
		tab.addEventListener(Tab.EVENT_CHANGE_TAB, this._onChangeHandler);
		this._tabList[workspaceId] = tab;
		this._currentId = workspaceId;
	}
	public setPad = (workspaceId:string, pad:PixcelArtData) => {
		let tab : Tab = <Tab>this._tabList[workspaceId];
		if(tab){
			tab.setPad(pad);
		}
	}
	//=============================================
	// getter/setter
	//=============================================
	get currentId(): string {
		return this._currentId;
	}
}
class Tab extends createjs.EventDispatcher {
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_CHANGE_TAB: string = "event change tab";
	//----------private---------
	private _workspaceId : string;
	private _btn : HTMLButtonElement;
	private _preview:StagePreview;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(workspaceId:string, tabSelector:string) {
		super();
		this._workspaceId = workspaceId;
		let target : HTMLElement = <HTMLElement>document.querySelector(tabSelector);
		let btn : HTMLButtonElement = <HTMLButtonElement>target.querySelector("button");
		this._preview = new StagePreview(<HTMLCanvasElement>target.querySelector("canvas"),1);
		btn.addEventListener("shown.bs.tab", this._onChangeHandler);
	}
	//=============================================
	// event handler
	//=============================================
	private _onChangeHandler = (e:Event) => {
		this.dispatchEvent(new createjs.Event(Tab.EVENT_CHANGE_TAB, true, true));
	}
	//=============================================
	// private
	//=============================================
	public setPad = (pad:PixcelArtData) => {
		this._preview.drawPad(pad, false);
	}
	//=============================================
	// getter/setter
	//=============================================
	get workspaceId(): string {
		return this._workspaceId;
	}
}