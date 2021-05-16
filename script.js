

// created table to render the information dvided based on lang into english & tamil 
let renderTable = (language, details) => {
    let content = document.getElementById('content');
    let table = document.getElementById('data-table');
    if(details == null) {
        content.innerText = "Details not fetched";
        table.classList.add('hide');
    } else {
        let contentNum = document.getElementById('content-num');
        let contentSec = document.getElementById('content-sec');
        let contentChapGrp = document.getElementById('content-chapGrp');
        let contentChap = document.getElementById('content-chap');

        if(language === "english") {
            contentNum.innerText = details["number"];
            contentSec.innerText = details["sect_eng"];
            contentChapGrp.innerText = details["chapgrp_eng"];
            contentChap.innerText = details["chap_eng"];
            content.innerText = `${details["eng"]}
                                
                                ${details["eng_exp"]}`;
        } else {
            contentNum.innerText = details["number"];
            contentSec.innerText = details["sect_tam"];
            contentChapGrp.innerText = details["chapgrp_tam"];
            contentChap.innerText = details["chap_tam"];
            content.innerText = `${details["line1"]}
                                
                                ${details["line2"]}`;
        }
        table.classList.remove('hide');
    }
    document.getElementById('data').classList.add('show');
}
 // render the details of kural 
let renderKuralDetails = (details) => {
    
    let languages = document.getElementsByName('language');
    let language = "english";

    for(const node of languages) {
        if(node.checked) {
            language = node.value;
            break;
        }
    }

    renderTable(language, details);
    
    if(details) {
        console.log(details);

    } else {
        console.log("details not fetched");
    }
}

// fetch the kural detail based on kural number 1 to 1330

let validate = (num) => {
    let error = document.getElementById('error');
    if(!num) {
        error.innerText = "* Number is mandatory";
        error.classList.add('show');
        document.getElementById('data').classList.remove('show');
        return false;
    } else if(num < 1 || num > 1330) {
        error.innerText = "* Number should be between (1 - 1330)";
        error.classList.add('show');
        document.getElementById('data').classList.remove('show');
        return false;
    } else {
        error.classList.remove('show');
    }
    return true;
}

// api fetch using async function
let getKural = async () => {
    event.stopPropagation();
    let details = null;
    let num = document.getElementById('kural-no').value;

    if(validate(num)) {
        try {
            let response = await fetch(`https://api-thirukkural.vercel.app/api?num=${num}`);
            details = await response.json();
        } catch(e) {
            console.log(e);
        }
        renderKuralDetails(details);
    }
}



document.getElementById('submit-btn').addEventListener('click', getKural, false);