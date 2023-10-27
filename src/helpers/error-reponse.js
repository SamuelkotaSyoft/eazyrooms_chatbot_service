function Response400(res, message = "Invalid data sent", data = [], funName = "NA", error = "NA") {
    return res.status(400).json({
        status: 400,
        message: message,
        data: data
    })
}

function Response404(res, message = "No data Found", data = [], funName = "NA", error = "NA") {
    return res.status(404).json({
        status: 404,
        message: message,
        data: data
    })
}

function Response500(res, message = "Internal server error, try again after some time.", data = [], funName = "NA", error = "NA") {
    return res.status(500).json({
        status: 500,
        message: message,
        data: data
    })
}

export { Response400, Response404, Response500 };