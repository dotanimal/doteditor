import { State } from "../model/State";
import { PixcelArtData } from "../model/data/PixcelArtData";
//import Sortable from "@type/sortablejs";
import Sortable from "sortablejs";
export class LayerController extends createjs.EventDispatcher {
	//=============================================
	// TODO
	//=============================================
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	//----------private---------
	private _state:State;

	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state:State) {
		super();
		this._state = state;

	// List with handle
	let listWithHandle : HTMLElement =  <HTMLElement>document.querySelector('#layerPanelBody > ul');
	Sortable.create(listWithHandle, {
		handle: '.layerPanelRowHandle',
		animation: 150
});


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

	//=============================================
	// getter/setter
	//=============================================
}