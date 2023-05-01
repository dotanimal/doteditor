import { State } from "../model/State";
import { PixcelArtData } from "../model/data/PixcelArtData";
import Sortable from "sortablejs";
import { DrawLayerData } from "../model/data/DrawLayerData";
import { Preview } from "../view/canvas/Preview";
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
		this._updateLayerNameList();
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
		this._updateLayerNameList();
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
		this._updateLayerNameList();
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
	private _updateLayerNameList = ():void =>{
		let layerNameList :Array<string> = [];
		let lpr:LayerPanelRow;
		for(var i=0; i<this._lprList.length; i++){
			lpr = this._lprList[i];
			layerNameList.push(lpr.txt);
		}
		for(var i=0; i<this._lprList.length; i++){
			lpr = this._lprList[i];
			lpr.setNameList(layerNameList);
		}		
	}
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
		this._updateLayerNameList();
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


class LayerPanelRow extends createjs.EventDispatcher {
	//=============================================
	// TODO
	//=============================================
	/*
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_MOUSEDOWN_LAYERPANELROW: string = "event mouse down layer panel row";
	public static readonly EVENT_CHANGE_LAYERPANELROW: string = "event change layer panel row";
	//----------private---------
	private _target:HTMLElement;
	private _isActive:boolean; //現在選択中の場合にTrue
	private _isShow:boolean; //パネルに追加されていたらTrue

	private _dld:DrawLayerData;

	private _eye:Eye;
	private _txt:Txt;
	private _preview:Preview;
	private _stage:createjs.Stage;
	private _sw:number;
	private _sh:number;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(target:HTMLElement) {
		super();
		this._target = target;
		this._isShow = true;

		this._eye = new Eye(this._target.querySelector(".layerPanelRowEye"));
		this._txt = new Txt(this._target.querySelector(".layerPanelRowTxt"));

		let cvs:HTMLCanvasElement = <HTMLCanvasElement>this._target.querySelector('.layerPanelRowCanvas');
		this._sw = cvs.width;
		this._sh = cvs.height;
		this._preview = new Preview(this._sw, this._sh, 2);
		this._stage = new createjs.Stage(cvs);
		this._stage.addChild(this._preview);

		this._target.addEventListener("mousedown", this._onMousedownHandler);
		this._eye.addEventListener(Eye.EVENT_CHANGE_EYE, this._onChangeEyeHandler);
		this._txt.addEventListener(Txt.EVENT_CHANGE_TXT, this._onChangeTxtHandler);
	}
	//=============================================
	// event handler
	//=============================================
	private _onMousedownHandler = (e:Event) =>{
		//console.log("[layer]", "click", "target", this._isActive);
		this.dispatchEvent(new createjs.Event(LayerPanelRow.EVENT_MOUSEDOWN_LAYERPANELROW, true, true));
	}
	private _onChangeEyeHandler = (e:Event) =>{
		//console.log("[layer]", "change", "eye", this._eye.visible);
		this.dispatchEvent(new createjs.Event(LayerPanelRow.EVENT_CHANGE_LAYERPANELROW, true, true));
	}
	private _onChangeTxtHandler = (e:Event) =>{
		//console.log("[layer]", "change", "txt", this._txt.value);
		this.dispatchEvent(new createjs.Event(LayerPanelRow.EVENT_CHANGE_LAYERPANELROW, true, true));
	}
	//=============================================
	// private
	//=============================================
	//=============================================
	// public
	//=============================================
	public setDld = (dld:DrawLayerData):void =>{
		this._dld = dld;

		if(this._dld.isActive){
			this.active()
		}else{
			this.inactive();
		}

		//Txtへの反映
		this._txt.value = this._dld.name;

		//Eyeへの反映
		this._eye.visible = this._dld.visible;

		//プレビューへの反映
		this._preview.graphics.clear();
		this._preview.drawDld(this._dld, 0, 0, this._sw, this._sh, false);
		this._stage.update();
	}

	public getDld = ():DrawLayerData =>{
		if(!this._dld){return null}
		this._dld.name = this._txt.value;
		this._dld.visible = this._eye.visible;
		this._dld.isActive = this._isActive;
		return this._dld
	}
	public show = () :void =>{
		if(!this._isShow){
			//console.log("show");
			this._target.classList.remove("hide");
			this._isShow = true;
		}
	}
	public hide = () :void =>{
		if(this._isShow){
			//console.log("hide");
			this._target.classList.add("hide");
			this._preview.graphics.clear();
			this._txt.value = "";
			this._stage.update();
			this._isShow = false;
		}
	}
	public active = () :void =>{
		if(!this._isActive){
			this._target.classList.add("active");
			this._isActive = true;
		}
	}
	public inactive = () :void =>{
		if(this._isActive){
			this._target.classList.remove("active");
			this._isActive = false;
		}
	}
	public setNameList = (list:Array<string>) :void =>{
		this._txt.setNameList(list);
	}
	//=============================================
	// getter/setter
	//=============================================
	get txt():string{
		return this._txt.value;
	}
	get index():number{
		let idxStr:string = this._target.getAttribute("data-sotable-index");
		return Number(idxStr);
	}
	get isActive(): boolean {
		return this._isActive;
	}
	get isShow():boolean{
		return this._isShow;
	}
}
class Eye extends createjs.EventDispatcher {
	//=============================================
	// TODO
	//=============================================
	/*
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_CHANGE_EYE: string = "event change eye";
	//----------private---------
	private _target:HTMLElement;
	private _visible:boolean;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(target:HTMLElement) {
		super();
		this._target = target;

		this._visible = true;

		this._target.addEventListener("click", this._onClickHandler);
	}
	//=============================================
	// event handler
	//=============================================
	private _onClickHandler = (e:Event) =>{
		if(this._visible){
			this._target.classList.add("hide");
			this._visible = false;
		}else{
			this._target.classList.remove("hide");
			this._visible = true;
		}
		this.dispatchEvent(new createjs.Event(Eye.EVENT_CHANGE_EYE, true, true));
	}
	//=============================================
	// private
	//=============================================
	//=============================================
	// public
	//=============================================
	//=============================================
	// getter/setter
	//=============================================
	get visible(): boolean {
		return this._visible;
	}
	set visible(value:boolean) {
		if(value){
			this._target.classList.remove("hide");
		}else{
			this._target.classList.add("hide");
		}
		this._visible = value;
	}
}
class Txt extends createjs.EventDispatcher {
	//=============================================
	// TODO
	//=============================================
	/*
	*/
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_CHANGE_TXT: string = "event change txt";
	//----------private---------
	private _target:HTMLElement;
	private _span:HTMLElement;
	private _input:HTMLInputElement;
	private _isEdit:boolean;
	private _nameList:Array<string>;
	//----------protected-------
	//=============================================
	// constructor
	//=============================================
	constructor(target:HTMLElement) {
		super();
		this._target = target;
		this._span = <HTMLElement>this._target.querySelector("span");
		this._input = <HTMLInputElement>this._target.querySelector("input");

		this._isEdit = false;
		this._input.classList.add("hide");
		//this._span.classList.add("hide");

		this._span.addEventListener("click", this._onClickSpanHandler);
		this._input.addEventListener("blur", this._onBlurInputHandler);
		this._input.addEventListener("input", this._onInputInputHandler);
	}
	//=============================================
	// event handler
	//=============================================
	private _onClickSpanHandler = (e:Event) =>{
		if(!this._isEdit){
			this._input.value = this._span.innerText;
			this._span.classList.add("hide");
			this._input.classList.remove("hide");
			this._input.focus();
			this._input.select();//全選択状態にする
			this._isEdit = true;
		}
	}
	private _onBlurInputHandler = (e:Event) =>{
		if(this._isEdit){
			this._span.classList.remove("hide");
			this._input.classList.add("hide");
			let value :string = this._input.value;
			if(!value){
				alert("レイヤー名を入力してください");
			}else{
				if(this._input.value != this._span.innerText){
					let isMatch :boolean = false;
					for(var i=0;i<this._nameList.length;i++){
						if(this._nameList[i] == value){
							alert("このレイヤー名はすでに登録されています");
							isMatch = true;
						}
					}
					if(!isMatch){
						this._span.innerText = this._input.value;
						this.dispatchEvent(new createjs.Event(Txt.EVENT_CHANGE_TXT, true, true));
					}
				}
			}

			this._isEdit = false;
		}
	}
	private _onInputInputHandler = (e:Event) =>{
		//半角英数に制限
		if(this._isEdit){
			let str:string = this._input.value;
			while(str.match(/[^A-Z^a-z\d\-]/)){
				str=str.replace(/[^A-Z^a-z\d\-]/,"");
			}
			this._input.value = str;
		}
	}
	//=============================================
	// private
	//=============================================
	//=============================================
	// public
	//=============================================
	public setNameList = (list:Array<string>) :void =>{
		this._nameList = list;
	}
	//=============================================
	// getter/setter
	//=============================================
	get value(): string {
		return this._span.innerText;
	}
	set value(v:string) {
		this._span.innerText = v;
	}
}
