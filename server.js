var express = require('express')
var path = require('path')
const bodyParser = require('body-parser')
var serveStatic = require('serve-static')
var fs = require('fs')
var midi = require('jsmidgen')

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serveStatic(__dirname))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
    next()
})

app.get('/api/midi/:id', function (req, res) {
  let file = __dirname + '/files/' + req.params.id + '.mid'
  console.log(file)
  if (fs.existsSync(file)) {
    res.download(file)
  } else {
    res.status(404)
    res.json({ message: 'Midi file does not exist' })
  }
})

app.post('/api/midi', function (req, res) {
  const NOTE_ON = 0
  const NOTE_OFF = 1

  // beats per minute
  const BPM = 120
  // pulse per quarter note
  const PPQ = 128

  let ratio = 60000 / (BPM * PPQ)

  if (!req.body.data) {
    res.status(400)
    res.json({ message: 'Invalid Midi record format' })
  } else {
    let data = req.body.data
    let file = new midi.File()
    let track = new midi.Track()
    track.setTempo(BPM)
    file.addTrack(track)

    for (let i = 0; i < data.length; i++) {
      let note = data[i]
      switch (note.event) {
        case NOTE_ON:
          track.addNoteOn(0, note.pitch, note.elapsedTime / ratio)
          break
        case NOTE_OFF:
          track.addNoteOff(0, note.pitch, note.elapsedTime / ratio)
          break
      }
    }

    let dir = __dirname + '/files/'
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFileSync(dir + '0.mid', file.toBytes(), 'binary')

    res.json({ id: 0 })
  }
})

var port = process.env.PORT || 5000
app.listen(port, () => console.log('Server running on port ' + port + '...'))
