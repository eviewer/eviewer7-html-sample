function _docLoadComplete(docID) {
	try {
		console.log("docLoadComplete: " + docID);
	} catch (exp) {
	}
}

function _docSaveComplete(docID, annotationData) {
	try {
		console.log("docSaveComplete: " + docID + " annData: " + annotationData);
	} catch (exp) {
	}
}

function _docDropped(docID) {
	try {
		console.log("docDropped: " + docID);
	} catch (exp) {
	}
}

function _annCreated(docID, annID, pageNo) {
	try {
		console.log("annCreated: docID " + docID + " annID: " + annID + " pageNo: " + pageNo);
	} catch (exp) {
	}
}

function _annDeleted(docID, annID, pageNo) {
	try {
		console.log("annDeleted: docID " + docID + " annID: " + annID + " pageNo: " + pageNo);
	} catch (exp) {
	}
}

function _annPropUpdated(docID, pageNo, annID, annProperty) {
	try {
		console.log("annPropUpdated: docID " + docID + " annID: " + annID + " annProperty: " + annProperty);
	} catch (exp) {
	}
}

function _buttonAnnClicked(docID, annID, pageNo, buttonText) {
	try {
		console.log("buttonAnnClicked: docID " + docID + " annID: " + annID + " pageNo: " + pageNo + " buttonText: " + buttonText);
	} catch (exp) {
	}
}

function _pageChanged(docID, pageNo) {
	try {
		console.log("pageChanged: " + docID + " current pageNo: " + pageNo);
	} catch (exp) {
	}
}

function _docExported(docID, selectedOption) {
	try {
		console.log("docExported: " + docID + " selectedOption: " + selectedOption);
	} catch (exp) {
	}
}

function _pageDeleted(docID, pageNo) {
	try {
		console.log("pageDeleted: " + docID + " current pageNo: " + pageNo);
	} catch (exp) {
	}
}

function _pageCut(docID, pageNo) {
	try {
		console.log("pageCut: " + docID + " currnet pageNo: " + pageNo);
	} catch (exp) {
	}
}

function _pageCopied(docID, pageNo) {
	try {
		console.log("pageCopied: " + docID + " current pageNo: " + pageNo);
	} catch (exp) {
	}
}

function _pagePasted(docID, pageNo) {
	try {
		console.log("pagePasted: " + docID + " current pageNo: " + pageNo);
	} catch (exp) {
	}
}