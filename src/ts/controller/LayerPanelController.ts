import { State } from "../model/State";
import { PixcelArtData } from "../model/data/PixcelArtData";
//import Sortable from "@type/sortablejs";
import Sortable from "sortablejs";
import { LayerPanelRow } from "../view/ui/LayerPanelRow";
export class LayerPanelController extends createjs.EventDispatcher {
	//=============================================
	// TODO
	//=============================================
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	//----------private---------
	private _state:State;
	private _rowList:Array<LayerPanelRow>;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state:State) {
		super();
		this._state = state;

		// List with handle
		let rows : HTMLElement =  <HTMLElement>document.querySelector('#layerPanelBody > ul');
		Sortable.create(
			rows, 
			{
				handle: '.layerPanelRowHandle',
				animation: 150
			}
		);
		
		this._rowList = [];

		let rowList:NodeListOf<Element> = rows.querySelectorAll('li');
		let ele :HTMLElement;
		//let row: LayerPanelRow;
		for (var i = 0; i < rowList.length; i++) {
			ele = <HTMLElement>rowList[i];
			this._rowList.push(new LayerPanelRow(ele));
		}
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
	public setPad = (pad:PixcelArtData):void =>{

	}
	public getPad = ():PixcelArtData =>{
		let result:PixcelArtData;
		
		return result;
	}
	//=============================================
	// getter/setter
	//=============================================
}