var tableElement = document.getElementById("field_table");

const HEIGHT = 7;
const WIDTH = 7;
const MOVE = 3;
const moveRange = [
    [3, 0],
    [2, 1],
    [2, 0],
    [2, -1],
    [1, 2],
    [1, 1],
    [1, 0],
    [1, -1],
    [1, -2],
    [0, 3],
    [0, 2],
    [0, 1],
    [0, 0],
    [0, -1],
    [0, -2],
    [0, -3],
    [-1, 2],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [-1, -2],
    [-2, 1],
    [-2, 0],
    [-2, -1],
    [-3, 0],
];
const attackRange = [
    [1, 0],
    [0, 1],
    [0, -1],
    [-1, 0],
];

var field;
var x;
var y;
var enemies;
var mode; // move, attack, enemyMove, enemyAttack, world

init();
view();

function init() {
    field = [];
    for (var row = 0; row < HEIGHT; row++) {
        field.push([]);
        var tr = document.createElement("tr");
        for (var col = 0; col < WIDTH; col++) {
            var td = document.createElement("td");
            if (document.addEventListener) {
                td.addEventListener("click", onClick);
            } else if (document.attachEvent) {
                td.attachEvent("click", onClick);
            }
            tr.appendChild(td);
            field[row].push(td);
        }
        tableElement.appendChild(tr);
    }

    x = 0;
    y = Math.floor(HEIGHT / 2);

    enemies = [
        [Math.floor(Math.random() * HEIGHT), WIDTH - 1],
        [Math.floor(Math.random() * HEIGHT), WIDTH - 3],
        [Math.floor(Math.random() * HEIGHT), WIDTH - 5]
    ];
    mode = "move";
}

function view() {
    // 初期化
    field.forEach(element => {
        element.forEach(cell => {
            cell.bgColor = "FFFFFF";
        });
    });

    if (mode == "move") { // 移動範囲の描画
        for (const range of moveRange) {
            field[Math.max(Math.min(y + range[0], HEIGHT - 1), 0)][Math.max(Math.min(x + range[1], WIDTH - 1), 0)].bgColor = "#00FFFF";
        }
    }

    if (mode == "attack") { // 攻撃範囲の描画
        for (const range of attackRange) {
            field[Math.max(Math.min(y + range[0], HEIGHT - 1), 0)][Math.max(Math.min(x + range[1], WIDTH - 1), 0)].bgColor = "#FF6666";
        }
    }

    // 操作キャラクターの描画
    field[y][x].bgColor = "#0000FF";

    // 敵キャラクターの描画
    enemies.forEach(element => {
        field[element[0]][element[1]].bgColor = "#FF0000";
    });
}

function onClick(event) {
    var clicked_x = event.target.cellIndex;
    var clicked_y = event.target.parentElement.rowIndex;

    if (mode == "move" && (field[clicked_y][clicked_x].bgColor == "#00FFFF" || field[clicked_y][clicked_x].bgColor == "#0000FF")) {
        x = clicked_x;
        y = clicked_y;
        mode = "attack";
    }

    if (mode == "attack" && (field[clicked_y][clicked_x].bgColor == "#FF6666")) {
        mode = "move";
    }

    view();
}