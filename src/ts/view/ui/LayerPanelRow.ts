import { DrawLayerData } from "../../model/data/DrawLayerData";
import { Preview } from "../canvas/Preview";

export class LayerPanelRow extends createjs.EventDispatcher {
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
