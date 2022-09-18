const { SerialPort } = require('serialport')
const serialPortUtil = {
    getSerialPortList(){
        SerialPort.list().then((ports) => {
            return ports; // 打印串口列表
        }).catch((err) => {
            console.log(err);
        });
    },
}
module.exports = serialPortUtil