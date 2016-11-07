module.exports[404] = (req: any, res: any) => {
  const viewFilePath = '404'
  const statusCode = 404
  const result = {
    status: statusCode
  }

  res.status(result.status)
  res.render(viewFilePath, {}, function(err: any, html: any) {
    if (err) {
      return res.status(result.status).json(result)
    }

    res.send(html)
  })
}
