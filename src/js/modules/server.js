import { createServer } from "http";
import url from "url";
import querystring from "querystring";
import { Server } from "node-static";
var file = new Server(".", {
	cache: 0,
});

function accept(req, res) {
	if (req.url == "/json/server-ok.json") {

			file.serve(req, res);

	} else {
		file.serve(req, res);
	}
}

// ------ запустить сервер -------

if (!module.parent) {
	createServer(accept).listen(8080);
} else {
	exports.accept = accept;
}
