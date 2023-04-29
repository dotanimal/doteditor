import { State } from "../model/State";
import { PixcelArtData } from "../model/data/PixcelArtData";
//import Sortable from "@type/sortablejs";
import Sortable from "sortablejs";
import { LayerPanelRow } from "../view/ui/LayerPanelRow";
import { DrawLayerData } from "../model/data/DrawLayerData";
export class LayerPanelController extends createjs.EventDispatcher {
	//=============================================
	// TODO
	//=============================================
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_CHANGE_DATA_LAYERPANEL: string = "event change data layer panel";
	public static readonly EVENT_CHANGE_ACTIVELAYER_LAYERPANEL: string = "event change active layer layer panel";
	//----------private---------
	private _state:State;
	private _lprList:Array<LayerPanelRow>;
	private _pad:PixcelArtData;
	private _activeLayerId:number;

	private _addLPR:HTMLElement;
	private _deleteLPR:HTMLElement;
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
				animation: 150,
				onEnd :  this._onChangeSortableHandler
			}
		);
		
		this._lprList = [];

		let rowList:NodeListOf<Element> = rows.querySelectorAll('li');
		let ele :HTMLElement;
		let lpr: LayerPanelRow;
		for (var i = 0; i < rowList.length; i++) {
			ele = <HTMLElement>rowList[i];
			lpr = new LayerPanelRow(ele);
			lpr.addEventListener(LayerPanelRow.EVENT_MOUSEDOWN_LAYERPANELROW, this._onMousedownLPRHandler);
			lpr.addEventListener(LayerPanelRow.EVENT_CHANGE_LAYERPANELROW, this._onChangeLPRHandler);
			this._lprList.push(lpr);
		}

		this._addLPR = <HTMLElement>document.querySelector('#addLayerPanelRow');
		this._deleteLPR = <HTMLElement>document.querySelector('#deleteLayerPanelRow');

		this._addLPR.addEventListener("click", this._onClickAddLPRHandler);
		this._deleteLPR.addEventListener("click", this._onClickDeleteLPRHandler);
		
	}
	//=============================================
	// event handler
	//=============================================
	private _onClickAddLPRHandler = (e:Event) =>{
		let lpr:LayerPanelRow;
		for (var i = 0; i < this._lprList .length; i++) {
			lpr = <LayerPanelRow>this._lprList[i];
			if(!lpr.isShow){
				let dld:DrawLayerData = new DrawLayerData(String(new Date().getTime()));
				lpr.setDld(dld);
				lpr.show();
				//this._activeLayerId = i;
				break;
			}
		}
		this._state.setCurrent(State.LAYER_CHANGE);
		this.changedState();
		this.dispatchEvent(new createjs.Event(LayerPanelController.EVENT_CHANGE_DATA_LAYERPANEL, true, true));
	}
	private _onClickDeleteLPRHandler = (e:Event) =>{
		let lpr:LayerPanelRow;
		for (var i = 0; i < this._lprList .length; i++) {
			lpr = <LayerPanelRow>this._lprList[i];
			if(lpr.isActive){
				lpr.hide();
				break;
			}
		}

		let rowLiList:NodeListOf<Element> = document.querySelectorAll('#layerPanelBody > ul > li');
		let rowLi :HTMLElement;
		for (var j =0; j<rowLiList.length; j++) {
			rowLi = <HTMLElement>rowLiList[j];
			if (!rowLi.className.match(/hide/)) {
				rowLi.dispatchEvent(new Event('mousedown'));//マウスダウンを強制的に発火してアクティブを変更
				break;
			}
		}

		this._state.setCurrent(State.LAYER_CHANGE);
		this.changedState();
		this.dispatchEvent(new createjs.Event(LayerPanelController.EVENT_CHANGE_DATA_LAYERPANEL, true, true));
	}
	private _onMousedownLPRHandler = (e:Event) =>{
		let target:LayerPanelRow = <LayerPanelRow>e.target;
		let lpr: LayerPanelRow;
		for (var i = 0; i < this._lprList .length; i++) {
			lpr = <LayerPanelRow>this._lprList[i];
			if(target.txt == lpr.txt){
				lpr.active();
			}else{
				lpr.inactive();
			}
		}
		let rowSpanList:NodeListOf<Element> = document.querySelectorAll('#layerPanelBody > ul > li > .layerPanelRowTxt > span');
		let rowSpan :HTMLElement;
		let rowSpanTxt:string
		for (var j = rowSpanList.length-1; 0<j; j--) {
			rowSpan = <HTMLElement>rowSpanList[j];
			rowSpanTxt = rowSpan.innerHTML;
			if(target.txt == rowSpanTxt){
				let idx:number = this._lprList.length - 1 - j;
				this._activeLayerId = idx;
				break;
			}
		}

		//アクティブレイヤーを変更するだけなので、Stateを変えない
		//this._state.setCurrent(State.LAYER_CHANGE);
		console.log('\n[LayerPanel Event]', e.type, "\n\t" + "state : " + this._state.current);
		this.dispatchEvent(new createjs.Event(LayerPanelController.EVENT_CHANGE_ACTIVELAYER_LAYERPANEL, true, true));
	}
	private _onChangeLPRHandler = (e:Event) =>{
		this._state.setCurrent(State.LAYER_CHANGE);
		console.log('\n[LayerPanel Event]', e.type, "\n\t" + "state : " + this._state.current);
		this.dispatchEvent(new createjs.Event(LayerPanelController.EVENT_CHANGE_DATA_LAYERPANEL, true, true));
	}
	private _onChangeSortableHandler = (e:Event) =>{
		this._state.setCurrent(State.LAYER_CHANGE);
		console.log('\n[LayerPanel Event]', e.type, "\n\t" + "state : " + this._state.current);
		this.dispatchEvent(new createjs.Event(LayerPanelController.EVENT_CHANGE_DATA_LAYERPANEL, true, true));
	}
	//=============================================
	// private
	//=============================================

	//=============================================
	// public
	//=============================================
	public setPad = (pad:PixcelArtData):void =>{
		console.log('\n[LayerPanel]', "setPad", "\n\t" + "state : " + this._state.current);
		
		this._pad = pad;
		let dldList :Array<DrawLayerData> = this._pad.getDrawLayerDataList();
		let dld:DrawLayerData;
		let lpr:LayerPanelRow;
		for(var j=0; j<this._lprList.length;j++){
			lpr = this._lprList[j];
			let isMatch:boolean = false;
			let idx:number = this._lprList.length - 1 - j;
			for(var i=0; i<dldList.length;i++){
				dld = dldList[i];
				//console.log(i, j);
				if(i == idx){
					lpr.show();
					lpr.setDld(dld);
					isMatch = true;
					break;
				}
			}
			//console.log(j, isMatch);
			if(!isMatch){
				lpr.hide();
			}
		}
		this.changedState()
	}
	public getPad = ():PixcelArtData =>{
		this._pad.clearDrawLayerDataList();
		let lpr: LayerPanelRow;
		let dld: DrawLayerData;
		
		let rowSpanList:NodeListOf<Element> = document.querySelectorAll('#layerPanelBody > ul > li > .layerPanelRowTxt > span');
		let rowSpan :HTMLElement;
		let rowSpanTxt:string
		for (var j = rowSpanList.length-1; 0<j; j--) {
			rowSpan = <HTMLElement>rowSpanList[j];
			rowSpanTxt = rowSpan.innerHTML;
			if(rowSpanTxt){
				for (var i = this._lprList.length-1; 0<i; i--) {
					lpr = <LayerPanelRow>this._lprList[i];
					if(lpr.isShow && (rowSpanTxt == lpr.txt)){
						dld = lpr.getDld();
						this._pad.addDrawLayerData(dld);
						break;
					}	
				}
			}
		}

		return this._pad;
	}
	public changedState = ():void =>{
		let lpr:LayerPanelRow;
		let showCount:number = 0;
		for (var i = 0; i < this._lprList.length; i++) {
			lpr = <LayerPanelRow>this._lprList[i];
			if(lpr.isShow){
				showCount++;
			}
		}
		//console.log(this._lprList.length, showCount);

		this._addLPR.classList.remove("disabled");
		this._deleteLPR.classList.remove("disabled");
		if(showCount <= 1){
			this._deleteLPR.classList.add("disabled");
		}
		if(this._lprList.length <= showCount){
			this._addLPR.classList.add("disabled");
		}
	}
	//=============================================
	// getter/setter
	//=============================================
	get activeLayerId ():number{
		return this._activeLayerId;
	}
}