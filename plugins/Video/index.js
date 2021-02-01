import upload from './upload'
class SimpleVideo {
  static get toolbox () {
    return {
      title: 'video',
      icon:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="20px" height="20px"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
    }
  }

  static get pasteConfig () {
    return {
      tags: ['VIDEO'],
      files: {
        mimeTypes: ['video/*'],
        extensions: ['mp4'] // You can specify extensions instead of mime-types
      }
    }
  }

  constructor ({ data }) {
    this.name = 'noname'
    this.date = 'nodate'
    this.wrapper = undefined
    this.data = data
  }

  render () {
    this.wrapper = document.createElement('div')
    this.wrapper.classList.add('cx-video')
    if (this.data.file && this.data.file.url) {
      this._createVideo(this.data.file.url)
      return this.wrapper
    }
    console.log('render')
    this.input = document.createElement('input')
    this.input.type = 'file'
    this.input.setAttribute('id', 'fileSelector')
    this.input.onchange = (e) => this._preloading(e.target.files[0])
    this.wrapper.appendChild(this.input)

    return this.wrapper
  }

  appendCallback () {
    this.input.click()
  }

  async _preloading (file) {
    console.log(file)
    this.wrapper.innerHTML = ''

    const spinner = document.createElement('div')
    spinner.classList.add('spinner-border')
    spinner.classList.add('text-primary')
    this.wrapper.appendChild(spinner)

    const uploadedFile = await upload(file, 'videos')
    console.log('uploaded', uploadedFile)
    this.wrapper.innerHTML = ''
    this.data = uploadedFile
    this._createVideo(uploadedFile.file.url)

    // console.log(this.wrapper)
  }

  _createVideo (url) {
    const video = document.createElement('video')
    video.setAttribute('controls', true)
    video.setAttribute('controlsList', 'nodownload')
    video.setAttribute('disablePictureInPicture', true)

    const source = document.createElement('source')
    source.setAttribute('id', 'media')
    source.setAttribute('src', url)
    source.setAttribute('type', 'video/mp4')

    const notsupport = document.createElement('p')
    notsupport.textContent = 'This browser does not support the video element.'

    video.appendChild(source)
    video.appendChild(notsupport)

    this.wrapper.appendChild(video)
  }

  save (blockContent) {
    console.log('เซฟ', this.data)
    return this.data
  }

  // validate(savedData) {
  //   if (!savedData.file.url.trim()) {
  //     return false
  //   }

  //   return true
  // }

  onPaste (event) {
    console.log('onPaste')
    switch (event.type) {
      // ... case 'tag'
      case 'file':
        /* We need to read file here as base64 string */
        this.file = event.detail.file
        this._preloading(this.file)
        break
    }
  }
}

export default SimpleVideo
