const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const { getFiles } = require('./connect.googleapis')

const app = express()
const port = process.env.PORT || 9696
const origin =
  process.env.NODE_ENV === 'production'
    ? 'https://daiquynhfamily.herokuapp.com'
    : 'http://localhost:6969'
const outputPath = path.resolve(process.cwd(), 'frontend/build')

app.use(cors({ credentials: true, origin }))
app.use(compression())
app.use(cookieParser())

// Serve static files from the React frontend app
app.use(express.static(outputPath))

const handleClientCall = folderId => (req, res) => {
  const params = { folderId }
  const { nextPage } = req.query
  const { nextPageToken } = req.cookies
  if (nextPage && nextPageToken) params.pageToken = nextPageToken

  getFiles(params, (files, nextPageToken) => {
    const result = {}
    if (files.length > 0) result.files = files
    if (nextPageToken) {
      res.cookie('nextPageToken', nextPageToken)
      result.allowNextPage = true
    } else {
      result.allowNextPage = false
    }
    res.send(result)
  })
}

app.get('/api/trangchu', handleClientCall(''))
app.get('/api/chupghep', handleClientCall('115bhQufz4b3en8aBJSZ5fxaq82txF4cA'))
app.get('/api/chuphoian', handleClientCall('1FPEIclPpWlj6KeeOzy92vT5pfik49Mdr'))
app.get('/api/chupsanbay', handleClientCall('1aOfaRL5JCOgCcqteo_j8boKIrtDgQiZc'))
app.get('/api/chupbaida', handleClientCall('1ZhNYd6SpIBwpF8eIPUS22X-Z3sO_9bWH'))
app.get('/api/chupstudio', handleClientCall('1EyYjk11tAwVwaZhjH6z5xuMFHbFbvOts'))
app.get('/api/chupcuoile', handleClientCall('1X4vLvMCyXBM_iVQKOWg8m_y4JvwwPxB5'))
app.get('/api/chupcuoitiec', handleClientCall('1KU7pMSg8VnQdQ7bUw5MvEZwckoVIhyB-'))

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url += '.gz'
  res.set('Content-Encoding', 'gzip')
  res.set('Content-Type', 'text/javascript')
  next()
})

app.get('*.css', (req, res, next) => {
  req.url += '.gz'
  res.set('Content-Encoding', 'gzip')
  res.set('Content-Type', 'text/css')
  next()
})

// Handles any requests that don't match the ones above
app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')))

app.listen(port, () => console.log(`Server listening on port ${port}`))
