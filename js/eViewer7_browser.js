
class eViewerApp {
  constructor(userName) {
	if(userName === undefined || userName === "") {
		userName = "Administrator";
	}  	
    this.documentService = new DocumentService(userName);
    this.editingService = new EditingService(userName);
    this.viewerPreferenceService = new ViewerPreferenceService(userName);
    this.watermarkService = new WatermarkService(userName);
    this.annotationService = new AnnotationService(userName);
	this.signatureService = new SignatureService(userName);
    this.redactionService = new RedactionService(userName);
    this.iconCacheManagerService = new IconCacheManagerService(userName);
    this.docMetadataService = new DocMetadataService(userName);
    this.scriptsLoaded = false;
    this.styleSheetsLoaded = false;
	this.userName = userName;
  }
  
  setUserName(userName) {
	if(userName === undefined || userName === "") {
		userName = "Administrator";
	}
	this.userName = userName;
	this.documentService.setUserName(userName);
    this.editingService.setUserName(userName);
    this.viewerPreferenceService.setUserName(userName);
    this.watermarkService.setUserName(userName);
    this.annotationService.setUserName(userName);
	this.signatureService.setUserName(userName);
    this.redactionService.setUserName(userName);
    this.iconCacheManagerService.setUserName(userName);
    this.docMetadataService.setUserName(userName);
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

  waitUntilLoded(resolve, reject, cntrId, fitTo, options) {
    if (
      this.styleSheetsLoaded === true &&
      this.scriptsLoaded === true &&
      window.eViewerComponentReference !== undefined
    ) {
      if (fitTo === undefined) {
        fitTo = "default";
      }
      let promise = null;
      window.eViewerComponentReference.zone.run(() => {
        let selectedOption = { apiName: "setContainerInfo" };
        let inputData = {
          containerID: cntrId,
          fitStyle: fitTo,
          options: options,
        };
        promise = window.eViewerComponentReference.invokeAPI(
          selectedOption,
          inputData
        );
      });
      resolve();
    } else {
      setTimeout(() => {
        this.waitUntilLoded(resolve, reject, cntrId, fitTo, options);
      }, 100);
    }
  }

  // set the Document Tooltip Direction
  setDocumentNameTooltipDirection(direction) {
    let inputData = {};
    inputData.direction = direction;

    let selectedOption = { apiName: "setDocumentNameTooltipDirection" };
    let promise = null;

    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  onDocumentTabHover(callBack) {
    let inputData = {};

    inputData.callBack = callBack;

    let selectedOption = { apiName: "onDocumentTabHover" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  // Initialize the viewer GUI and load viewer inside a div.
  loadViewer(containerID, scripts, styleSheets, fitStyle, options) {
    let self = this;
    document
      .getElementById(containerID)
      .appendChild(document.createElement("eviewer-root"));
    return new Promise((resolve, reject) => {
      try {
        if (scripts !== null && scripts !== undefined) {
          self.addJS(scripts, containerID);
        } else {
          this.scriptsLoaded = true;
        }

        var css = [];
        if (styleSheets !== null && styleSheets !== undefined) {
          self.addCSS(styleSheets);
        } else {
          self.addCSS(css);
        }

        self.waitUntilLoded(resolve, reject, containerID, fitStyle, options);
      } catch (exp) {
        reject();
      }
    });
  }

  registerLicense(licenseKey, licenseServerUrl) {
    if (licenseServerUrl == null) {
      licenseServerUrl = "";
    }

    let inputData = {};
    inputData.licenseKey = licenseKey;
    inputData.licenseServerUrl = licenseServerUrl;
    let selectedOption = { apiName: "registerLicense" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  setUserType(userType) {
    let inputData = {};
    inputData.userType = userType;
    let selectedOption = { apiName: "setUserType" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  setDocumentEndPointOptions(
    options,
    eViewerUrl,
    savingEndPoint,
    ocrEndPoint,
    hideToolBar
  ) {
    if (hideToolBar === undefined || hideToolBar === null) {
      hideToolBar = false;
    }

    let inputData = {};
    inputData.savingEndPoint = savingEndPoint;
    inputData.ocrEndPoint = ocrEndPoint;
    inputData.options = options;
    inputData.eViewerServerUrl = eViewerUrl;
    inputData.userName = this.userName;
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

  alignThumbnails(alignDirection) {
    let inputData = {};
    inputData.alignThumbnails = alignDirection;
    let selectedOption = { apiName: "alignThumbnails" };
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

  parseButtons(
    buttons,
    leftCommonButtons,
    rightCommonButtons,
    ribbonCommonButtons
  ) {
    buttons.forEach((button) => {
      if (button.alignment === "leftToolbar") {
        let btn = {};
        btn.id = button.id;
        btn.placement = "bottom";
        btn.ngbTooltip = button.name;
        btn.container = "body";
        btn.src = button.iconUrl;
        btn.placementIndex = button.placementIndex;
        leftCommonButtons.push(btn);
      } else if (button.alignment === "rightToolbar") {
        let btn = {};
        btn.id = button.id;
        btn.placement = "bottom";
        btn.ngbTooltip = button.name;
        btn.container = "body";
        btn.src = button.iconUrl;
        btn.ngbDropdown = false;
        btn.placementIndex = button.placementIndex;
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
        btn.placementIndex = button.placementIndex;
        ribbonCommonButtons.push(btn);
      }
    });
  }

  addButtons(buttons) {
    let leftCommonButtons = [];
    let rightCommonButtons = [];
    let ribbonCommonButtons = [];

    this.parseButtons(
      buttons,
      leftCommonButtons,
      rightCommonButtons,
      ribbonCommonButtons
    );

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

  updateButtons(buttons) {
    let leftCommonButtons = [];
    let rightCommonButtons = [];
    let ribbonCommonButtons = [];

    this.parseButtons(
      buttons,
      leftCommonButtons,
      rightCommonButtons,
      ribbonCommonButtons
    );

    let inputData = {};
    inputData.leftCommonButtons = leftCommonButtons;
    inputData.rightCommonButtons = rightCommonButtons;
    inputData.ribbonCommonButtons = ribbonCommonButtons;

    let selectedOption = { apiName: "updateButtons" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  removeButtons(buttons) {
    let leftCommonButtons = [];
    let rightCommonButtons = [];
    let ribbonCommonButtons = [];

    this.parseButtons(
      buttons,
      leftCommonButtons,
      rightCommonButtons,
      ribbonCommonButtons
    );

    let inputData = {};
    inputData.leftCommonButtons = leftCommonButtons;
    inputData.rightCommonButtons = rightCommonButtons;
    inputData.ribbonCommonButtons = ribbonCommonButtons;

    let selectedOption = { apiName: "removeButtons" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  registerAnnIndicator(callback) {
    /*
    (docID, thumbnails) {
      // docID: ID of the document
      // thumbnails: Array of thumbnail objects
      // [{
      //	  pgNo: 1
      //	  icon: "BASE64 ENCODED PNG ICON",
      //	  vLocation: "TOP | CENTER | BOTTOM",
      //	  hLocation: "LEFT | RIGHT | CENTER",
      //	  hoverText: "SOME TEXT GOES HERE",
      //  },
      //  {
      //	  pgNo: 2
      //	  icon: "BASE64 ENCODED PNG ICON",
      //	  vLocation: "TOP | CENTER | BOTTOM",
      //	  hLocation: "LEFT | RIGHT | CENTER",
      //	  hoverText: "SOME TEXT GOES HERE",
      //  }]
      
      thumbnails.foreach((thumbnail) => {
        thumbnail.icon = "NEW ICON";
        thumbnail.vLocation = "LEFT | RIGHT | CENTER";
        thumbnail.hLocation = "LEFT | RIGHT | CENTER";
        thumbnail.hoverText = "NEW TOOLTIP";
      });
    }
    */

    let inputData = {};
    inputData.callback = callback;

    let selectedOption = { apiName: "registerAnnIndicator" };

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
  
  getSignatureService() {
    return this.signatureService;
  }

  getRedactionService() {
    return this.redactionService;
  }

  getIconCacheManagerService() {
    return this.iconCacheManagerService;
  }

  getDocMeatDataService() {
    return this.docMetadataService;
  }
}

class DocumentService {
  constructor(userName) {
	  this.userName = userName;
  }

  setUserName(userName) {
	if(userName === undefined || userName === "") {
		userName = "Administrator";
	}
	this.userName = userName;
  }

  // Loads base64 document in viewer
  async insertDocument(file, options) {
    /*
	//optional parameter
    {
		pageFilters: [{"pageNo": 1, "visible": true}]
    }
	*/
    let inputData = {};
    let fileURL = "";
    let width = "";
    let height = "";
    inputData.file = file[0];
    let selectedOption = { apiName: "insertDocument" };
    let promise = null;
    new Promise((res, rej) => {
      let reader = new FileReader();
      if (file[0].type === "" && file[0].name.split(".").pop() === "msg") {
        reader.readAsArrayBuffer(file[0]);
        reader.onload = async (events) => {
          fileURL = events.target.result;
          inputData.fileUrl = fileURL;
          window.eViewerComponentReference.zone.run(() => {
            promise = window.eViewerComponentReference.invokeAPI(
              selectedOption,
              inputData
            );
          });
        };
      } else if (file[0].type === "message/rfc822") {
        reader.readAsText(file[0]);
        reader.onloadend = async (events) => {
          fileURL = events.target.result;
          inputData.fileUrl = fileURL;
          window.eViewerComponentReference.zone.run(() => {
            promise = window.eViewerComponentReference.invokeAPI(
              selectedOption,
              inputData
            );
          });
        };
      } else {
      reader.readAsDataURL(file[0]);
      reader.onload = (events) => {
		if(options.pageFilters === undefined) {
			options.pageFilters = [];
		}
        fileURL = events.target.result;
        inputData.fileUrl = fileURL;
		inputData.pageFilters = options.pageFilters;
        inputData.captionFiles = options.captionFiles;

        if (file[0].type.includes("video")) {
          const videoElement = document.createElement("video");
          videoElement.src = fileURL;
          videoElement.addEventListener("seeked", () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
              context.drawImage(
                videoElement,
                0,
                0,
                canvas.width,
                canvas.height
              );
            inputData.avWidth = canvas.width;
            inputData.avHeight = canvas.height;
            inputData.firstFrameUrl = canvas.toDataURL("image/jpeg");

            window.eViewerComponentReference.zone.run(() => {
              promise = window.eViewerComponentReference.invokeAPI(
                selectedOption,
                inputData
              );
            });
          });

          videoElement.load();
          videoElement.currentTime = 5;
        } else if (file[0].type.includes("audio")) {
          window.eViewerComponentReference.zone.run(() => {
            promise = window.eViewerComponentReference.invokeAPI(
              selectedOption,
              inputData
            );
          });
        } else if (
          file[0].type !== "image/jpeg" &&
          file[0].type !== "image/png" &&
          file[0].type !== "image/bmp" &&
          file[0].type !== "image/gif" // nilesh for Generic_eVewer7_2295 & Generic_eVewer7_2296: Regression APINPM:S1,P1
        ) {
          window.eViewerComponentReference.zone.run(() => {
            promise = window.eViewerComponentReference.invokeAPI(
              selectedOption,
              inputData
            );
          });
		}
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
      }
    });

    return await promise;
  }

  // Loads the document in viewer
  loadDocument(docUrl, annotationUrl, clientDocID, fileName, options) {
	/*
    //optional parameter
    {
		isEditMode: true,
        repoType: "filesystem",
        password: "",
        landingPage: this.state.landingPgNo,
		pageFilters: [{"pageNo": 1, "visible": true}]
    }
	*/
    let inputData = {};
    inputData.docURLs = docUrl;
    inputData.annURLs = annotationUrl;
    inputData.clientDocID = clientDocID;
    inputData.userName = this.userName;
    inputData.fileName = fileName;

    if (options === undefined) {
      options = {
        isEditMode: true,
        repoType: "filesystem",
        password: "",
        landingPage: 1,
      };
    } else {
      if (options.isEditMode === undefined) {
        options.isEditMode = true;
      } else {
        options.isEditMode = options.isEditMode;
      }
      if (options.repoType === undefined) {
        options.repoType = "filesystem";
      }
      if (options.password === undefined) {
        options.password = "";
      }
      if (options.landingPage === undefined || options.landingPage === "") {
        options.landingPage = 1;
      }
      if (options.pageFilters === undefined) {
        options.pageFilters = [];
      }
      if (options.icnData === undefined) {
        options.icnData = null;
      }
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

  loadDocumentWithOptions(docUrl, annotationUrl, clientDocID, options) {
    /*
    //optional parameter
    {
    isEditMode: true,
        repoType: "filesystem",
        password: "",
        landingPage: this.state.landingPgNo,
    pageFilters: [{"pageNo": 1, "visible": true}]
    }
  */
    let inputData = {};
    inputData.docURLs = docUrl;
    inputData.annURLs = annotationUrl;
    inputData.clientDocID = clientDocID.toString();
    inputData.userName = this.userName;

    if (options === undefined) {
      options = {
        isEditMode: true,
        repoType: "filesystem",
        password: "",
        landingPage: 1,
        tabStyle: null,
        focusTabStyle: null,
		readOnly: false,
      };
    } else {
      if (options.isEditMode == null) {
        options.isEditMode = true;
      } else {
        options.isEditMode = options.isEditMode;
      }
      if (options.repoType == null) {
        options.repoType = "filesystem";
      }
      if (options.password == null) {
        options.password = "";
      }
      if (options.landingPage == null || options.landingPage === "") {
        options.landingPage = 1;
      }
      if (options.pageFilters == null) {
        options.pageFilters = [];
      }
      if (options.tabStyle == null || options.tabStyle === "") {
        options.tabStyle = null;
      }
	  if (options.focusTabStyle == null || options.focusTabStyle === "") {
	    options.focusTabStyle = null;
	  }
	  if (options.readOnly == null || options.readOnly === "") {
	    options.readOnly = false;
      }
    }

    inputData.options = options;

    let selectedOption = { apiName: "loadDocumentWithOptions" };
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

  getCurrentPage() {
    let inputData = {};

    let selectedOption = { apiName: "getCurrentPage" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise; // returns "{ currentPage: pgNo }"
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

  invertPages(pageNumbers) {
    let inputData = {};
    inputData.pageNo = pageNumbers;

    let selectedOption = { apiName: "invertPages" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  setCustomStamps(customStamps) {
    let inputData = {};
    inputData.customStamps = customStamps;

    let selectedOption = { apiName: "setCustomStamps" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  copyToClipboard(pageNumbers) {
    let inputData = {};
    inputData.pageNo = pageNumbers;

    let selectedOption = { apiName: "copyToClipboard" };
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

  getDocumentInfo(docId) {
    let inputData = {};
	inputData.docId = docId;

    let selectedOption = { apiName: "getDocumentInfo" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

	/*
	When this promise is resolved it will send an object containing document info.
	{
		"docId": "",
		"clientDocId": "",
		"docName": "",
		"size": 0,
		"pageCount": 0,
		"fileFormat": "PDF or TIFF, PNG, JPG or BMP or GIF or DOC, XLS, PPT, DOCX, XLSX, PPTX, TXT"
	}
	*/
    return promise;  
  }
  
  getActiveDocumentInfo() {
    let inputData = {};

    let selectedOption = { apiName: "getActiveDocumentInfo" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

	/*
	When this promise is resolved it will send an object containing document info.
	{
		"docId": "",
		"clientDocId": "",
		"docName": "",
		"size": 0,
		"pageCount": 0,
		"fileFormat": "PDF or TIFF, PNG, JPG or BMP or GIF or DOC, XLS, PPT, DOCX, XLSX, PPTX, TXT"
	}
	*/
    return promise;  
  }
 
  getPageInfo(docId, pageRange) {
	/*
	pageRange: "1", "1,2,6" or "1-6" or all
	*/
    let inputData = {};
    inputData.docId = docId;
	inputData.pageRange = pageRange;

    let selectedOption = { apiName: "getPageInfo" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

	/*
	When this promise is resolved it will send an object containing document info.
	[{
		"pageNo": 0,
		"hide": false
		"height": 0,
		"width": 0,
		"xDPI": 0,
		"yDPI": 0,
		"bitDepth": 1 or 4 or 8 or 16 or 24 or 32
	}]
	*/
    return promise;  
  }

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

  filterPages(docId, pageFilters) {
	/*
	[{"pageNo": 1, "visible": true}]
	*/
	
	if(pageFilters === undefined) {
		pageFilters = [];
	}
	
    let inputData = {};
    inputData.docId = docId;
	inputData.pageFilters = pageFilters;

    let selectedOption = { apiName: "filterPages" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

	/*
	When this promise is resolved it will send an object containing document info.
	{
		"success": true,
	}
	*/
    return promise;
  }
  
  showOnlyPages(docId, pages) {
	/*
	[1, 3, 5]
	*/
	
	if(pages === undefined) {
		pages = [];
	}
	
    let inputData = {};
    inputData.docId = docId;
	inputData.pages = pages;

    let selectedOption = { apiName: "showOnlyPages" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

	/*
	When this promise is resolved it will send an object containing document info.
	{
		"success": true,
	}
	*/
    return promise;
  }  
  
  hideOnlyPages(docId, pages) {
	/*
	[1, 3, 5]
	*/
	if(pages === undefined) {
		pages = [];
	}
	
    let inputData = {};
    inputData.docId = docId;
	inputData.pages = pages;

    let selectedOption = { apiName: "hideOnlyPages" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

	/*
	When this promise is resolved it will send an object containing document info.
	{
		"success": true,
	}
	*/
    return promise;
  }   

  setDocumentTabStyle(viewerDocID, tabStyle, focusTabStyle) {
    let inputData = {};
    inputData.viewerDocID = viewerDocID;
    inputData.tabStyle = tabStyle;
    inputData.focusTabStyle = focusTabStyle;

    let selectedOption = { apiName: "setDocumentTabStyle" };
    let promise = null;

    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  getDocumentTabStyle(viewerDocID) {
    let inputData = {};
    inputData.viewerDocID = viewerDocID;

    let selectedOption = { apiName: "getDocumentTabStyle" };
    let promise = null;

    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  setFileName(viewerDocID, fileName) {
    let inputData = {};
    inputData.viewerDocID = viewerDocID;
    inputData.fileName = fileName;

    let selectedOption = { apiName: "setFileName" };
    let promise = null;

    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  getFileName(viewerDocID) {
    let inputData = {};
    inputData.viewerDocID = viewerDocID;

    let selectedOption = { apiName: "getFileName" };
    let promise = null;

    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  // rajat for Generic_eVewer7_3655: Regression: Multiple Thumbnail Select: S1-P1
  setSelectedPages(pages) {
    let inputData = {};
    inputData.pages = pages;

    let selectedOption = { apiName: "setSelectedPages" };
    let promise = null;

    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  getSelectedPages(includeCurrentPage) {
    let inputData = {};
    inputData.includeCurrentPage = includeCurrentPage;

    let selectedOption = { apiName: "getSelectedPages" };
    let promise = null;

    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  getSelectedPages() {
    let inputData = {};

    let selectedOption = { apiName: "getSelectedPages" };
    let promise = null;

    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  clearSelectedPages() {
    let inputData = {};

    let selectedOption = { apiName: "clearSelectedPages" };
    let promise = null;

    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  getPageInfoByRange(docId, pageRange) {
    let inputData = {};

    inputData.docId = docId;
    inputData.pageRange = pageRange;

    let selectedOption = { apiName: "getPageInfoByRange" };
    let promise = null;

    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  setDocumentScrollMode(docId, scrollMode) {
    let inputData = {};

    inputData.docId = docId;
    inputData.scrollMode = scrollMode;

    let selectedOption = { apiName: "setDocumentScrollMode" };
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
  constructor(userName) {
	this.userName = userName;
  }
  
  setUserName(userName) {
	if(userName === undefined || userName === "") {
		userName = "Administrator";
	}
	this.userName = userName;
  }
  
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

  rotateCounterClockwise() {
    let inputData = {};

    let selectedOption = { apiName: "rotateCounterClockwise" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }    

  rotate180() {
    let inputData = {};

    let selectedOption = { apiName: "rotate180" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  rotateByAngle(angle) {
    let inputData = {};
    inputData.angle = angle;

    let selectedOption = { apiName: "rotateByAngle" };
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
	options.formName = "export";
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
  
  snipArea(options) {
    let inputData = {};
    inputData.options = options;

    let selectedOption = { apiName: "snippingTool" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  docExportWithOptions(options) {
    let inputData = {};
    inputData.options = options;

    let selectedOption = { apiName: "docExportWithOptions" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
    return promise;
  }

  getCurrentScale(docId) {
    let inputData = {};
    inputData.docId = docId;

    let selectedOption = { apiName: "getCurrentScale" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

	/*
	When this promise is resolved it will send an object containing document info.
	{
		"docId": "",
		"scale": 1.0,
		"zoomPreset": "fitToWindow or fitToWidth or none"
	}
	*/
    return promise;
  }  
  
  getCurrentRotation(docId, pageNo) {
    let inputData = {};
    inputData.docId = docId;
    inputData.pageNo = pageNo;

    let selectedOption = { apiName: "getCurrentRotation" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

	/*
	When this promise is resolved it will send an object containing document info.
	{
		"docId": "",
		"rotation": 0 or 90 or 180 or 270
	}
	*/
    return promise;
  }

  nativeDocumentDownloading(docId, filename) {
    let inputData = {};
    inputData.docId = docId;
    inputData.fileName = filename;

    let selectedOption = { apiName: "downloadDocument" };
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
  constructor(userName) {
	this.userName = userName;
    this.defaultPrefJSON = {
      userInfo: {
        userId: "ibRGHYys",
        username: "Administrator",
      },
      leftDocToolbar: {
        hideThumbnails: true,
        panning: true,
        zoom: true,
        rotate: true,
        fitToWindow: true,
        fitToWidth: true,
      },
      rightViewerToolbar: {
        uploadDocument: true,
        viewCheckpoints: true,
        insertDocument: true,
        newDocument: true,
        scanDocument: true,
        closeAllFile: true,
        closeFile: true,
        saveDocument: true,
        viewComments: true,
        info: true,
        docMetadata: true,
        settings: {
          userPreferences: true,
          exportDocument: true,
          download: true,
          print: true,
        },
      },
      rightDocToolbar: {
        pageNavigation: true,
      },
      thumbnailToolbar: {
        popInOut: false,
      },
      ribbonToolbar: [
        {
          name: "View",
          isViewTabVisible: true,
          children: {
            split: true,
            invert: true,
            copyPgToClipboard: true,
            undo: true,
            actual: true,
            thumbnailView: true,
            sideBysideView: true,
            textSearch: true,
            selectText: true,
          },
        },
        {
          name: "Insert",
          isInsertTabVisible: true,
          children: {
            cutCopyPaste: true,
            deletePage: true,
            checkpoint: true,
            appendDocument: true,
            watermark: true,
            snippingTool: true,
			trimPage: true,
          },
        },
        {
          name: "Annotate",
          isAnnotationTabVisible: true,
          children: {
            line: true,
            arrow: true,
            circle: true,
            rectangle: true,
            pen: true,
            highlight: true,
            textAnnotation: true,
            stamp: true,
            polyLine: true,
            polygon: true,
            stickynote: true,
            button: true,
            showHideAnn: true,
            cloud: true,
          },
        },
        {
          name: "Redact",
          isRedactTabVisible: true,
          children: {
            redactWord: true,
            redaction: true,
            searchRedact: true,
            clearRedaction: true,
            redactViewMode: true,
            redactPage: true,
            redactSelectText: true,
          },
        },
		{
			name: "Signature",
			isSignatureTabVisible: true,
			children: {
            drawSignature: true,
          },
        },
        {
          name: "Speech",
          isSpeechTabVisible: true,
          children: {
            previousPageSpeech: true,
            play: true,
            pause: true,
            stop: true,
            nextPageSpeech: true,
            speechSpeed: true,
          },
        },
		{
			name: "Compare",
			isCompareTabVisible: true,
			children: {
				comparedocsView: true,
				startSync: true,
				closeCompareDocuments: true,
                comparePanel: true,
          },
        },
		{
          name: "Medify",
          isMedifyTabVisible: false,
          children: {
            addSnapshot: true,
            openSnapshotAsNewDocument: true,
            enableDisableCommentSubtitle: true,
          },		
		},
      ],
      general: {
        view: "pageView",
        zoomPreference: "actualControl",
        newDocPre: "pdf",
        switchThumb: "left",
        isLogEnabled: false,
        selectedOption: "info",
        isOcrEnabled: false,
        firstChunkSize: 1,
        cacheManagerSize: 20,
        waitTime: 5,
        annComments: true,
        showDocThumbBar: true,
		showDocSignPanel: true,
        autogrowDocTabWidth: false,
		embedAnnotationOnStamping: true,
        enablePDFLockAfterSigning: false,
        pdfFlattening: false,
        thumbnailZoomControls: true,
		redactInJSON: true,
		saveOnlyIfModified: false,
      },
      docTabPreferences: {
        focusTabStyle: {
          backgroundColor: "#0853B5",
          color: "#fff",
          fontWeight: "400",
          fontStyle: "normal",
          fileName: "",
          icon: "",
        },
        tabStyle: {
          backgroundColor: "#f7f7f7",
          color: "#4B5658",
          fontWeight: "400",
          fontStyle: "normal",
          fileName: "",
          icon: "",
        },
      },
      compareDocsPreference: {
        detailPreference: {
          fullDetail: false,
        },
        displayPreference: {
          textInfo: true,
          imageInfo: false,
          graphicsInfo: false,
          annotInfo: false,
        },
      },
      commentStatus: [
        {
          iconUrl:
            "data:image/png;base64,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",
          text: "Accepted",
        },
        {
          iconUrl:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7d17vKdT/ffx1+yZMcZ5jEMI5RCSEHK6MShRoZTxizs6h/wi6iYVnQ9+7p/8OihSvw53RCVxSwdRUYmKhFQimRlhnMZxjvcfa+/bmK6Z/d17f6/rs65rvZ6Px3o4jb0+6zuzr/Xe17WutUCSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSpLYaF11Ai6wILBddhJSRhcDD0UVIGp2SA8AAsBGwKfAc4LnA+sDawNTBNgVYIag+qQ3OAU4A5kQXImlkSgkA44DnA7sAOwBbA1uSfqqXNDZ3AG8Afh5ch6QR6HIA2ATYD9gH2JX007ykeiwEzgDeDzwZXIukHnQpAIwDdgSmA/uTAoCkZt0CHA78NroQScvWhQCwOfBG4BBgw+BaJME84KPAx4H5wbVIWoq2BoDlgYOBtwK7Bdciqdp1wBHArdGFSPpXbQsAawBvBt4JrBtci6ThPQl8EPgP0joBSZloSwBYD3gv8CZgcnAtkkbuKtKjujtjy5A0JPcAsCbpHeN34sQvtd0jwHuAs6MLkZRvAJhMmvTfB6wcXIuk/rqc9ChvZnQhUslyDACHAKcBG0QXIqk29wNHAd+OLkQqVU4B4DnAF4CXBdchqTkXkoLA7OhCpNIMRBdAquE44I84+UulORi4Eb/3pcZF3wFYH/gqsGdwHZJiLeLpg4UeDa5FKkJkAJhOuuXvHv2ShvyVdLDQNcF1SJ0XEQAmAv8JHBPQt6T8LQBOB04FngqupQu2JH2W0jM0HQDWAs7HW/6Shncz6WCh30UX0nLTgCuji1B+mlwEuC3we5z8JfVmS+BXwMnAhOBapM5pKgDsQ9oK1P37JY3EcsDHSGsCNguuReqUJgLA24DLgFUa6EtSN72Y9CjgGOLfXpI6oe4A8A7SSv/xNfcjqftWAD4D/Ij0CrGkMagzAJwCfBbTuqT+eglwE2mBoKRRqisAnAJ8qKavLUmrkjYR+7/AOsG1SK1URwA4Fid/Sc14OWkr4VdHFyK1Tb8DwNuBM/r8NSVpWdYEvgv8N+nOgKQe9DMA7IfP/CXFOQK4lXRXQNIw+hUAXgRcgJt1SIq1DnAp8EVgxeBapKz1IwCsS/qGW6kPX0uSxmocaf+R3wE7BdciZWusAWAiaW9/V+FKys3zgKuBT5J2FJS0mLHesv80sFs/CmmB+cCc6CKkhiwPTI4uog/GAycCLyPtG3BTbDlSPsYSAA4Bju5XIcHmk14luhX4M+lM8r8As4GHgMeAuWHVSc1bDfgv4PXRhfTJNsB1pD1K/jfpyGFJo7AB8CCwqKVtAelwkY+QDipy/YJU7SDgXuK/Z/vZrgY27ueHlLlpxH/mtjzbiA0AP82g8NG0m4EPAhuNZuBSodYivWcf/f3bz/Y4adOyEl5bnkb8523Ls43Y8RkUPZL2OOlAos1HM1hJ/98bSI/Eor+n+9kuB9br42eUo2nEf862PNuIbAQ8mkHRvbT7gFNJu4RJ6o8NgCuI//7uZ3sAOLSfH1JmphH/GdvybD0bRzqGM7rg4dpc4EzSIiZJ/Tf0nn1bfhjotV0IrNHHzykX04j/bG15tp4dmkGxw7WLgU1HMihJo7YZcC3x3/f9bLOAV/bzQ8rANOI/V1uGrdcFMCsAtwHP7vHXN+1B0iuJ50cXIhVmAnAS6fW6icG19NO5dOd6sjVwenQRaq8Pk0FaWUr7CbB+fUOX1IOtgN8Tfz2w2Ww9tvEMb13gPPJL94uAD5CeRT4cXItUuntJx/FOAnamjNfrpM77LBkklSXaE3R71a7UZjuTdtSMvk7YbLZltOFS+oakZ/+Thvl1TZoJHAhcH12IpKVaifTc+W14N0DK0nCnAZ5MXpP/3cAeOPlLuXsUOBJ4OSm0S8rMspL5WsDfSaeC5eAeYC/SgT2S2mNV4DTS3QBJmVjWHYBjyGfynwnsjpO/1EYPA28nnSA6O7gWSYOWdgdgBeAuYGqDtSzNE8BuwG+jC5E0ZusA5wCviC5EtZtFOnBJy7Y66byabLyBDFYoAguB19U7VEkBDgceIf4aY6uv/Rn1Yj2Cfo+W9gjgrX0e4Gh9lLQHgaRu+Rpph7qfRRci6WlbEJ8cFwG/AHrZqEhSew0dLPQY8dccW3+bdwB6k9UdgDfVMMCRmkO6RbgguhBJtVoEnA3sgOt8pEYtGQDGAQdHFLKEdwF3RBchqTG3ADuRDhaaG1yLVKRdiL9t9KPaRykpZ9uTAkH0tcg2tuYjgN5k8whgek0D7NUC4N3BNUiKdT2wHXAG6U0gSTVYMgC8MqSKp30F+ENwDZLiPQEcT9oD5K/BtUidtHgAeB6wcVQhpFXApwb2Lyk/vwReBJwbXYjUNYsHgJeHVZGcjYeGSPpXc4C3APsBM4JrkTpj8QDwkrAq0rP/zwT2Lyl/lwPbABdGFyJ1wVAAGAfsHFjHRfjan6Th3U9arDwdDxaSxmQoADyfdCBBlDMD+5bUPheSthK+PLoQqa2GAsAugTXcAVwT2L+kdppBWrt0FPBocC1S6wwFgO0Ca7iAtCmBJI3UItJRqlvhwULSiAwFgBcG1uCCHkljdSewJ3Ac8FRsKVI7DJAWAL4gqP878AAQSf2xiLSeaAfghuBapOwNAM8BVg7q/8qgfiV1103AjsDHgPnBtUjZGgA2Cuz/6sC+JXXXXOD9wK7AbcG1SFkaAJ4b2L8BQFKdfgNsC3wKDxaSnmHoEUCE+/CQD0n1ewI4CdgHuCu4FikbE4D1g/oeOu9bkppwBemNp08AmwbX0qQpxL7qrUxNANYM6vv2oH4lleth4OjoIho2DRdcq8IAMDWob/f+lyQpyACwRlDffwvqV5Kk4k0gbg+ALwKfDeq7Ke8ljVOSpKxMACYF9b1SUL9NWj66AEmSqgwAy0UXIUmSmjUATIwuQpIkNWsAGB9dhCRJatbA8L9EkiR1jQFAkqQCGQAkSSqQAUCSpAIZACRJKpABQJKkAhkAJEkqkAFAkqQCGQAkSSqQAUCSpAIZACRJKpABQJKkAhkAJEkqkAFAkqQCGQAkSSqQAUCSpAIZACRJKpABQJKkAhkAJEkqkAFAkqQCGQAkSSqQAUCSpAIZACRJKpABQJKkAhkAJEkq0ITAvrcEZgX234THowuQJKlKZAB4GHgwsH9JkorlIwBJkgpkAJAkqUAGAEmSCmQAkCSpQAYASZIKZACQJKlABgBJkgpkAJAkqUAGAEmSCmQAkCSpQAYASZIKZACQJKlABgBJkgpkAJAkqUAGAEmSCmQAkCSpQAYASZIKZACQJKlABgBJkgpkAJAkqUAGAEmSCmQAkCSpQAYASZIKZACQJKlABgBJkgpkAJAkqUAGAEmSCmQAkCSpQAYASZIKZACQJKlABgBJkgpkAJAkqUAGAEmSCmQAkCSpQAYASZIKFBkA7gYWdbwd27dPS5KkPvIOgCRJBTIASJJUIAOAJEkFMgBIklQgA4AkSQUyAEiSVCADgCRJBTIASJJUIAOAJEkFMgBIklQgA4AkSQUyAEiSVCADgCRJBTIASJJUIAOAJEkFMgBIklQgA4AkSQUyAEiSVCADgCRJBTIASJJUIAOAJEkFMgBIklQgA4AkSQUyAEiSVCADgCRJBTIASJJUIAOAJEkFMgBIklQgA4AkSQWaENj3s4EZgf1LklQs7wBIklQgA4AkSQUyAEiSVCADgCRJBTIASJJUIAOAJEkFMgBIklQgA4AkSQUyAEiSVCADgCRJBTIASJJUIAOAJEkFMgBIklQgA4AkSQUyAEiSVCADgCRJBTIASJJUIAOAJEkFMgBIklQgA4AkSQUyAEiSVCADgCRJBTIASJJUIAOAJEkFMgBIklQgA4AkSQUyAEiSVCADgCRJBTIASJJUIAOAJEkFMgBIklQgA4AkSQUyAEiSVCADgCRJBTIASJJUIAOAJEkFigwAdwOLOt6O7dunJUlSH3kHQJKkAhkAJEkqkAFAkqQCGQAkSSqQAUCSpAIZACRJKpABQJKkAhkAJEkqkAFAkqQCGQAkSSqQAUCSpAIZACRJKpABQJKkAhkAJEkqkAFAkqQCGQAkSSqQAUCSpAIZACRJKpABQJKkAhkAJEkqkAFAkqQCGQAkSSqQAUCSpAIZACRJKpABQJKkAhkAJEkqkAFAkqQCGQAkSSqQAUCSpAJNCOz72cCMwP4lSSrWALAoqO/xQf1KklS8AWBuUN8rBvUrSVLxIgPAykH9SpJUPAOAJEkFGgAeC+rbACBJUpABYHZQ3+sF9StJUvEGgPuD+t4sqF9JkopnAJAkqUADwKygvg0AkiQFGQDuCOp7A2DVoL4lSSraAHBnUN/jgN2D+pYkqWiRdwAA9grsW5KkYg0AfyFuM6A9g/qVJKloQzsB3hbU/wuBtYL6liSpWAODf/1DUP/jgIOD+pYkqVhDAeCGwBoOD+xbkqQiDQWAXwbW8GJg88D+JUkqzlAA+C3wVGAdRwT2LUlScYYCwFPA9YF1vBVPB5QkqTEDi/39lWFVwFTg7YH9S5JUlMUDwA/CqkjeDUwOrkGSpCIsHgCuBWZHFQKsTXoUIEmSajZhsb9fAPwQODSoFoBTgG8Sd0SxJA3ZHvhf0UX0wZrRBagdXg0sCm7n1D5KSVq2tYF/EH89bHP784g/9TKtR9zv0TMsDzwUWMwiYCGwy2g+RUnqg4nAVcRPoG1vBoDehAWAxdcAADwJXFLPGHs2DjgLmBRch6QynQnsEV2EVLclAwDA1xuv4l+9EPjP6CIkFectwFHRRUhRxgF/Jf720SLgsJrHKklDdibdBY2+7nWl+QigN9k8AmDwP3yl/2Mclc8Dm0YXIanz1gW+g48eVZCqAAApAMxtspClWIW0JsHXWCTVZRJp8l8nuhCpSUsLADOB85ssZBk2Ay7DswIk1eOzwE7RRUg52Yr0Sl70c6ShdgXenpPUX8cQf23ranMNQG+y2QdgST8MLKyqfR/PC5DUH7uTHnVGX9e62gwAvck2AOwSWNjS2q+BNYYrXJKWYX3gn8Rfz7rcDAC9yeotgMX9Eri8P2Psmx2Bn5O+gSVppJYnLfpbK7oQKdJwAQDgA6S0kJMtSKcX7hldiKTWORvYIboIqS3OJ/52UlWbD5wKjK9v6JI65F3EX7dKaT4C6E22awCGbAA8HljkcO2KwRolaWn2BuYRf70qpRkAepPtGoAhdwGnjW2MtdoLuBX4IL4qKOlfbQicB0yILkRqoxWA24lPlcO1W0iBQJIAVgRuIP7aVFrzDkBvsr8DAOkRwJsH/8ecbUF6JHA1sH9wLZJijQO+BGwdXYjUBecSnyxH0n4FHIALBaUSnUj8NajU5h2A3mS/CHBxq5HWBET/4RppmwmcDrxwNIOW1Dr7kt4Uir72lNoMAL1pVQAA2ANYEFj0WNuNwMeBl5DWNkjqlk2AB4i/1pTcDAC9CQsA48ZQ9MeB947h/8/FU6TthX9N+gP7J+A2YHZkUZJGbWXSo78towsp3AzgDdFFtMAapDdUGjeWADAR+CnwP/pUS24eHGwPAY8Cc0gLIdV91wBnRhehURlH2ub31dGFSLkbyzux84DXAr8l3cLomimDTeX5RXQBGrVTcPKXejKWOwBDdgJ+BizXh68l5eD5pI2l1C4HABfR2xknUvH6EQAA3gh8uU9fS4o0E3g2aZGM2mMz0gFhq0YXIrVFv96Nv2Hwa+3Rp68nRblosKk9VgZ+jEeESyPSz1tlpwJf6+PXkyJcEV2ARmQA+CbpsY2kEehnAFgEvAm4sI9fU2raT6ML0Ih8GHhldBFSG/VrDcDiJgEXAy+r4WtLdboVf5Jsk4OAb1PPdWwsFgAnkNaT5GBL0h1aqRErkJ7JRe9EZbONpH0GtcULSHtzRP+ZqWon1jju0ZhG/Gdiy7DV9brM48ArgO/W9PWlOvwkugD1ZAppoeZK0YVU+C5wWnQRUi/qfF92LvBvBG1xKI3QfOCq6CI0rPGka8om0YVUuBE4nPTTlZS9ujfMmAccBnyo5n6ksboOeDi6CA3rE+S5vugB0pqEx6ILkXrVxI5Zi4APAm8hBQIpR77+l7/XAO+OLqLCAuBQ4G/RhUgj0eSWmeeS1gV4yp5yZADI2zakfUZyW/EP8B7gh9FFSCPV9J7ZPyZ9I1/bcL/SsjxOOj5WeVqddMLfCtGFVPgGcEZ0EdJoRByacTfptZQvBPQtVfkF8FR0Eao0gbS52EbRhVT4LfC26CKk0Yo6NetJ4ChgX2BWUA3SEF//y9fpwF7RRVT4J+nY4SeiC5FGK/rYzB8CLwIuCa5DZfP5f54OB46NLqLCPGA68I/oQqSxiA4AAPeQzvE+AJgRXIvKM5v0/rbysi1wVnQRS3Ec8PPoIqSxyiEADLkE2Ar4Ium1GqkJVwALo4vQM6xNOk8kx0V/5wKfjy5C6oecAgDAg8CRpCBweXAtKoPP//MyEfgWsH50IRV+DbwjugipX3ILAENuBfYDXgX8IbgWdZvP//NyJrBHdBEVZpE2IvJtEXVGrgFgyMWkZ4GHALcE16Lu+Rvu3paTt5DeDsrNU6TJP5fjfaW+yD0AQHo+ewHpscBLgUtjy1GHePs/HzsBn40uYin+HTeKUge1IQAMWUi6YO8P7EjaFtR3cDUW3v7Pw7qkY3QnRRdS4SzgnOgipDrkuK/2SKxGOm3wjcB2wbWoXRaSVpvfH11I4SaRjmHeKbiOKleTNiFq+yFm04Aro4tQftp0B6DKQ8DngO2B5wHvx0WD6s2NOPnn4HPkOfnfDbyW9k/+0lK1PQAs7i/Ax4CtgeeSFhNdDMyJLErZ8vZ/vKOBN0cXUeFJ4CDSdr9SZ7X9EUAvJpBCwa6DbQdSQFDZ9sUjXCPtTlrTMzG6kApHkNYYdcU0fASgCiUEgCqrkN4q2ArYFHgOKRRsAEyNK0sNeYp0xOzj0YUUan3gOtIajNycSdrqt0u2Jh2qJD1DqQFgWSaQQsBU0iSx/OC/nxJWUTftR1q8GeEqYM+gvks3mbSP/vbRhVS4EtgHmB9diCR12XnAoqD2vgbGp2pfJu73fVntTmDN+oYtSYJ05+ke4i72O9Y/RFU4nviJvqo9jq8RS1IjtibuYv8Q6TGPmrU36ZW66Ml+ybYQ+Lcaxy1JWswJxF3wL2pgfHqmDYF7iZ/sq9onaxy3JGkJlxF3wT+mgfHpaZOB64mf6Kvaj4Dx9Q1dkrS45UibM0Vd9Devf4gaNI7YxZ7LancAa9Q3dEnSknYn7qI/o4Hx6WknET/RV7U5wAtqHLckqcKHiLvw/3f9w9Ogl5Lep4+e7JdsC4HpNY5bkrQU1xB38X99A+NT2lXzfuIn+6r24RrHLUlaipWBucRd/Nerf4jFWwm4ifiJvqpdjov+JCnEAcRd/P/YwPhKNw64gPiJvqrdBqxW39Cl9unSccDK396BfXv8b/0+ABwcXUSFOaTjfR+KLkSSSvVH4n4CPKCB8ZVsf2AB8T/pL9kWDNYmSQryLNIK7IhJYB6wav1DLNZmpJ+uoyf7qvaBGsctSerB64mbBK5pYHylWhm4mfiJvqp9D488l5bKNQBqyl6Bffv8vx4DwDeB50cXUuFmng6dkqRAdxD3k+DuDYyvRB8h/qf8qvYAsEmN45Yk9Wh94iaDx4BJ9Q+xOK8ibk3HstoC4OU1jluSNAKRz/8va2B8pdkceJj4yb6qnVjjuCVJI3QOcRPCCQ2MryRTgL8QP9FXte/goj9JysqfiJsUtmlgfKUYT9pON3qir2o3ACvWN3RJ0kitStyz4vvwTZd+Oo34ib6qzQY2rnHckqRR2Ju4ieG8BsZXiteQ56K/+cC+NY5b6ix/OlLdtgvs+8rAvrtkG+Br5Pl8/T2kxxKSpMxcSNxPh89rYHxdtzpwO/E/6Ve1b9Q4bknSGEVNHrOaGFzHTSDtohg90Ve164HJ9Q1dkjQWKxJ3Qtz5DYyv684gfqKvav8ENqhx3JKkMdqeuEni2AbG12X/k/iJvqrNBfaocdySpD44nLiJYpcGxtdV25K2UI6e7Kva0TWOW5LUJ58kZpKYj5vCjNbawF3ET/RV7as1jluS1EcXEzNR/KGJwXXQRODnxE/0Ve1XeKiTJLXGTcRMFl9vYnAd9HniJ/qqNgtYr8ZxS5L67BFiJoyTmxhcxxxB/ERf1eYCu9U4bklSn61B3KTxqgbG1yU7AU8SP9lXtbfWOG5JUg22I27ScAfA3q0LzCR+oq9qZ9U4bklSTQ4iZtKYT1rMpuFNAn5J/ERf1X4BLFff0CV5GJDqsm5QvzOAeUF9t81ngJ2ji6gwCziE9PxfUk0MAKrLWkH93hnUb9u8gzyfrz9JWsMxM7oQqesMAKpLVAD4e1C/bbIbaZ//HB0J/Ca6CKkEBgDVZe2gfmcE9dsW6wLfIs91Ep/G3f6kxhgAVJc1g/q9L6jfNlietDvjOtGFVLgSeE90EVJJDACqy5Sgfv8Z1G8bfI50QmNu/k5a9Dc/uhBJ0tjdSczrY/s0MLY2Oo74V/uq2mOk0wclSR0xm5gJ5cVNDK5l9iK9Ghk92Ve119U4bklSgKeImVCe38TgWmRD4F7iJ/qq9qkaxy1JCjCRuEllgwbG1xYrAL8nfqKvaj8Extc3dElShJWIm1imNjC+NhgHnEf8RF/V/gqsXt/QJUlRViVuclmpgfG1wUnET/RVbQ6wVY3jliQFmkLcBLNCA+PL3UtJr9RFT/ZLtoXA9BrHLUkKNpW4SWZSA+PL2XOB+4mf7KvaR2octyQpA2sSN8mUfITsSsBNxE/0Ve1S3HhMkjov8g7Aig2ML0fjgO8QP9FXtT+R1oVIkjpuReImm1LfAjiF+Im+qj0CbFnjuCVJGRlP3ISzXgPjy83LyHfR32tqHLckKUNziZl0Nm5icBnZDHiI+Mm+qp1S47glSZmaQ8yk86ImBpeJlYGbiZ/oq9r3SOsSJEmFuYeYiWfvJgaXgQHg+8RP9FXtZlI4kZQxX8tRXR4M6ndKUL9N+xCwf3QRFR4EDiTdAZKUMQOA6vJAUL8l7DF/EPC+6CIqLAAOI+31LylzBgDVJeoOwDpB/TZlc+Ar5Pl8/X3AD6KLkNQbA4DqEhUAuvwa4BTgEmCV6EIqfBc4LboISb0zAKgus4P67WoAGE863neT6EIq3AgcTloAKKklDACqy4ygftcP6rduHydt+JOb2cCrgceiC5Ek5eF1xLyC9ih5Ph8fi4NIu+pFv963ZJsP7FvjuCVJLbQ7cRNTlx4DbE0KNdGTfVV7V43jliS11EbETUzT6h9eI1YHbid+oq9q36hx3JKkFptEei88YnJ6ewPjq9sE4AriJ/qqdj0wub6hS5La7k5iJqjPNTC2up1B/ERf1e4HnlvjuCVJHfBjYiapa5oYXI0OI36ir2pzgT1qHLekBvkaoOr056B+X0i7/2znuMc/pEV/P4suQlJ/tPkiqfz9Jajflchzw5w2+zLdeLQiaZABQHW6LbDvnQP77pprgaOji5DUXwYA1ekPgX0bAPrjHuC1wFPRhUjqLwOA6jQDuDeo712C+u2SecB04O7oQiT1nwFAdbsxqN8tSafnafTeAfwiughJ9TAAqG43BPU7AOwZ1HcXnAWcE12EpPoYAFS33wf2/ZLAvtvsauC46CIk1csAoLr9OrBvA8DIzQIOIW36I6nDDACq2x2kSSXCpsDGQX230ZPAgcDM6EIk1c8AoCb8KrDvAwL7bpvTgeuii5DUDAOAmhAZAA4M7LttHowuQFJzDABqQuThPLsCUwP7l6QsGQDUhOuAR4L6ngC8KqhvScqWAUBNmA9cFdj/6wL7lqQsGQDUlJ8E9r0nsF5g/5KUHQOAmvLjwL4HSHvaS5IGGQDUlD8BdwX2f3hg35KUHQOAmnRJYN/bADsG9i9JWTEAqEkXB/d/VHD/kpQNA4Ca9DPg4cD+p+OeAJIEGADUrLnADwL7nwz8e2D/kpQNA4CadlFw/8cCqwbXIEnhDABq2qXAo4H9rwYcE9i/JGXBAKCmPQ58L7iGE3AtgKTCGQAU4bzg/qcAHwquQZJCGQAU4UfAvcE1HAlsFVyDJIUxACjCfODC4BrGA/8FjAuuQ5JCGAAU5azoAoBppDsBklQcA4Ci3AxcHV0E8B/AxtFFSFLTDACK9PnoAoAVgS+RHglIUjEMAIr0bWBmdBGkRwEfDK5BkhplAFCkecCXo4sYdDKwX3QRktQUA4CinU16KyDaAPB1YNPoQiSpCQYARfsHaeLNwVTgcmCt6EIkqW4GAOXgo6THATnYiHRg0fLRhUhSnQwAysHfgK9GF7GYXUjnFRgCJHWWAUC5+AgwN7qIxbyMdCdgUnQhklQHA4BycRfwlegilrAvacviydGFSFK/GQCUk4+RjgvOyf7Aj4HVowuRpH4yACgn/wA+EV1EhV1J2xZvGF2IJPWLAUC5OQ24LbqIClsA1wMvjS5EkvrBAKDczAXeGV3EUqwB/IC0bbDfO5JazYuYcvQj4LvRRSzFeOBU4PvAs4JrkaRRMwAoV+8CHosuYhleAfwRmB5diCSNhgFAuboLeE90EcOYCnwL+A4uEJTUMgYA5ews4JLoInpwEHAraW2AuwdKagUDgHL3ZuCe6CJ6MJm0NuDPwLG4g6CkzBkAlLv7SCFgUXQhPVof+DRwC/AmDAKSMmUAUBtcRnoc0CYbAeeS1jJ8Enh2bDmS9EwGALXFCcBvoosYhbWAE4HbSScMvhbXCUjKgAFAbfEk8GpgZnQho7QccCDpcKF7SMcfHwJMiSxKUrkmRBcgjcBMUgj4Ge3+KXpV4PDBtgD4NfDzwb9eG1iXJElZO4y0KLCrbW5Qv8eP5DdBUrv5CEBt9H9IC+u6amJ0AZK6zwCgtjoZ+FJ0EZLUVgYAtdUi4Ejg/OhCJKmNe2mFoQAAAjVJREFUDABqswWkhXSXRhciSW1jAFDbzQNeA1weXYgktYkBQF0wl7TBzpXRhUhSWxgA1BWPAfsCF0QXIkltYABQl8wFDqV95wZIUuMMAOqaBcDRwEnRhUhSzgwA6qpPkV4TnBddiCTlyACgLvsisBcwK7oQScqNAUBddzWwDb4hIEnPYABQCe4F9iE9FpAkYQBQOeaTFgYeBjwUXIskhTMAqDTfBLYAvh9diCRFMgCoRPcABwLTgQeDa5GkEAYAlexCYFvgiuhCJKlpBgCV7u/AS4ADgDuCa5GkxhgApOQSYEvSQsE5wbVIUu0MANLTniC9Krg5cDawMLYcSaqPAUD6VzOBtwPbAd/GICCpgwwA0tLdABwMPI90R8BzBSR1hgFAGt7tpDsCmwFfAB6PLUeSxs4AIPXuDuAoYB1SIPhdbDmSJCnKdsCZwAPAopa34/v82UiS1HkrAK8BvkZ7w4ABQJKkMZgA7A18BriL+IndACBJUoB1SW8TnAlcT3qtMHqyNwBIhZsQXYBUgJmkcwcuHPznNYFdgReRNh3abLBNCqlOUpEMAFLz7gO+N9iGjAeeQzqqeBNgDeBZpLCwxuBf1wZWabJQSd1lAJDysIC038DtPf76ycCUwbb8Yv/cy99X/bdV+zQOSZLUMstHFyBJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiQN7/8BnX5S2s1IvbAAAAAASUVORK5CYII=",
          text: "Rejected",
        },
        {
          iconUrl:
            "data:image/png;base64,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",
          text: "Cancelled",
        },
        {
          iconUrl:
            "data:image/png;base64,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",
          text: "Completed",
        },
        {
          iconUrl:
            "data:image/png;base64,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",
          text: "Clear",
        },
      ],
    };

    this.defaultShortcutPrefJSON = {
      shortcuts: [
        {
          key: "Alt+=",
          command: "zoomin",
          title: "Zoom In",
        },
        {
          key: "Alt+-",
          command: "zoomout",
          title: "Zoom Out",
        },
        {
          key: "Shift+S",
          command: "save",
          title: "Save",
        },
        {
          key: "Ctrl+Shift+X",
          command: "export",
          title: "Export",
        },
        {
          key: "Shift+P",
          command: "print",
          title: "Print",
        },
        {
          key: "Shift+HOME",
          command: "firstpage",
          title: "First Page",
        },
        {
          key: "Shift+END",
          command: "lastpage",
          title: "Last Page",
        },
        {
          key: "ARROWUP",
          command: "previouspage",
          title: "Previous Page",
        },
        {
          key: "ARROWDOWN",
          command: "nextpage",
          title: "Next Page",
        },
        {
          key: "Shift+R",
          command: "rotateclockwise",
          title: "Rotate",
        },
        {
          key: "Ctrl+Alt+B",
          command: "thumbnails",
          title: "Thumbnails",
        },
        {
          key: "Ctrl+Shift+Y",
          command: "redaction",
          title: "Redaction",
        },
        {
          key: "Alt+P",
          command: "search and redact",
          title: "Search And Redact",
        },
        {
          key: "Shift+Z",
          command: "redact view mode",
          title: "Redact View Mode",
        },
        {
          key: "Ctrl+Alt+L",
          command: "line",
          title: "Line",
        },
        {
          key: "Ctrl+Alt+R",
          command: "rectangle",
          title: "Rectangle",
        },
        {
          key: "Ctrl+Alt+C",
          command: "circle",
          title: "Circle",
        },
        {
          key: "Shift+Alt+O",
          command: "arrow",
          title: "Arrow",
        },
        {
          key: "Ctrl+Alt+P",
          command: "pen",
          title: "Pen",
        },
        {
          key: "Shift+Alt+H",
          command: "highlight",
          title: "Highlight",
        },
        {
          key: "Shift+Alt+K",
          command: "text",
          title: "Text",
        },
        {
          key: "Shift+Alt+S",
          command: "stamp",
          title: "Stamp",
        },
        {
          key: "Shift+Alt+M",
          command: "polyline",
          title: "Polyline",
        },
        {
          key: "Shift+Alt+N",
          command: "polygon",
          title: "Polygon",
        },
        {
          key: "Shift+Ctrl+Q",
          command: "checkpoint",
          title: "Checkpoint",
        },
        {
          key: "Ctrl+Alt+W",
          command: "watermark",
          title: "Watermark",
        },
        {
          key: "Ctrl+M",
          command: "show-hide annotations",
          title: "Show-Hide Annotations",
        },
        {
          key: "DELETE",
          command: "delete annotations",
          title: "Delete Annotations",
        },
        {
          key: "Ctrl+1",
          command: "actual size",
          title: "Actual Size",
        },
        {
          key: "Ctrl+2",
          command: "fit to width",
          title: "Fit To Width",
        },
        {
          key: "Ctrl+3",
          command: "fit to window",
          title: "Fit To Window",
        },
        {
          key: "Ctrl+X",
          command: "cut page",
          title: "Cut Page",
        },
        {
          key: "Ctrl+DELETE",
          command: "delete page",
          title: "Delete Page",
        },
        {
          key: "Ctrl+C",
          command: "copy page",
          title: "Copy Page",
        },
        {
          key: "Ctrl+V",
          command: "paste page",
          title: "Paste Page",
        },
        {
          key: "Ctrl+Shift+F",
          command: "search",
          title: "Search",
        },
        {
          key: "Shift+<",
          command: "previous search",
          title: "Previous Search",
        },
        {
          key: "Shift+>",
          command: "next search",
          title: "Next Search",
        },
        {
          key: "Alt+I",
          command: "version number",
          title: "Version Number",
        },
        {
          key: "Alt+H",
          command: "show keyboard hint",
          title: "Show Hotkeys Hint",
        },
        {
          key: "Alt+U",
          command: "previous",
          title: "Previous",
        },
        {
          key: "Alt+Y",
          command: "next",
          title: "Next",
        },
        {
          key: "Alt+Z",
          command: "close",
          title: "Close",
        },
      ],
    };

    this.defaultAnnotationPropertyJSON = [
      {
        annId: "AvG52nYt",
        annType: "Polygon",
        borderWidth: "5",
        fillColor: "#96FEFE",
        fontSize: "0",
        height: "0",
        opacity: "0.5",
        strokeColor: "#FF0000",
        type: "0",
        userType: "0",
        width: "0",
      },
      {
        annId: "eN5ilLAu",
        annType: "Masking",
        borderWidth: "0",
        fillColor: "#000000",
        fontSize: "0",
        height: "0",
        opacity: "0.3",
        reason: "Spousal,Reporter,SEP,Minor",
        type: "0",
        userType: "0",
        width: "0",
      },
      {
        annId: "OUE86Exp",
        annType: "Highlight",
        borderWidth: "0",
        fillColor: "#FFFF00",
        fontSize: "0",
        height: "0",
        opacity: "0.4",
        type: "0",
        userType: "0",
        width: "0",
      },
      {
        annId: "cZ6XuhnO",
        annType: "Cloud",
        borderWidth: "5",
        fillColor: "#96FEFE",
        fontSize: "0",
        height: "0",
        opacity: "0.5",
        strokeColor: "#FF0000",
        type: "0",
        userType: "0",
        width: "0",
      },
      {
        annId: "ciwSuCgl",
        annType: "Rectangle",
        borderWidth: "5",
        fillColor: "#96FEFE",
        fontSize: "0",
        height: "0",
        opacity: "0.5",
        strokeColor: "#FF0000",
        type: "0",
        userType: "0",
        width: "0",
      },
      {
        annId: "kYZrDNV8",
        annType: "Circle",
        borderWidth: "5",
        fillColor: "#96FEFE",
        fontSize: "0",
        height: "0",
        opacity: "0.5",
        strokeColor: "#FF0000",
        type: "0",
        userType: "0",
        width: "0",
      },
      {
        annId: "O2h6McHO",
        annType: "Pen",
        borderWidth: "5",
        fontSize: "0",
        height: "0",
        opacity: "1.0",
        strokeColor: "#FF0000",
        type: "0",
        userType: "0",
        width: "0",
      },
      {
        annId: "xqJv8s3g",
        annType: "Line",
        borderWidth: "5",
        fontSize: "0",
        height: "0",
        opacity: "1.0",
        strokeColor: "#FF0000",
        type: "0",
        userType: "0",
        width: "0",
      },
      {
        annId: "RdzxWMIx",
        annType: "Stickynote",
        borderWidth: "1",
        fillColor: "#FFFF00",
        fontSize: "0",
        height: "0",
        opacity: "0.5",
        reason:
          "Concern,Scheduling,Estimate,Resources,Feasibility,Cost/Benefit,Deliverable",
        strokeColor: "#000000",
        title: "Project,Missing,Status,Issue,Agreement,Change,Action",
        type: "1",
        userType: "0",
        width: "0",
      },
      {
        annId: "H1BG4HXl",
        annType: "Redaction",
        borderWidth: "0",
        fillColor: "#000000",
        fontSize: "0",
        height: "0",
        opacity: "0.3",
        reason: "Spousal,Reporter,SEP,Minor",
        type: "0",
        userType: "0",
        width: "0",
      },
      {
        annId: "2u79iVNI",
        annType: "Arrow",
        borderWidth: "5",
        fontSize: "0",
        height: "0",
        opacity: "1.0",
        strokeColor: "#FF0000",
        type: "0",
        userType: "0",
        width: "0",
      },
      {
        annId: "dyGhcT36",
        annType: "Text",
        borderWidth: "5",
        fillColor: "#ffffff",
        fontColor: "#000000",
        fontFace: "Helvetica",
        fontSize: "48",
        height: "0",
        opacity: "0.5",
        strokeColor: "#000000",
        type: "0",
        userType: "0",
        width: "0",
      },
      {
        annId: "dyGhcT37",
        annType: "Button",
        borderWidth: "0",
        fillColor: "#00A2E8",
        fontColor: "#000000",
        fontFace: "Helvetica",
        fontSize: "18",
        height: "0",
        opacity: "1",
        strokeColor: "#000000",
        type: "0",
        userType: "0",
        width: "0",
      },
      {
        annId: "J3enMeMM",
        annType: "PolyLine",
        borderWidth: "5",
        fontSize: "0",
        height: "0",
        opacity: "1.0",
        strokeColor: "#FF0000",
        type: "0",
        userType: "0",
        width: "0",
      },
      {
        annId: "qcEPGSp7",
        annType: "CheckPoint",
        borderWidth: "2",
        fillColor: "#96FEFE",
        fontSize: "0",
        height: "0",
        opacity: "0.5",
        strokeColor: "#FF0000",
        type: "0",
        userType: "0",
        width: "0",
      },
      {
        annId: "zTnnEv0H",
        annType: "Stamp",
        borderWidth: "5",
        fillColor: "#ffff00",
        fontColor: "#000000",
        fontFace: "Helvetica",
        fontSize: "48",
        height: "150",
        opacity: "1.0",
        strokeColor: "#000000",
        type: "1",
        userType: "0",
        width: "150",
      },
	  {
         annId: "ciwSuCgl",
         annType: "Drawsignature",
         borderWidth: "0",
         fillColor: "#FFFFFF",
         fontSize: "0",
         height: "0",
         opacity: "0.01",
         strokeColor: "#FFFFFF",
         type: "0",
         userType: "0",
         width: "0",
      },	  
    ];

    this.defaultActionScriptJSON = [
      {
        name: "Script1",
        value: "YWxlcnQoJ0hlbGxvIEkgYW0gU2NyaXB0MScp",
        pdfvalue: "YXBwLmFsZXJ0KCJIZWxsbyBJIGFtIHNjcmlwdCAxIik=",
      },
      {
        name: "Script2",
        value: "YWxlcnQoJ0hlbGxvIEkgYW0gU2NyaXB0Micp",
        pdfvalue: "YXBwLmFsZXJ0KCJIZWxsbyBJIGFtIHNjcmlwdCAyIik=",
      },
    ];
  }

  setUserName(userName) {
	if(userName === undefined || userName === "") {
		userName = "Administrator";
	}
	this.userName = userName;
  }
  
  setUserPreferences(preferences, shortcutPreferences) {
    let inputData = {};
    inputData.preferences = preferences;
    inputData.shortcutPreferences = shortcutPreferences;
    inputData.defaultAnnotationPropertyJSON =
      this.defaultAnnotationPropertyJSON;
    inputData.defaultActionScriptJSON = this.defaultActionScriptJSON;
    inputData.userName = this.userName;

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

  getUserPreferences(defaultPrefJSON, defaultShortcutPrefJSON, loadFromAssets) {
    let inputData = {};
    inputData.userName = this.userName;

    let selectedOption = { apiName: "getViewerPreference" };

    if (loadFromAssets === undefined || loadFromAssets === false) {
      if (defaultPrefJSON !== undefined && defaultPrefJSON !== null) {
        inputData.defaultPrefJSON = defaultPrefJSON;
      } else {
        inputData.defaultPrefJSON = this.defaultPrefJSON;
      }
      inputData.defaultAnnotationPropertyJSON =
        this.defaultAnnotationPropertyJSON;
      if (
        defaultShortcutPrefJSON !== undefined &&
        defaultShortcutPrefJSON !== null
      ) {
        inputData.defaultShortcutPrefJSON = defaultShortcutPrefJSON;
      } else {
        inputData.defaultShortcutPrefJSON = this.defaultShortcutPrefJSON;
      }
    }

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
  constructor(userName) {
	  this.userName = userName;
  }

  setUserName(userName) {
	if(userName === undefined || userName === "") {
		userName = "Administrator";
	}
	this.userName = userName;
  }

  addWatermark(properties) {
    let inputData = {};
    inputData.properties = properties;

    let selectedOption = { apiName: "addWatermark" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  editWatermark(properties) {
    let inputData = {};
    inputData.properties = properties;

    let selectedOption = { apiName: "editWatermark" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  deleteWatermark(watermarkId) {
    let inputData = {};
    inputData.watermarkId = watermarkId;

    let selectedOption = { apiName: "deleteWatermark" };
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

class AnnotationService {
  constructor(userName) {
	this.userName = userName;
  }
  
  setUserName(userName) {
	if(userName === undefined || userName === "") {
		userName = "Administrator";
	}
	this.userName = userName;
  }
  
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

  getStamps(loadFromAssets) {
    let defaultStamps = [
      {
        stampName: "Approved",
        stampURL:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABVCAYAAACrfR34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGQ0MxQTI4NzI1OTExMUUwQjBEREUyMkJBN0VFQzcxQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGQ0MxQTI4ODI1OTExMUUwQjBEREUyMkJBN0VFQzcxQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZDQzFBMjg1MjU5MTExRTBCMERERTIyQkE3RUVDNzFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZDQzFBMjg2MjU5MTExRTBCMERERTIyQkE3RUVDNzFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwv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",
        mimeType: "png",
      },
      {
        stampName: "Question",
        stampURL:
          "data:image/png;base64,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",
        mimeType: "png",
      },
      {
        stampName: "Warning",
        stampURL:
          "data:image/png;base64,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",
        mimeType: "png",
      },
      {
        stampName: "Confidential",
        stampURL:
          "data:image/png;base64,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",
        mimeType: "png",
      },
      {
        stampName: "Denied",
        stampURL:
          "data:image/png;base64,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",
        mimeType: "png",
      },
      {
        stampName: "Initial",
        stampURL:
          "data:image/png;base64,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",
        mimeType: "png",
      },
      {
        stampName: "Initial Left",
        stampURL:
          "data:image/png;base64,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",
        mimeType: "png",
      },
      {
        stampName: "Initail Right",
        stampURL:
          "data:image/png;base64,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",
        mimeType: "png",
      },
      {
        stampName: "Pending",
        stampURL:
          "data:image/png;base64,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",
        mimeType: "png",
      },
      {
        stampName: "Received",
        stampURL:
          "data:image/png;base64,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",
        mimeType: "png",
      },
      {
        stampName: "SignHere Left",
        stampURL:
          "data:image/png;base64,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",
        mimeType: "png",
      },
      {
        stampName: "SignHere Right",
        stampURL:
          "data:image/png;base64,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",
        mimeType: "png",
      },
      {
        stampName: "Urgent",
        stampURL:
          "data:image/png;base64,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",
        mimeType: "png",
      },
    ];

    let stampDetailsArray = [];
    let inputData = {};

    if (loadFromAssets === undefined || loadFromAssets === false) {
      inputData.defaultStamps = defaultStamps;
    } else {
      inputData.defaultStamps = undefined;
    }

    let selectedOption = { apiName: "getStamps" };
    window.eViewerComponentReference.zone.run(() => {
      stampDetailsArray = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return stampDetailsArray;
  }

  setactionScripts() {
    // Yet to be implemented
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

  drawLinkAnnotation(annId, options) {
    let inputData = {};
    inputData.annId = annId;
    inputData.options = options;

    let selectedOption = { apiName: "linkAnnotation" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });
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

class IconCacheManagerService {
  constructor(userName) {
    this.userName = userName;
  }

  setUserName(userName) {
    if (userName === undefined || userName === "") {
      userName = "Administrator";
    }
    this.userName = userName;
  }

  invalidateThumbnailIconForPages(options) {
    let inputData = {};
    inputData.options = options;

    let selectedOption = { apiName: "invalidateThumbnailIconForPages" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  getCacheInfo() {
    let inputData = {};

    let selectedOption = { apiName: "getCacheInfo" };
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

class SignatureService {
	constructor(userName) {
	  this.userName = userName;
	}

	setUserName(userName) {
		if(userName === undefined || userName === "") {
			userName = "Administrator";
		}
		this.userName = userName;
	}
	
	setAvailableCertificates(certificates) {
		/*
		[{ certificate: "BASE64 CERTIFICATE", commonName: "", expiry: "", issuedBy: "", password: "" }]
		*/
		let inputData = {};
		inputData.certificates = certificates;

		let selectedOption = { apiName: "setAvailableCertificates" };
		let promise = null;
		window.eViewerComponentReference.zone.run(() => {
		  promise = window.eViewerComponentReference.invokeAPI(
			selectedOption,
			inputData
		  );
		});

		return promise;		
	}
	
	setAvailableAppearances(appearances) {
		/*
		["BASE64 IMAGE"]
		*/
		let inputData = {};
		inputData.appearances = appearances;

		let selectedOption = { apiName: "setAvailableAppearances" };
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

class RedactionService {
  drawRedaction(pageRange, position, options) {
    let inputData = {};
    inputData.pageRange = pageRange;
    inputData.options = options;
    inputData.position = position;
    let selectedOption = { apiName: "drawRedaction" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  redactWord(redactWord, options) {
    let inputData = {};
    inputData.redactWord = redactWord;
    inputData.options = options;
    let selectedOption = { apiName: "redactWord" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  clearRedaction(pageRange) {
    let inputData = {};
    inputData.pageRange = pageRange;
    let selectedOption = { apiName: "clearRedaction" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  redactExpressions(expressions, selectedTag) {
    let inputData = {};
    inputData.expressions = expressions;
    inputData.selectedTag = selectedTag;
    let selectedOption = { apiName: "redactByExpression" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  getDetails(pageRange) {
    let inputData = {};
    inputData.pageRange = pageRange;
    let selectedOption = { apiName: "getRedactionDetails" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  switchRedactViewMode() {
    let inputData = {};
    let selectedOption = { apiName: "redactViewMode" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  setUserName(userName) {
    if (userName === undefined || userName === "") {
      userName = "Administrator";
    }
    this.userName = userName;
  }
}

class DocMetadataService {
  constructor(userName) {
    this.userName = userName;
  }

  setUserName(userName) {
    if (userName === undefined || userName === "") {
      userName = "Administrator";
    }
    this.userName = userName;
  }

  setMetaData(data) {
    let inputData = {};
    inputData.data = data;
    let selectedOption = { apiName: "setMetaData" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  getMetaData() {
    let inputData = {};
    let selectedOption = { apiName: "getMetaData" };
    let promise = null;
    window.eViewerComponentReference.zone.run(() => {
      promise = window.eViewerComponentReference.invokeAPI(
        selectedOption,
        inputData
      );
    });

    return promise;
  }

  getAllMetaData(data) {
    let inputData = {};
    inputData.data = data;
    let selectedOption = { apiName: "getAllMetaData" };
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
