import axios from "axios";

export default {
  uploadImages: imagesArray => {
    const data = new FormData();
    imagesArray.map(image => {
      data.append("imagenes", image);
    });
    return axios({
      method: "POST",
      url: "/api/upload",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("@imaz:usuario")}`,
        "X-CSRF-TOKEN": window.App.$store.state.users.csrf
      }
    }).then(response => response);
  },
  createCustomUploadAdapter: () => {
    class MyUploadAdapter {
      constructor(loader) {
        // CKEditor 5's FileLoader instance.
        this.loader = loader;

        // URL where to send files.
        this.url = "/api/upload";
      }

      // Starts the upload process.
      upload() {
        return new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject);
          this._sendRequest();
        });
      }

      // Aborts the upload process.
      abort() {
        if (this.xhr) {
          this.xhr.abort();
        }
      }

      // Example implementation using XMLHttpRequest.
      _initRequest() {
        const xhr = new XMLHttpRequest();
        this.xhr = xhr;
        xhr.open("POST", this.url, true);
        xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("@imaz:usuario")}`);
        xhr.setRequestHeader("X-CSRF-TOKEN", window.App.$store.state.users.csrf);
        xhr.responseType = "json";
      }

      // Initializes XMLHttpRequest listeners.
      _initListeners(resolve, reject) {
        const { xhr } = this;
        const { loader } = this;
        const genericErrorText = `Couldn't upload file: ${loader.file.name}.`;

        xhr.addEventListener("error", () => reject(genericErrorText));
        xhr.addEventListener("abort", () => reject());
        xhr.addEventListener("load", () => {
          const { response } = xhr;

          if (!response || response.error) {
            return reject(response && response.error ? response.error.message : genericErrorText);
          }

          // If the upload is successful, resolve the upload promise with an object containing
          // at least the "default" URL, pointing to the image on the server.
          resolve({
            default: response[Object.keys(response)[0]]
          });
          return true;
        });

        if (xhr.upload) {
          xhr.upload.addEventListener("progress", evt => {
            if (evt.lengthComputable) {
              loader.uploadTotal = evt.total;
              loader.uploaded = evt.loaded;
            }
          });
        }
      }

      // Prepares the data and sends the request.
      _sendRequest() {
        const data = new FormData();

        data.append("imagenes", this.loader.file);

        this.xhr.send(data);
      }
    }

    return MyUploadAdapter;
  }
};
