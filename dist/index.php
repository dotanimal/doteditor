<?php
$ua = $_SERVER['HTTP_USER_AGENT'];
$isSp = false;
$isPc = false;
if((strpos($ua, 'iPhone')!==false)||(strpos($ua,'iPod')!==false)||(strpos($ua,'Android')!==false && (strpos($ua, 'Mobile') !== false))) {
	$isSp = true;
}else{
	$isPc = true;
}
?>

<!doctype html>
<?php if ($isPc) : ?>
<html lang="ja" id="pc">
<?php elseif($isSp) : ?>
<html lang="ja" id="sp">
<?php endif; ?>
<head>
	<meta charset="utf-8">
	
	<?php if ($isSp) : ?>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- iOS用 -->
		<meta name="apple-mobile-web-app-capable" content="yes">
		<!-- Android用 -->
		<meta name="mobile-web-app-capable" content="yes">
	<?php endif; ?>

	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Cache-Control" content="no-cache">
	<meta http-equiv="Expires" content="0">
	<title>doteditor | dot.animal labo</title>

	<!-- favicon -->
	<link rel="icon" href="/assets/img/favicon.ico">

	<!-- createjs -->
	<script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
	
	<!-- Latest Sortable -->
	<script src="https://raw.githack.com/SortableJS/Sortable/master/Sortable.js"></script>

	<!-- vanilla-picker -->
	<script src="https://unpkg.com/vanilla-picker@2"></script>

	<!-- Bootstrap Icons CSS -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
	
	<link rel="stylesheet" href="./css/style.css?p=<?php echo time(); ?>">

</head>
<body>
<?php if ($isPc/* || $isSp */) : ?>
<?php /*---------------PC---------------*/ ?>
	<div id="editor">
		<div id="editorLeft">
			<div id="editorLeftTop">
				<div id="fileDropdown">
					<a class="btn btn-outline-dark btn-sm dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">ファイル</a>
					<ul class="dropdown-menu dropdown-menu-dark">
						<li class="dropend">
							<a id="fileNewMenu" class="dropdown-item" href="#">新規作成</a>
						</li>
						<li class="dropend" id="fileLoadMenu">
							<a class="dropdown-item dropdown-toggle" href="#">読み込み</a>
							<ul class="dropdown-menu dropdown-menu-dark">
								<li>
									<a id="fileLoadJsonFromLocalLink" class="dropdown-item" href="#">PC</a>
								</li>
								<li>
									<a id="fileLoadListFromWpLink" class="dropdown-item" href="#">WordPress</a>
								</li>
							</ul>
						</li>
						<li class="dropend" id="fileSaveMenu">
							<a class="dropdown-item dropdown-toggle" href="#">保存</a>
							<ul class="dropdown-menu dropdown-menu-dark">
								<li>
									<a id="fileSaveJson2LocalLink" class="dropdown-item" href="#">PC</a>
								</li>
								<lii class="dropend">
									<a class="dropdown-item dropdown-toggle" href="#">WordPress</a>
									<ul class="dropdown-menu dropdown-menu-dark">
										<li>
											<a id="fileUpdate2WpLink" class="dropdown-item" href="#">上書き保存</a>
										</li>
										<li>
											<a id="filePost2WpLink" class="dropdown-item" href="#">新規保存</a>
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li class="dropend" id="filePublishMenu">
							<a class="dropdown-item dropdown-toggle" href="#">書き出し</a>
							<ul class="dropdown-menu dropdown-menu-dark">
								<li>
									<a id="publishSvgToLocalLink" class="dropdown-item" href="#">SVG形式</a>
								</li>
								<li>
									<a id="publishPngToLocalLink" class="dropdown-item" href="#">PNG形式</a>
								</li>
								<li>
									<a id="publishJpegToLocalLink" class="dropdown-item" href="#">JPEG形式</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<div id="fileLoadInputs">
					<input type="file" accept="application/json,.json" id="loadJsonFromLocalInput">
				</div>
				<div id="historyBtnGrp" class="btn-group" role="group" aria-label="">
					<button id="undo" type="button" class="btn btn-outline-dark btn-sm"><i class="bi bi-reply"></i></button>
					<button id="redo" type="button" class="btn btn-outline-dark btn-sm"><i class="bi bi-reply"></i></button>
				</div>
				<div id="drawBtnGrp" class="btn-group" role="group" aria-label="">
					<button id="pencil" type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="button">
						<i class="bi bi-pencil"></i>
					</button>
					<button id="eracer" type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="button">
						<i class="bi bi-eraser"></i>
					</button>
					<button id="dropper" type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="button">
						<i class="bi bi-eyedropper"></i>
					</button>
					<button id="selectRange" type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="button">
						<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M219.231 885.537q-19.784 0-33.872-14.088-14.088-14.088-14.088-33.872h47.96v47.96Zm-47.96-125.152v-71.193h47.96v71.193h-47.96Zm0-148.385v-71.192h47.96V612h-47.96Zm0-148.385v-71.192h47.96v71.192h-47.96Zm0-148.384q0-19.784 14.088-33.872 14.088-14.088 33.872-14.088v47.96h-47.96Zm125.152 570.306v-47.96h71.192v47.96h-71.192Zm0-570.306v-47.96h71.192v47.96h-71.192Zm148.385 570.306v-47.96H516v47.96h-71.192Zm0-570.306v-47.96H516v47.96h-71.192Zm148.384 570.306v-47.96h71.193v47.96h-71.193Zm0-570.306v-47.96h71.193v47.96h-71.193Zm148.385 570.306v-47.96h47.96q0 20.307-14.088 34.134-14.088 13.826-33.872 13.826Zm0-121.306v-71.192h47.96v71.192h-47.96Zm0-152.231v-71.192h47.96V612h-47.96Zm0-152.231v-71.192h47.96v71.192h-47.96Zm0-144.538v-47.96q19.784 0 33.872 14.088 14.088 14.088 14.088 33.872h-47.96Z"/></svg>
					</button>
					<button id="copy" type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="button">
						<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M276 904.616q-24.316 0-40.466-16.15-16.15-16.15-16.15-40.466V400.615h32V848q0 9.231 7.693 16.923 7.692 7.692 16.923 7.692h351.385v32.001H276Zm104-104.001q-24.316 0-40.466-16.15-16.15-16.15-16.15-40.465V313.23q0-24.315 16.15-40.465 16.15-16.15 40.466-16.15h334.769q24.316 0 40.466 16.15 16.15 16.15 16.15 40.465V744q0 24.315-16.15 40.465-16.15 16.15-40.466 16.15H380Zm0-32h334.769q9.231 0 16.923-7.692 7.693-7.692 7.693-16.923V313.23q0-9.23-7.693-16.923-7.692-7.692-16.923-7.692H380q-9.231 0-16.923 7.692-7.692 7.693-7.692 16.923V744q0 9.231 7.692 16.923 7.692 7.692 16.923 7.692Zm-24.615 0v-480 480Z"/></svg>
					</button>
					<button id="cut" type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="button">
						<i class="bi bi-scissors"></i>
					</button>
					<!--
					<button id="droplet" type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="button">
						<i class="bi bi-droplet-fill"></i>
					</button>
					-->
				</div>
				<!--
				<div id="colorPalette">
					<span><input class="editColorPicker" type="color" value="#FFFFFF"></span>
					<span><input class="editColorPicker" type="color" value="#FFFFFF"></span>
					<span><input class="editColorPicker" type="color" value="#FFFFFF"></span>
					<span><input class="editColorPicker" type="color" value="#FFFFFF"></span>
					<span><input class="editColorPicker" type="color" value="#FFFFFF"></span>
					<span><input class="editColorPicker" type="color" value="#FFFFFF"></span>
					<span><input class="editColorPicker" type="color" value="#FFFFFF"></span>
					<span><input class="editColorPicker" type="color" value="#FFFFFF"></span>
					<span><input class="editColorPicker" type="color" value="#FFFFFF"></span>
				</div>
				-->
			</div>
			<div id="editorLeftMiddle">
				<div id="workspace1Container">
					<canvas id="workspace1" width="500" height="500"></canvas>
				</div>
				<div id="workspace2Container">
					<canvas id="workspace2" width="500" height="500"></canvas>
				</div>
			</div>
		</div>
		<!-- /#editorLeft -->
		
		<div id="editorRight">

		</div>
		<!-- /#editorRight -->

	</div>

	<footer>
		<button type="button" class="btn btn-outline-secondary" onClick="window.close()">閉じる</button>
	</footer>

	<!-- #layerWindow -->
	<div id="layerWindow" class="draggableWindow">
		<div class="draggableWindowHeader">
			<span class="draggableWindowHeaderTxt">
				レイヤー
			</span>
			<span class="draggableWindowHeaderBtn">
			</span>
		</div>
		<div id="layerPanel" class="draggableWindowBody">
			<div id="layerPanelHeader">
			</div>
			<div id="layerPanelBody">
				<ul class="layerPanel">
					<li class="layerPanelItem">
						<canvas class="layerPanelItemCanvas" width="62" height="62"></canvas>
						<span class="layerPanelItemEye"></span>
						<span class="layerPanelItemTxt">
							<span></span>
							<input type="text" value="" />
						</span>
						<span class="layerPanelItemHandle"></span>
					</li>
					<li class="layerPanelItem">
						<canvas class="layerPanelItemCanvas" width="62" height="62"></canvas>
						<span class="layerPanelItemEye"></span>
						<span class="layerPanelItemTxt">
							<span></span>
							<input type="text" value="" />
						</span>
						<span class="layerPanelItemHandle"></span>
					</li>
					<li class="layerPanelItem">
						<canvas class="layerPanelItemCanvas" width="62" height="62"></canvas>
						<span class="layerPanelItemEye"></span>
						<span class="layerPanelItemTxt">
							<span></span>
							<input type="text" value="" />
						</span>
						<span class="layerPanelItemHandle"></span>
					</li>
					<li class="layerPanelItem">
						<canvas class="layerPanelItemCanvas" width="62" height="62"></canvas>
						<span class="layerPanelItemEye"></span>
						<span class="layerPanelItemTxt">
							<span></span>
							<input type="text" value="" />
						</span>
						<span class="layerPanelItemHandle"></span>
					</li>
					<li class="layerPanelItem">
						<canvas class="layerPanelItemCanvas" width="62" height="62"></canvas>
						<span class="layerPanelItemEye"></span>
						<span class="layerPanelItemTxt">
							<span></span>
							<input type="text" value="" />
						</span>
						<span class="layerPanelItemHandle"></span>
					</li>
				</ul>
			</div>
			<div id="layerPanelFooter">
				<span id="addLayerPanelItem">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
						<path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
					</svg>
				</span>
				<span id="deleteLayerPanelItem">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M6.5 1a.5.5 0 0 0-.5.5v1h4v-1a.5.5 0 0 0-.5-.5h-3ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1H3.042l.846 10.58a1 1 0 0 0 .997.92h6.23a1 1 0 0 0 .997-.92l.846-10.58Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
					</svg>
				</span>
			</div>
		</div>
	</div>
	<!-- /#layerWindow -->
	
	<!-- #previewWindow -->
	<div id="previewWindow" class="draggableWindow">
		<div class="draggableWindowHeader">
			<span class="draggableWindowHeaderTxt">
				プレビュー
			</span>
			<span class="draggableWindowHeaderBtn">
			</span>
		</div>
		<div id="previewPanel" class="draggableWindowBody">
			<canvas id="previewCanvas" width="204" height="100"></canvas>
			<input id="previewRange" class="inputRange" type="range" value="2" min="1" max="10" step="1">
		</div>
	</div>
	<!-- /#previewWindow -->
	
	<!-- #colorpaletteWindow -->
	<div id="colorpaletteWindow" class="draggableWindow">
		<div class="draggableWindowHeader">
			<span class="draggableWindowHeaderTxt">
				カラーパレット
			</span>
			<span class="draggableWindowHeaderBtn">
			</span>
		</div>
		<div id="colorpalettePanel" class="draggableWindowBody">
			<div id="colorpalettePanelTop"></div>
			<div id="colorpalettePanelBottom">
				<div id="colorpaletteBoxContainer"></div>
			</div>
		</div>
	</div>
	<!-- /#colorpaletteWindow -->

	<!-- #loadFromWPModal -->
	<div class="modal fade" id="loadFromWPModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">WordPressから読み込み</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="d-flex justify-content-center loadingView">
						<div class="spinner-border" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					</div>
					<div class="mainView">
						<div class="topArea">
							<canvas id="loadFromWPCanvas" class="center-block" width="759" height="275"></canvas>
						</div>
						<div class="bottomArea">
							<ul id="loadFromWPPagenation" class="pagination justify-content-center">
								<li class="page-item"><a class="page-link" href="#">&lt;&lt;</a></li>
								<li class="page-item active"><a class="page-link" href="#">1</a></li>
								<li class="page-item"><a class="page-link" href="#">2</a></li>
								<li class="page-item"><a class="page-link" href="#">3</a></li>
								<li class="page-item"><a class="page-link" href="#">&gt;&gt;</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- /#loadFromWPModal -->
	<!-- saveNewToWpModal -->
	<div class="modal fade" id="saveToWpModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">新規保存</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="inputView">
						<div class="topArea">
							<h3>タイトル</h3>
							<p><input type="text" class="form-control form-control-sm"></p>
						</div>
						<div class="middleArea">
							<h3>プレビュー</h3>
							<p>
								<canvas id="saveToWpPreviewCanvas" width="" height=""></canvas>
							</p>
						</div>
						<div class="bottomArea">
							<button type="button" class="btn btn-outline-dark btn-sm">投稿する</button>
						</div>
					</div>
					<div class="d-flex justify-content-center loadingView">
						<div class="spinner-border" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					</div>
					<div class="completeView">
						<div class="topArea completeMessage">
							ライブラリへの新規保存が完了しました
						</div>
						<div class="bottomArea">
							<button type="button" class="btn btn-outline-dark btn-sm">閉じる</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- /#saveNewToWpModal -->
<?php elseif($isSp) : ?>
<?php /*---------------SP---------------*/ ?>
<div id="editor">
	<div id="editorTop">
		<button id="fileMenuBtn" class="btn btn-outline-dark btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
			<i class="bi bi-list"></i>
		</button>

		<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
		<div class="offcanvas-header">
			<h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
			<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="offcanvas-body">
			<div>
			Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
			</div>
		</div>
		</div>


		<div id="historyBtnGrp" class="btn-group" role="group" aria-label="">
			<button id="undo" type="button" class="btn btn-outline-dark btn-sm"><i class="bi bi-reply"></i></button>
			<button id="redo" type="button" class="btn btn-outline-dark btn-sm"><i class="bi bi-reply"></i></button>
		</div>

	</div>
	<!--/#editorTop-->
	<div id="editorMiddle">
		<ul class="nav nav-tabs" id="workspaceTab" role="tablist">
		<li class="nav-item" role="presentation">
			<button
			class="nav-link active"
			id="ws1-tab"
			data-bs-toggle="tab"
			data-bs-target="#ws1"
			type="button"
			role="tab"
			aria-controls="ws1"
			aria-selected="true"
			>
			ws1
			</button>
		</li>
		<li class="nav-item" role="presentation">
			<button
			class="nav-link"
			id="ws2-tab"
			data-bs-toggle="tab"
			data-bs-target="#ws2"
			type="button"
			role="tab"
			aria-controls="ws2"
			aria-selected="false"
			>
			ws2
			</button>
		</li>
		</ul>
		<div class="tab-content" id="workspaceTabContent">
			<div
				class="tab-pane fade show active"
				id="ws1"
				role="tabpanel"
				aria-labelledby="ws1-tab"
			>
				<canvas id="workspace1" width="375" height="375"></canvas>
			</div>
			<div
				class="tab-pane fade"
				id="ws2"
				role="tabpanel"
				aria-labelledby="ws2-tab"
			>
				<canvas id="workspace2" width="375" height="375"></canvas>
			</div>
		</div>
	</div>
	<!--/#editorMiddle-->

	<div id="editorBottom">
		<div id="previewPanel">
			<canvas id="previewCanvas" width="100" height="100"></canvas>
			<input id="previewRange" class="inputRange" type="range" value="2" min="1" max="3" step="1">
		</div>
		<div id="drawBtnGrp" class="btn-group" role="group" aria-label="">
			<button id="pencil" type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="button">
				<i class="bi bi-pencil"></i>
			</button>
			<button id="eracer" type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="button">
				<i class="bi bi-eraser"></i>
			</button>
			<button id="dropper" type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="button">
				<i class="bi bi-eyedropper"></i>
			</button>
			<button id="selectRange" type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="button">
				<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M219.231 885.537q-19.784 0-33.872-14.088-14.088-14.088-14.088-33.872h47.96v47.96Zm-47.96-125.152v-71.193h47.96v71.193h-47.96Zm0-148.385v-71.192h47.96V612h-47.96Zm0-148.385v-71.192h47.96v71.192h-47.96Zm0-148.384q0-19.784 14.088-33.872 14.088-14.088 33.872-14.088v47.96h-47.96Zm125.152 570.306v-47.96h71.192v47.96h-71.192Zm0-570.306v-47.96h71.192v47.96h-71.192Zm148.385 570.306v-47.96H516v47.96h-71.192Zm0-570.306v-47.96H516v47.96h-71.192Zm148.384 570.306v-47.96h71.193v47.96h-71.193Zm0-570.306v-47.96h71.193v47.96h-71.193Zm148.385 570.306v-47.96h47.96q0 20.307-14.088 34.134-14.088 13.826-33.872 13.826Zm0-121.306v-71.192h47.96v71.192h-47.96Zm0-152.231v-71.192h47.96V612h-47.96Zm0-152.231v-71.192h47.96v71.192h-47.96Zm0-144.538v-47.96q19.784 0 33.872 14.088 14.088 14.088 14.088 33.872h-47.96Z"/></svg>
			</button>
			<button id="copy" type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="button">
				<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M276 904.616q-24.316 0-40.466-16.15-16.15-16.15-16.15-40.466V400.615h32V848q0 9.231 7.693 16.923 7.692 7.692 16.923 7.692h351.385v32.001H276Zm104-104.001q-24.316 0-40.466-16.15-16.15-16.15-16.15-40.465V313.23q0-24.315 16.15-40.465 16.15-16.15 40.466-16.15h334.769q24.316 0 40.466 16.15 16.15 16.15 16.15 40.465V744q0 24.315-16.15 40.465-16.15 16.15-40.466 16.15H380Zm0-32h334.769q9.231 0 16.923-7.692 7.693-7.692 7.693-16.923V313.23q0-9.23-7.693-16.923-7.692-7.692-16.923-7.692H380q-9.231 0-16.923 7.692-7.692 7.693-7.692 16.923V744q0 9.231 7.692 16.923 7.692 7.692 16.923 7.692Zm-24.615 0v-480 480Z"/></svg>
			</button>
			<button id="cut" type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="button">
				<i class="bi bi-scissors"></i>
			</button>
			<button id="layerPanelBtn" type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
				<i class="bi bi-stack"></i>
			</button>
		</div>
	</div>

	<!--/#editorBottom-->

	<div class="offcanvas offcanvas-end layerOffcanvas" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
		<div class="offcanvas-header">
			<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="offcanvas-body">
			<div id="layerPanel" class="draggableWindowBody">
				<div id="layerPanelHeader">
				</div>
				<div id="layerPanelBody">
					<ul class="layerPanel">
						<li class="layerPanelItem">
							<canvas class="layerPanelItemCanvas" width="62" height="62"></canvas>
							<span class="layerPanelItemEye"></span>
							<span class="layerPanelItemTxt">
								<span></span>
								<input type="text" value="" />
							</span>
							<span class="layerPanelItemHandle"></span>
						</li>
						<li class="layerPanelItem">
							<canvas class="layerPanelItemCanvas" width="62" height="62"></canvas>
							<span class="layerPanelItemEye"></span>
							<span class="layerPanelItemTxt">
								<span></span>
								<input type="text" value="" />
							</span>
							<span class="layerPanelItemHandle"></span>
						</li>
						<li class="layerPanelItem">
							<canvas class="layerPanelItemCanvas" width="62" height="62"></canvas>
							<span class="layerPanelItemEye"></span>
							<span class="layerPanelItemTxt">
								<span></span>
								<input type="text" value="" />
							</span>
							<span class="layerPanelItemHandle"></span>
						</li>
						<li class="layerPanelItem">
							<canvas class="layerPanelItemCanvas" width="62" height="62"></canvas>
							<span class="layerPanelItemEye"></span>
							<span class="layerPanelItemTxt">
								<span></span>
								<input type="text" value="" />
							</span>
							<span class="layerPanelItemHandle"></span>
						</li>
						<li class="layerPanelItem">
							<canvas class="layerPanelItemCanvas" width="62" height="62"></canvas>
							<span class="layerPanelItemEye"></span>
							<span class="layerPanelItemTxt">
								<span></span>
								<input type="text" value="" />
							</span>
							<span class="layerPanelItemHandle"></span>
						</li>
					</ul>
				</div>
				<div id="layerPanelFooter">
					<span id="addLayerPanelItem">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
							<path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
						</svg>
					</span>
					<span id="deleteLayerPanelItem">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M6.5 1a.5.5 0 0 0-.5.5v1h4v-1a.5.5 0 0 0-.5-.5h-3ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1H3.042l.846 10.58a1 1 0 0 0 .997.92h6.23a1 1 0 0 0 .997-.92l.846-10.58Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
						</svg>
					</span>
				</div>
			</div>
		</div>
	</div>

</div>
<?php endif; ?>
	<script src="js/script.js?p=<?php echo time(); ?>"></script>
</body>
</html>