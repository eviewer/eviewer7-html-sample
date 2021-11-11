class eViewerApp {
  constructor() {
    this.documentService = new DocumentService();
    this.editingService = new EditingService();
    this.viewerPreferenceService = new ViewerPreferenceService();
    this.watermarkService = new WatermarkService();
    this.annotationService = new AnnotationService();
    this.scriptsLoaded = false;
    this.styleSheetsLoaded = false;
  }

  addJS(scripts, containerID) {
    if (scripts.length > 0) {
      document
        .getElementById(containerID)
        .appendChild(document.createElement("eviewer-root"));
      let jsElement = document.createElement("script");
      jsElement.type = "application/javascript";
      jsElement.src = scripts[0];

      let self = this;
      jsElement.addEventListener("load", function (args) {
        scripts.splice(0, 1);
        self.addJS(scripts, containerID);
      });
      document.getElementsByTagName("head")[0].appendChild(jsElement);
    } else {
      this.scriptsLoaded = true;
    }
  }

  addCSS(styleSheets) {
    if (styleSheets.length > 0) {
      let file = styleSheets[0];
      let fileref = document.createElement("link");
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("type", "text/css");

      if (file.href !== undefined) {
        fileref.setAttribute("href", file.href);
      }

      if (file.integrity !== undefined) {
        fileref.setAttribute("integrity", file.integrity);
      }

      if (file.crossorigin !== undefined) {
        fileref.setAttribute("crossorigin", file.crossorigin);
      }

      let self = this;
      fileref.addEventListener("load", function () {
        styleSheets.splice(0, 1);
        self.addCSS(styleSheets);
      });
      document.getElementsByTagName("head")[0].appendChild(fileref);
    } else {
      this.styleSheetsLoaded = true;
    }
  }

  waitUntilLoded(resolve, reject, cntrId, fitTo) {
    if (this.styleSheetsLoaded === true && this.scriptsLoaded === true && window.eViewerComponentReference !== undefined) {
	  if(fitTo === undefined) {
		fitTo = "default";
	  }
	  let promise = null;
	  window.eViewerComponentReference.zone.run(() => {
		let selectedOption = { apiName: "setContainerInfo" };
		let inputData = { containerID: cntrId, fitStyle: fitTo };
		promise = window.eViewerComponentReference.invokeAPI(
			selectedOption,
			inputData
		  );
	  });		
      resolve();
    } else {
      setTimeout(() => {
        this.waitUntilLoded(resolve, reject, cntrId, fitTo);
      }, 100);
    }
  }

  // Initialize the viewer GUI and load viewer inside a div.
  loadViewer(containerID, scripts, styleSheets, fitStyle) {
    let self = this;
    document
      .getElementById(containerID)
      .appendChild(document.createElement("app-root"));
    return new Promise((resolve, reject) => {
      try {
        if (scripts !== null && scripts !== undefined) {
          self.addJS(scripts, containerID);
        } else {
          this.scriptsLoaded = true;
        }

        var css = [
          { href: "./assets/css/styles.css" },
          {
            href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css",
            integrity:
              "sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=",
            crossorigin: "anonymous",
          },
        ];
        if (styleSheets !== null && styleSheets !== undefined) {
          self.addCSS(styleSheets);
        } else {
          self.addCSS(css);
        }

        self.waitUntilLoded(resolve, reject, containerID, fitStyle);
      } catch (exp) {
        reject();
      }
    });
  }

  setDocumentEndPointOptions(
    options,
    eViewerUrl,
    savingEndPoint,
    userName,
    hideToolBar
  ) {
    if (hideToolBar === undefined || hideToolBar === null) {
      hideToolBar = false;
    }

    let inputData = {};
    inputData.savingEndPoint = savingEndPoint;
    inputData.options = options;
    inputData.eViewerServerUrl = eViewerUrl;
    inputData.userName = userName;
    inputData.hideToolBar = hideToolBar;
    let selectedOption = { apiName: "setDocumentEndPointOptions" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  setScannerPluginURL(scannerPluginUrl) {
    let inputData = {};
    inputData.scannerPluginUrl = scannerPluginUrl;

    let selectedOption = { apiName: "setScannerPluginURL" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  registerLicense(licenceFileUrl, licenseServerUrl) {
    // Either one of the parameters need to be provided. "licenceFileUrl" will point to a temporary license.
    // where as "licenseServerUrl" points to the license serverto  register the istance and get the activation key.
  }

  toggleThumbnail() {
    let inputData = {};

    let selectedOption = { apiName: "toggleThumbnail" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  hideAnnotations(hide) {
    let inputData = {};
    inputData.hide = hide;

    let selectedOption = { apiName: "hideAnnotations" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  hideThumbnails(hide) {
    let inputData = {};
    inputData.hide = hide;

    let selectedOption = { apiName: "hideThumbnails" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  selectPanning(pan) {
    let inputData = {};
    inputData.pan = pan;

    let selectedOption = { apiName: "selectPanning" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  /*addButtons(leftCommonbuttons, rightCommonButtons, ribbonButtons) {
	let inputData = {};
	inputData.leftCommonButtons = leftCommonbuttons;
	inputData.rightCommonButtons = rightCommonButtons;
	inputData.ribbonCommonButtons = ribbonButtons;
	
	let selectedOption = { apiName: "addButtons" };
	let promise = null;
    window.eViewerComponentReference.zone.run(() => {
		promise = window.eViewerComponentReference.invokeAPI(
			selectedOption,
			inputData
		);
    });
    return promise;
  }*/

  addButtons(buttons) {
    let leftCommonButtons = [];
    let rightCommonButtons = [];
    let ribbonCommonButtons = [];

    buttons.forEach((button) => {
      if (button.alignment === "leftToolbar") {
        let btn = {};
        btn.id = button.id;
        btn.placement = "bottom";
        btn.ngbTooltip = button.name;
        btn.container = "body";
        btn.src = button.iconUrl;
        leftCommonButtons.push(btn);
      } else if (button.alignment === "rightToolbar") {
        let btn = {};
        btn.id = button.id;
        btn.placement = "bottom";
        btn.ngbTooltip = button.name;
        btn.container = "body";
        btn.src = button.iconUrl;
        btn.ngbDropdown = false;
        rightCommonButtons.push(btn);
      } else if (button.alignment === "ribbonToolbar") {
        let btn = {};
        btn.id = button.id;
        btn.extralink = false;
        btn.title = button.name;
        btn.parent = button.parent;
        btn.icon = button.iconUrl;
        btn.type = "link";
        btn.class = "disable-icons";
        ribbonCommonButtons.push(btn);
      }
    });

    let inputData = {};
    inputData.leftCommonButtons = leftCommonButtons;
    inputData.rightCommonButtons = rightCommonButtons;
    inputData.ribbonCommonButtons = ribbonCommonButtons;

    let selectedOption = { apiName: "addButtons" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  getDocumentService() {
    return this.documentService;
  }

  getEditingService() {
    return this.editingService;
  }

  getViewerPreferenceService() {
    return this.viewerPreferenceService;
  }

  getWatermarkService() {
    return this.watermarkService;
  }

  getAnnotationService() {
    return this.annotationService;
  }
}

class DocumentService {
  constructor() {}

  // Loads base64 document in viewer
  async insertDocument(file) {
    let inputData = {};
    let fileURL = "";
    let width = "";
    let height = "";
    inputData.file = file[0];
    let selectedOption = { apiName: "insertDocument" };
    let promise = null;
    new Promise((res, rej) => {
      let reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = (events) => {
        fileURL = events.target.result;
        inputData.fileUrl = fileURL;
        if (
          file[0].type !== "image/jpeg" &&
          file[0].type !== "image/png" &&
          file[0].type !== "image/bmp"
        )
          window.eViewerComponentReference.zone.run(() => {
            promise = window.eViewerComponentReference.invokeAPI(
              selectedOption,
              inputData
            );
          });
        let img = new Image();
        img.onload = () => {
          (width = img.width), (height = img.height);
          if (
            file[0].type === "image/jpeg" ||
            file[0].type === "image/png" ||
            file[0].type === "image/bmp" ||
            file[0].type === "image/gif"
          ) {
            inputData.width = width;
            inputData.height = height;
            window.eViewerComponentReference.zone.run(() => {
              promise = window.eViewerComponentReference.invokeAPI(
                selectedOption,
                inputData
              );
            });
          }
        };
        img.src = reader.result;
      };
    });

    // if (width != undefined) {
    // 	inputData.width = width;
    // } else inputData.width = undefined;
    // if (height != undefined) {
    // 	inputData.height = height;
    // } else {
    // 	inputData.height = undefined;
    // }

    return await promise;
  }

  // Loads the document in viewer
  loadDocument(
    docUrl,
    annotationUrl,
    clientDocID,
    userName,
    // serverUrl,
    isEditMode,
    repoType,
    password,
    fileName,
    options
  ) {
    let inputData = {};
    inputData.repoType = repoType;
    inputData.docURLs = docUrl;
    // inputData.viewerUrl = serverUrl;
    inputData.annURLs = annotationUrl;
    inputData.clientDocID = clientDocID;
    inputData.userName = userName;
    inputData.password = password;
    inputData.fileName = fileName;
    inputData.isEditMode = isEditMode.toString();

    if (options === undefined) {
      options = null;
    }

    inputData.options = options;

    let selectedOption = { apiName: "loadDocument" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise; // returns "{ viewerDocID: docId, clientDocID: uploadDetail.clientDocID }"
  }

  newDocument(filetype) {
    let inputData = {};
    inputData.filetype = filetype;

    let selectedOption = { apiName: "newDocument" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise; // returns "{ viewerDocID: currentDocId }"
  }

  getOpenDocuments() {
    let inputData = {};

    let selectedOption = { apiName: "getOpenDocuments" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise; // returns array of "{ viewerDocID: doc.docId, clientDocID: doc.clientDocID }"
  }

  getActiveDocument() {
    let inputData = {};

    let selectedOption = { apiName: "getActiveDocument" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise; // returns "{ viewerDocID: activeDocID, clientDocID: clntDocID }"
  }

  closeDocument(viewerDocID) {
    let inputData = {};
    inputData.viewerDocID = viewerDocID;

    let selectedOption = { apiName: "closeDocument" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise; // returns { viewerDocID: docID }
  }

  closeAllDocuments(viewerDocIDs /* parameter for future use*/) {
    let inputData = {};
    inputData.viewerDocIDs = viewerDocIDs;

    let selectedOption = { apiName: "closeAllDocuments" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  saveDocument() {
    let inputData = {};

    let selectedOption = { apiName: "saveDocument" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      window.eViewerComponentReference.invokeAPI(selectedOption, inputData);
    });
  }

  saveAllDocuments() {
    let inputData = {};

    let selectedOption = { apiName: "saveAllDocuments" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      window.eViewerComponentReference.invokeAPI(selectedOption, inputData);
    });
  }

  nextPage() {
    let inputData = {};
    let selectedOption = { apiName: "nextPage" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  prevPage() {
    let inputData = {};

    let selectedOption = { apiName: "prevPage" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  firstPage() {
    let inputData = {};

    let selectedOption = { apiName: "firstPage" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  lastPage() {
    let inputData = {};

    let selectedOption = { apiName: "lastPage" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  gotoPage(pageNo) {
    let inputData = {};
    inputData.pageNo = pageNo;

    let selectedOption = { apiName: "gotoPage" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  appendDocument(file, fileUrl) {
    let inputData = {};
    inputData.file = file;
    inputData.fileUrl = fileUrl;

    let selectedOption = { apiName: "appendDocument" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise; // returns "{ totalPages: pageCount }"
  }

  getPageCount(viewerDocID) {
    let inputData = {};
    inputData.viewerDocID = viewerDocID;

    let selectedOption = { apiName: "getPageCount" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise; // returns "{ totalPages: pageCount }"
  }

  /*gotoDocument() {
    let inputData = {};

    let selectedOption = { apiName: "gotoDocument" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }*/

  searchText(options) {
    let inputData = {};
    inputData.options = options;

    let selectedOption = { apiName: "searchText" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }
}

class EditingService {
  zoomIn() {
    let inputData = {};

    let selectedOption = { apiName: "zoomIn" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  zoomOut() {
    let inputData = {};

    let selectedOption = { apiName: "zoomOut" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  rotateClockwise() {
    let inputData = {};

    let selectedOption = { apiName: "rotateClockwise" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  zoomTo(preset) {
    let inputData = {};
    inputData.preset = preset;

    let selectedOption = { apiName: "zoomTo" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  deletePage() {
    let inputData = {};

    let selectedOption = { apiName: "deletePage" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  copyPage() {
    let inputData = {};

    let selectedOption = { apiName: "copyPage" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  cutPage() {
    let inputData = {};

    let selectedOption = { apiName: "cutPage" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  pastePage() {
    let inputData = {};

    let selectedOption = { apiName: "pastePage" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  exportDocument(options) {
    let inputData = {};
    inputData.options = options;

    let selectedOption = { apiName: "exportDocument" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  printDocument(options) {
    let inputData = {};
    inputData.options = options;

    let selectedOption = { apiName: "printDocument" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }
}

class ViewerPreferenceService {
  setUserPreferences(preferences, userName) {
    let inputData = {};
    inputData.preferences = preferences;
    inputData.userName = userName;

    let selectedOption = { apiName: "setViewerPreference" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  getUserPreferences(userName) {
    let inputData = {};
    inputData.userName = userName;

    let selectedOption = { apiName: "getViewerPreference" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }
}

class WatermarkService {
  constructor() {}

  newWatermark(properties) {
    let inputData = {};
    inputData.properties = properties;

    let selectedOption = { apiName: "newWatermark" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  addWatermark(name, docId, pages) {
    return "Not Implemented";
  }
}

class AnnotationService {
  selectShape(annType, options) {
    let inputData = {};
    inputData.annType = annType;
    inputData.options = options;

    let selectedOption = { apiName: "selectShape" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  editShape(annId, pageNo, position, options) {
    let inputData = {};
    inputData.pageNo = pageNo;
    inputData.annId = annId;
    inputData.position = position;
    inputData.options = options;

    let selectedOption = { apiName: "editShape" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  deleteShape(pageNo, annId) {
    let inputData = {};
    inputData.pageNo = pageNo;
    inputData.annId = annId;

    let selectedOption = { apiName: "deleteShape" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  addReply(annId, replyText) {
    let inputData = {};
    inputData.annId = annId;
    inputData.replyText = replyText;

    let selectedOption = { apiName: "addReply" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  getAllReplies(annId) {
    let inputData = {};
    inputData.annId = annId;

    let selectedOption = { apiName: "getAllReplies" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  getStamps() {
    let inputData = {};

    let selectedOption = { apiName: "getStamps" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  drawShapes(pageNo, position, options) {
    let inputData = {};
    inputData.pageNo = pageNo;
    inputData.position = position;
    inputData.options = options;

    let selectedOption = { apiName: "drawMultiShape" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  updateCommentOrReply(annId, textUpdate, replyId) {
    let inputData = {};
    inputData.annId = annId;
    inputData.textUpdate = textUpdate;
    inputData.replyId = replyId;

    let selectedOption = { apiName: "updateComment" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  removeReply(replyId, annId) {
    let inputData = {};
    inputData.replyId = replyId;
    inputData.annId = annId;

    let selectedOption = { apiName: "removeReply" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  removeAllReplies(annId) {
    let inputData = {};
    inputData.annId = annId;

    let selectedOption = { apiName: "removeAllReply" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  getReplyByUser(annId) {
    let inputData = {};
    inputData.annId = annId;

    let selectedOption = { apiName: "getReplyByUser" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  getAllAnnotations(userName) {
    let inputData = {};
    inputData.userName = userName;

    let selectedOption = { apiName: "getAllAnn" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  getAnnotationDetails(annId) {
    let inputData = {};
    inputData.annId = annId;

    let selectedOption = { apiName: "getAnnDetails" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  getFilteredAnnotations(userName, annType, pageNo) {
    let inputData = {};
    inputData.userName = userName;
    inputData.annType = annType;
    inputData.pageNo = pageNo;

    let selectedOption = { apiName: "getFilteredAnn" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }
}
