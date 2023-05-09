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
	<title>doteditor | labo | dot.animal</title>

	<!-- favicon -->
	<meta name="msapplication-square70x70logo" content="/labo/doteditor/cmn/img/favicon/site-tile-70x70.png">
	<meta name="msapplication-square150x150logo" content="/labo/doteditor/cmn/img/favicon/site-tile-150x150.png">
	<meta name="msapplication-wide310x150logo" content="/labo/doteditor/cmn/img/favicon/site-tile-310x150.png">
	<meta name="msapplication-square310x310logo" content="/labo/doteditor/cmn/img/favicon/site-tile-310x310.png">
	<meta name="msapplication-TileColor" content="#0078d7">
	<link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/labo/doteditor/cmn/img/favicon/favicon.ico">
	<link rel="icon" type="image/vnd.microsoft.icon" href="/labo/doteditor/cmn/img/favicon/favicon.ico">
	<link rel="apple-touch-icon" sizes="57x57" href="/labo/doteditor/cmn/img/favicon/apple-touch-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="/labo/doteditor/cmn/img/favicon/apple-touch-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="/labo/doteditor/cmn/img/favicon/apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="/labo/doteditor/cmn/img/favicon/apple-touch-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="/labo/doteditor/cmn/img/favicon/apple-touch-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="/labo/doteditor/cmn/img/favicon/apple-touch-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="/labo/doteditor/cmn/img/favicon/apple-touch-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="/labo/doteditor/cmn/img/favicon/apple-touch-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="/labo/doteditor/cmn/img/favicon/apple-touch-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="36x36" href="/labo/doteditor/cmn/img/favicon/android-chrome-36x36.png">
	<link rel="icon" type="image/png" sizes="48x48" href="/labo/doteditor/cmn/img/favicon/android-chrome-48x48.png">
	<link rel="icon" type="image/png" sizes="72x72" href="/labo/doteditor/cmn/img/favicon/android-chrome-72x72.png">
	<link rel="icon" type="image/png" sizes="96x96" href="/labo/doteditor/cmn/img/favicon/android-chrome-96x96.png">
	<link rel="icon" type="image/png" sizes="128x128" href="/labo/doteditor/cmn/img/favicon/android-chrome-128x128.png">
	<link rel="icon" type="image/png" sizes="144x144" href="/labo/doteditor/cmn/img/favicon/android-chrome-144x144.png">
	<link rel="icon" type="image/png" sizes="152x152" href="/labo/doteditor/cmn/img/favicon/android-chrome-152x152.png">
	<link rel="icon" type="image/png" sizes="192x192" href="/labo/doteditor/cmn/img/favicon/android-chrome-192x192.png">
	<link rel="icon" type="image/png" sizes="256x256" href="/labo/doteditor/cmn/img/favicon/android-chrome-256x256.png">
	<link rel="icon" type="image/png" sizes="384x384" href="/labo/doteditor/cmn/img/favicon/android-chrome-384x384.png">
	<link rel="icon" type="image/png" sizes="512x512" href="/labo/doteditor/cmn/img/favicon/android-chrome-512x512.png">
	<link rel="icon" type="image/png" sizes="36x36" href="/labo/doteditor/cmn/img/favicon/icon-36x36.png">
	<link rel="icon" type="image/png" sizes="48x48" href="/labo/doteditor/cmn/img/favicon/icon-48x48.png">
	<link rel="icon" type="image/png" sizes="72x72" href="/labo/doteditor/cmn/img/favicon/icon-72x72.png">
	<link rel="icon" type="image/png" sizes="96x96" href="/labo/doteditor/cmn/img/favicon/icon-96x96.png">
	<link rel="icon" type="image/png" sizes="128x128" href="/labo/doteditor/cmn/img/favicon/icon-128x128.png">
	<link rel="icon" type="image/png" sizes="144x144" href="/labo/doteditor/cmn/img/favicon/icon-144x144.png">
	<link rel="icon" type="image/png" sizes="152x152" href="/labo/doteditor/cmn/img/favicon/icon-152x152.png">
	<link rel="icon" type="image/png" sizes="160x160" href="/labo/doteditor/cmn/img/favicon/icon-160x160.png">
	<link rel="icon" type="image/png" sizes="192x192" href="/labo/doteditor/cmn/img/favicon/icon-192x192.png">
	<link rel="icon" type="image/png" sizes="196x196" href="/labo/doteditor/cmn/img/favicon/icon-196x196.png">
	<link rel="icon" type="image/png" sizes="256x256" href="/labo/doteditor/cmn/img/favicon/icon-256x256.png">
	<link rel="icon" type="image/png" sizes="384x384" href="/labo/doteditor/cmn/img/favicon/icon-384x384.png">
	<link rel="icon" type="image/png" sizes="512x512" href="/labo/doteditor/cmn/img/favicon/icon-512x512.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/labo/doteditor/cmn/img/favicon/icon-16x16.png">
	<link rel="icon" type="image/png" sizes="24x24" href="/labo/doteditor/cmn/img/favicon/icon-24x24.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/labo/doteditor/cmn/img/favicon/icon-32x32.png">
	<link rel="manifest" href="./manifest.json">


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
<?php if ($isPc) : ?>
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
									<a id="fileLoadJsonFromLocalBtn" class="dropdown-item" href="#">PC</a>
								</li>
								<li>
									<a id="fileLoadListFromWpBtn" class="dropdown-item" href="#">WordPress</a>
								</li>
							</ul>
						</li>
						<li class="dropend" id="fileSaveMenu">
							<a class="dropdown-item dropdown-toggle" href="#">保存</a>
							<ul class="dropdown-menu dropdown-menu-dark">
								<li>
									<a id="fileSaveJson2LocalBtn" class="dropdown-item" href="#">PC</a>
								</li>
								<lii class="dropend">
									<a class="dropdown-item dropdown-toggle" href="#">WordPress</a>
									<ul class="dropdown-menu dropdown-menu-dark">
										<li>
											<a id="fileUpdate2WpBtn" class="dropdown-item" href="#">上書き保存</a>
										</li>
										<li>
											<a id="filePost2WpBtn" class="dropdown-item" href="#">新規保存</a>
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li class="dropend" id="filePublishMenu">
							<a class="dropdown-item dropdown-toggle" href="#">書き出し</a>
							<ul class="dropdown-menu dropdown-menu-dark">
								<li>
									<a id="publishSvgToLocalBtn" class="dropdown-item" href="#">SVG形式</a>
								</li>
								<li>
									<a id="publishPngToLocalBtn" class="dropdown-item" href="#">PNG形式</a>
								</li>
								<li>
									<a id="publishJpegToLocalBtn" class="dropdown-item" href="#">JPEG形式</a>
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
					<canvas id="workspace1" width="490" height="490"></canvas>
				</div>
				<div id="workspace2Container">
					<canvas id="workspace2" width="490" height="490"></canvas>
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
						<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
						<span class="layerPanelItemEye"></span>
						<span class="layerPanelItemTxt">
							<span></span>
							<input type="text" value="" />
						</span>
						<span class="layerPanelItemHandle"></span>
					</li>
					<li class="layerPanelItem">
						<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
						<span class="layerPanelItemEye"></span>
						<span class="layerPanelItemTxt">
							<span></span>
							<input type="text" value="" />
						</span>
						<span class="layerPanelItemHandle"></span>
					</li>
					<li class="layerPanelItem">
						<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
						<span class="layerPanelItemEye"></span>
						<span class="layerPanelItemTxt">
							<span></span>
							<input type="text" value="" />
						</span>
						<span class="layerPanelItemHandle"></span>
					</li>
					<li class="layerPanelItem">
						<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
						<span class="layerPanelItemEye"></span>
						<span class="layerPanelItemTxt">
							<span></span>
							<input type="text" value="" />
						</span>
						<span class="layerPanelItemHandle"></span>
					</li>
					<li class="layerPanelItem">
						<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
						<span class="layerPanelItemEye"></span>
						<span class="layerPanelItemTxt">
							<span></span>
							<input type="text" value="" />
						</span>
						<span class="layerPanelItemHandle"></span>
					</li>
					<li class="layerPanelItem">
						<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
						<span class="layerPanelItemEye"></span>
						<span class="layerPanelItemTxt">
							<span></span>
							<input type="text" value="" />
						</span>
						<span class="layerPanelItemHandle"></span>
					</li>
					<li class="layerPanelItem">
						<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
						<span class="layerPanelItemEye"></span>
						<span class="layerPanelItemTxt">
							<span></span>
							<input type="text" value="" />
						</span>
						<span class="layerPanelItemHandle"></span>
					</li>
					<li class="layerPanelItem">
						<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
						<span class="layerPanelItemEye"></span>
						<span class="layerPanelItemTxt">
							<span></span>
							<input type="text" value="" />
						</span>
						<span class="layerPanelItemHandle"></span>
					</li>
					<li class="layerPanelItem">
						<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
						<span class="layerPanelItemEye"></span>
						<span class="layerPanelItemTxt">
							<span></span>
							<input type="text" value="" />
						</span>
						<span class="layerPanelItemHandle"></span>
					</li>
					<li class="layerPanelItem">
						<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
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
			<div id="colorpalettePicker"></div>
			<div id="colorpaletteBoxContainer"></div>
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
<div id="editor" class="display-none">
	<div id="editorHeader">
		<button id="fileMenuBtn" class="btn btn-outline-dark btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#menuOffcanvas" aria-controls="offcanvasExample">
			<i class="bi bi-list"></i>
		</button>

		<div id="historyBtnGrp" class="btn-group" role="group" aria-label="">
			<button id="undo" type="button" class="btn btn-outline-dark btn-sm"><i class="bi bi-reply"></i></button>
			<button id="redo" type="button" class="btn btn-outline-dark btn-sm"><i class="bi bi-reply"></i></button>
		</div>

	</div>
	<!--/#editorHeader-->
	
	<div id="editorBody">
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
				<canvas id="preview1" width="31" height="31"></canvas>
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
				<canvas id="preview2" width="31" height="31"></canvas>
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
				<canvas id="workspace1" width="361" height="361"></canvas>
			</div>
			<div
				class="tab-pane fade"
				id="ws2"
				role="tabpanel"
				aria-labelledby="ws2-tab"
			>
				<canvas id="workspace2" width="361" height="361"></canvas>
			</div>
		</div>
	</div>
	<!--/#editorBody-->

	<div id="editorFooter">
		<div id="drawBtnGrp" class="" role="" aria-label="">
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
			<button id="layerPanelBtn" type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="offcanvas" data-bs-target="#layerOffcanvas" aria-controls="offcanvasRight">
				<i class="bi bi-stack"></i>
			</button>
		</div>
		<div id="colorpaletteBoxContainer">
		</div>
	</div>
	<!--/#editorFooter-->

	<!--layer offcanvas-->
	<div class="offcanvas offcanvas-end" tabindex="-1" id="layerOffcanvas" aria-labelledby="offcanvasRightLabel">
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
							<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
							<span class="layerPanelItemEye"></span>
							<span class="layerPanelItemTxt">
								<span></span>
								<input type="text" value="" />
							</span>
							<span class="layerPanelItemHandle"></span>
						</li>
						<li class="layerPanelItem">
							<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
							<span class="layerPanelItemEye"></span>
							<span class="layerPanelItemTxt">
								<span></span>
								<input type="text" value="" />
							</span>
							<span class="layerPanelItemHandle"></span>
						</li>
						<li class="layerPanelItem">
							<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
							<span class="layerPanelItemEye"></span>
							<span class="layerPanelItemTxt">
								<span></span>
								<input type="text" value="" />
							</span>
							<span class="layerPanelItemHandle"></span>
						</li>
						<li class="layerPanelItem">
							<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
							<span class="layerPanelItemEye"></span>
							<span class="layerPanelItemTxt">
								<span></span>
								<input type="text" value="" />
							</span>
							<span class="layerPanelItemHandle"></span>
						</li>
						<li class="layerPanelItem">
							<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
							<span class="layerPanelItemEye"></span>
							<span class="layerPanelItemTxt">
								<span></span>
								<input type="text" value="" />
							</span>
							<span class="layerPanelItemHandle"></span>
						</li>
						<li class="layerPanelItem">
							<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
							<span class="layerPanelItemEye"></span>
							<span class="layerPanelItemTxt">
								<span></span>
								<input type="text" value="" />
							</span>
							<span class="layerPanelItemHandle"></span>
						</li>
						<li class="layerPanelItem">
							<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
							<span class="layerPanelItemEye"></span>
							<span class="layerPanelItemTxt">
								<span></span>
								<input type="text" value="" />
							</span>
							<span class="layerPanelItemHandle"></span>
						</li>
						<li class="layerPanelItem">
							<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
							<span class="layerPanelItemEye"></span>
							<span class="layerPanelItemTxt">
								<span></span>
								<input type="text" value="" />
							</span>
							<span class="layerPanelItemHandle"></span>
						</li>
						<li class="layerPanelItem">
							<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
							<span class="layerPanelItemEye"></span>
							<span class="layerPanelItemTxt">
								<span></span>
								<input type="text" value="" />
							</span>
							<span class="layerPanelItemHandle"></span>
						</li>
						<li class="layerPanelItem">
							<canvas class="layerPanelItemCanvas" width="33" height="33"></canvas>
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

	<!--menu offcanvas-->
	<div class="offcanvas offcanvas-start" tabindex="-1" id="menuOffcanvas" aria-labelledby="bbb">
		<div class="offcanvas-header">
			<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="offcanvas-body">
			<ul id="fileMenu">
				<li>
					<span id="fileNewBtn" class="link">
					<i class="bi bi-file-earmark-plus"></i>
						新規作成
					</span>
				</li>
				<li id="loadFileMenu">
					<span>
						<i class="bi bi-file-earmark-arrow-up"></i>
						読み込み
					</span>
					<ul>
						<li>
							<span id="fileLoadJsonFromLocalBtn" class="link">スマホ</span>
						</li>
						<li>
							<span id="fileLoadListFromWpBtn" class="link">Wordpress</span>
						</li>
					</ul>
				</li>
				<li id="saveFileMenu">
					<span>
						<i class="bi bi-file-earmark-arrow-down"></i>
						保存
					</span>
					<ul>
						<li>
							<span id="fileSaveJson2LocalBtn" class="link">スマホ</span>
						</li>
						<li>
							<span>Wordpress</span>
							<ul>
								<li>
									<span id="filePost2WpBtn" class="link">新規保存</span>
								</li>
								<li>
									<span id="fileUpdate2WpBtn" class="link">上書き保存</span>
								</li>
							</ul>
						</li>
					</ul>
				</li>
				<li id="publishFileMenu">
					<span>
						<i class="bi bi-file-earmark-image"></i>
						書き出し
					</span>
					<ul>
						<li>
							<span id="publishSvgToLocalBtn" class="link">SVG形式</span>
						</li>
						<li>
							<span id="publishPngToLocalBtn" class="link">PNG形式</span>
						</li>
						<li>
							<span id="publishJpegToLocalBtn" class="link">JPEG形式</span>
						</li>
					</ul>
				</li>
			</ul>
			<div id="fileLoadInputs">
				<input type="file" accept="application/json,.json" id="loadJsonFromLocalInput">
			</div>
		</div>
		<div class="offcanvas-bottom">
		</div>
	</div>

	<!--colorPicker offcanvas-->
	<div class="offcanvas offcanvas-top" tabindex="-1" id="colorPickerOffcanvas" aria-labelledby="offcanvasTopLabel">
		<div class="offcanvas-header">
			<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div id="colorpalettePicker" class="offcanvas-body">
		</div>
	</div>

	<!--saveToWp offcanvas-->
	<div class="offcanvas offcanvas-top" tabindex="-1" id="saveToWpOffcanvas" aria-labelledby="offcanvasTopLabel">
		<div class="offcanvas-header">
		<h2></h2>
		<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="offcanvas-body">
			<div class="inputView">
				<div class="topArea">
					<h3>タイトル</h3>
					<p><input type="text" class="form-control form-control-sm"></p>
				</div>
				<div class="middleArea">
					<h3>プレビュー</h3>
					<p>
						<canvas id="saveToWpPreviewCanvas" width="300" height="300"></canvas>
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
		<div class="offcanvas-footer">
		</div>
	</div>

	<!--loadFromWp offcanvas-->
	<div class="offcanvas offcanvas-top" tabindex="-1" id="loadFromWpOffcanvas" aria-labelledby="offcanvasTopLabel">
		<div class="offcanvas-header">
			WordPressから読み込み
			<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="offcanvas-body">
			<div class="d-flex justify-content-center loadingView">
				<div class="spinner-border" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>
			<div class="mainView">

			</div>
		</div>
		<div class="offcanvas-footer">
		</div>
	</div>

</div>
<div id="cover" class="opening">
	<svg width="15" height="17" viewBox="0, 0, 15,17" xmlns="http://www.w3.org/2000/svg"><polygon points="7,0 8,0 8,1 9,1 10,1 11,1 12,1 12,2 13,2 13,3 13,4 12,4 11,4 10,4 9,4 8,4 7,4 6,4 5,4 4,4 3,4 2,4 2,3 2,2 3,2 3,1 4,1 5,1 6,1 7,1 " style="fill:#993333;" /><polygon points="1,4 2,4 3,4 3,5 2,5 2,6 2,7 1,7 1,8 1,9 1,10 2,10 2,11 3,11 3,12 2,12 2,13 2,14 1,14 1,13 1,12 1,11 0,11 0,10 0,9 0,8 0,7 0,6 1,6 1,5 " style="fill:#000000;" /><polygon points="3,4 4,4 5,4 5,5 6,5 6,6 5,6 4,6 4,7 4,8 4,9 4,10 5,10 6,10 6,11 5,11 5,12 6,12 6,13 7,13 8,13 9,13 9,12 10,12 10,11 9,11 9,10 10,10 11,10 11,9 11,8 10,8 10,7 11,7 11,6 10,6 9,6 9,5 10,5 10,4 11,4 12,4 12,5 13,5 13,6 13,7 14,7 14,8 14,9 14,10 13,10 13,11 12,11 12,12 11,12 11,13 11,14 11,15 10,15 10,16 9,16 8,16 7,16 6,16 5,16 5,15 5,14 5,13 4,13 4,12 3,12 3,11 2,11 2,10 1,10 1,9 1,8 1,7 2,7 2,6 2,5 3,5 " style="fill:#ffffff;" /><polygon points="5,4 6,4 7,4 8,4 9,4 10,4 10,5 9,5 9,6 8,6 8,7 7,7 7,6 6,6 6,5 5,5 " style="fill:#000000;" /><polygon points="12,4 13,4 14,4 14,5 14,6 15,6 15,7 15,8 15,9 15,10 15,11 14,11 14,12 13,12 13,13 12,13 12,14 11,14 11,13 11,12 12,12 12,11 13,11 13,10 14,10 14,9 14,8 14,7 13,7 13,6 13,5 12,5 " style="fill:#000000;" /><polygon points="4,6 5,6 6,6 6,7 5,7 5,8 6,8 6,9 6,10 5,10 4,10 4,9 4,8 4,7 " style="fill:#000000;" /><polygon points="6,6 7,6 7,7 8,7 8,6 9,6 9,7 9,8 9,9 9,10 8,10 7,10 6,10 6,9 6,8 5,8 5,7 6,7 " style="fill:#ffffff;" /><polygon points="9,6 10,6 11,6 11,7 10,7 10,8 11,8 11,9 11,10 10,10 9,10 9,9 9,8 9,7 " style="fill:#000000;" /><polygon points="6,10 7,10 8,10 9,10 9,11 10,11 10,12 9,12 8,12 7,12 6,12 5,12 5,11 6,11 " style="fill:#ffcc00;" /><polygon points="2,12 3,12 4,12 4,13 5,13 5,14 5,15 5,16 4,16 4,17 3,17 2,17 1,17 1,16 0,16 0,15 0,14 0,13 1,13 1,14 2,14 2,13 " style="fill:#6a3a02;" /><polygon points="3,13 3,14 4,14 4,13 " style="fill:#6a3a02;" /><polygon points="1,15 1,16 2,16 2,15 " style="fill:#6a3a02;" /><polygon points="3,15 3,16 4,16 4,15 " style="fill:#6a3a02;" /><polygon points="6,12 7,12 8,12 9,12 9,13 8,13 7,13 6,13 " style="fill:#cc9933;" /><polygon points="13,12 14,12 14,13 13,13 " style="fill:#996600;" /><polygon points="3,13 4,13 4,14 3,14 " style="fill:#0066ff;" /><polygon points="12,13 13,13 13,14 12,14 " style="fill:#996600;" /><polygon points="13,13 14,13 14,14 14,15 13,15 13,16 12,16 12,15 12,14 13,14 " style="fill:#000000;" /><polygon points="11,14 12,14 12,15 11,15 " style="fill:#996600;" /><polygon points="1,15 2,15 2,16 1,16 " style="fill:#ff3300;" /><polygon points="3,15 4,15 4,16 3,16 " style="fill:#ffff00;" /><polygon points="10,15 11,15 11,16 10,16 " style="fill:#330000;" /><polygon points="11,15 12,15 12,16 11,16 " style="fill:#ffffff;" /><polygon points="4,16 5,16 6,16 7,16 7,17 6,17 5,17 4,17 " style="fill:#ffc300;" /><polygon points="8,16 9,16 10,16 11,16 12,16 12,17 11,17 10,17 9,17 8,17 " style="fill:#ffc300;" /></svg> 
	<img src="../cmn/img/cover_rotaition.png" width="75" height="65">
</div>
<?php endif; ?>
	<script src="js/script.js?p=<?php echo time(); ?>"></script>
</body>
</html>