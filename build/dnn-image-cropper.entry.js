import { r as registerInstance, e as createEvent, h, f as Host } from './index-28b3c571.js';

const dnnImageCropperCss = ":host{display:block}canvas{display:none}.view{visibility:hidden;opacity:0;height:0;overflow:hidden;transition:all 300ms ease-in-out}.view.visible{visibility:visible;opacity:1;height:initial;overflow:visible}.view .cropper{position:relative;width:100%}.view .cropper img{width:100%;display:block;margin:0 auto}.view .cropper .backdrop{backdrop-filter:saturate(0.5);backdrop-filter:brightness(0.5);position:absolute;left:0;top:0;width:100%;height:100%}.view .cropper .crop{position:absolute;top:0;left:0;width:100%;height:100%;outline:2px dashed white;box-shadow:black 0 0 0px 2px;backdrop-filter:saturate(2);backdrop-filter:brightness(2);cursor:move}.view .cropper .crop>div{width:20px;height:20px;background-color:white;border:2px solid rgba(0, 0, 0, 0.5);position:absolute}.view .cropper .crop>div.nw,.view .cropper .crop>div.ne{top:-17px}.view .cropper .crop>div.ne,.view .cropper .crop>div.se{right:-17px}.view .cropper .crop>div.se,.view .cropper .crop>div.sw{bottom:-17px}.view .cropper .crop>div.sw,.view .cropper .crop>div.nw{left:-17px}.view .cropper .crop>div.nw,.view .cropper .crop>div.se{cursor:nwse-resize}.view .cropper .crop>div.ne,.view .cropper .crop>div.sw{cursor:nesw-resize}";

let DnnImageCropper = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.imageCropChanged = createEvent(this, "imageCropChanged", 7);
    /** Sets the desired final image width. */
    this.width = 600;
    /** Sets the desired final image height. */
    this.height = 600;
    /** Can be used to customize controls text. */
    this.resx = {
      capture: "Capture",
      dragAndDropFile: "Drag and drop an image",
      or: "or",
      takePicture: "Take a picture",
      uploadFile: "Upload an image",
    };
    /** Sets the output quality of the corpped image (number between 0 and 1). */
    this.quality = 0.8;
    this.handleCropMouseDown = (event) => {
      event.stopPropagation();
      event.preventDefault();
      const element = event.target;
      const className = element.classList[0];
      document.addEventListener("mouseup", this.handleImageCropFinished, false);
      document.addEventListener("touchend", this.handleImageCropFinished, false);
      switch (className) {
        case "crop":
          document.addEventListener("mousemove", this.handleCropDrag, false);
          document.addEventListener("touchmove", this.handleCropDrag, false);
          document.addEventListener("mouseup", () => document.removeEventListener("mousemove", this.handleCropDrag));
          document.addEventListener("touchend", () => document.removeEventListener("touchmove", this.handleCropDrag));
          break;
        case "nw":
          document.addEventListener("mousemove", this.handleNwMouseMove, false);
          document.addEventListener("touchmove", this.handleNwMouseMove, false);
          document.addEventListener("mouseup", () => document.removeEventListener("mousemove", this.handleNwMouseMove));
          document.addEventListener("touchend", () => document.removeEventListener("touchmove", this.handleNwMouseMove));
          break;
        case "ne":
          document.addEventListener("mousemove", this.handleNeMouseMove, false);
          document.addEventListener("touchmove", this.handleNeMouseMove, false);
          document.addEventListener("mouseup", () => document.removeEventListener("mousemove", this.handleNeMouseMove));
          document.addEventListener("touchend", () => document.removeEventListener("touchmove", this.handleNeMouseMove));
          break;
        case "se":
          document.addEventListener("mousemove", this.handleSeMouseMove, false);
          document.addEventListener("touchmove", this.handleSeMouseMove, false);
          document.addEventListener("mouseup", () => document.removeEventListener("mousemove", this.handleSeMouseMove));
          document.addEventListener("touchend", () => document.removeEventListener("touchmove", this.handleSeMouseMove));
          break;
        case "sw":
          document.addEventListener("mousemove", this.handleSwMouseMove, false);
          document.addEventListener("touchmove", this.handleSwMouseMove, false);
          document.addEventListener("mouseup", () => document.removeEventListener("mousemove", this.handleSwMouseMove));
          document.addEventListener("touchend", () => document.removeEventListener("touchmove", this.handleSwMouseMove));
          break;
        default:
          break;
      }
    };
    this.handleImageCropFinished = (_ev) => {
      this.emitImage();
      document.removeEventListener("mouseup", this.handleImageCropFinished);
      this.previousTouch = undefined;
    };
    this.handleNwMouseMove = (event) => {
      let left = 0;
      let top = 0;
      let newWidth = 0;
      let newHeight = 0;
      let orientation = "horizontal";
      const wantedRatio = this.width / this.height;
      const cropRect = this.crop.getBoundingClientRect();
      const imageRect = this.image.getBoundingClientRect();
      let { movementX, movementY } = this.getMouvementFromEvent(event);
      if (Math.abs(movementX) < Math.abs(movementY)) {
        orientation = "vertical";
      }
      if (orientation == "horizontal") {
        newWidth = cropRect.width - movementX;
        newHeight = newWidth / wantedRatio;
      }
      else {
        newHeight = cropRect.height - movementY;
        newWidth = newHeight * wantedRatio;
      }
      const leftOffset = cropRect.width - newWidth;
      left = this.crop.offsetLeft + leftOffset;
      const topOffset = cropRect.height - newHeight;
      top = this.crop.offsetTop + topOffset;
      if (left < 0)
        left = 0;
      if (left > imageRect.width)
        left = imageRect.width;
      if (top < 0)
        top = 0;
      if (top > imageRect.height)
        top = imageRect.height;
      if (left + newWidth > imageRect.width)
        newWidth = imageRect.width - left;
      if (top + newHeight > imageRect.height)
        newHeight = imageRect.height - top;
      this.crop.style.left = left + "px";
      this.crop.style.top = top + "px";
      this.crop.style.width = newWidth + "px";
      this.crop.style.height = newHeight + "px";
    };
    this.handleNeMouseMove = (event) => {
      let left = 0;
      let top = 0;
      let newWidth = 0;
      let newHeight = 0;
      let orientation = "horizontal";
      const wantedRatio = this.width / this.height;
      const cropRect = this.crop.getBoundingClientRect();
      const imageRect = this.image.getBoundingClientRect();
      let { movementX, movementY } = this.getMouvementFromEvent(event);
      if (Math.abs(movementX) < Math.abs(movementY)) {
        orientation = "vertical";
      }
      if (orientation == "horizontal") {
        newWidth = cropRect.width + movementX;
        newHeight = newWidth / wantedRatio;
      }
      else {
        newHeight = cropRect.height - movementY;
        newWidth = newHeight * wantedRatio;
      }
      const topOffset = cropRect.height - newHeight;
      top = this.crop.offsetTop + topOffset;
      if (top < 0)
        top = 0;
      if (top > imageRect.height)
        top = imageRect.height;
      if (left + newWidth > imageRect.width)
        newWidth = imageRect.width - left;
      if (top + newHeight > imageRect.height)
        newHeight = imageRect.height - top;
      this.crop.style.top = top + "px";
      this.crop.style.width = newWidth + "px";
      this.crop.style.height = newHeight + "px";
    };
    this.handleSeMouseMove = (event) => {
      let left = this.crop.offsetLeft;
      let top = this.crop.offsetTop;
      let newWidth = 0;
      let newHeight = 0;
      let orientation = "horizontal";
      const wantedRatio = this.width / this.height;
      const cropRect = this.crop.getBoundingClientRect();
      const imageRect = this.image.getBoundingClientRect();
      let { movementX, movementY } = this.getMouvementFromEvent(event);
      if (Math.abs(movementX) < Math.abs(movementY)) {
        orientation = "vertical";
      }
      if (orientation == "horizontal") {
        newWidth = cropRect.width + movementX;
        newHeight = newWidth / wantedRatio;
      }
      else {
        newHeight = cropRect.height + movementY;
        newWidth = newHeight * wantedRatio;
      }
      if (top < 0)
        top = 0;
      if (top > imageRect.height)
        top = imageRect.height;
      if (left + newWidth > imageRect.width)
        newWidth = imageRect.width - left;
      if (top + newHeight > imageRect.height)
        newHeight = imageRect.height - top;
      this.crop.style.top = top + "px";
      this.crop.style.width = newWidth + "px";
      this.crop.style.height = newHeight + "px";
    };
    this.handleSwMouseMove = (event) => {
      let left = 0;
      let top = this.crop.offsetTop;
      let newWidth = 0;
      let newHeight = 0;
      let orientation = "horizontal";
      const wantedRatio = this.width / this.height;
      const cropRect = this.crop.getBoundingClientRect();
      const imageRect = this.image.getBoundingClientRect();
      let { movementX, movementY } = this.getMouvementFromEvent(event);
      if (Math.abs(movementX) < Math.abs(movementY)) {
        orientation = "vertical";
      }
      if (orientation == "horizontal") {
        newWidth = cropRect.width - movementX;
        newHeight = newWidth / wantedRatio;
      }
      else {
        newHeight = cropRect.height + movementY;
        newWidth = newHeight * wantedRatio;
      }
      const leftOffset = cropRect.width - newWidth;
      left = this.crop.offsetLeft + leftOffset;
      if (left < 0)
        left = 0;
      if (left > imageRect.width)
        left = imageRect.width;
      if (top < 0)
        top = 0;
      if (top > imageRect.height)
        top = imageRect.height;
      if (left + newWidth > imageRect.width)
        newWidth = imageRect.width - left;
      if (top + newHeight > imageRect.height)
        newHeight = imageRect.height - top;
      this.crop.style.left = left + "px";
      this.crop.style.top = top + "px";
      this.crop.style.width = newWidth + "px";
      this.crop.style.height = newHeight + "px";
    };
    this.handleCropDrag = (ev) => {
      let movementX = 0;
      let movementY = 0;
      if (ev instanceof MouseEvent) {
        movementX = ev.movementX;
        movementY = ev.movementY;
      }
      if (ev instanceof TouchEvent) {
        const touch = ev.touches[0];
        if (this.previousTouch != undefined) {
          movementX = touch.pageX - this.previousTouch.pageX;
          movementY = touch.pageY - this.previousTouch.pageY;
        }
        this.previousTouch = touch;
      }
      let newLeft = this.crop.offsetLeft + movementX;
      let newTop = this.crop.offsetTop + movementY;
      var imageRect = this.image.getBoundingClientRect();
      var cropRect = this.crop.getBoundingClientRect();
      if (newLeft < 0) {
        newLeft = 0;
      }
      if (newTop < 0) {
        newTop = 0;
      }
      if (newLeft + cropRect.width > imageRect.width) {
        newLeft = this.crop.offsetLeft;
      }
      if (newTop + cropRect.height > imageRect.height) {
        newTop = this.crop.offsetTop;
      }
      this.crop.style.left = newLeft + "px";
      this.crop.style.top = newTop + "px";
    };
  }
  componentDidLoad() {
    this.setView("noPictureView");
  }
  setView(newView) {
    const views = this.host.shadowRoot.querySelectorAll(".view");
    views.forEach(v => v.classList.remove("visible"));
    switch (newView) {
      case "noPictureView":
        this.noPictureView.classList.add("visible");
        break;
      case "hasPictureView":
        this.hasPictureView.classList.add("visible");
        break;
      default:
        break;
    }
    this.view = newView;
  }
  initCrop() {
    var wantedRatio = this.width / this.height;
    var imageRect = this.image.getBoundingClientRect();
    var imageRatio = imageRect.width / imageRect.height;
    if (wantedRatio > imageRatio) {
      var wantedHeight = imageRect.width / wantedRatio;
      var diff = imageRect.height - wantedHeight;
      this.crop.style.top = Math.round(diff / 2).toString() + "px";
      this.crop.style.height = Math.round(wantedHeight).toString() + "px";
    }
    else {
      var wantedWidth = imageRect.height * wantedRatio;
      var diff = imageRect.width - wantedWidth;
      this.crop.style.left = Math.round(diff / 2).toString() + "px";
      this.crop.style.width = Math.round(wantedWidth).toString() + "px";
    }
  }
  setImage() {
    this.image.src = this.canvas.toDataURL();
    window.requestAnimationFrame(() => {
      this.initCrop();
      this.emitImage();
    });
  }
  handleNewFile(file) {
    if (file.type.split('/')[0] != "image") {
      return;
    }
    var reader = new FileReader();
    reader.onload = readerLoadEvent => {
      var img = new Image();
      img.onload = () => {
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        var ctx = this.canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        this.setView("hasPictureView");
        this.setImage();
      };
      img.src = readerLoadEvent.target.result.toString();
    };
    reader.readAsDataURL(file);
  }
  emitImage() {
    var x = this.crop.offsetLeft / this.image.width * this.image.naturalWidth;
    var y = this.crop.offsetTop / this.image.height * this.image.naturalHeight;
    var cropRect = this.crop.getBoundingClientRect();
    var width = cropRect.width / this.image.width * this.image.naturalWidth;
    var height = cropRect.height / this.image.height * this.image.naturalHeight;
    if (x < 0)
      x = 0;
    if (x > this.image.naturalWidth)
      x = this.image.naturalWidth;
    if (y < 0)
      y = 0;
    if (y > this.image.naturalWidth)
      y = this.image.naturalWidth;
    if (width > this.image.naturalWidth)
      width = this.image.naturalWidth;
    if (height > this.image.naturalHeight)
      height = this.image.naturalHeight;
    var dataUrl = this.generateCroppedImage(x, y, width, height, this.width, this.height);
    this.imageCropChanged.emit(dataUrl);
  }
  generateCroppedImage(x, y, width, height, desiredWidth, desiredHeight) {
    this.canvas.width = desiredWidth;
    this.canvas.height = desiredHeight;
    const context = this.canvas.getContext("2d");
    context.clearRect(0, 0, desiredWidth, desiredHeight);
    context.drawImage(this.image, x, y, width, height, 0, 0, desiredWidth, desiredHeight);
    return this.canvas.toDataURL("image/jpeg", this.quality);
  }
  getMouvementFromEvent(event) {
    let movementX = 0;
    let movementY = 0;
    if (event instanceof MouseEvent) {
      movementX = event.movementX;
      movementY = event.movementY;
    }
    if (typeof TouchEvent !== "undefined") {
      if (event instanceof TouchEvent) {
        let touch = event.touches[0];
        if (this.previousTouch != undefined) {
          movementX = touch.pageX - this.previousTouch.pageX;
          movementY = touch.pageY - this.previousTouch.pageY;
        }
        this.previousTouch = touch;
      }
    }
    return { movementX, movementY };
  }
  render() {
    return (h(Host, { ref: el => this.host = el }, h("canvas", { ref: el => this.canvas = el }), h("div", { class: "view", ref: el => this.hasPictureView = el }, h("div", { class: "cropper" }, h("img", { ref: el => this.image = el }), h("div", { class: "backdrop" }), h("div", { class: "crop", ref: e => this.crop = e, onMouseDown: this.handleCropMouseDown, onTouchStart: this.handleCropMouseDown }, h("div", { class: "nw" }), h("div", { class: "ne" }), h("div", { class: "se" }), h("div", { class: "sw" })))), h("div", { class: "view", ref: el => this.noPictureView = el }, h("dnn-dropzone", { allowCameraMode: true, onFilesSelected: e => this.handleNewFile(e.detail[0]), resx: {
        capture: this.resx.capture,
        dragAndDropFile: this.resx.dragAndDropFile,
        or: this.resx.or,
        takePicture: this.resx.takePicture,
        uploadFile: this.resx.uploadFile,
      } }))));
  }
};
DnnImageCropper.style = dnnImageCropperCss;

export { DnnImageCropper as dnn_image_cropper };

//# sourceMappingURL=dnn-image-cropper.entry.js.map