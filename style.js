//phân tích logic
//từ giao diện các nút em lấy id thì được valuePlayer ="scissor, rock, paper"
//      từ dó tìm indexPlayer thông qua item nào có id == valuePlayer
//tương tự vậy với indexComputer
//thắng 
//0 - 2 = -2}
//1 - 0 =  1} =>  indexPlayer - indexComputer = -2|1 => thắng => return 1
//2 - 1 =  1}
//hòa: cả 2 trừ nhau = 0: indexPlayer - indexComputer = 0 => return 0
//thua là còn lại           return -1
const VALUES = [
    { id: "scissor", value: "✌🏼" }, //0
    { id: "rock", value: "👊🏼" },   //1
    { id: "paper", value: "✋🏼" },    //2
];

//làm cơ chế của máy
let i = 0;
const handleChange = () => {
    let computer = document.querySelector("#computer");
    computer.setAttribute("data-id", VALUES[i].id);
    computer.textContent = VALUES[i].value;
    // computer.innerHTML
    i = i == VALUES.length - 1 ? 0 : ++i;
};
let interval = setInterval(handleChange, 100);

//Hàm quy đổi valuePlayer và valueComputer "scissor | rock | paper"
// thành indexPlayer và indexComputer
// rồi so sánh 
const compare = (valuePlayer, valueComputer) => {
    let indexPlayer = VALUES.findIndex((item) => item.id == valuePlayer);
    let indexComputer = VALUES.findIndex((item) => item.id == valueComputer);
    let result = indexPlayer - indexComputer;
    if ([1, -2].includes(result)) {
        return 1;
    } else if (result == 0) {
        return 0;
    } else {
        return -1;
    }
};

//dom tới bộ item của player
let playerItem = document.querySelectorAll(".user");
//duyệt tất cả các item cho chúng lắng nghe sự kiện
playerItem.forEach((item) => {
    //nếu item nào trong 3 thằng bị click thì làm
    item.addEventListener("click", (event) => {
        //dừng máy trước
        clearInterval(interval);
        //lấy valuePlayer và valueComputer
        let computer = document.querySelector("#computer");
        let valueComputer = computer.dataset.id;//getAttribute("data-id")
        let valuePlayer = event.target.id;
        let result = compare(valuePlayer, valueComputer);
        console.log(result);
        //duyệt danh sách các item và xóa class actived
        playerItem.forEach((_item) => {
            _item.classList.remove("actived");
            _item.style.pointerEvents = "none";
        })
        event.target.classList.add("actived");
        //lấy giá trị so sánh trước để tạo thông báo
        let alertDiv = document.createElement("div");
        alertDiv.classList.add("alert");
        let msg = "";
        if (result == 1) {
            msg = "bạn thắng";
            alertDiv.classList.add("alert-success");
        } else if (result == 0) {
            msg = "Bạn hòa";
            alertDiv.classList.add("alert-warning");
        } else {
            msg = "bạn thua";
            alertDiv.classList.add("alert-dark");
        }
        alertDiv.textContent = msg;
        document.querySelector(".notification").appendChild(alertDiv);
        document.querySelector(".play-again").classList.remove("d-none");
    })
});

//dom tới nút chơi lại và ép nó lắng nghe sự kiện
document.querySelector("#btn-play-again").addEventListener("click", (event) => {
    clearInterval(interval);
    interval = setInterval(handleChange, 100);
    //xóa actived và trả lại khả năng click
    playerItem.forEach((_item) => {
        _item.classList.remove("actived");
        _item.style.pointerEvents = "";
    })
    //xóa thông báo
    document.querySelector(".notification").innerHTML = "";
    document.querySelector(".play-again").classList.add("d-none");
})