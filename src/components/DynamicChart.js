import React from "react";
import 'chart.js/auto';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {useState, useRef, useEffect} from 'react';
import axios from "axios";
import { Pie } from "react-chartjs-2";
import TableItem from './TableItem'

ChartJS.register(ArcElement, Tooltip, Legend);


const DynamicChart = () => {

    const [data, setData] = useState([]);
    const [faildata, setfailData] = useState([]);
    const [successdata, setsuccessData] = useState([]);

    const [showMissions, setShowMissions] = useState();

    const value = useRef();
 
    useEffect(()=>{
        axios.get('https://api.spacexdata.com/v5/launches')
        .then((res)=>{
            const succ = res.data.filter((item) => item.success === true).length;
            const fail = res.data.filter((item) => item.success === false).length;
            setData([succ, fail]);

            let failedData = [];
            let successData = [];
    
            for(let i = 0; i < res.data.length; i++){
                if(res.data[i].success === false){
                    failedData.push({
                        id: res.data[i].id, 
                        num: res.data[i].flight_number, 
                        name: res.data[i].name,
                        image_url: res.data[i].links.patch.small,
                        watch_url: res.data[i].links.youtube_id
                    });
                } else {
                    successData.push({
                        id: res.data[i].id, 
                        num: res.data[i].flight_number, 
                        name: res.data[i].name,
                        image_url: res.data[i].links.patch.small,
                        watch_url: res.data[i].links.youtube_id
                    });
                }
            }

            setfailData(failedData);
            setsuccessData(successData);

            let defaultInfo = failedData.map((item) => <TableItem key={item.id} name={item.name} launchNum={item.num} video={item.watch_url} img={item.image_url} />);

            setShowMissions(defaultInfo);

            

        })
    }, []);


    let failedItems  = faildata.map((item) => <TableItem key={item.id} name={item.name} launchNum={item.num} video={item.watch_url} img={item.image_url} />);
    let successItems  = successdata.map((item) => <TableItem key={item.id} name={item.name} launchNum={item.num} video={item.watch_url} img={item.image_url} />);
     
    const info = {
        labels: ['Successful', 'Failed'],
        datasets: [
        {
            label: 'Success to Failed Launches',
            data: data,
            backgroundColor: [
            '#222222',
            '#ffffff'
            ],
            borderColor: [
            '#ffffff',
            '#ffffff'
            ],
            borderWidth: 1,
        }, 
        ],
    }

    function getValue(){
        let grabVal = value.current.value;
        if(grabVal === "Failed Missions"){
            setShowMissions(failedItems); 
        } else {
            setShowMissions(successItems); 
        }
    }   
    

    return (
        <>
        <div className="chart-one">
            <div className="chartBox">
                <Pie data={info} />
            </div>
            
            
        </div>
        <div className="chart-two">
            <h2>Mission Information</h2>
            <select className="mission" ref={value} onChange={getValue}>
                <option>Failed Missions</option>
                <option>Successful Missions</option>
            </select>
            <div className="mission-con">
                {showMissions}
            </div>
        </div>
        </>
    );
}

export default DynamicChart;