/* eslint-env jquery */

// get SerialPort module from main
// function

function disabledSetting(){

}

function revealSetting(){

};

function receive(comNum){

};

function send(){

};

function updateCount(){

}

function saveToFile(){

}

let list = window.serialPortUtil.getSerialPortList();
console.log(list.length);

//btn function
$("#updateSerialPort").click(function(event){
    let list = window.serialPortUtil.getSerialPortList();
    for(var i = 0, len = list.length; i<len; i++){
        console.log(list[i].path);
        $("#portList").append(`<option value=${i}>${list[i].path}</option>`);
    }
});

$("#openPort").click(function(event){
    
});

$("#send").click(function(event){
    
});

$("#editBaudRate").click(function(event){
    
});

$("#resetCount").click(function(event){
    $("Rx").val("Rx=0");
    $("Tx").val("Tx=0");
});

$("#cleanReceive").click(function(event){
    $("#ReceiveArea").val("");
});

$("#cleanSend").click(function(event){
    $("#sendArea").val("");    
});

