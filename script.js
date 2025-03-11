// ==== SLIDER NAVIGATION ====
document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 2;
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            dots[i].classList.remove("active");
        });

        slides[index].classList.add("active");
        dots[index].classList.add("active");
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", function () {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });

        nextBtn.addEventListener("click", function () {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    showSlide(currentSlide);
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
    { id: "eid-al-adha", name_he: "עיד אל-אדחא", name_ar: "عيد الأضحى", date: "2025-06-28" }
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
        description: "عيد الفطر هو عيد إسلامي يُحتفل به بمناسبة انتهاء شهر رمضان، شهر الصيام والتقوى. يرمز العيد إلى الفرح، الأخوة والتضامن الاجتماعي، ويتضمن أداء صلاة العيد الخاصة، تناول وجبات احتفالية مع العائلة، زيارة الأقارب وتقديم الصدقات للمحتاجين (زكاة الفطر). من التقاليد البارزة في العيد تناول التمر والإفطار في صباح يوم العيد."
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
}

// Run function when the page loads
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("holiday-details.html")) {
        loadHolidayDetails();
    }
});
     
