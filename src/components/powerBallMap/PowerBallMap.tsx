import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filteredDataActions, resetPowerBallState} from "../../store/powerBall/powerBall.actions";
import {powerBallSelectors} from "../../store/powerBall/powerBall.selectors";
import fetchData from "../../hook/fetchData";
import {requestSearchUrl} from "../../config/utils";

const PowerBallMap = () => {
  const dispatch = useDispatch();
  const { filteredData } = useSelector(powerBallSelectors.getAllState);
  const [events, setEvents] = useState<any | null>(null);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [lon, setLon] = useState<number>(0);
  const [lat, setLat] = useState<number>(0);
  const [data, setData] = useState<any | null>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const { target } = event
    console.log("data", data); // eslint-disable-line no-console
    console.log("latitude", latitude) // eslint-disable-line no-console
    console.log("longitude", longitude) // eslint-disable-line no-console
    setEvents((target as HTMLInputElement).value)
    if (latitude === 0 && longitude === 0) {
      dispatch(resetPowerBallState())
    }
    event.preventDefault();
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    }, (error) => {
        console.error("Error Code = " + error.code + " - " + error.message)
      }
    )
  }, [latitude, longitude, lon, lat])

  const handleSubmit = useCallback((event: any) => {
    console.log("handleSubmit latitude", latitude)
    const createUrl = {
      lat: lat !== 0 ? lat : latitude,
      lon: lon !== 0 ? lon : longitude,
      max_distance: 50,
      send_all_within_distance: 1,
    };

    fetchData(
      requestSearchUrl(
        "https://pinballmap.com/api/v1/locations/closest_by_lat_lon.json",
        createUrl
      ),
      setData
    ).then(res => {
      console.log("res.data", res?.data)
      dispatch(filteredDataActions(res?.data))
      console.log(res?.data)
    })
    event.preventDefault();
  }, [lat, lon, latitude, longitude])

  const handleLonChange = (e: { target: { value: any; }; }) => {
    console.log(longitude)
    setLon(e.target.value)
  }

  const handleLatChange = (e: { target: { value: any; }; }) => {
    setLat(e.target.value)
  }


  return (
    <div>
      <p>Add coords:</p>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="coords-container">
            <div>
              <label>Add latitude:
                <input placeholder="Add latitude" type="text" value={lat !== 0 ? lat : latitude} onChange={handleLatChange}/>
              </label>
            </div>
            <div>
              <label>Add longitude:
                <input placeholder="Add longitude" type="text" value={lon !== 0 ? lon : longitude} onChange={handleLonChange}/>
              </label>
            </div>
            <input className="btn btn--white" type="submit" value="Submit" />

          </div>

        </form>
      </div>
      <button className="btn btn--green" value={1} onClick={(e) => handleClick(e)}>
        Find Near Me
      </button>
    </div>
  )
}

export default PowerBallMap;