import React, { useState, useEffect } from 'react';
import './GenreBrowser.css';
import { RadioBrowserApi, StationSearchType } from 'radio-browser-api';
import "react-h5-audio-player/lib/styles.css"
import AudioPlayer from "react-h5-audio-player"


const GenreBrowser = () => {

    const [radioGenre , setRadioGenre] = useState("all")
    const [data, setData] = useState()

    useEffect(() => {
        setupApi(radioGenre).then(data => {
          setData(data)
        })
      }, [radioGenre])
      
      const setupApi = async radioGenre => {
        const api = new RadioBrowserApi(fetch.bind(window), "My Radio App")
      
        const stations = await api
          .searchStations({
            language: "english",
            tag: radioGenre,
            limit: 12,
          })
          .then(data => {
            return data
          })
      
        return stations
      }

    const genres = [
        "All",
        "classical",
        "country",
        "dance",
        "disco",
        "house",
        "jazz",
        "pop",
        "rap",
        "retro",
        "rock",
      ]
     
    const onSelect = (e) => {
        setRadioGenre(e.target.value)
    }  

    return (
        
                <div className="genres">
                    <div className="genre-wrap">
                      <label for="genre" className="genre">Genre :&nbsp;&nbsp;</label>
                      <select name="genre" className="genre decorated" onChange={(e) => onSelect(e)}>
                          {genres.map((genre) => (
                              <option className="genre options">{genre}</option>
                          ))}
                      </select>
                    </div>
                    <div className="station-wrap">

                        {data &&
                        data.map((station, index) => {
                            return (
                            <div className="station" key={index}>
                                <div className="stationName" style={{color:"black"}}>
                                  {station.name}
                                </div>
                                
                                <div className="player-wrap">
                                  <AudioPlayer
                                    style={{
                                      background:"black"
                                    }}
                                    className="player"
                                    src={station.urlResolved}
                                    showJumpControls={false}
                                    layout="stacked"
                                    customProgressBarSection={["PROGRESS_BAR"]}
                                    customControlsSection={["MAIN_CONTROLS","VOLUME_CONTROLS"]}
                                    autoPlayAfterSrcChange={false}
                                    />
                                </div>
                            </div>)})}
                    </div>
                  </div>
            
    )
}

export default GenreBrowser
