const geograph = {
  Barishal: [
    "Barguna",
    "Barisal",
    "Bhola",
    "Jhalokati",
    "Patuakhali",
    "Pirojpur"
  ],
  Chittagong: [
    "Bandarban",
    "Brahmanbaria",
    "Chandpur",
    "Chittagong",
    "Comilla",
    "Cox's Bazar",
    "Feni",
    "Khagrachari",
    "Lakshmipur",
    "Noakhali",
    "Rangamati"
  ],
  Dhaka: [
    "Dhaka",
    "Faridpur",
    "Gazipur",
    "Gopalganj",
    "Kishoreganj",
    "Madaripur",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Rajbari",
    "Shariatpur",
    "Tangail"
  ],
  Khulna: [
    "Bagerhat",
    "Chuadanga",
    "Jessore",
    "Jhenaidah",
    "Khulna",
    "Kushtia",
    "Magura",
    "Meherpur",
    "Narail",
    "Satkhira"
  ],
  Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
  Rajshahi: [
    "Bogra",
    "Jaipurhat",
    "Naogaon",
    "Natore",
    "Nawabganj",
    "Pabna",
    "Rajshahi",
    "Sirajganj"
  ],
  Rangpur: [
    "Dinajpur",
    "Gaibandha",
    "Kurigram",
    "Lalmonirhat",
    "Nilphamari",
    "Panchagarh",
    "Rangpur",
    "Thakurgaon"
  ],
  Sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"]
};

let divisionSelect = document.getElementById("divisionSelect");
let districtSelect = document.getElementById("districtSelect");
divisionSelect.addEventListener("change", function () {
  districtSelect.options.length = 0;
  districtSelect.options[0] = new Option("Select one", "", true);
  let selectedDivision =
    divisionSelect.options[divisionSelect.selectedIndex].value;
  geograph[selectedDivision].forEach((districtName) => {
    districtSelect.options[districtSelect.options.length] = new Option(
      districtName,
      districtName
    );
  });
});


const allRegex = {
  fullNameRegex: /^[a-zA-Z\s]+$/,
  emailRegex: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  phoneNumberRegex: /^(?:\d{2}-\d{3}-\d{3}-\d{3}|\d{11})$/,

  streetAddressRegex: /^[a-zA-Z\s]*$/,
  divisionRegex: /^(?!\s*$).+/,
  districtRegex: /^(?!\s*$).+/,
  postcodeRegex: /^[0-9]{4}$/,

  skillRegex: /(\w+)(,\s*\w+){1,}/,
  languageRegex: /(\w+)(,\s*\w+){1,}/, 
  githubProfileLinkRegex: /^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9\-]{1,})+\/?$/i,
  portfolioUrlRegex: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,

  careerObjectiveRegex: /^(\w+\s?){10,}/g,
  experienceRegex: /^(\w+\s?){20,}/g,

  passwordRegex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/


}

let handleError = (errClassName, displayState) => {
  document.getElementsByClassName(errClassName)[0].style.display = displayState;
}

let validate = (regex, inputName)=> (
  new Promise((resolve, reject) => {
    const inputValue = document.getElementsByName(inputName)[0].value;
    if(regex.test(inputValue)){
      handleError(inputName+"_err", "none");
      resolve();
    }else{
      handleError(inputName+"_err", "block");
      reject("Invalid form input");
    }
  })
)


let jump = (step) => {
  let steps = document.getElementsByClassName("step");
  for (let i = 0; i < steps.length; i++) {
    steps[i].style.display = "none";
  }
  document.getElementById(step).style.display = "block";
}

let handlePrevButtonClick = (step) => jump(step);

let handleNextButtonClick = (step) => {
  switch(step){
    case "step2":
      let testFullName = validate(allRegex.fullNameRegex, "full_name");
      let testEmail = validate(allRegex.emailRegex, "email");
      let testPhoneNumber = validate(allRegex.phoneNumberRegex, "phone_number");

      Promise.all([testFullName, testEmail, testPhoneNumber]).then(()=>{
        jump("step2")
      }).catch((err)=>console.log(err))
      break;


    case "step3":
      let testStreetAddress = validate(allRegex.streetAddressRegex, "street_address");
      let testDivision = validate(allRegex.divisionRegex, "division");
      let tesDistrict = validate(allRegex.districtRegex, "district");
      let tesPostcode = validate(allRegex.postcodeRegex, "post_code");

      Promise.all([testStreetAddress, testDivision, tesDistrict, tesPostcode]).then(()=>{
        jump("step3")
      }).catch((err)=>console.log(err))
      break;

    case "step4":
      let testSkills = validate(allRegex.skillRegex, "skills");
      let testLanguage = validate(allRegex.languageRegex, "language");
      let testGithubProfileLink = validate(allRegex.githubProfileLinkRegex, "github_profile_link");
      let testPortfolioUrl = validate(allRegex.portfolioUrlRegex, "portfolio_url");

      Promise.all([testSkills, testLanguage, testGithubProfileLink, testPortfolioUrl]).then(()=>{
        jump("step4")
      }).catch((err)=>console.log(err))
      break;

    case "step5":
      let testCareerObjective = validate(allRegex.careerObjectiveRegex, "career_objective");
      let testExperience = validate(allRegex.experienceRegex, "experience");

      Promise.all([testCareerObjective, testExperience]).then(()=>{
        jump("step5")
      }).catch((err)=>console.log(err))
      break;
    default: console.log(step);
  }
}


let previewImage = (e) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(e.target.files[0]);
  fileReader.onload = (e) => {
    document.getElementsByClassName("profileImage")[0].src = e.target.result
  }
}

let submitForm = () => {
  let testPassword = validate(allRegex.passwordRegex, "password");
  let testPasswordMatch = () => (
    new Promise((resolve, reject)=> {
      const password = document.getElementsByName("password")[0].value;
      const confirmPassword = document.getElementsByName("confirm_password")[0].value;
      if(password == confirmPassword){
        handleError("confirm_password_err", "none");
        resolve();
      }else{
        handleError("confirm_password_err", "block");
        reject();
      }
    })
  )

  Promise.all([testPassword, testPasswordMatch()]).then(()=>{
    alert("Success 🎉🎉🎉 All form inputs matched the reuirments")
  }).catch((err)=>console.log(err))
}