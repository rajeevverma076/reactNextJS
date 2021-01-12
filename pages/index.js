import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Carousel } from 'react-bootstrap'
import fetch from 'isomorphic-unfetch';
import React, { useState, useEffect } from "react";

export default function Home() {

    const [launch_success,setLaunchSuccess]=useState(false);
    const [land_success,setLandSuccess]=useState(false);
    const [yearVal,setYearValue]=useState(false);

    const [selYear,setSelectYear]=useState();
    const [year,]=useState([2006,2007,2008,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]);
    const [spaceData,setSpace]=useState([])
    const getList=async ()=>{
        let response ;
        if(launch_success==true && land_success==false){
            console.log("API CALL For launch_success")
            response = await fetch('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true');
        }
        else if(launch_success==true && land_success==true && yearVal==false){
            console.log("API CALL For launch_success & land_success")
            response = await fetch('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true');
        }
        else if(launch_success==true && land_success==true && yearVal==true){
            console.log("API CALL For launch_success & land_success && Year")
            response = await fetch(' https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year='+selYear);
        }
        else{
            console.log("API CALL For ALL")
            response = await fetch('https://api.spaceXdata.com/v3/launches?limit=100');
        }
        const json = await response.json();
        setSpace(json)
    }
    useEffect(() => {
       getList();
      }, [selYear,launch_success,land_success])

      //Select Year
    const selectYear=(eitem)=>{
        setSelectYear(eitem);
        setYearValue(true);
    }

    //Select Lunch Success
    const selectLaunch=(val)=>{
        setLaunchSuccess(val)
    }

    //Select Land Success
    const selectLand=(val)=>{
        setLandSuccess(val)
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
              <div className="container-fluid p-2">
                  <h2 className="text-capitalize font_28 mt-3 mb-3 header_font">SpaceX Launch Programs</h2>
                  <div className="row">
                      <div className="col-sm-3 col-md-3 col-lg-2 pb-5">
                          <div className="white_bg rounded pl-3 pr-3 pt-3 pb-5">
                              <h3 className="text-capitalize pt-2 pb-2 font_24">Filters</h3>
                              <h5 className="text-capitalize border_bottom text-center ml-3 mr-3 pb-1 font_16">Launch Year</h5>
                              <div className="col-sm-12">
                                  <div className="row d-block">
                                      {year.map((item, index) => (
                                          <button key={index} className="btn btn-success col-5 btn_green mt-2 font_14 pl-1 pr-1 ml-2" onClick={(e) => selectYear(item)} value={item}>{item}</button>
                                      ))}
                                  </div>
                              </div>

                              <h5 className="text-capitalize border_bottom text-center ml-3 mr-3 mt-4 pb-1 font_16">successfull launch</h5>
                              <div className="col-sm-12">
                                  <div className="row d-block">
                                      <button className="btn btn-success col-5 btn_green mt-2 text-capitalize font_14 pl-1 pr-1" onClick={(e) => selectLaunch(true)}>true</button>
                                      <button className="btn btn-success col-5 float-right d-block active_btn mt-2 text-capitalize font_14 pl-1 pr-1" onClick={(e) => selectLaunch(false)}>false</button>
                                  </div>
                              </div>

                              <h5 className="text-capitalize border_bottom text-center ml-3 mr-3 mt-4 pb-1 font_16">successfull landing</h5>
                              <div className="col-sm-12">
                                  <div className="row d-block">
                                      <button className="btn btn-success col-5 btn_green mt-2 text-capitalize font_14 pl-1 pr-1" onClick={(e) => selectLand(true)}>true</button>
                                      <button className="btn btn-success col-5 float-right d-block active_btn mt-2 text-capitalize font_14 pl-1 pr-1" onClick={(e) => selectLand(false)}>false</button>
                                  </div>
                              </div>

                          </div>
                      </div>
                      <div className="col-sm-9 col-md-9 col-lg-10">
                          <div className="row">

                          {spaceData.map((item, index) => (
                              <div className="col-sm-6 col-lg-3 margin_bottom_30" key={index}>
                                  <div className="white_bg rounded p-3">
                                      <div className="image_div col-sm-12 p-0 mb-3">
                                          <img className="img-fluid" src={item.links.mission_patch_small} alt="" />
                                      </div>
                                      <h6 className="font_16 purple_color">{item.mission_name} #{item.flight_number}</h6>
                                      <h5 className="text-capitalize font-weight-bold font_16">mission ids</h5>
                                      <ul className="pl-3">
                                          <li>{item.mission_id}</li>
                                      </ul>
                                      <div className="row">
                                          <div className="col-sm-7 text-capitalize font_16 font-weight-bold">launch year:</div>
                                          <div className="col-sm-5">{item.launch_year}</div>
                                      </div>
                                      <div className="row">
                                          <div className="col-sm-7 text-capitalize font_16 font-weight-bold">successfull launch:</div>
                                          <div className="col-sm-5">{`${item.launch_success}`}</div>
                                      </div>
                                      <div className="row">
                                          <div className="col-sm-7 text-capitalize font_16 font-weight-bold">successfull landing:</div>
                                          <div className="col-sm-5">{`${item.rocket.first_stage.cores[0].land_success}`}</div>
                                      </div>
                                  </div>
                              </div>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
      </main>

      <footer className={styles.footer}>
          Developed by{' '} Rajeev Verma
      </footer>
    </div>
  )
}
