$(document).ready(function () {
  let optionsButtons = $(".option-button");
  let advancedOptionButton = $(".adv-option-button");
  let fontName = $("#fontName");
  let fontSizeRef = $("#fontSize");
  let writingArea = $("#text-input");
  let linkButton = $("#createLink");
  let alignButtons = $(".align");
  let spacingButtons = $(".spacing");
  let formatButtons = $(".format");
  let scriptButtons = $(".script");

  let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "cursive",
  ];

  const initializer = () => {
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    fontList.map((value) => {
      let option = $("<option></option>").val(value).html(value);
      fontName.append(option);
    });

    for (let i = 1; i <= 7; i++) {
      let option = $("<option></option>").val(i).html(i);
      fontSizeRef.append(option);
    }

    fontSizeRef.val(3);
  };

  const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
  };

  optionsButtons.on("click", function () {
    modifyText($(this).attr("id"), false, null);
  });

  advancedOptionButton.on("change", function () {
    modifyText($(this).attr("id"), false, $(this).val());
  });

  linkButton.on("click", function () {
    let userLink = prompt("Enter a URL");
    if (/http/i.test(userLink)) {
      modifyText(linkButton.attr("id"), false, userLink);
    } else {
      userLink = "http://" + userLink;
      modifyText(linkButton.attr("id"), false, userLink);
    }
  });

  const highlighter = (className, needsRemoval) => {
    className.on("click", function () {
      if (needsRemoval) {
        let alreadyActive = false;

        if ($(this).hasClass("active")) {
          alreadyActive = true;
        }

        highlighterRemover(className);
        if (!alreadyActive) {
          $(this).addClass("active");
        }
      } else {
        $(this).toggleClass("active");
      }
    });
  };

  const highlighterRemover = (className) => {
    className.removeClass("active");
  };

  window.onload = initializer();
});
