import React, {FC, useEffect, useRef} from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface IFilteredData {
    filteredData: Record<string, any>
    lat: string | undefined,
    lon: string | undefined
}

const Map: FC<IFilteredData> = ({filteredData, lat, lon}) => {
    if (process.env.REACT_APP_MAP_TILER_KEY == null) {
        throw new Error("You have to configure env MAP_TILER_KEY, see README");
    }
    const MAP_TILER_KEY_CONST =  process.env.REACT_APP_MAP_TILER_KEY
    const mapContainerRef: any = useRef();

    useEffect(() => {
        let centerLatMap = lat ? lat : "35.089664"
        let centerLonMap = lon ? lon : "-78.9174978"
        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAP_TILER_KEY_CONST}`,
            center: [Number(centerLonMap), Number(centerLatMap)],
            zoom: 8
        });

        // @ts-ignore
        map.addControl(new maplibregl.NavigationControl(), 'top-right');
        filteredData?.locations?.map((item: any) => {
            new maplibregl.Marker({color: "#FF0000"})
                .setLngLat([item.lon, item.lat])
                .addTo(map);
        })


        return () => {
            map.remove();
        }
    }, [MAP_TILER_KEY_CONST, mapContainerRef, filteredData?.locations]);
    return (
        <div id="map-canvas">
            <div className="map-wrap">
                <div ref={mapContainerRef} className="map"></div>
            </div>
        </div>
    )
}

export default Map;