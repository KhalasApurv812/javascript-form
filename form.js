let formData = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  contactNumber: "",
  gender: "",
  language: {},
  aboutProject: "",
};

const arr = [];
let str = "";
let str1 = "English";
let str2 = "Hindi";
let str3 = "Gujarati";
let displayData = JSON.parse(localStorage.getItem("saveData"));
data();
function submitdata() {
  const form = document.getElementById("Myform");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  formData = {
    firstName: document.forms["Myform"]["fname"].value,
    lastName: document.forms["Myform"]["lname"].value,
    emailAddress: document.forms["Myform"]["email"].value,
    contactNumber: document.forms["Myform"]["num"].value,
    gender: document.forms["Myform"]["gender"].value,
    language: {},
    aboutProject: document.forms["Myform"]["txt"].value,
  };

  let english = document.getElementById("english").checked;
  let hindi = document.getElementById("hindi").checked;
  let gujrati = document.getElementById("gujrati").checked;

  formData.language = { english, hindi, gujrati };

  if (formData == "") {
    if (validation()) {
      console.log("formData", formData);
      setAllDetails();
      clearForm();
      data();
    }
  } else {
    upDate();
    clearForm();
  }
}
function setAllDetails() {
  var saveData = [];
  saveData.push(formData);
  var finalArr =
    localStorage.getItem("saveData") != undefined
      ? [...saveData, ...JSON.parse(localStorage.getItem("saveData"))]
      : saveData;
  localStorage.setItem("saveData", JSON.stringify(finalArr));
}

function validation() {
  let validate;
  // email validation
  const validEmail = (email) => {
    return !email.match(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
    );
  };

  // number validation
  const validNumber = (num) => {
    return !num.match(
      /(\+91)?(-)?\s*?(91)?\s*?(\d{3})-?\s*?(\d{3})-?\s*?(\d{4})/
    );
  };
  if (formData.firstName === "" || formData.firstName.length < 3) {
    document.getElementById("no-valid-fname").style.display = "block";
    return false;
  } else {
    document.getElementById("no-valid-fname").style.display = "none";
    validate = true;
  }
  if (formData.lastName === "" || formData.lastName.length < 3) {
    document.getElementById("no-valid-lname").style.display = "block";
    return false;
  } else {
    document.getElementById("no-valid-lname").style.display = "none";
    validate = true;
  }
  if (validEmail(formData.emailAddress)) {
    document.getElementById("no-valid-email").style.display = "block";
    return false;
  } else {
    document.getElementById("no-valid-email").style.display = "none";
    validate = true;
  }
  if (
    validNumber(formData.contactNumber) ||
    formData.contactNumber.length > 10
  ) {
    document.getElementById("no-valid-num").style.display = "block";
    return false;
  } else {
    document.getElementById("no-valid-num").style.display = "none";
    validate = true;
  }
  let getSelectedValue = document.querySelector('input[name="gender"]:checked');
  if (getSelectedValue === null) {
    document.getElementById("no-valid-gender").style.display = "block";
    return false;
  } else {
    document.getElementById("no-valid-gender").style.display = "none";
    validate = true;
  }
  let Selectedlanguage = document.querySelector(
    'input[name="language"]:checked'
  );
  if (Selectedlanguage === null) {
    document.getElementById("no-valid-check").style.display = "block";
    return false;
  } else {
    document.getElementById("no-valid-check").style.display = "none";
    validate = true;
  }
  if (english == false && hindi == false && gujrati == false) {
    document.getElementById("no-valid-check").style.display = "block";
    return false;
  } else {
    document.getElementById("no-valid-check").style.display = "none";
    validate = true;
  }
  return validate;
}

function data() {
  let displayData = JSON.parse(localStorage.getItem("saveData"));
  console.log("_dp");
  if (displayData != null) {
    const cmp = displayData
      .map((elem, index) => {
        if (elem.language.english) {
          str = "".concat(str1);
        }
        if (elem.language.hindi) {
          str = "".concat(str2);
        }
        if (elem.language.gujrati) {
          str = "".concat(str3);
        }
        if (elem.language.english && elem.language.hindi) {
          str = "".concat(str1, " , ", str2);
        }
        if (elem.language.english && elem.language.gujrati) {
          str = "".concat(str1, " , ", str3);
        }
        if (elem.language.hindi && elem.language.gujrati) {
          str = "".concat(str2, " , ", str3);
        }
        if (
          elem.language.english &&
          elem.language.hindi &&
          elem.language.gujrati
        ) {
          str = "".concat(str1, " , ", str2, " , ", str3);
        }
        return `<div class="formdata" id="formdata" >
    <div class="full-detail">
      <div class="left-detail">
          <div class="detail">
            <div class="input-detail">
                <label class="label1">First Name : </label>
                </div>
                <p>${elem.firstName}</p>
          </div>
        <div class="detail">
            <div class="input-detail">
                <label class="label1">Last Name: </label>
            </div>
            <p>${elem.lastName}</p>
        </div>
        <div class="detail">
            <div class="input-detail">
                <label class="label1">Gender : </label>
            </div>
            <p>${elem.gender}</p>
        </div>
     </div>
     <div class="right-detail">
        <div class="detail">
            <div class="input-detail">
              <label class="label1">Email Address : </label>
            </div>
                <p>${elem.emailAddress}</p>
        </div>
        <div class="detail">
            <div class="input-detail">
                <label class="label1">Contact Number : </label>
            </div>
                <p>${elem.contactNumber}</p>
        </div>
        <div class="detail">
            <div class="input-detail">
                <label class="label1">Language : </label>
                </div>
                <p>${str}</p>
        </div>
    </div>
    <div class="btn">
    <button type="button" style="margin-bottom: 20px;" onclick="editData(${index})"> Edit </button>
    <button type="button" onclick="deleteData()"> Delete </button>
   </div>
   </div>
    ${
      elem.aboutProject === ""
        ? ""
        : `<div class="about">
      <label class="label1">About Project : </label>
      <div class=msg>${elem.aboutProject}</div>
    </div>`
    }
   </div>`;
      })
      .join("");

    document.getElementById("tst-right").innerHTML = cmp;
    document.getElementById("right-form").style.display = "block";
  } else {
    document.getElementById("right-form").style.display = "none";
  }
}

function clearForm() {
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("num").value = "";
  document.getElementsByName("gender").value = "";
  document.querySelector('input[name="language"]').value = [];
  document.getElementById("txt").value = "";
}

function editData(index) {
  console.log("edit", index);
  // let url = window.location.href;
  let newurl = `file:///home/react2/Public/apurv_work/training/final%20form/form.html?id=${
    index + 1
  }`;
  console.log(newurl);

  displayData = JSON.parse(localStorage.getItem("saveData"));
  document.getElementById("fname").value = displayData[index].firstName;
  document.getElementById("lname").value = displayData[index].lastName;
  document.getElementById("email").value = displayData[index].emailAddress;
  document.getElementById("num").value = displayData[index].contactNumber;

  if (displayData[index].gender === "Male") {
    document.getElementById("male").checked = true;
  } else if (displayData[index].gender === "Female") {
    document.getElementById("female").checked = true;
  }

  if (displayData[index].language.english) {
    document.getElementById("english").checked = true;
  }
  if (displayData[index].language.hindi) {
    document.getElementById("hindi").checked = true;
  }
  if (displayData[index].language.gujrati) {
    document.getElementById("gujrati").checked = true;
  }

  document.getElementById("txt").value = displayData[index].aboutProject;
  console.log(displayData[index]);
}

function upDate() {
  displayData = JSON.parse(localStorage.getItem("saveData"));

  displayData[index].firstName = document.getElementById("fname").value;
  displayData[index].lastName = document.getElementById("lname").value;
}
