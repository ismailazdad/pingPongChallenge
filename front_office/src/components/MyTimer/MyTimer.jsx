import {useEffect, useState} from "react";

/*
* timer component start/stop depending call
* */
const MyTimer = (props) => {
    const { start ,stop } = props;
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    useEffect(() => {
        if(start){
            setRunning(true)
        }
        if(stop){
            setRunning(false)
        }
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running,time,start,stop]);
    return (
        <div className="stopwatch">
            <div className="numbers">
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>
        </div>
    );
};

export default MyTimer