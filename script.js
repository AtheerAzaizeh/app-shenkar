// ==== SLIDER NAVIGATION ====
// ==== SLIDER NAVIGATION ====
document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            dots[i].classList.remove("active");

            if (i === index) {
                slide.classList.add("active");
                dots[i].classList.add("active");
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", prevSlide);
        nextBtn.addEventListener("click", nextSlide);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    showSlide(currentSlide);
});

// ==== FIX SWIPE GESTURE ====
document.addEventListener("DOMContentLoaded", function () {
    let startX = 0;
    const carousel = document.querySelector(".holiday-details"); // FIXED: select the correct container

    carousel.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", function (e) {
        let moveX = e.changedTouches[0].clientX - startX;
        if (moveX > 50) {
            document.getElementById("nextBtn").click();
        } else if (moveX < -50) {
            document.getElementById("prevBtn").click();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let startX=2;
    const carousel = document.querySelector(".carousel-slide");

    carousel.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchmove", function (e) {
        let moveX = e.touches[0].clientX - startX;
        if (moveX > 50) {
            document.getElementById("prevBtn").click();
        } else if (moveX < -50) {
            document.getElementById("nextBtn").click();
        }
    });
});

// ==== HOLIDAY DATA ====
const holidays = [
    { id: "eid-al-fitr", name_he: "עיד אל-פיטר", name_ar: "عيد الفطر", date: "2025-03-29" },
    { id: "ramadan", name_he: "רמדאן", name_ar: "رمضان", date: "2025-03-01" },
    { id: "rosh-hashanah", name_he: "ראש השנה", name_ar: "رأس السنة العبرية", date: "2025-09-23" },
    { id: "yom-kippur", name_he: "יום הכיפורים", name_ar: "يوم الغفران", date: "2025-10-02" },
    { id: "hanukkah", name_he: "חנוכה", name_ar: "عيد الحانوكا", date: "2025-12-15" },
    { id: "eid-al-adha", name_he: "עיד אל-אדחא", name_ar: "عيد الأضحى", date: "2025-06-28" },
    {id: "eid-porim" , name_he: "חג פורים" , name_ar: "عيد البوريم" , date: "2025-03-13"}
];

// ==== FIND NEAREST HOLIDAY ====
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("nearest-holiday-name")) {
        holidays.sort((a, b) => new Date(a.date) - new Date(b.date));

        const today = new Date();
        const nearestHoliday = holidays.find(holiday => new Date(holiday.date) > today);

        if (nearestHoliday) {
            document.getElementById("nearest-holiday-name").innerText = `${nearestHoliday.name_he} | ${nearestHoliday.name_ar}`;
            document.getElementById("nearest-holiday-date").innerText = nearestHoliday.date;
        }
    }
});

// ==== DISPLAY ALL HOLIDAYS ====
document.addEventListener("DOMContentLoaded", function () {
    const holidayList = document.getElementById("holiday-list");
    if (holidayList) {
        holidays.forEach(holiday => {
            const li = document.createElement("li");
            li.innerText = `${holiday.name_ar} | ${holiday.name_he} - ${holiday.date}`;
            li.onclick = function () {
                openHolidayPage(holiday.id);
            };
            holidayList.appendChild(li);
        });
    }
});

// ==== OPEN HOLIDAY DETAILS PAGE ====
function openHolidayPage(holidayId) {
    window.location.href = `holiday-details.html?holiday=${holidayId}`;
}

// ==== DYNAMIC HOLIDAY DATA ====
const holidayDetails = {
    "eid-al-fitr": {
        name: "عيد الفطر | עיד אל-פיטר",
        date: "29/3 - 1/4",
        greeting: "عيد سعيد | חג שמח",
        image: "images/eid-al-fitr.png",
        traditions: "נהוג לקיים תפילת חג מיוחדת, ארוחות חגיגיות עם המשפחה, ביקורים אצל קרובים ומתן צדקה לנזקקים (זכאת אל-פיטר). ",
        foods: "אחד המאפיינים המרכזיים של החג הוא אכילת תמרים ושבירת הצום בבוקר החג.",
        description: "يُعتاد على إقامة صلاة عيد خاصة، وتجمع العائلات حول موائد احتفالية، وزيارة الأقارب، بالإضافة إلى تقديم الصدقة للمحتاجين (زكاة الفطر).",
        food: "يُعد تناول التمر وكسر الصيام في صباح العيد من أبرز تقاليد الاحتفال بهذا اليوم.",
        desc:"עיד אל-פיטר הוא חג מוסלמי המציין את סיום חודש הרמדאן, חודש הצום והסגפנות. החג מסמל שמחה, אחווה וסולידריות חברתית.",
        descar:"عيد الفطر هو عيد إسلامي يحتفل به بمناسبة انتهاء شهر رمضان، شهر الصيام والتقشف. يرمز العيد إلى الفرح، الإخاء والتضامن الاجتماعي.",
        image2: "images/eid-al-fitr2.png"
    },
    "hanukkah": {
        name: "عيد الحانوكا | חנוכה",
        date: "15/12",
        greeting: "חג אורים שמח | عيد أنوار سعيد",
        image: "images/hanukkah.jpg",
        traditions: "חוגגים את חנוכה בהדלקת נרות חנוכייה בכל ערב, משחק בסביבון וחלוקת דמי חנוכה לילדים.",
        foods: "לביבות, סופגניות ממולאות בריבה או שוקולד.",
        description: "عيد الحانوكا هو عيد يهودي يستمر 8 أيام. يرمز العيد إلى انتصار الإيمان وتجديد روح الشعب اليهودي."
    },
    "yom-kippur": {
        name: "يوم الغفران | יום הכיפורים",
        date: "2/10",
        greeting: "צום קל | صيام مقبول",
        image: "images/yom-kippur.jpg",
        traditions: "יום צום מלא שנמשך 25 שעות, הכולל תפילות בקהילה וביקור בבית הכנסת.",
        foods: "אין מאכלים ספציפיים ביום הכיפורים, אך הארוחה לפני הצום כוללת בדרך כלל פחמימות רבות.",
        description: "يوم الغفران هو أقدس يوم في التقويم اليهودي، حيث يتم التركيز على الصلوات والتأملات."
    },
    "eid-porim":{
        name: "عيد البوريم | חג פורים",
        date: "13-14/3",
        greeting: "",
        image: "images/porem.png" ,
        image2: "images/porem2.png",
        traditions:"קריאת מגילת אסתר בבית הכנסת בערב החג ובבוקר שלמחרת. מתנות לאביונים – מתן צדקה לנזקקים כחלק ממצוות החג. משלוח מנות – שליחת מנות אוכל ומתוקים לחברים ולמשפחה. סעודת פורים – ארוחה חגיגית מלווה בשירה ושמחה. תחפושות ומסיבות – נהוג להתחפש ולקיים תהלוכות חגיגיות.",
        foods: "מאכל מסורתי בולט הוא אוזני המן – עוגיות מתוקות במילוי פרג, שוקולד או ריבה.",
        description:"قراءة سفر أستير في الكنيس مساء العيد وصباح اليوم التالي. متانوت لاَفيونيم – تقديم الصدقات للمحتاجين كجزء من واجبات العيد. مشلوح مَنوت – إرسال هدايا من الطعام والحلويات للأصدقاء والعائلة. مأدبة بوريم – وجبة احتفالية تتخللها الأغاني والفرح. الأزياء والحفلات – يُعتاد ارتداء الأزياء التنكرية وإقامة مواكب احتفالية.",
        food: "أشهر الأطعمة التقليدية هي أوزني هامان – وهي بسكويت محشو ببذور الخشخاش، الشوكولاتة أو المربى.",
        desc: "פורים הוא חג יהודי המציין את נס הצלת היהודים מפרס מהגזירה של המן, כפי שמתואר במגילת אסתר. החג מסמל שמחה, ניצחון והתלכדות קהילתית." ,
        descar: "يد الفطر هو عيد إسلامي يحتفل به بمناسبة انتهاء شهر رمضان، شهر الصيام والتقشف. يرمز العيد إلى الفرح، الإخاء والتضامن الاجتماعي."
    }
};


// ==== LOAD HOLIDAY DETAILS DYNAMICALLY ====
function loadHolidayDetails() {
    const params = new URLSearchParams(window.location.search);
    const holidayId = params.get("holiday");

    if (!holidayDetails[holidayId]) {
        console.error("Holiday data not found for ID:", holidayId);
        return;
    }

    document.getElementById("holiday-name").innerText = holidayDetails[holidayId].name;
    document.getElementById("holiday-date").innerText = holidayDetails[holidayId].date;
    document.getElementById("holiday-greeting").innerText = holidayDetails[holidayId].greeting;
    document.getElementById("holiday-image").src = holidayDetails[holidayId].image;
    document.getElementById("holiday-traditions").innerText = holidayDetails[holidayId].traditions;
    document.getElementById("holiday-foods").innerText = holidayDetails[holidayId].foods;
    document.getElementById("holiday-description").innerText = holidayDetails[holidayId].description;
    document.getElementById("holiday-food").innerText = holidayDetails[holidayId].food;
    document.getElementById("holiday-desc").innerText = holidayDetails[holidayId].desc + "\n\n\n\n" +  holidayDetails[holidayId].descar
                                                        document.getElementById("holiday-image2").src = holidayDetails[holidayId].image2;
const startBtn = document.getElementById("startQuizBtn");

if (["eid-al-fitr", "eid-al-adha", "ramadan"].includes(holidayId)) {
    startBtn.innerText = "התחלה"; // Hebrew for Muslim holidays
    startBtn.onclick = () => startQuiz("quiz.html");
} else {
    startBtn.innerText = "ابدأ"; // Arabic for Jewish holidays
    startBtn.onclick = () => startQuiz("quiz-purim.html");
}
}

// Run function when the page loads
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("holiday-details.html")) {
        loadHolidayDetails();
    }
});
     
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".fade-in");

    function showElementsOnScroll() {
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                el.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", showElementsOnScroll);
    showElementsOnScroll(); // Run on load
});

window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
window.addEventListener("load", function () {
    document.querySelector(".loader").classList.add("hidden");
});

document.addEventListener("DOMContentLoaded", function () {
    const page = document.querySelector(".page-transition");
    if (page) {
        page.classList.add("visible");
    }
});

function goBack() {
    window.history.back();
}
function startQuiz(quizPage) {
    window.location.href = quizPage;
}
