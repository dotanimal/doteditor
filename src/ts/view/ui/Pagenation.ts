export class Pagenation extends createjs.EventDispatcher {
	//=============================================
	// 定数/変数
	//=============================================
	//----------public----------
	public static readonly EVENT_CHANGE_PAGENATION: string = "event change pagenation";
	//----------private---------
	private _currentPageId: number;
	private _clickPageId: number;
	private _container: HTMLElement;
	//=============================================
	// constructor
	//=============================================
	constructor(id: string) {
		super();

		this._container = document.getElementById(id);
		this._container.addEventListener("click", this._onClickHandler);
	}
	//=============================================
	// event handler
	//=============================================
	private _onClickHandler = (e: MouseEvent) => {
		let a: HTMLElement = <HTMLElement>e.target;
		let html: string = a.innerHTML;
		let currentPageId: number = Number(this._currentPageId);
		let clickPageId: number;

		if (html == "&lt;&lt;") {
			clickPageId = currentPageId - 1;
		} else if (html == "&gt;&gt;") {
			clickPageId = currentPageId + 1;
		} else {
			clickPageId = parseInt(html);
		}

		if (currentPageId != clickPageId) {
			this._clickPageId = clickPageId;
			this.dispatchEvent(new createjs.Event(Pagenation.EVENT_CHANGE_PAGENATION, true, true));
		}
		e.preventDefault();
	}
	//=============================================
	// private
	//=============================================
	private _getPrevBtnHTML = (): string => {
		return '<li class="page-item"><a class="page-link" href="#">&lt;&lt;</a></li>';
	}
	private _getNextBtnHTML = (): string => {
		return '<li class="page-item"><a class="page-link" href="#">&gt;&gt;</a></li>';
	}
	private _getPageBtnHTML = (id: number, isActive: boolean = false): string => {
		let result: string;
		if (isActive) {
			result = '<li class="page-item active"><a class="page-link" href="#">' + id + '</a></li>';
		} else {
			result = '<li class="page-item"><a class="page-link" href="#">' + id + '</a></li>';
		}
		return result;
	}
	//=============================================
	// public
	//=============================================
	public reset = () => {
		//子要素を削除
		this._container.innerHTML = '';
	}
	public setting = (max_page: number, current_page: number) => {
		this.reset();

		this._currentPageId = current_page;

		let hasPrev: boolean = (1 < current_page);
		let hasNext: boolean = (current_page < max_page);

		let result: string = "";

		if (hasPrev) {
			result += this._getPrevBtnHTML();
		}
		for (let i: number = 1; i <= max_page; i++) {
			if (i == current_page) {
				result += this._getPageBtnHTML(i, true);
			} else {
				result += this._getPageBtnHTML(i);
			}
		}
		if (hasNext) {
			result += this._getNextBtnHTML();
		}

		this._container.innerHTML = result;

	}
	//=============================================
	// getter/setter
	//=============================================
	get pageId(): number {
		return this._clickPageId;
	}
}
