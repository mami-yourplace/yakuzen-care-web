const symptomList = document.getElementById("symptom-list");

//symptomList.textContent = symptoms[1].symptom; 1個だけ表示できるか試したコード

const group1 = document.createElement("div");
group1.className = "symptom-group"; 

const group2 = document.createElement("div");
group2.className = "symptom-group"; 

const group3 = document.createElement("div");
group3.className = "symptom-group";

const group4 = document.createElement("div");
group4.className = "symptom-group";

const group5 = document.createElement("div");
group5.className = "symptom-group";

symptomList.appendChild(group1);
symptomList.appendChild(group2);
symptomList.appendChild(group3);
symptomList.appendChild(group4);
symptomList.appendChild(group5);

for (const item of symptoms) {

    const symptomItem = document.createElement("div");
    symptomItem.className = "symptom-item";

    //console.log(item.symptom);

    //symptomList.innerHTML += item.symptom + "<br>";

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.value = item.symptom;

    const text = document.createTextNode(item.symptom);

    symptomItem.appendChild(checkbox);
    symptomItem.appendChild(text);

    //symptomList.appendChild(symptomItem);
    if (item.group === 1) {
        group1.appendChild(symptomItem);   
    } else if (item.group === 2) {
        group2.appendChild(symptomItem);
    } else if (item.group === 3) {
        group3.appendChild(symptomItem);
    } else if (item.group === 4) {
        group4.appendChild(symptomItem);
    } else if (item.group === 5) {
        group5.appendChild(symptomItem);
    }

}

const topScreen = document.getElementById("top-screen");

const checkButton = document.getElementById("check-button");
const checkScreen = document.getElementById("check-screen");

const checkBackButton = document.getElementById("check-back-button");

const seasonsButton = document.getElementById("seasons-button");
const seasonScreen = document.getElementById("season-screen");

const teaButton = document.getElementById("tea-button");

const seasonResult = document.getElementById("season-result");
const seasonButtons = document.querySelectorAll(".season-button");

const seasonBackButton = document.getElementById("season-back-button");

for (const button of seasonButtons) {
    button.addEventListener("click", function() {

        for (const seasonButton of seasonButtons) {
            seasonButton.classList.remove("selected");
        }
        button.classList.add("selected");

        const seasonName = button.textContent;
        const seasonData = seasons[seasonName];
        seasonResult.textContent = "";
        const seasonTitle = document.createElement("h3");
        seasonTitle.textContent = seasonData.title;
        seasonResult.appendChild(seasonTitle);

        const seasonDescription = document.createElement("p");
        seasonDescription.className = "season-description";
        seasonDescription.textContent = seasonData.description;
        seasonResult.appendChild(seasonDescription);

        for (const keyword of seasonData.keywords) {
            const keywordTitle = document.createElement("h3");
            keywordTitle.textContent = keyword.name;
            seasonResult.appendChild(keywordTitle);

            const keywordNote = document.createElement("p");
            keywordNote.textContent = keyword.note;
            seasonResult.appendChild(keywordNote);

            const foodList = document.createElement("div");
            foodList.className = "food-list";

            for (const food of keyword.foods) {
                const foodItem = document.createElement("span");
                foodItem.textContent = food;
                foodList.appendChild(foodItem);
            }

            seasonResult.appendChild(foodList);

        }

        const seasonTeaButton = document.createElement("button");
        seasonTeaButton.textContent = "東洋のお茶図鑑を見る 🍵 \n（別のアプリへ）";
        seasonTeaButton.className = "tea-link-button";
        seasonResult.appendChild(seasonTeaButton);

        seasonTeaButton.addEventListener("click", function() {
            window.location.href = "https://mami-yourplace.github.io/toyo-tea-web/";
        });

    });
}

seasonBackButton.addEventListener("click", function() {
    seasonResult.textContent = "";

    seasonScreen.style.display = "none";
    topScreen.style.display = "block";

});

teaButton.addEventListener("click", function() {
    window.location.href = "https://mami-yourplace.github.io/toyo-tea-web/.";

});

seasonsButton.addEventListener("click", function() {
    topScreen.style.display = "none";
    seasonScreen.style.display = "block";

});

checkButton.addEventListener("click", function() {
    topScreen.style.display = "none";
    checkScreen.style.display = "block";

});

checkBackButton.addEventListener("click", function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (const checkbox of checkboxes) {
        checkbox.checked = false;
    }

    resultScreen.textContent = "";

    checkScreen.style.display = "none";
    topScreen.style.display = "block";
});

const resultButton = document.getElementById("result-button");
const resultScreen = document.getElementById("result-screen");

resultButton.addEventListener("click", function() {

    resultScreen.textContent = "";

    const typeCounts = {
        気虚: 0,
        気滞: 0,
        血虚: 0,
        瘀血: 0,
        水滞: 0
    };

    const typeTotals = {
        気虚: 9,
        気滞: 10,
        血虚: 13,
        瘀血: 13,
        水滞: 15
    };

    const typeRates = {
        気虚: 0,
        気滞: 0,
        血虚: 0,
        瘀血: 0,
        水滞: 0
    };

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    for (const checbox of checkboxes) {

        if (checbox.checked === true) {

            const foundSymptom = symptoms.find(
                item => item.symptom === checbox.value
            );

            for (const type of foundSymptom.types) {
                typeCounts[type] = typeCounts[type] + 1;
            }
        }
    }

    console.log(typeCounts);

    for (const type in typeCounts) {
        typeRates[type] = typeCounts[type] / typeTotals[type];
    }

    console.log(typeRates);

    const sortedTypes = Object.entries(typeRates);
    sortedTypes.sort((a, b) => b[1] - a[1]);

    const filteredTypes = sortedTypes.filter(item => item[1] > 0);

    console.log(filteredTypes);

    if (filteredTypes.length === 0) {
        resultScreen.textContent = "気になるサインを1つ以上選んでください。";
        return;

    }

    const firstType = filteredTypes[0][0];
    const firstTypeData = typeData[firstType];

    const resultTitle = document.createElement("h2");
    resultTitle.textContent = "からだのサインから、今の自分を知ろう";
    resultScreen.appendChild(resultTitle);

    const typeTitle = document.createElement("h3");
    typeTitle.textContent = firstTypeData.title;
    resultScreen.appendChild(typeTitle);

    const typeDescripttion = document.createElement("p");
    typeDescripttion.className = "type-description";
    typeDescripttion.textContent = firstTypeData.description;
    resultScreen.appendChild(typeDescripttion);

    const foodTitle = document.createElement("h3");
    foodTitle.textContent = "おすすめ食材";
    resultScreen.appendChild(foodTitle);

    const foodList = document.createElement("div");
    foodList.className = "food-list";

    for (const food of firstTypeData.foods) {
        const foodItem = document.createElement("span");
        foodItem.textContent = food;
        foodList.appendChild(foodItem);
    }

    resultScreen.appendChild(foodList);

    const careTitle = document.createElement("h3");
    careTitle.textContent = "日々の養生";
    resultScreen.appendChild(careTitle);
    const careList = document.createElement("div");
    careList.className = "care-list";

    // A{
    for (const care of firstTypeData.care) {

        const careItem = document.createElement("div");
        careItem.textContent = care;

        careList.appendChild(careItem);

    } // }A
    resultScreen.appendChild(careList);
    if (filteredTypes.length > 1) {
        const otherGuide = document.createElement("div");
        otherGuide.className = "other-guide";

        const guideIcon = document.createElement("span");
        guideIcon.textContent = "👇";

        const guideText = document.createElement("p");
        guideText.textContent = "こちらも、あなたが選んだサインから見えてきた体質です。\nあわせて見てみましょう。";
        
        otherGuide.appendChild(guideIcon);
        otherGuide.appendChild(guideText);
        resultScreen.appendChild(otherGuide);
    }

    // B{
    for (const item of filteredTypes.slice(1)) {

        const otherTypeTitle = document.createElement("div");
        otherTypeTitle.className = "other-type-title";
        otherTypeTitle.textContent = "▼ " + [item[0]] + " （詳しく見る）";
        resultScreen.appendChild(otherTypeTitle);

        let isOpen = false;

        const otherDetailBox = document.createElement("div");

        // C{
        otherTypeTitle.addEventListener("click", function() {

            // F{
            if (isOpen === true) {
                otherDetailBox.remove();
                isOpen = false;
                otherTypeTitle.textContent = "▼ " + item[0] + " （詳しく見る）";
                return;
            } // }F

            otherDetailBox.textContent = "";

            const otherDescription = document.createElement("p");
            otherDescription.className = "type-description";
            otherDescription.textContent = typeData[item[0]].description;
            otherDetailBox.appendChild(otherDescription);
            // resultScreen.appendChild(otherDescription);
            // otherTypeTitle.after(otherDescription);

            const otherFoodTitle = document.createElement("h3");
            otherFoodTitle.textContent = "おすすめ食材";
            otherDetailBox.appendChild(otherFoodTitle);

            // otherDescription.after(otherFoodTitle);

            const otherFoodList = document.createElement("div");
            otherFoodList.className = "food-list";

            // D{
            for (const food of typeData[item[0]].foods) {

                const otherFoodItem = document.createElement("span");
                otherFoodItem.textContent = food;
                otherFoodList.appendChild(otherFoodItem);

            } // }D
            
            otherDetailBox.appendChild(otherFoodList);
            // otherFoodTitle.after(otherFoodList);

            const otherCareTitle = document.createElement("h3");
            otherCareTitle.textContent = "日々の養生";
            otherDetailBox.appendChild(otherCareTitle);
            // otherFoodList.after(otherCareTitle);

            const otherCareList = document.createElement("div");
            otherCareList.className = "care-list";

            // E{
            for (const care of typeData[item[0]].care) {

                const otherCareItem = document.createElement("div");
                otherCareItem.textContent = care;
                otherCareList.appendChild(otherCareItem);

            } // }E

            otherDetailBox.appendChild(otherCareList);

            // otherCareTitle.after(otherCareList);

            otherTypeTitle.after(otherDetailBox);

            isOpen = true;
            otherTypeTitle.textContent = "▲ " + item[0] + " （閉じる）";


        }); // }C

    } // }B

    const teaResultButton = document.createElement("button");
    teaResultButton.textContent = "東洋のお茶図鑑を見る 🍵 \n（別のアプリへ）";
    resultScreen.appendChild(teaResultButton);
    teaResultButton.className = "tea-link-button";

    teaResultButton.addEventListener("click", function() {
        window.location.href = "https://mami-yourplace.github.io/toyo-tea-web/";
    });

    resultScreen.scrollIntoView({
    behavior: "smooth",
    block: "start"
});


});

