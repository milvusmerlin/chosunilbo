(function () {

  function apply(context, template) {
    console.log("testtttt");
    document.querySelector('.login-popup-layer').style.display = 'flex';
    // if(document.querySelectorAll(".paywall--bg").length === 0){
    //     document.body.innerHTML += "<div class='paywall--bg'></div>"
    // }
    // if(document.querySelector('.login-popup-layer').style.display = 'flex'){
    //     document.body.style.overflow = 'hidden';
    // } else {
    //     document.body.style.overflow = '';
    // }

  }


  function reset(context, template) {

    /** Remove the template from the DOM to reset the template. */
    Evergage.cashDom("#evg-new-template").remove();
  }

  function control(context) {

    const contentZoneSelector = Evergage.getContentZoneSelector(context.contentZone);
    return Evergage.DisplayUtils
      .pageElementLoaded(contentZoneSelector)
      .then((element) => {
        Evergage.cashDom(element).attr({
          "data-evg-campaign-id": context.campaign,
          "data-evg-experience-id": context.experience,
          "data-evg-user-group": context.userGroup
        });
      });
  }

  registerTemplate({
    apply: apply,
    reset: reset,
    control: control
  });

})();

