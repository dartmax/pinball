import React, {DetailedHTMLProps, FormHTMLAttributes, useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import fetchData from "../../hook/fetchData";

import {
  filteredDataActions,
  resetPinBallState,
  setMyLatitude,
  setMyLongitude
} from "../../store/pinBall/pinBall.actions";
import { pinBallSelectors } from "../../store/pinBall/pinBall.selectors";
import { requestSearchUrl } from "../../config/utils";
import SmallLoader from "../loader/SmallLoader";
import {AxiosResponse} from "axios";

const PinBallMap = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lon, setLon] = useState<string | undefined>("");
  const [lat, setLat] = useState<string | undefined>("");
  const [data, setData] = useState<any | null>(null);
  const [eventClick, setEventClick] = useState<any | null>(false);
  const dispatch = useDispatch();
  const { filteredData, myLatitude, myLongitude } = useSelector(pinBallSelectors.getAllState);

  const handleMyCoords = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
          dispatch(setMyLatitude(position.coords.latitude.toString()));
          dispatch(setMyLongitude(position.coords.longitude.toString()));
        }, (error: GeolocationPositionError) => {
          console.error("Error Code = " + error.code + " - " + error.message)
        }
    )
  }, [dispatch])

  function handleClickReset(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (event) {
      setLon("")
      setLat("")
      dispatch(resetPinBallState())
    }
    event.preventDefault();
  }

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    setEventClick(!eventClick)
    const createUrl = {
      lat: lat ? lat : myLatitude,
      lon: lon ? lon : myLongitude,
      max_distance: 50,
      send_all_within_distance: 1,
    };

    fetchData(
      requestSearchUrl(
        "https://pinballmap.com/api/v1/locations/closest_by_lat_lon.json",
        createUrl
      ),
      setData
    ).then((res: AxiosResponse<any, any> | undefined) => {
      setIsLoading(!isLoading)
      dispatch(filteredDataActions(res?.data))
      setIsLoading(false)
    })
  }, [lat, lon, myLatitude, myLongitude, dispatch, isLoading, eventClick])

  const handleLonChange = (e: { target: { value: string; }; }) => {
    return e.target.value ? setLon(e.target.value) : setLon(myLongitude)
  }

  const handleLatChange = (e: { target: { value: string; }; }) => {
    return e.target.value ? setLat(e.target.value) : setLat(myLatitude)
  }

  return (
    <div className="container">
      <p>Add coords:</p>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="coords-container">
            <div className="input-content">
              <span className="latitude-text">Add latitude:</span>
              <input data-testid='lat-input' placeholder="Add latitude" type="text" value={lat || myLatitude} onChange={handleLatChange}/>
            </div>
            <div className="input-content">
              <span className="latitude-text">Add longitude:</span>
                <input placeholder="Add longitude" type="text" value={lon || myLongitude} onChange={handleLonChange}/>
            </div>
            <input data-testid='lon-input' className="btn btn--white" type="submit" value="Submit" />
          </div>
        </form>
      </div>
      <div className="button-container">
        <button className="btn btn--green" value={1} onClick={handleMyCoords}>
          Find Near Me
        </button>
        <button className="btn btn--green" value={1} onClick={(e) => handleClickReset(e)}>
          Reset
        </button>
      </div>
      <div className="power-ball-container">
        {eventClick && isLoading && <SmallLoader />}
        {filteredData?.locations?.map((item: any) => (
            <div className="powerball-address" key={item.id}>
              <div className="powerball-name">
                  {item.name}
              </div>
              <div className="powerball-name">
                City: {item.city}
              </div>
              <p className="powerball-street">Address: {item.street}</p>
              {item.website && (
                  <p className="powerball-street">
                    Web: <a className="powerball-street" href={item.website}>
                    {item.website}
                  </a></p>)}
            </div>
        ))}
        {data?.errors && (
            <div>No data near your location</div>
        )}
      </div>

    </div>
  )
}

export default PinBallMap;