let siteName = document.querySelector("#siteName");
let siteURL = document.querySelector("#siteURL");
let tableBody = document.getElementById("tableBody");
let submitBtn = document.getElementById("submitBtn");
let siteAlert = document.querySelector("#siteAlert");

let sitesArr = [];

if(JSON.parse(localStorage.getItem("sitesArr")) != null){
	sitesArr = JSON.parse(localStorage.getItem("sitesArr"));
	desplay();
}

submitBtn.addEventListener("click", function() {
	addWebsite();
})

function addWebsite(){
	if (isSiteValid()) {
		let sites = {
		sitesName : siteName.value,
		sitesURL : siteURL.value,
		}
		sitesArr.push(sites);
		onDataChange();
		clearInputs();
		removStyleValidationAfterSubmet();
	}else{
		addAlert();
	}
}

function desplay(){
	tymp = ``;
	for (let i = 0; i < sitesArr.length; i++) {
		tymp += `
		<tr>
			<td>${i+1}</td>
			<td>${sitesArr[i].sitesName}</td>
			<td>
			  <a href="https://${sitesArr[i].sitesURL}" target="_blank" type="button" class="btn btn-success"><i class="fa-solid fa-eye me-1"></i>Success</a>
			</td>
			<td>
				<button type="button" onclick="deleteWebsite(${i})"  class="btn btn-danger"><i class="fa-solid fa-trash-can me-1"></i>Delete</button>
			</td>
	  </tr>
		`
	}
	tableBody.innerHTML = tymp;
}

function deleteWebsite(i) {
	sitesArr.splice(i, 1);
	onDataChange();
}

function clearInputs(){
	siteName.value = "";
	siteURL.value = "";
}

function onDataChange(){
	localStorage.setItem("sitesArr", JSON.stringify(sitesArr));
	desplay()
}

function isSiteValid() {
	return (/^\w{3,}?/.test(siteName.value) && 
	/^(https?\:\/\/www\.)?(www.)?\w+(\.\w+)*(\.\w{2,4})\/?$/i.test(siteURL.value));
}
// Add The style valid or invalid in input site Name.
siteName.addEventListener("keyup", function (e) {
	if(/^\w{3,}?/.test(siteName.value)){
		siteName.classList.add("is-valid");
		siteName.classList.remove("is-invalid");
	}else{
		siteName.classList.add("is-invalid");
		siteName.classList.remove("is-valid");
	}
})
// Add The style valid or invalid in input site URL.
siteURL.addEventListener("keyup", function (e) {
	if(/^(https?\:\/\/www\.)?(www.)?\w+(\.\w+)*(\.\w{2,4})\/?$/i.test(siteURL.value)){
		siteURL.classList.add("is-valid");
		siteURL.classList.remove("is-invalid");
	}else{
		siteURL.classList.add("is-invalid");
		siteURL.classList.remove("is-valid");
	}
})

function removStyleValidationAfterSubmet() {
	siteName.classList.remove("is-invalid");
	siteName.classList.remove("is-valid");	
	siteURL.classList.remove("is-invalid");
	siteURL.classList.remove("is-valid");	
}

function addAlert(){
	siteAlert.classList.remove("d-none");
}
// Remove Alert Whent click on The icon x-mark.
document.querySelector("#exit").addEventListener("click", function () {
	siteAlert.classList.add("d-none");
})






