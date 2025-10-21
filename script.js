
const regions = document.querySelectorAll('.region');
const label = document.getElementById('label');
const tableBox = document.getElementById('tableBox');
const regionName = document.getElementById('regionName');
const competitionList = document.getElementById('competitionList');
const container = document.getElementById('mainContainer');

const competitions = {
    north: ["แข่งคณิตศาสตร์", "แข่งหุ่นยนต์", "แข่งสิ่งประดิษฐ์"],
    central: ["แข่งโครงงานวิทยาศาสตร์", "แข่งเขียนโปรแกรม", "แข่งขัน AI"],
    northeast: ["แข่งฟิสิกส์", "แข่งชีววิทยา", "แข่งขันวัฒนธรรมอีสาน"],
    south: ["แข่งเคมี", "แข่งพัฒนาแอปพลิเคชัน", "แข่งขันเทคโนโลยีสีเขียว"]
};

let activeRegion = null;

regions.forEach(region => {
    const id = region.getAttribute('data-region');

    region.addEventListener('mouseenter', (e) => {
        const box = region.getBBox();
        // ปรับตำแหน่ง label ให้ตรงกลางภาค (ประมาณ)
        label.style.left = (box.x + box.width / 2) + "px";
        label.style.top = (box.y + box.height / 2) + "px";
        label.textContent = getRegionThai(id);
        label.style.opacity = 1;

        regionName.textContent = getRegionThai(id);
        competitionList.innerHTML = competitions[id].map(item => `<tr><td>${item}</td></tr>`).join("");
        tableBox.classList.add("show");
    });

    region.addEventListener('mouseleave', () => {
        label.style.opacity = 0;
        if (!tableBox.classList.contains("active")) {
            tableBox.classList.remove("show");
        }
    });

    region.addEventListener('click', () => {
        if (activeRegion === id) {
            // ถ้าคลิกซ้ำ = ปิดกลับ
            activeRegion = null;
            tableBox.classList.remove("active");
            tableBox.classList.remove("show");
            container.style.transform = "translateX(0)";
        } else {
            activeRegion = id;
            tableBox.classList.add("active");
            container.style.transform = "translateX(-120px)";
        }
    });
});

function getRegionThai(id) {
    switch (id) {
        case "north": return "ภาคเหนือ";
        case "central": return "ภาคกลาง";
        case "northeast": return "ภาคตะวันออกเฉียงเหนือ";
        case "south": return "ภาคใต้";
        default: return "";
    }
}
