function errorHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {
    const customErrors = {}

    for (const key in err.errors) {
      customErrors[key] = err.errors[key].message
    }

    return res.status(422).json({ message: 'Unprocessable Entity', errors: customErrors })
  }

  if (err.message === 'Not Found') {
    return res.status(404).json({ message: 'Not Found' })
  }

  res.status(500).json({ message: 'Internal Server Error' })
  next(err)
}

module.exports = errorHandler