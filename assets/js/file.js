////////////////////////////////////////////////////////
//// READ AND WRITE TO FILE ////////////////////////////

function readAsText(fileEntry, callback) {
	fileEntry.file(function(file) {
		var reader = new FileReader();

		reader.onerror = errorHandler;
		reader.onload = function(e) {
			callback(e.target.result);
		};

		reader.readAsText(file);
	});
}

function writeFileEntry(writableEntry, opt_blob, callback) {
	if (!writableEntry) {
		output.textContent = 'Nothing selected.';
		return;
	}

	writableEntry.createWriter(function(writer) {

		writer.onerror = errorHandler;
		writer.onwriteend = callback;

	// If we have data, write it to the file. Otherwise, just use the file we
	// loaded.
	if (opt_blob) {
		writer.truncate(opt_blob.size);
		waitForIO(writer, function() {
			writer.seek(0);
			writer.write(opt_blob);
		});
	} 
	else {
		chosenEntry.file(function(file) {
			writer.truncate(file.fileSize);
			waitForIO(writer, function() {
				writer.seek(0);
				writer.write(file);
			});
		});
	}
}, errorHandler);
}

function waitForIO(writer, callback) {
// set a watchdog to avoid eventual locking:
var start = Date.now();
// wait for a few seconds
var reentrant = function() {
	if (writer.readyState===writer.WRITING && Date.now()-start<4000) {
		setTimeout(reentrant, 100);
		return;
	}
	if (writer.readyState===writer.WRITING) {
		console.error("Write operation taking too long, aborting!"+
			" (current writer readyState is "+writer.readyState+")");
		writer.abort();
	} 
	else {
		callback();
	}
};
setTimeout(reentrant, 100);
}

// for files, read the text content into the textarea
function loadFileEntry(_chosenEntry) {
	chosenEntry = _chosenEntry;

	chosenEntry.file(function(file) {
		readAsText(chosenEntry, function(result) {
			editor.doc.setValue(result);
		});

		$(chooseFileButton).removeAttr('disabled')
		.html('<span class="flaticon-usb-on"></span>');
	});
}

function loadInitialFile(launchData) {
	if (launchData && launchData.items && launchData.items[0]) {
		loadFileEntry(launchData.items[0].entry);
	} 
	else {
		// see if the app retained access to an earlier file or directory
		chrome.storage.local.get('chosenFile', function(items) {
			console.log(items);
			if (items.chosenFile) {
				// if an entry was retained earlier, see if it can be restored
				chrome.fileSystem.isRestorable(items.chosenFile, function(bIsRestorable) {
					// the entry is still there, load the content
					console.info("Restoring " + items.chosenFile);
					chrome.fileSystem.restoreEntry(items.chosenFile, function(chosenEntry) {
						if (chosenEntry) {
							chosenEntry.isFile ? loadFileEntry(chosenEntry) : loadDirEntry(chosenEntry);
						}
					});
				});
			}
		});
	}
}