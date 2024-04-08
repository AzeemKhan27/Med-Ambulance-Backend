let Response = (status,type,data = []) => {
	let resObj = {};
	try {
		resObj["status"] = status;
		resObj["type"] = type;
		resObj["data"] = data;
		resObj["timestamp"] = new Date().getTime();

	} catch (e) {
		console.log(e);
	}
	return resObj;
}

module.exports = { Response }