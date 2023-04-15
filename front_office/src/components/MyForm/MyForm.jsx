import React, {useCallback, useEffect, useState} from 'react';
import MyProgressBar from "../MyProgressBar/MyProgressBar";
import MyCanvas from "../MyCanvas/MyCanvas";
import MyTimer from "../MyTimer/MyTimer";
import "bootstrap/dist/css/bootstrap.css"
import {getIntervalle} from "../../hooks";
import urls from "../../hooks";

/*Main component
* make a request to django waiting the results, during the processing
* we implement a progressfunction with interval (intervall value change depending of input values)
* allow number beteween 1-4072
* handle progression and temporary results
* */
function MyForm() {
    const [inputs, setInputs] = useState({height: 10, width: 10});
    const [isLoading, setLoading] = useState(false)
    const [progression, setProgression] = useState(0)
    const [contentB64, setContentB64] = useState('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')
    const [myIntervalle,granular] = getIntervalle(inputs['width'])
    const [watch,setWatch] = useState(false)
    const [history,setHistory]=useState([])


    const handleChange = (event) => {
        //prevent input to be between 1 to 4072
        const name = event.target.name;
        let value = event.target.value;
        const min = event.target.min;
        const max = event.target.max;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        setInputs(values => ({...values, [name]: value}))
    }


    //make the main request
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            setWatch(true)
            setProgression(0)
            setHistory([])
            const res = await fetch(urls.API_JOB + new URLSearchParams(inputs) +"&granular="+granular)
            const resJson = await res.json();
            if (res) {
                setLoading(false)
                const images = resJson?.generate_images
                //get last b64 image file
                if(images?.length > 0){
                    setContentB64(Object.values(images.slice(-1)[0]).join())
                    //set history object
                    setHistory(images)
                }
                setProgression(100)
            }
        } catch (err) {
            console.log(err);
        }
    };

    //call back to get state during process
    const progressionFunction = useCallback(async (history) => {
        try {
            const res = await fetch(urls.API_INFO)
            const resJson = await res.json();
            if (res) {
                setProgression(resJson?.progression)
                const images = resJson?.generate_images
                setHistory(history.concat(images))
                //get last b64 image file
                setContentB64(images?.length > 0 ? Object.values(images[0]).join('') : '')
            }
        } catch (err) {
            console.log(err);
        }
    }, []);


    useEffect(() => {
        let progress;
        if (isLoading) {
            progress = setInterval(() => progressionFunction(history), myIntervalle);
        }
        // if (progression === 100) {
        //     clearInterval(progress);
        // }
        return () => {
            clearInterval(progress);
        };
    }, [contentB64, progression, progressionFunction, isLoading, myIntervalle,history])


    const change =(event) =>{
        setContentB64( event.target.value);
    }

    return (
        <div className="col-md-12 m-1" style={{display: 'inline-flex', justifyContent: 'center'}}>
                <div style={{width: '50vh', height: '30vh'}}>
                    <form onSubmit={handleSubmit}>
                        <div style={{'display': 'block'}}>
                            <label style={{'width': '5vh'}}>Width:
                                <input
                                    type="number"
                                    name="width"
                                    value={inputs.width || ""}
                                    onChange={handleChange}
                                    min="1"
                                    max="4072"
                                /></label>
                        </div>
                        <div>
                            <label style={{'width': '5vh'}}>Height:
                                <input
                                    type="number"
                                    name="height"
                                    value={inputs.height || ""}
                                    onChange={handleChange}
                                    min="1"
                                    max="4072"
                                /></label>
                        </div>
                        <div>
                            <input className="btn btn-primary m-1" value='START' type="submit" disabled={isLoading}/>
                        </div>
                        <MyProgressBar bgcolor={"#6a1b9a"} completed={progression}/>
                    </form>
                    <MyTimer start={watch} stop={progression===100} />
                </div>
            <div className="row-cols-12 my-lg-8">
                <MyCanvas width={300} height={300} b64Value={contentB64}/>
                {history.length > 0  ? (
                        <div className="m-3">
                            <label htmlFor="History">Step history :</label>
                            <select onChange={change} name="step" id="step">
                                {history.map((name, index) => (
                                    <option value={Object.values(name)} key={index}>
                                        {Object.keys(name).join('').split(".")[0].split("_")[1].toString() +" %"}
                                    </option>))}
                            </select>
                        </div>
                    )
                    :'' }
                {progression !== 100 && progression !== 0 ?<div>Waiting results history ...</div>:''}

            </div>

        </div>
    )
}

export default MyForm