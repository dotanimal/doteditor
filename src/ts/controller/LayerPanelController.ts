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
	private _activeLayerName:string;

	private _addLPR:HTMLElement;
	private _deleteLPR:HTMLElement;
	private _sortable:Sortable;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(state:State) {
		super();
		this._state = state;

		// List with handle
		let rows : HTMLElement =  <HTMLElement>document.querySelector('#layerPanelBody > ul');
		this._sortable = Sortable.create(
			rows, 
			{
				handle: '.layerPanelRowHandle',
				animation: 150,
				onSort: this._onSortSortableHandler,
				onEnd : this._onChangeSortableHandler
			}
		);
		this._onSortSortableHandler();
		
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
		for (var i = 0; i < this._lprList.length; i++) {
			lpr = <LayerPanelRow>this._lprList[i];
			if(!lpr.isShow){
				let dld:DrawLayerData = new DrawLayerData(String("layer" + new Date().getTime()));
				lpr.setDld(dld);
				lpr.show();
				break;
			}
		}
		this._state.setCurrent(State.LAYER_CHANGE);
		this.changedState();
		this.dispatchEvent(new createjs.Event(LayerPanelController.EVENT_CHANGE_DATA_LAYERPANEL, true, true));
	}
	private _onClickDeleteLPRHandler = (e:Event) =>{
		let lpr:LayerPanelRow;
		for (var i = 0; i < this._lprList.length; i++) {
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
		for (var i = 0; i < this._lprList.length; i++) {
			lpr = <LayerPanelRow>this._lprList[i];
			if(target.txt == lpr.txt){
				this._activeLayerName = lpr.txt;
				lpr.active();
			}else{
				lpr.inactive();
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
	//並び替えのたびに、リストタグの属性情報を書き換える
	private _onSortSortableHandler = (e:Event = null) =>{
		let rows : HTMLElement =  <HTMLElement>document.querySelector('#layerPanelBody > ul');
		let items:NodeListOf<Element> = rows.querySelectorAll('li');
		for (var i = 0; i < items.length; i++) {
			let item:HTMLElement = <HTMLElement>items[i];
			item.setAttribute("data-sotable-index", String(i));
		}
	}
	//=============================================
	// private
	//=============================================
	private _sortLprList = ():void =>{
		let result:Array<LayerPanelRow> = [];
		let lpr:LayerPanelRow;
		let idx:number;
		for(var i=0; i<this._lprList.length; i++){
		//for(var i=this._lprList.length-1; 0<=i; i--){
			lpr = this._lprList[i];
			idx = lpr.index;
			//result[idx] = lpr;
			result[this._lprList.length - 1 - idx] = lpr;
		}
		this._lprList = result;
	}
	//=============================================
	// public
	//=============================================
	public setPad = (pad:PixcelArtData):void =>{
		console.log('\n[LayerPanel]', "setPad", "\n\t" + "state : " + this._state.current);
		
		this._sortLprList();

		this._pad = pad;
		let dldList :Array<DrawLayerData> = this._pad.getDrawLayerDataList();
		let dld:DrawLayerData;

		let lpr:LayerPanelRow;
		//for(var i=this._lprList.length-1; 0<=i; i--){
		for(var i=0; i<this._lprList.length; i++){
			lpr = this._lprList[i];
			let isMatch:boolean = false;
			let idx:number = lpr.index;
			//for(var j=dldList.length-1; 0<=j; j--){
			for(var j=0; j<dldList.length; j++){
				dld = dldList[j];
				//console.log(i, j);
				if(j == (this._lprList.length - 1 - idx)){
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
		//console.log("\n[Sotable]", "toArray", "\n\t", this._sortable.toArray());
		
		this._sortLprList();

		this._pad.clearDrawLayerDataList();
		
		let lpr: LayerPanelRow;
		let dld: DrawLayerData;

		//for(var i=this._lprList.length-1; 0<=i; i--){
		for(var i=0; i<this._lprList.length; i++){
			lpr = this._lprList[i];
			//console.log(lpr.index,lpr.txt)
			if(lpr.isShow){
				dld = lpr.getDld();
				this._pad.addDrawLayerData(dld);
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
	get activeLayerName():string{
		return this._activeLayerName;
	}
}