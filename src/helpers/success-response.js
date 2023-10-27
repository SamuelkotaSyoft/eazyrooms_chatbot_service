function Response200(res, message = "ok", data = [], funName = "NA") {
    return res.status(200).json({
        status: 200,
        message: message,
        data: data
    })
}

function Response201(res, message = "created", data = [], funName = "NA") {
    return res.status(201).json({
        status: 201,
        message: message,
        data: data
    })
}

export { Response201, Response200 };
