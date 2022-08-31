let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const saveBtn = document.getElementById("tab-btn")

const tabs = [
    { url: "https:://www.linkedin.com/in/per-harald-borgen/" }
]

//JSON.parse(localStorage.getItem("myLeads"))
let leadsFromLoacalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLoacalStorage) {
    myLeads = leadsFromLoacalStorage
    render(myLeads)
}


inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    //console.log(myLeads)
    render(myLeads)
    inputEl.value = ""
    console.log(localStorage.getItem("myLeads"))
})

saveBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)

        // let activeTab = tabs[0]
        // let activeTabId = activeTab.id // or do whatever you need

    });


})

deleteBtn.addEventListener("dblclick", function () {
    console.log("Btn clicked")
    localStorage.clear()
    myLeads = []
    render(myLeads)

})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        // const li = document.createElement("li")
        // li.innerText = myleads[i]
        // ulEl.append(li)
        // listItems += "<li>" + "<a target='blank' href='#'>" + myLeads[i] + "</a>" + "</li>"
        listItems +=
            ` <li>
               <a target='blank' href='${leads[i]}'> 
                ${leads[i]}
               </a>
              </li> `

        //ulEl.innerHTML += "<li>" + myLeads[i] + "<li> "
    }

    ulEl.innerHTML = listItems
}