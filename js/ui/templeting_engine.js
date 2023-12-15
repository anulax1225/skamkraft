export class UIRenderer {
  constructor(path) {
    this.templatePath = path;
  }
  render(template, tag = "#block-content") {
    this.get_template((reponse) => {
      $('body').html(reponse);
      this.get_template((reponse) => {
        $(tag).html(reponse);
      }, template)
    });
  }
  get_template(callback, template = "") {
    let url = template === "" ? `${this.templatePath}/template.html`: `${this.templatePath}/${template}`;
    let data = $.ajax(url,{
      async: false,
      method: "GET",
      success: callback,
      fail: (err) => {
        console.log(err);
      }
    });
  }
  add_event(tag, action, callback) {
    $("body").on(action, tag, callback);
  }
}
