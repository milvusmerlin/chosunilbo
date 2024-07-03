(function () {

  /**
   * @function setInfobarPosition
   * @param {Object} context
   * @description Set the position of the infobar via class assignments, based on content zone selected.
   */
  function setInfobarPosition(context) {
    if (context.infobarClass === "evg-infobar-top") {
      SalesforceInteractions.cashDom("body").css({ "margin-bottom": "0", "margin-top": "2.5rem" });
    } else {
      SalesforceInteractions.cashDom("body").css({ "margin-bottom": "2.5rem", "margin-top": "0" });
    }
  }

  /**
   * @function setDismissal
   * @param {Object} context
   * @description Add click listener to the "X" button that removes the template from the DOM.
   */
  function setDismissal(context) {
    SalesforceInteractions.cashDom(`#evg-edu-sample.${context.infobarClass} .evg-btn-dismissal`).on("click", () => {
      SalesforceInteractions.cashDom(`#evg-edu-sample.${context.infobarClass}`).remove();
      SalesforceInteractions.cashDom("body").css({ "margin-top": "0", "margin-bottom": "0" });
    });
  }

  function apply(context, template) {

    console.log("테스트 최상단");


    if (!context.contentZone) return;


    context.infobarClass = context.contentZone == "global_infobar_top_of_page"
      ? "evg-infobar-top"
      : "evg-infobar-bottom";

    // if (SalesforceInteractions.cashDom(`#evg-edu-sample.${context.infobarClass}`).length > 0) return;

    setInfobarPosition(context);
    const html = template(context);
    let htmlArr = html.split("</br>");
    console.log(htmlArr);
    const windowInner = window.innerWidth;
    let device = "";
    if (windowInner >= 1024) {
      device = "PC"
    } else if (windowInner >= 740 && windowInner < 1024) {
      device = "tablet"
    } else if (windowInner < 739) {
      device = "mobile"
    }
    if (device === "PC") {
      setTimeout(() => {
        SalesforceInteractions.cashDom(".layout-main > .grid__container > section > article > div:nth-child(1)").html(htmlArr[0]);
      }, 1000);
    } else if (device === "tablet") {
      setTimeout(() => {
        console.log(htmlArr[1]);
        SalesforceInteractions.cashDom(".layout-main > .grid__container > section > article > div:nth-child(1)").html(htmlArr[1]);
      }, 1000);
    } else if (device === "mobile") {
      setTimeout(() => {

        SalesforceInteractions.cashDom(".layout-main > .grid__container > section > article > div:nth-child(1)").html(htmlArr[2]);
      }, 1000);

    }
    setDismissal(context);

    console.log("마지막단단");

  }

  function reset(context, template) {
    SalesforceInteractions.cashDom(`#evg-edu-sample.${context.infobarClass}`).remove();
    SalesforceInteractions.cashDom("body").css({ "margin-top": "0", "margin-bottom": "0" });
  }

  function control(context) {
    return new Promise(resolve => { if (context.contentZone) resolve(); });
  }

  registerTemplate({
    apply: apply,
    reset: reset,
    control: control
  });

})();
